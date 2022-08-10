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
