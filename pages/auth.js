import React, { useState, useEffect } from "react";
import axios from "axios";

import Image from "next/image";

import UiButton from "../components/ui/button";
import { getUserProfile } from "../utils/Helpers";

const Auth = () => {
  const [currentAccount, setCurrentAccount] = useState();

  const checkIfWalletIsConnected = async () => {
    try {
      const { ethereum } = window;
      if (!ethereum) {
        console.log("Please install MetaMask! 🦊");
        return;
      } else {
        console.log("Got the Ethereum object", ethereum);
      }

      const accounts = await ethereum.request({ method: "eth_accounts" });
      if (accounts.length !== 0) {
        const account = accounts[0];
        console.log("Found an authorized account:", account);
        checkUser(account);
      } else {
        console.log("No authorized account found...");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const connectWallet = async () => {
    try {
      const { ethereum } = window;
      if (!ethereum) {
        alert("Get MetaMask 🦊");
        return;
      }

      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });
      const account = accounts[0];
      setCurrentAccount(account);
      checkUser(account);
    } catch (error) {
      console.log(error);
    }
  };

  const checkUser = async (public_address) => {
    const hasProfile = await getUserProfile(public_address);

    if (hasProfile) window.location = "/user-profile/" + public_address;
    else window.location = "/register-user";
  };

  useEffect(() => {
    checkIfWalletIsConnected();
  }, []);

  return (
    <div className="flex flex-col items-center gap-8 pt-56">
      <div className="form-logo">
        <Image
          src="/logo-vertical.png"
          alt="Crypto Pets"
          width="100%"
          height="100%"
          layout="responsive"
        />
      </div>
      <UiButton
        label="Connect Wallet"
        onClick={() => {
          connectWallet();
        }}
      />
    </div>
  );
};

Auth.layout = "withoutFrame";

export default Auth;
