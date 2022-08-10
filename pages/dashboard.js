import { useState, useEffect } from "react";

import Link from "next/link";
import Image from "next/image";
import axios from "axios";
import PersonCard from "../components/personCard";
import PetCard from "../components/petCard";
import UiButton from "../components/ui/button";

const Dashboard = () => {
  const [viewType, setViewType] = useState("grid");
  const [petList, setPetList] = useState([]);

  const moralisapi = "https://deep-index.moralis.io/api/v2/";
  const moralisapikey =
    "TxztwObdgsXQueV2GFtawRatLvDKSqbcxRT0N7baKBGTQnecHW3VsNUCNCC8gqqH";
  const nftContract = "0xf839db645e008816b141e9c9649b939ed8c5fb48";
  const getMyPets = async (account) => {
    const config = { "X-API-Key": moralisapikey, accept: "application/json" };
    const nfts = await axios
      .get(
        moralisapi +
          `${account}/nft/${nftContract}?chain=rinkeby&format=decimal`,
        { headers: config }
      )
      .then((output) => {
        const { result } = output.data;

        return result;
      });
    const petList = await Promise.all(
      nfts.map(async (i) => { console.log(i)
        const itemMetadata = JSON.parse(i.metadata);
        let item = {
          tokenId: i.token_id,
          tokenURI: i.token_uri,
          owner: i.owner_of,
          metadata: itemMetadata,
        };
        console.log(item);
        return item;
      })
    );

    setPetList(petList);
  };


  useEffect(() => {
    getMyPets("0xaba9F36672bd87E8C04068B69BA211bDfc542bB6");
  }, []);

  return (
    <div className="flex flex-col gap-8">
      <section>
        <PersonCard
          name="Person Name"
          email="user@email.com"
          phone_number="000 000 0000"
          country="Country of Residence"
          ens="ens-name.eth"
          public_address="Public Addess"
        />
      </section>
      <header className="flex flex-row justify-between">
        <div className="flex felx-row items-center gap-4">
          <h4>My Pets</h4>
          {viewType === "list" ? (
            <button
              onClick={() => {
                setViewType("grid");
              }}
            >
              <Image
                src="/icon-grid-view.png"
                alt="Grid View"
                width="13"
                height="13"
              />
            </button>
          ) : (
            <button
              onClick={() => {
                setViewType("list");
              }}
            >
              <Image
                src="/icon-list-view.png"
                alt="List View"
                width="13"
                height="13"
              />
            </button>
          )}
        </div>
        <div>
          <Link href="/register-pet">
            <UiButton label="Add a pet">Add a pet</UiButton>
          </Link>
        </div>
      </header>
      <section>
        <div className="grid grid-cols-12 gap-x-4 lg:gap-x-8  gap-y-8">
          {petList.map((item) => {
            return (
              // eslint-disable-next-line react/jsx-key
              <div className={`col-span-${viewType === "list" ? "12" : "4"}`}>
                <PetCard
                  name={item.metadata.name}
                  age={item.metadata.age}
                  breed={item.metadata.breed}
                  imgSrc={item.metadata.image}
                />
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
};

export default Dashboard;