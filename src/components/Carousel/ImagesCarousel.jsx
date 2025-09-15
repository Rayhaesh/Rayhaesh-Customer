import { Carousel } from "@mantine/carousel";
import { Image, Skeleton, Text, Box, Badge, Group, Loader, Center, Modal } from "@mantine/core";
import { IconPhoto, IconZoomIn } from "@tabler/icons";
import { createStyles } from "@mantine/core";
import { useState } from "react";

const useStyles = createStyles((theme) => ({
  carouselContainer: {
    position: "relative",
  },
  imageContainer: {
    position: "relative",
    borderRadius: "12px",
    overflow: "hidden",
    boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
    width: "100%",
    height: "500px",
    flexShrink: 0,
  },
  imageCounter: {
    position: "absolute",
    top: "16px",
    right: "16px",
    zIndex: 10,
    background: "rgba(0, 0, 0, 0.7)",
    color: "white",
    padding: "8px 12px",
    borderRadius: "20px",
    backdropFilter: "blur(10px)",
  },
  zoomHint: {
    position: "absolute",
    bottom: "16px",
    left: "16px",
    zIndex: 10,
    background: "rgba(0, 0, 0, 0.7)",
    color: "white",
    padding: "6px 10px",
    borderRadius: "16px",
    backdropFilter: "blur(10px)",
  },
  noImagesContainer: {
    height: "500px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    background: "linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)",
    borderRadius: "12px",
    border: "2px dashed #dee2e6",
  },
  loadingContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "rgba(255, 255, 255, 0.9)",
    zIndex: 5,
    borderRadius: "12px",
  },
  imageWrapper: {
    position: "relative",
    width: "100%",
    height: "500px",
    flexShrink: 0,
  },
}));

const ImagesCarousel = ({ property }) => {
  const { classes } = useStyles();
  const propertyImages = property?.images;
  const [loadingImages, setLoadingImages] = useState(new Set());
  const [loadedImages, setLoadedImages] = useState(new Set());
  const [modalImage, setModalImage] = useState(null);

  const handleImageLoad = (index) => {
    setLoadedImages((prev) => new Set([...prev, index]));
    setLoadingImages((prev) => {
      const newSet = new Set(prev);
      newSet.delete(index);
      return newSet;
    });
  };

  const handleImageStartLoad = (index) => {
    setLoadingImages((prev) => new Set([...prev, index]));
  };

  const handleImageClick = (image, index) => {
    setModalImage({ src: image, index, total: propertyImages.length });
  };

  if (!propertyImages || propertyImages.length === 0) {
    return (
      <Box className={classes.noImagesContainer}>
        <IconPhoto size={64} color="#6c757d" />
        <Text size="xl" weight={600} color="dimmed" mt="md">
          No Images Available
        </Text>
        <Text color="dimmed" mt="xs">
          Images will be displayed here once uploaded
        </Text>
      </Box>
    );
  }

  return (
    <Box className={classes.carouselContainer}>
      <Carousel
        styles={{
          viewport: {
            borderRadius: "12px",
            overflow: "hidden",
          },
          slide: {
            width: "100%",
            flexShrink: 0,
          },
          control: {
            backgroundColor: "rgba(255, 255, 255, 0.9)",
            border: "1px solid #e9ecef",
            color: "#D92228",
            "&[data-inactive]": {
              opacity: 0,
              cursor: "default",
            },
            "&:hover": {
              backgroundColor: "#D92228",
              color: "white",
            },
          },
          indicator: {
            backgroundColor: "rgba(255, 255, 255, 0.5)",
            "&[data-active]": {
              backgroundColor: "#D92228",
            },
          },
        }}
        withIndicators
        height="500px"
        slideSize="100%"
        slideGap={0}
        align="start"
        withControls
        loop
      >
        {propertyImages.map((image, index) => (
          <Carousel.Slide key={index}>
            <Box className={classes.imageContainer}>
              <Box className={classes.imageWrapper}>
                {/* Loading Indicator */}
                {loadingImages.has(index) && (
                  <Box className={classes.loadingContainer}>
                    <Center>
                      <Group spacing="md">
                        <Loader size="md" color="#D92228" />
                        <Text size="sm" color="dimmed">
                          Loading image...
                        </Text>
                      </Group>
                    </Center>
                  </Box>
                )}

                {/* Image */}
                <Image
                  height="500px"
                  width="100%"
                  src={image}
                  alt={`Property image ${index + 1}`}
                  fit="cover"
                  onLoad={() => handleImageLoad(index)}
                  onLoadStart={() => handleImageStartLoad(index)}
                  onClick={() => handleImageClick(image, index)}
                  style={{
                    opacity: loadedImages.has(index) ? 1 : 0,
                    transition: "opacity 0.3s ease-in-out",
                    display: "block",
                    width: "100%",
                    height: "500px",
                    objectFit: "cover",
                    cursor: "pointer",
                  }}
                />

                {/* Image Counter */}
                <Box className={classes.imageCounter}>
                  <Group spacing="xs">
                    <IconPhoto size={16} />
                    <Text size="sm" weight={600}>
                      {index + 1} / {propertyImages.length}
                    </Text>
                  </Group>
                </Box>

                {/* Zoom Hint */}
                <Box className={classes.zoomHint}>
                  <Group spacing="xs">
                    <IconZoomIn size={16} />
                    <Text size="sm" weight={500}>
                      Click to enlarge
                    </Text>
                  </Group>
                </Box>
              </Box>
            </Box>
          </Carousel.Slide>
        ))}
      </Carousel>

      {/* Image Modal */}
      <Modal
        opened={!!modalImage}
        onClose={() => setModalImage(null)}
        size="90%"
        centered
        padding={0}
        withCloseButton={false}
        styles={{
          modal: {
            backgroundColor: "rgba(0, 0, 0, 0.95)",
            border: "none",
          },
          body: {
            padding: 0,
          },
        }}
      >
        {modalImage && (
          <Box style={{ position: "relative", height: "80vh" }}>
            <Image
              src={modalImage.src}
              alt={`Property image ${modalImage.index + 1}`}
              fit="contain"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "contain",
              }}
            />

            {/* Close button */}
            <Box
              style={{
                position: "absolute",
                top: "20px",
                right: "20px",
                backgroundColor: "rgba(0, 0, 0, 0.7)",
                color: "white",
                padding: "8px 12px",
                borderRadius: "20px",
                cursor: "pointer",
                backdropFilter: "blur(10px)",
                zIndex: 10,
              }}
              onClick={() => setModalImage(null)}
            >
              <Group spacing="xs">
                <Text size="sm" weight={600}>
                  {modalImage.index + 1} / {modalImage.total}
                </Text>
                <Text size="sm">×</Text>
              </Group>
            </Box>
          </Box>
        )}
      </Modal>
    </Box>
  );
};

export default ImagesCarousel;
