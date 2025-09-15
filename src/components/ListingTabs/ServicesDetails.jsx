import { Stack, Text, createStyles, SimpleGrid, Card, Badge, Divider, Box, Group, ThemeIcon } from "@mantine/core";
import {
  IconCheck,
  IconBed,
  IconBath,
  IconCar,
  IconHome,
  IconChefHat,
  IconWifi,
  IconDeviceTv,
  IconPool,
  IconMedicalCross,
  IconUsers,
  IconLeaf,
  IconFlame,
  IconWind,
  IconSnowflake,
  IconEye,
} from "@tabler/icons";
import React from "react";

const ServicesDetails = ({ property }) => {
  const useStyles = createStyles((theme) => ({
    amenityCard: {
      border: "1px solid #e9ecef",
      borderRadius: "12px",
      padding: "16px",
      transition: "all 0.2s ease",
      "&:hover": {
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
        transform: "translateY(-2px)",
      },
    },
    sectionTitle: {
      fontSize: "20px",
      fontWeight: 700,
      color: "#2c3e50",
      marginBottom: "16px",
      borderBottom: "2px solid #D92228",
      paddingBottom: "8px",
    },
    amenityIcon: {
      backgroundColor: "#fff5f5",
      color: "#D92228",
    },
  }));

  const { classes } = useStyles();

  const getAmenityIcon = (type) => {
    switch (type) {
      case "bedrooms":
        return <IconBed size={20} />;
      case "bathrooms":
        return <IconBath size={20} />;
      case "parking":
        return <IconCar size={20} />;
      case "kitchen":
        return <IconChefHat size={20} />;
      case "internet":
        return <IconWifi size={20} />;
      case "cable":
        return <IconDeviceTv size={20} />;
      case "pool":
        return <IconPool size={20} />;
      case "medical":
        return <IconMedicalCross size={20} />;
      case "daycare":
        return <IconUsers size={20} />;
      case "garden":
        return <IconLeaf size={20} />;
      case "heating":
        return <IconFlame size={20} />;
      case "ac":
        return <IconWind size={20} />;
      case "windows":
        return <IconEye size={20} />;
      default:
        return <IconCheck size={20} />;
    }
  };

  const basicAmenities = [
    { key: "noOfBedRooms", label: "Bedrooms", icon: "bedrooms", value: property?.noOfBedRooms },
    { key: "noOfBathrooms", label: "Bathrooms", icon: "bathrooms", value: property?.noOfBathrooms },
    { key: "parkingSpace", label: "Parking Spaces", icon: "parking", value: property?.parkingSpace },
    { key: "drawingRoom", label: "Drawing Rooms", icon: "bedrooms", value: property?.drawingRoom },
    { key: "diningRoom", label: "Dining Rooms", icon: "bedrooms", value: property?.diningRoom },
    { key: "kitchen", label: "Kitchens", icon: "kitchen", value: property?.kitchen },
    { key: "powderRoom", label: "Powder Rooms", icon: "bathrooms", value: property?.powderRoom },
    { key: "storeRoom", label: "Store Rooms", icon: "bedrooms", value: property?.storeRoom },
    { key: "steamRoom", label: "Steam Rooms", icon: "bathrooms", value: property?.steamRoom },
    { key: "lounge", label: "Lounges", icon: "bedrooms", value: property?.lounge },
    { key: "sittingRoom", label: "Sitting Rooms", icon: "bedrooms", value: property?.sittingRoom },
    { key: "laundryRoom", label: "Laundry Rooms", icon: "kitchen", value: property?.laundryRoom },
  ].filter((amenity) => amenity.value && amenity.value > 0);

  const facilities = [
    { key: "electricityBackup", label: "Electricity Backup", icon: "heating", value: property?.electricityBackup },
    {
      key: "hasDoubleGlazedWindows",
      label: "Double Glazed Windows",
      icon: "windows",
      value: property?.hasDoubleGlazedWindows,
    },
    {
      key: "hasCentralAirConditioning",
      label: "Central Air Conditioning",
      icon: "ac",
      value: property?.hasCentralAirConditioning,
    },
    {
      key: "hasCheckCentralHeating",
      label: "Central Heating",
      icon: "heating",
      value: property?.hasCheckCentralHeating,
    },
    { key: "hasInternet", label: "Internet Available", icon: "internet", value: property?.hasInternet },
    { key: "hasCableTv", label: "Cable TV Available", icon: "cable", value: property?.hasCableTv },
    { key: "hasSwimmingPool", label: "Swimming Pool", icon: "pool", value: property?.hasSwimmingPool },
    {
      key: "hasCommunityLawnandGarden",
      label: "Community Garden",
      icon: "garden",
      value: property?.hasCommunityLawnandGarden,
    },
    { key: "hasMedicalCenter", label: "Medical Center", icon: "medical", value: property?.hasMedicalCenter },
    { key: "hasDayCareCenter", label: "Day Care Center", icon: "daycare", value: property?.hasDayCareCenter },
    { key: "hasKidsPlayArea", label: "Kids Play Area", icon: "daycare", value: property?.hasKidsPlayArea },
    { key: "hasBarBQueArea", label: "Barbeque Area", icon: "heating", value: property?.hasBarBQueArea },
    { key: "wasteDisposal", label: "Waste Disposal", icon: "heating", value: property?.wasteDisposal },
  ].filter((facility) => facility.value);

  if (property?.propertySubCategory === "plot" || property?.propertySubCategory === "file") {
    return (
      <Box>
        <Text className={classes.sectionTitle}>Services & Amenities</Text>
        <Text color="dimmed" style={{ fontStyle: "italic" }}>
          Amenities information is not applicable for plots and files.
        </Text>
      </Box>
    );
  }

  return (
    <Stack spacing="xl">
      {/* Basic Amenities */}
      {basicAmenities.length > 0 && (
        <Box>
          <Text className={classes.sectionTitle}>Basic Amenities</Text>
          <SimpleGrid cols={3} spacing="md">
            {basicAmenities.map((amenity) => (
              <Card key={amenity.key} className={classes.amenityCard}>
                <Group spacing="md">
                  <ThemeIcon size="lg" className={classes.amenityIcon} radius="md">
                    {getAmenityIcon(amenity.icon)}
                  </ThemeIcon>
                  <Box>
                    <Text size="sm" color="dimmed" weight={500}>
                      {amenity.label}
                    </Text>
                    <Text size="lg" weight={700} color="#D92228">
                      {amenity.value}
                    </Text>
                  </Box>
                </Group>
              </Card>
            ))}
          </SimpleGrid>
        </Box>
      )}

      {/* Additional Facilities */}
      {facilities.length > 0 && (
        <>
          <Divider />
          <Box>
            <Text className={classes.sectionTitle}>Additional Facilities</Text>
            <SimpleGrid cols={2} spacing="md">
              {facilities.map((facility) => (
                <Card key={facility.key} className={classes.amenityCard}>
                  <Group spacing="md">
                    <ThemeIcon size="lg" className={classes.amenityIcon} radius="md">
                      {getAmenityIcon(facility.icon)}
                    </ThemeIcon>
                    <Box>
                      <Text weight={600} color="#2c3e50">
                        {facility.label}
                      </Text>
                      {facility.key === "hasInternet" && property?.internetDescription && (
                        <Text size="sm" color="dimmed" mt="xs">
                          {property.internetDescription}
                        </Text>
                      )}
                      {facility.key === "hasCableTv" && property?.cableDescription && (
                        <Text size="sm" color="dimmed" mt="xs">
                          {property.cableDescription}
                        </Text>
                      )}
                    </Box>
                  </Group>
                </Card>
              ))}
            </SimpleGrid>
          </Box>
        </>
      )}

      {/* Servant Quarters */}
      {property?.servantQuarters > 0 && (
        <>
          <Divider />
          <Box>
            <Text className={classes.sectionTitle}>Servant Quarters</Text>
            <Card className={classes.amenityCard}>
              <Group spacing="md">
                <ThemeIcon size="lg" className={classes.amenityIcon} radius="md">
                  <IconHome size={20} />
                </ThemeIcon>
                <Box>
                  <Text weight={600} color="#2c3e50">
                    {property.servantQuarters} Servant Quarter{property.servantQuarters > 1 ? "s" : ""}
                  </Text>
                  {property?.servantQuarterDetails && (
                    <Text size="sm" color="dimmed" mt="xs">
                      {property.servantQuarterDetails}
                    </Text>
                  )}
                </Box>
              </Group>
            </Card>
          </Box>
        </>
      )}

      {/* Floor Type */}
      {property?.floorType && (
        <>
          <Divider />
          <Box>
            <Text className={classes.sectionTitle}>Floor Information</Text>
            <Card className={classes.amenityCard}>
              <Group spacing="md">
                <ThemeIcon size="lg" className={classes.amenityIcon} radius="md">
                  <IconHome size={20} />
                </ThemeIcon>
                <Box>
                  <Text weight={600} color="#2c3e50">
                    Floor Type: {property.floorType}
                  </Text>
                </Box>
              </Group>
            </Card>
          </Box>
        </>
      )}

      {/* Nearby & Other Facilities */}
      {(property?.nearbyFacilities || property?.otherFacilities) && (
        <>
          <Divider />
          <Box>
            <Text className={classes.sectionTitle}>Additional Information</Text>
            <Stack spacing="md">
              {property?.nearbyFacilities && (
                <Card className={classes.amenityCard}>
                  <Text weight={600} color="#2c3e50" mb="xs">
                    Nearby Facilities
                  </Text>
                  <Text color="dimmed">{property.nearbyFacilities}</Text>
                </Card>
              )}
              {property?.otherFacilities && (
                <Card className={classes.amenityCard}>
                  <Text weight={600} color="#2c3e50" mb="xs">
                    Other Facilities
                  </Text>
                  <Text color="dimmed">{property.otherFacilities}</Text>
                </Card>
              )}
            </Stack>
          </Box>
        </>
      )}

      {/* No amenities message */}
      {basicAmenities.length === 0 &&
        facilities.length === 0 &&
        !property?.servantQuarters &&
        !property?.floorType &&
        !property?.nearbyFacilities &&
        !property?.otherFacilities && (
          <Box>
            <Text className={classes.sectionTitle}>Services & Amenities</Text>
            <Text color="dimmed" style={{ fontStyle: "italic" }}>
              No amenity information available for this property.
            </Text>
          </Box>
        )}
    </Stack>
  );
};

export default ServicesDetails;
