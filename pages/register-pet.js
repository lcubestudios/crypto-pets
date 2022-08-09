import React, { useState } from "react";
import { ethers } from "ethers";
import { useRouter } from "next/router";
import Web3Modal from "web3modal";
import { create } from "ipfs-http-client";

const client = create({ url: "https://ipfs.infura.io:5001/api/v0" });

const registerPet = () => {
  const [fileUrl, setFileUrl] = useState(null);
  const [formInput, setFormInput] = useState({
    name: "",
    age: "",
    type: "",
    breed: "",
    description: "",
    isLost: false,
    isAvailableForAdoption: false,
  });

  const typeOfPet = [
    {
      name: "dog",
      breeds: ["Pug", "Shiba Inu", "St. Bernard", "Lab"],
    },
    {
      name: "cat",
      breeds: ["type1", "type2", "type3"],
    },
    {
      name: "other",
      breeds: [],
    },
  ];

  const router = useRouter();

  const onChange = async (e) => {
    const file = e.target.files[0];
    try {
      const addedFile = await client.add(file, {
        progress: (prog) => console.log(`receiving ... ${prog}`),
      });
      const url = `https://ipfs.infura.io/ipfs/${addedFile.path}`;
      console.log(url);
      setFileUrl(url);
    } catch (error) {
      console.log(error);
    }
  };

  const uploadToIPFS = async () => {
    const { name, age, description, type, breed } = formInput;

    if (!name || !description || !age || !type || !breed || !fileUrl) return;

    // upload metadata to IPFS first
    const data = JSON.stringify({
      name,
      age,
      type,
      breed,
      description,
      image: fileUrl,
    });

    try {
      const addedFile = await client.add(data);
      const url = `https://ipfs.infura.io/ipfs/${addedFile.path}`;
      return url;
    } catch (error) {
      console.log("Error uploading file: ", error);
    }
  };

  const register = async () => {
    const { isLost, isAvailableForAdoption } = formInput;
    const url = await uploadToIPFS();

    const web3modal = new Web3Modal();
    const connection = await web3modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);
    const signer = provider.getSigner();

    let contract = new ethers.Contract(contractAddress, abi, signer);
    let create_tx = contract.createPet(url, isLost, isAvailableForAdoption);
    await create_tx.wait();

    router.push("/");
  };

  return (
    <div className="flex flex-col items-center">
      <div className="w-1/2 flex flex-col pb-12">
        <input
          type="text"
          name="name"
          placeholder="Name"
          className="mt-8 border rounded p-4"
        />
        <input
          type="number"
          name="age"
          placeholder="Age"
          className="mt-8 border rounded p-4"
        />

        {/* Checkbox for Type of pet */}

        <h3 className="text-xl font bold">Type of Pet</h3>

        <input type="checkbox" name="dog" value="Dog" />
        <label for="dog">Dog</label>
        <input type="checkbox" name="cat" value="Cat" />
        <label for="cat">Cat</label>
        <input type="checkbox" name="other" value="Other" />
        <label for="other">Other</label>

        {/* Breed - have 4 options for dog and 3 options for cats and none for other */}

        {/* Image */}
        <input type="file" name="Asset" className="my-4" onChange={onChange} />
        {fileUrl && (
          <img src={fileUrl} width="350px" className="rounded mt-4 mx-auto" />
        )}

        {/* Description  */}
        <textarea
          name="Description"
          placeholder="Description"
          className="mt-8 border rounded p-4"
          onChange={(e) =>
            setFormInput({ ...formInput, description: e.target.value })
          }
        ></textarea>

        {/* Register button */}
        <button className="py-4 my-4 text-white bg-blue-500" onClick={register}>
          Register Pet
        </button>
      </div>
    </div>
  );
};

export default registerPet;
