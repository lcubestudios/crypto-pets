import React, { useState, useEffect } from "react";
import UiButton from "../components/ui/button";
import { useRouter } from "next/router";
import Image from "next/image";
import axios from "axios";
import { checkIfWalletIsConnected } from "../utils/Helpers";

const RegisterUser = () => {
  const router = useRouter();
  const [currentAccount, setCurrentAccount] = useState();

  const serializeForm = (form) => {
    const obj = {};
    const elements = form.querySelectorAll("input, select, textarea");

    for (let i = 0; i < elements.length; i++) {
      const element = elements[i];
      const name = element.name;
      const id = element.id;
      const value = element.value;

      if (name) {
        obj[name] = value;
      } else {
        obj[id] = value;
      }
    }

    return obj;
  };

  const submitForm = async (e) => {
    e.preventDefault();

    const payload = serializeForm(e.target);

    await axios
      .post(
        `https://api.lcubestudios.io/dev/crypto-pets-api/user_profile.php?public_address=${currentAccount}`,
        {
          ...payload,
          privacy_mode: "TRUE",
        }
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
        <form className="flex flex-col" onSubmit={submitForm}>
          <label htmlFor="fullName" className="text-[14px]">
            Full Name
          </label>
          <input type="text" name="full_name" className="py-4" />
          <label htmlFor="full_name" className="text-[14px]">
            Email
          </label>
          <input type="email" name="email" />
          <label htmlFor="phone_number" className="text-[14px]">
            Phone Number
          </label>
          <input
            type="tel"
            name="phone_number"
            pattern="[0-9]{3}[0-9]{3}[0-9]{4}"
          />
          <label htmlFor="crypto_dns" className="text-[14px]">
            ENS {"(Optional)"}
          </label>
          <input type="text" name="crypto_dns" />
          <label htmlFor="country_of_residence" className="text-[14px]">
            Country of Residence
          </label>
          <input type="text" name="country_of_residence" />
          <UiButton label="Register"></UiButton>
        </form>
      </div>
    </div>
  );
};

RegisterUser.layout = "withoutFrame";

export default RegisterUser;
