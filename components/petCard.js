import React from "react";

import Link from "next/link";
import Image from "next/image";

import { calcTimeDiff } from "../utils/Helpers";

const PetCard = ({ href, imgSrc, name, dob, breed, age }) => {
  const dob_date = new Date(dob);

  //   const age = calcTimeDiff(new Date(), new Date(dob));

  return (
    <Link href={href}>
      <div className="flex flex-col gap-2 md:gap-4 clip-text">
        <div className="square-tile rounded-lg">
          <div
            className="cover-image w-full h-full"
            style={{
              backgroundImage: `url('${imgSrc}')`,
            }}
          />
        </div>
        <div className="flex flex-col gap-0 md:gap-2">
          <p className="text-base md:text-h6">
            {name}
            {age ? ` | ${age} yrs` : ""}
          </p>
          {breed ? <p className="text-sm md:text-base">{breed}</p> : ""}
        </div>
      </div>
    </Link>
  );
};

export default PetCard;
