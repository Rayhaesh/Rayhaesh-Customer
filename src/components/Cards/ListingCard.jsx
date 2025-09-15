import { Card, Image, Text, Badge, Button, Group, ActionIcon } from "@mantine/core";
import { IconAspectRatio, IconBath, IconBed, IconHeart } from "@tabler/icons";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function ListingCard({ property }) {
  const navigate = useNavigate();
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
    <Card
      shadow="sm"
      p="md"
      radius="md"
      withBorder
      style={{
        borderColor: "#D92228",
      }}
      sx={{
        maxHeight: "400px",
      }}
    >
      <Card.Section style={{ position: "relative" }}>
        {/* Loading skeleton */}
        {imageLoading && (
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: "#f3f4f6",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              zIndex: 1,
            }}
          >
            <div
              style={{
                width: "32px",
                height: "32px",
                border: "2px solid #9ca3af",
                borderTop: "2px solid transparent",
                borderRadius: "50%",
                animation: "spin 1s linear infinite",
              }}
            ></div>
          </div>
        )}

        {/* Error fallback */}
        {imageError && (
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: "#f3f4f6",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              zIndex: 1,
              flexDirection: "column",
              color: "#6b7280",
            }}
          >
            <div
              style={{
                width: "48px",
                height: "48px",
                backgroundColor: "#d1d5db",
                borderRadius: "4px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: "8px",
              }}
            >
              <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                ></path>
              </svg>
            </div>
            <p style={{ fontSize: "14px", margin: 0 }}>Image unavailable</p>
          </div>
        )}

        <Image
          src={property?.images[0]}
          height={180}
          alt="image"
          onLoad={handleImageLoad}
          onError={handleImageError}
          style={{
            opacity: imageLoading ? 0 : 1,
            transition: "opacity 0.3s ease",
          }}
        />
      </Card.Section>

      <Group position="apart" mt="md" noWrap>
        <Text weight={700} size="lg">
          {property?.propertyCity}
        </Text>
        <Badge color="pink" variant="light">
          {property?.propertyIs}
        </Badge>
      </Group>

      <Group mt={"xs"} position="apart">
        <Text
          size="lg"
          style={{
            color: "#D92228",
            textTransform: "uppercase",
            fontSize: 16,
          }}
        >
          {property?.propertySubCategory}
        </Text>
      </Group>

      {property?.propertySubCategory !== "plot" &&
      property?.propertySubCategory !== "file" &&
      property?.propertySubCategory !== "shop" ? (
        <Group mt={"xs"} position="apart" noWrap>
          <Group spacing={1}>
            <IconBed opacity={0.6} />
            <Text>{property?.noOfBedRooms}</Text>
          </Group>
          <Group spacing={1}>
            <IconBath opacity={0.6} />
            <Text>{property?.noOfBathrooms}</Text>
          </Group>
          <Group spacing={1}>
            <IconAspectRatio opacity={0.6} />
            <Text>
              {property?.areaSize} {property?.areaSizeUnit}
            </Text>
          </Group>
        </Group>
      ) : (
        <Group spacing={"xs"}>
          <IconAspectRatio opacity={0.6} />
          <Text>
            {property?.areaSize} {property?.areaSizeUnit}
          </Text>
        </Group>
      )}

      <Group position="apart" mt={"md"} noWrap>
        <Text
          size="md"
          style={{
            color: "#D92228",
            fontSize: 18,
            wordWrap: "normal",
          }}
          weight={500}
        >
          {property?.propertyIs === "For Rent" ? property?.monthlyRent + "Rs./Month" : "Rs. " + property?.totalPrice}
        </Text>
        <Badge color="red" variant="dot">
          {property?.propertyAvailabilityStatus}
        </Badge>
      </Group>
    </Card>
  );
}
