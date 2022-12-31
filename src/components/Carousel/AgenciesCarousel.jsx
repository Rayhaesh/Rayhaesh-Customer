import React from 'react'
import { Carousel } from '@mantine/carousel'
import { IconArrowLeft, IconArrowRight } from '@tabler/icons'
import zameenImage from '../../assets/images/zameen.com-logo.png'
import graanaImage from '../../assets/images/graana-logo.png'
import agency21Image from '../../assets/images/agency-21-logo.png'
import shahbazImage from '../../assets/images/shahbaz-logo.png'
import bahriaTownImage from '../../assets/images/bahria-town-logo.png'

const AgenciesCarousel = () => {
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
  ]

  return (
    <Carousel
      slideSize="32%"
      slideGap="md"
      breakpoints={[
        { maxWidth: 'md', slideSize: '50%' },
        { maxWidth: 'sm', slideSize: '100%', slideGap: 0 },
      ]}
      loop
      align="center"
      controlsOffset={0}
      slidesToScroll={3}
      nextControlIcon={<IconArrowRight size={18} style={{ color: '#fff' }} />}
      previousControlIcon={
        <IconArrowLeft size={18} style={{ color: '#fff' }} />
      }
      styles={{
        control: {
          border: '1px solid red',
          width: '40px',
          height: '40px',
          backgroundColor: '#D92228',
          opacity: 100,
        },
      }}
    >
      {images.map((image, id) => (
        <Carousel.Slide>
          <img
            src={image.uri}
            key={id}
            class="h-full w-auto object-contain"
            alt=""
          />
        </Carousel.Slide>
      ))}
    </Carousel>
  )
}

export default AgenciesCarousel
