import React from "react";

const CardSkeleton = () => {
  return (
    <div className="card flex-1 shadow-md m-2 rounded-xl hover:scale-[1.03] hover:shadow-xl transition-all duration-200">
      {/* Image container with aspect-video ratio */}
      <div className="image-container relative w-full aspect-video">
        <div className="w-full h-full bg-gray-200 rounded-tr-[10px] rounded-tl-[10px] animate-pulse"></div>
        {/* Overlay badge skeleton */}
        <div className="absolute top-0 left-0 flex items-center rounded-br-[74px] bg-gray-300 pl-4 pr-6 py-1 rounded-tl-[10px] animate-pulse">
          <div className="w-24 h-6 bg-gray-300 rounded"></div>
        </div>
      </div>

      {/* Details section */}
      <div className="details mt-[16px] p-4">
        {/* Property title skeleton */}
        <div className="mb-[10px] animate-pulse">
          <div className="w-3/4 h-6 bg-gray-200 rounded"></div>
        </div>

        {/* Location with icon skeleton */}
        <div className="flex items-center gap-[5px] mb-4 animate-pulse">
          <div className="w-[22px] h-[22px] bg-gray-200 rounded"></div>
          <div className="w-24 h-5 bg-gray-200 rounded"></div>
        </div>

        {/* Features section skeleton */}
        <div className="features mt-[16px] flex gap-[30px]">
          <div className="flex items-center gap-[5px] animate-pulse">
            <div className="w-[22px] h-[22px] bg-gray-200 rounded"></div>
            <div className="w-16 h-5 bg-gray-200 rounded"></div>
          </div>
          <div className="flex items-center gap-[5px] animate-pulse">
            <div className="w-[22px] h-[22px] bg-gray-200 rounded"></div>
            <div className="w-8 h-5 bg-gray-200 rounded"></div>
          </div>
          <div className="flex items-center gap-[5px] animate-pulse">
            <div className="w-[22px] h-[22px] bg-gray-200 rounded"></div>
            <div className="w-8 h-5 bg-gray-200 rounded"></div>
          </div>
        </div>

        {/* Price section skeleton */}
        <div className="mt-[16px] animate-pulse">
          <div className="w-32 h-6 bg-gray-200 rounded"></div>
        </div>
      </div>
    </div>
  );
};

export default CardSkeleton;
