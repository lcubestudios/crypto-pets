import axios from "axios";

export function calcTimeDiff(date1, date2) {
  const diff = Math.floor(date1.getTime() - date2.getTime());
  const day = 1000 * 60 * 60 * 24;

  const days = Math.floor(diff / day);
  const weeks = Math.floor(diff / day) / 7;
  const months = Math.floor(days / 31);
  const years = Math.floor(months / 12);

  return days < 7
    ? days + " d"
    : weeks < 4
    ? weeks + " w"
    : months < 12
    ? months + " m"
    : months - years * 12 > 0
    ? years + " y " + (months - years * 12) + " m"
    : years + " y";
}

export async function getUserProfile(public_address) {
  return await axios
    .get(
      `https://api.lcubestudios.io/dev/crypto-pets-api/user_profile.php?public_address=${public_address}`
    )
    .then(({ data }) => {
      return data;
    });
}

export async function checkUser(public_address) {
  const hasProfile = await getUserProfile(public_address);

  if (hasProfile) window.location = "/user-profile/" + public_address;
  else window.location = "/register-user";
}

export async function checkIfWalletIsConnected(router) {
  try {
    const { ethereum } = window;
    if (!ethereum) {
      console.log("Please install MetaMask! 🦊");
      return;
    } else {
      console.log("Got the Ethereum object", ethereum);
    }

    const accounts = await ethereum.request({ method: "eth_accounts" });

    if (router.pathname === "/auth") {
      if (accounts.length !== 0) {
        const account = accounts[0];
        console.log("Found an authorized account:", account);
        checkUser(account);
      } else {
        console.log("No authorized account found...");
      }
    } else {
      if (accounts.length === 0) {
        window.location = "/auth";
        console.log("No authorized account found...");
      }
    }
  } catch (error) {
    console.log(error);
  }
}
