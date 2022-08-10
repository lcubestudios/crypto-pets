import { useState, useEffect } from "react";
import axios from "axios";

import Link from "next/link";
import Image from "next/image";

import PetCard from "../components/petCard";
import UiButton from "../components/ui/button";

const moralisapi = "https://deep-index.moralis.io/api/v2/";
const moralisapikey =
  "TxztwObdgsXQueV2GFtawRatLvDKSqbcxRT0N7baKBGTQnecHW3VsNUCNCC8gqqH";
const nftContract = "0xA25e072299C2fd31D136bE0F3E1Fd6F36Fc3B490";

const Explore = () => {
  const [typeFilter, setTypeFilter] = useState(null);
  const [breedFilter, setBreedFilter] = useState(null);
  const [ageFilter, setAgeFilter] = useState(null);
  const [statusFilter, setStatusFilter] = useState(null);
  const [petList, setPetList] = useState([]);
  const getPetList = async () => {
    const config = { "X-API-Key": moralisapikey, accept: "application/json" };
    const nfts = await axios
      .get(moralisapi + `/nft/${nftContract}?chain=rinkeby&format=decimal`, {
        headers: config,
      })
      .then(({ data }) => {
        const { result } = data;

        return result;
      });

    const filterData = await Promise.all(
      nfts.map(async (i) => {
        // API call to contract
        // - pass token id in url
        return {
          tokenId: i.token_id,
          tokenURI: i.token_uri,
          owner: i.owner_of,
          metadata: JSON.parse(i.metadata),
        };
      })
    );

    console.log(filterData);

    setPetList(filterData);
  };

  useEffect(() => {
    return () => {
      getPetList();
    };
  }, []);

  return (
    <div className="flex flex-col gap-8">
      <section className="flex flex-row justify-center items-center h-48">
        <h1>Explore</h1>
      </section>
      <header className="flex flex-col gap-4">
        <h4>Filter</h4>
        <div className="grid grid-cols-12 gap-4">
          <div className="col-span-4">
            <select name="filter_type">
              <option selected disabled>
                Type
              </option>
              <option value="all">ALL</option>
            </select>
          </div>
          <div className="col-span-4">
            <select name="filter_breed">
              <option selected disabled>
                Breed
              </option>
              <option value="all">ALL</option>
            </select>
          </div>
          <div className="col-span-4">
            <select name="filter_age">
              <option selected disabled>
                Age
              </option>
              <option value="all">ALL</option>
            </select>
          </div>
          <div className="col-span-4">
            <select name="filter_status">
              <option selected disabled>
                Status
              </option>
              <option value="all">ALL</option>
            </select>
          </div>
        </div>
      </header>
      <section>
        <div className="grid grid-cols-12 gap-x-4 lg:gap-x-8 gap-y-8">
          {petList.map((item, index) => {
            const { metadata } = item;
            const { name, dob, breed, image } = metadata;
            return (
              // eslint-disable-next-line react/jsx-key
              <div key={index} className="col-span-4">
                <PetCard
                  name={name}
                  dob={dob || 1249088895000}
                  breed={breed}
                  imgSrc={image}
                />
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
};

export default Explore;
