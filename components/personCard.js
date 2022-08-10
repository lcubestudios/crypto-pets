import React, { useState, useEffect } from "react";
import Jazzicon, { jsNumberForAddress } from "react-jazzicon";

const PersonCard = ({
  name,
  email,
  phone_number,
  country,
  ens,
  public_address,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="info-card bg-white rounded-lg p-8 md:p-10 lg:p-12 md:pointer-events-none">
      <div
        className={`flex ${
          isExpanded ? "flex-col text-center" : "flex-row text-left"
        } md:flex-row md:text-left items-center gap-8 md:gap-10 lg:gap-12`}
      >
        <div className="rounded-full bg-primary overflow-hidden">
          <Jazzicon diameter={100} seed={jsNumberForAddress("")} />
        </div>
        <div className="flex-1 h-full flex flex-col justify-center">
          <h1 className="text-h6 mb-4">{name}</h1>
          {email ? <p className="mb-2">{email}</p> : ""}
          {phone_number ? <p className="mb-2">{phone_number}</p> : ""}
          {public_address ? <p className="mb-2">{public_address}</p> : ""}
          <div className={`${isExpanded ? "block" : "hidden"} md:block`}>
            {country ? <p className="mb-2">{country}</p> : ""}
            {ens ? <p className="mb-2">{ens}</p> : ""}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PersonCard;
