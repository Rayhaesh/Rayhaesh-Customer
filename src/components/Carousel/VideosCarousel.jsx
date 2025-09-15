import { Carousel } from "@mantine/carousel";
import { Skeleton, Text, Box, Group, Loader, Center } from "@mantine/core";
import { IconVideo, IconPlayerPlay } from "@tabler/icons";
import { createStyles } from "@mantine/core";
import { useState } from "react";

const useStyles = createStyles((theme) => ({
  carouselContainer: {
    position: "relative",
  },
  videoContainer: {
    position: "relative",
    borderRadius: "12px",
    overflow: "hidden",
    boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
    width: "100%",
    height: "500px",
    flexShrink: 0,
  },
  videoCounter: {
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
  playHint: {
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
  noVideosContainer: {
    height: "500px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    background: "linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)",
    borderRadius: "12px",
    border: "2px dashed #dee2e6",
  },
  video: {
    borderRadius: "12px",
    objectFit: "cover",
    width: "100%",
    height: "500px",
    minHeight: "500px",
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
  videoWrapper: {
    position: "relative",
    width: "100%",
    height: "500px",
    minHeight: "500px",
    flexShrink: 0,
  },
  videoPlaceholder: {
    width: "100%",
    height: "500px",
    minHeight: "500px",
    background: "linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "12px",
  },
}));

const VideosCarousel = ({ property }) => {
  const { classes } = useStyles();
  const propertyVideos = property?.videos || [];
  const [loadingVideos, setLoadingVideos] = useState(new Set());
  const [loadedVideos, setLoadedVideos] = useState(new Set());

  const handleVideoLoad = (index) => {
    setLoadedVideos((prev) => new Set([...prev, index]));
    setLoadingVideos((prev) => {
      const newSet = new Set(prev);
      newSet.delete(index);
      return newSet;
    });
  };

  const handleVideoStartLoad = (index) => {
    setLoadingVideos((prev) => new Set([...prev, index]));
  };

  if (!propertyVideos || propertyVideos.length === 0) {
    return (
      <Box className={classes.noVideosContainer}>
        <IconVideo size={64} color="#6c757d" />
        <Text size="xl" weight={600} color="dimmed" mt="md">
          No Videos Available
        </Text>
        <Text color="dimmed" mt="xs">
          Videos will be displayed here once uploaded
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
        {propertyVideos.map((video, index) => (
          <Carousel.Slide key={index}>
            <Box className={classes.videoContainer}>
              <Box className={classes.videoWrapper}>
                {/* Loading Indicator */}
                {loadingVideos.has(index) && (
                  <Box className={classes.loadingContainer}>
                    <Center>
                      <Group spacing="md">
                        <Loader size="md" color="#D92228" />
                        <Text size="sm" color="dimmed">
                          Loading video...
                        </Text>
                      </Group>
                    </Center>
                  </Box>
                )}

                {/* Video Placeholder when not loaded */}
                {!loadedVideos.has(index) && !loadingVideos.has(index) && (
                  <Box className={classes.videoPlaceholder}>
                    <Group spacing="md">
                      <IconVideo size={48} color="#6c757d" />
                      <Text size="lg" color="dimmed" weight={500}>
                        Video {index + 1}
                      </Text>
                    </Group>
                  </Box>
                )}

                {/* Video */}
                <video
                  className={classes.video}
                  src={video}
                  controls
                  preload="metadata"
                  poster=""
                  onLoadedData={() => handleVideoLoad(index)}
                  onLoadStart={() => handleVideoStartLoad(index)}
                  style={{
                    opacity: loadedVideos.has(index) ? 1 : 0,
                    transition: "opacity 0.3s ease-in-out",
                    position: loadedVideos.has(index) ? "relative" : "absolute",
                    top: loadedVideos.has(index) ? "auto" : 0,
                    left: loadedVideos.has(index) ? "auto" : 0,
                  }}
                />

                {/* Video Counter */}
                <Box className={classes.videoCounter}>
                  <Group spacing="xs">
                    <IconVideo size={16} />
                    <Text size="sm" weight={600}>
                      {index + 1} / {propertyVideos.length}
                    </Text>
                  </Group>
                </Box>

                {/* Play Hint */}
                <Box className={classes.playHint}>
                  <Group spacing="xs">
                    <IconPlayerPlay size={16} />
                    <Text size="sm" weight={500}>
                      Click to play
                    </Text>
                  </Group>
                </Box>
              </Box>
            </Box>
          </Carousel.Slide>
        ))}
      </Carousel>
    </Box>
  );
};

export default VideosCarousel;
