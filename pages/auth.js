import React, {useState, useEffect} from "react";
import axios from "axios";

import Image from "next/image";

import UiButton from "../components/ui/button";

const Auth = () => {

  const [currentAcount, setCurrentAccount] = useState();
  
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
      console.log("Connected", accounts[0]);
      setCurrentAccount(accounts[0]);
	  checkUser();
    } catch (error) {
      console.log(error);
    }
  };


  const checkUser = async () => {

    await axios
      .get(
        `https://api.lcubestudios.io/dev/crypto-pets-api/user_profile.php?public_address=${currentAcount}`
      )
      .then(({ data }) => {
        // Check if user exists
        if (data) {
          window.location = "/dashboard";
        } else {
          window.location = "/register-user";
        }
      });
  };
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
      <UiButton label="Connect Wallet" onClick={() => {
		connectWallet();
	  }} />
    </div>
  );
};

Auth.layout = "withoutFrame";

export default Auth;
