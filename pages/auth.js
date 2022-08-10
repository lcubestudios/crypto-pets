import React, { useState, useEffect } from "react";
import axios from "axios";

import Image from "next/image";

import UiButton from "../components/ui/button";
import {
  getUserProfile,
  checkIfWalletIsConnected,
  checkUser,
} from "../utils/Helpers";
import { useRouter } from "next/router";

const Auth = () => {
  const router = useRouter();
  const [currentAccount, setCurrentAccount] = useState();

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

  useEffect(() => {
    if (!router.isReady) return;
    checkIfWalletIsConnected(router);
  }, [router.isReady]);

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
