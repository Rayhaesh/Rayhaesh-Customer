import React, { useState } from "react";
import LocationFilledIcon from "../../assets/icons/location-filled.png";
import BlueprintIcon from "../../assets/icons/blueprint.png";
import BedroomDarkIcon from "../../assets/icons/bedroom-dark-icon.png";
import BathWithPersonIcon from "../../assets/icons/bath-with-person-icon.png";

const ListingCardAccordingToOriginalDesign = ({ property }) => {
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
    <div class="card flex-1  shadow-md m-2 rounded-xl hover:scale-[1.03] hover:shadow-xl transition-all duration-200">
      <div class="image-container relative w-full aspect-video">
        {/* Loading skeleton */}
        {imageLoading && (
          <div class="absolute inset-0 bg-gray-200 rounded-tr-[10px] rounded-tl-[10px] animate-pulse flex items-center justify-center">
            <div class="w-8 h-8 border-2 border-gray-400 border-t-transparent rounded-full animate-spin"></div>
          </div>
        )}

        {/* Error fallback */}
        {imageError && (
          <div class="absolute inset-0 bg-gray-200 rounded-tr-[10px] rounded-tl-[10px] flex items-center justify-center">
            <div class="text-gray-500 text-center">
              <div class="w-12 h-12 mx-auto mb-2 bg-gray-300 rounded flex items-center justify-center">
                <svg class="w-6 h-6 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                  ></path>
                </svg>
              </div>
              <p class="text-sm">Image unavailable</p>
            </div>
          </div>
        )}

        {/* Actual image */}
        <img
          src={property?.images[0]}
          alt=""
          class={`object-cover w-full h-full rounded-tr-[10px] rounded-tl-[10px] transition-opacity duration-300 ${
            imageLoading ? "opacity-0" : "opacity-100"
          }`}
          onLoad={handleImageLoad}
          onError={handleImageError}
        />

        <p class="overlay absolute top-0 left-0 flex items-center rounded-br-[74px] bg-accentRed  pl-4 pr-6 py-1 text-[16px] font-medium text-white md:text-[16px] lg:text-[20px] xl:text-[24px]  rounded-tl-[10px]">
          {property.propertyIs}
        </p>
      </div>
      <div class="details mt-[16px] p-4">
        <h2 class="mb-[10px] text-[22px] font-medium text-dividerBlack sm:mb-[14px] sm:text-[27px] md:mb-[10px] md:text-[18px] lg:mb-[14px] xl:mb-[10px] xl:text-[22px] 2xl:mb-[14px] line-clamp-1">
          {property?.propertyTitle}
        </h2>
        <h3 class="flex items-center gap-[5px] text-[18px] text-dividerBlack sm:gap-[10px] sm:text-[24px] md:gap-[5px] md:text-[18px] lg:gap-[10px] lg:text-[24px] xl:gap-[5px] xl:text-[18px] 2xl:gap-[10px] 2xl:text-[24px]">
          <img class="inline-block w-[22px] sm:w-[28px]" src={LocationFilledIcon} alt="" />
          {property?.propertyCity}
        </h3>
        <div class="features mt-[16px] flex gap-[30px]">
          <p class="flex items-center gap-[5px] text-[18px] text-dividerBlack sm:gap-[10px] sm:text-[24px] md:gap-[5px] md:text-[18px] lg:gap-[10px] lg:text-[24px] xl:gap-[5px] xl:text-[18px] 2xl:gap-[10px] 2xl:text-[24px]">
            <img
              class="inline-block w-[22px] sm:w-[28px] md:w-[22px] lg:w-[28px] xl:w-[22px] 2xl:w-[28px]"
              src={BlueprintIcon}
              alt=""
            />
            {property?.areaSize} {property?.areaSizeUnit}
          </p>
          <p class="flex items-center gap-[5px] text-[18px] text-dividerBlack sm:gap-[10px] sm:text-[24px] md:gap-[5px] md:text-[18px] lg:gap-[10px] lg:text-[24px] xl:gap-[5px] xl:text-[18px] 2xl:gap-[10px] 2xl:text-[24px]">
            <img
              class="inline-block w-[22px] sm:w-[28px] md:w-[22px] lg:w-[28px] xl:w-[22px] 2xl:w-[28px]"
              src={BedroomDarkIcon}
              alt=""
            />
            {property?.noOfBedRooms}
          </p>
          <p class="flex items-center gap-[5px] text-[18px] text-dividerBlack  md:gap-[8px] md:text-[22px]  2xl:gap-[10px] 2xl:text-[24px]">
            <img
              class="inline-block w-[22px] sm:w-[28px] md:w-[22px] lg:w-[28px] xl:w-[22px] 2xl:w-[28px]"
              src={BathWithPersonIcon}
              alt=""
            />
            {property?.noOfBathrooms}
          </p>
        </div>
        <p class="mt-[16px] text-[20px] font-bold text-accentRed lg:text-[24px]">
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
};

export default ListingCardAccordingToOriginalDesign;
