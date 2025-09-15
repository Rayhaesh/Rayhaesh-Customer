import React from "react";
import { Carousel } from "@mantine/carousel";
import { IconArrowLeft, IconArrowRight } from "@tabler/icons";
import zameenImage from "../../assets/images/zameen.com-logo.png";
import graanaImage from "../../assets/images/graana-logo.png";
import agency21Image from "../../assets/images/agency-21-logo.png";
import shahbazImage from "../../assets/images/shahbaz-logo.png";
import bahriaTownImage from "../../assets/images/bahria-town-logo.png";
import { useMediaQuery } from "@mantine/hooks";

const AgenciesCarousel = () => {
  const match768 = useMediaQuery("(max-width: 768px)");

  const images = [
    {
      id: 1,
      uri: zameenImage,
    },
    {
      id: 2,
      uri: graanaImage,
    },
    {
      id: 3,
      uri: agency21Image,
    },
    {
      id: 4,
      uri: shahbazImage,
    },
    {
      id: 5,
      uri: bahriaTownImage,
    },
    // Duplicate images for better carousel effect
    {
      id: 6,
      uri: zameenImage,
    },
    {
      id: 7,
      uri: graanaImage,
    },
    {
      id: 8,
      uri: agency21Image,
    },
    {
      id: 9,
      uri: shahbazImage,
    },
    {
      id: 10,
      uri: bahriaTownImage,
    },
  ];

  return (
    <div className="mb-8">
      <Carousel
        slideSize="16%"
        slideGap="lg"
        breakpoints={[
          { maxWidth: "xl", slideSize: "20%" },
          { maxWidth: "lg", slideSize: "25%" },
          { maxWidth: "md", slideSize: "33%" },
          { maxWidth: "sm", slideSize: "50%", slideGap: "md" },
          { maxWidth: "xs", slideSize: "100%", slideGap: "sm" },
        ]}
        loop
        align="center"
        controlsOffset={0}
        slidesToScroll={match768 ? 1 : 3}
        withIndicators={false}
        nextControlIcon={<IconArrowRight size={18} style={{ color: "#fff" }} />}
        previousControlIcon={<IconArrowLeft size={18} style={{ color: "#fff" }} />}
        styles={{
          control: {
            border: "1px solid red",
            width: "40px",
            height: "40px",
            backgroundColor: "#D92228",
            opacity: 100,

            "&:first-of-type": {
              marginLeft: -50,

              "@media (max-width: 768px)": {
                marginLeft: 0,
              },
            },

            "&:last-of-type": {
              marginRight: -50,

              "@media (max-width: 768px)": {
                marginRight: 0,
              },
            },
          },
        }}
      >
        {images.map((image, id) => (
          <Carousel.Slide key={image.id}>
            <div className="flex items-center justify-center h-32 bg-white rounded-xl shadow-md border border-gray-200 hover:shadow-lg hover:scale-105 transition-all duration-300 p-6">
              <img
                src={image.uri}
                className="max-h-20 w-auto object-contain filter grayscale hover:grayscale-0 transition-all duration-300"
                alt={`Agency ${image.id}`}
              />
            </div>
          </Carousel.Slide>
        ))}
      </Carousel>
    </div>
  );
};

export default AgenciesCarousel;
