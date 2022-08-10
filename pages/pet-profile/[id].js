import React, { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import Image from "next/image";
import Link from "next/link";
import Jazzicon, { jsNumberForAddress } from "react-jazzicon";

const PetProfile = () => {
  const router = useRouter();
  const [petProfile, setPetProfile] = useState({});
  const { id } = router.query;

  useEffect(() => {
    if (!router.isReady) return;
    getPetProfile(router.query?.id);
  }, [router.isReady]);

  const moralisapi = "https://deep-index.moralis.io/api/v2/";
  const moralisapikey =
    "TxztwObdgsXQueV2GFtawRatLvDKSqbcxRT0N7baKBGTQnecHW3VsNUCNCC8gqqH";
  const nftContract = "0xf839db645e008816b141e9c9649b939ed8c5fb48";
  const getPetProfile = async (id) => {
    const config = { "X-API-Key": moralisapikey, accept: "application/json" };
    const nft = await axios
      .get(
        moralisapi + `/nft/${nftContract}/${id}?chain=rinkeby&format=decimal`,
        { headers: config }
      )
      .then(({ data }) => {
        return data;
      });

    const filteredProfile = (apiData) => {
      const metadata = JSON.parse(apiData.metadata);
      let item = {
        imgSrc: metadata?.image,
        name: metadata?.name,
        age: metadata?.age,
        breed: metadata?.breed,
        description: metadata?.description,
        owner_id: apiData.owner_of,
      };
      return item;
    };

    console.log(filteredProfile(nft));

    setPetProfile(filteredProfile(nft));
  };

  return (
    <div className="grid grid-cols-12">
      <div className="col-span-12 md:col-start-3 md:col-end-10 lg:col-start-4 lg:col-end-11 flex flex-col gap-8">
        <div className="square-tile rounded-lg">
          <div
            className="cover-image w-full h-full"
            style={{
              backgroundImage: `url('${petProfile.imgSrc}')`,
            }}
          />
        </div>
        <div className="col-span-12 flex flex-col gap-2">
          <div className="flex flex-row justify-between items-center">
            <h1 className="text-base md:text-h6">{petProfile.name}</h1>
          </div>
          {petProfile?.age ? (
            <p className="text-sm md:text-base">{petProfile.age} yo</p>
          ) : (
            ""
          )}
          {petProfile?.breed ? (
            <p className="text-sm md:text-base">{petProfile.breed}</p>
          ) : (
            ""
          )}
        </div>
        <Link href={`/user-profile/${petProfile.owner_id}`}>
          <div className="col-span-12 flex flex-col gap-4">
            <h2 className="text-base md:text-h6">Owner</h2>
            <div>
              <Jazzicon diameter={60} seed={jsNumberForAddress("")} />
            </div>
          </div>
        </Link>
        <div className="col-span-12 flex flex-col gap-4">
          <h2 className="text-base md:text-h6">Description</h2>
          <p>{petProfile.description}</p>
        </div>
      </div>
    </div>
  );
};

export default PetProfile;
