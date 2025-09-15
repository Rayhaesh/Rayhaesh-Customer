import React, { useState } from "react";
import LocationFilledIcon from "../../assets/icons/location-filled.png";
import BlueprintIcon from "../../assets/icons/blueprint.png";
import BedroomDarkIcon from "../../assets/icons/bedroom-dark-icon.png";
import BathWithPersonIcon from "../../assets/icons/bath-with-person-icon.png";

export default function BuyCards({ property }) {
  const [imageLoading, setImageLoading] = useState(true);
  const [imageError, setImageError] = useState(false);

  const handleImageLoad = () => {
    setImageLoading(false);
  };

  const handleImageError = () => {
    setImageLoading(false);
    setImageError(true);
  };

  return (
    <div className="card w-full max-w-sm shadow-lg m-1 rounded-xl hover:scale-[1.02] hover:shadow-2xl transition-all duration-300 bg-white border border-gray-100 overflow-hidden">
      <div className="image-container relative w-full aspect-video overflow-hidden">
        {/* Loading skeleton */}
        {imageLoading && (
          <div className="absolute inset-0 bg-gray-200 rounded-tr-[10px] rounded-tl-[10px] animate-pulse flex items-center justify-center">
            <div className="w-8 h-8 border-2 border-gray-400 border-t-transparent rounded-full animate-spin"></div>
          </div>
        )}

        {/* Error fallback */}
        {imageError && (
          <div className="absolute inset-0 bg-gray-200 rounded-tr-[10px] rounded-tl-[10px] flex items-center justify-center">
            <div className="text-gray-500 text-center">
              <div className="w-12 h-12 mx-auto mb-2 bg-gray-300 rounded flex items-center justify-center">
                <svg className="w-6 h-6 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                  ></path>
                </svg>
              </div>
              <p className="text-sm">Image unavailable</p>
            </div>
          </div>
        )}

        {/* Actual image */}
        <img
          src={property?.images[0]}
          alt=""
          className={`object-cover w-full h-full rounded-tr-[10px] rounded-tl-[10px] transition-opacity duration-300 ${
            imageLoading ? "opacity-0" : "opacity-100"
          }`}
          onLoad={handleImageLoad}
          onError={handleImageError}
        />

        <p className="overlay absolute top-0 left-0 flex items-center rounded-br-[50px] bg-accentRed pl-3 pr-4 py-1 text-[12px] font-semibold text-white rounded-tl-[10px] shadow-lg">
          {property.propertyIs}
        </p>
      </div>
      <div className="details mt-[12px] p-4">
        <h2 className="mb-[8px] text-[16px] font-semibold text-dividerBlack line-clamp-1 leading-tight">
          {property?.propertyTitle}
        </h2>
        <h3 className="flex items-center gap-[4px] text-[14px] text-gray-600 font-medium mb-2">
          <img className="inline-block w-[16px] opacity-80" src={LocationFilledIcon} alt="" />
          {property?.propertyCity}
        </h3>
        <div className="features mt-[12px] flex gap-[16px]">
          <p className="flex items-center gap-[4px] text-[14px] text-gray-700 font-medium">
            <img className="inline-block w-[16px] opacity-75" src={BlueprintIcon} alt="" />
            {property?.areaSize} {property?.areaSizeUnit}
          </p>
          <p className="flex items-center gap-[4px] text-[14px] text-gray-700 font-medium">
            <img className="inline-block w-[16px] opacity-75" src={BedroomDarkIcon} alt="" />
            {property?.noOfBedRooms}
          </p>
          <p className="flex items-center gap-[4px] text-[14px] text-gray-700 font-medium">
            <img className="inline-block w-[16px] opacity-75" src={BathWithPersonIcon} alt="" />
            {property?.noOfBathrooms}
          </p>
        </div>
        <p className="mt-[12px] text-[16px] font-bold text-accentRed tracking-wide">
          {property?.propertyIs === "For Rent"
            ? property?.monthlyRent.toLocaleString("en-PK", {
                style: "currency",
                currency: "PKR",
              }) + "/month"
            : property?.totalPrice.toLocaleString("en-PK", {
                style: "currency",
                currency: "PKR",
              })}
        </p>
      </div>
    </div>
  );
}
