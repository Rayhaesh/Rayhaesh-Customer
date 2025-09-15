import { Box, Group, Stack, Text, createStyles, SimpleGrid, Card, Divider, ThemeIcon, Badge } from "@mantine/core";
import { IconMapPin, IconHome, IconBuilding, IconMail, IconMap } from "@tabler/icons";
import React from "react";
import LocationMap from "../Generic/LocationMap";

const LocationDetails = ({ property }) => {
  const useStyles = createStyles((theme) => ({
    locationCard: {
      border: "1px solid #e9ecef",
      borderRadius: "12px",
      padding: "20px",
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
    mapContainer: {
      border: "1px solid #e9ecef",
      borderRadius: "12px",
      overflow: "hidden",
      boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
    },
    locationIcon: {
      backgroundColor: "#fff5f5",
      color: "#D92228",
    },
  }));

  const { classes } = useStyles();

  const locationInfo = [
    {
      key: "propertyCity",
      label: "City",
      icon: <IconMapPin size={20} />,
      value: property?.propertyCity,
      priority: 1,
    },
    {
      key: "streetNumber",
      label: "Street Number",
      icon: <IconBuilding size={20} />,
      value: property?.streetNumber,
      priority: 2,
    },
    {
      key: "houseNumber",
      label: "House Number",
      icon: <IconHome size={20} />,
      value: property?.houseNumber,
      priority: 3,
    },
    {
      key: "ZIPCode",
      label: "ZIP Code",
      icon: <IconMail size={20} />,
      value: property?.ZIPCode,
      priority: 4,
    },
  ].filter((info) => info.value);

  const hasMap =
    property?.propertyLocation &&
    property?.propertyLocation?.coordinates?.length >= 2 &&
    property?.propertyLocation?.coordinates[0] &&
    property?.propertyLocation?.coordinates[1];

  return (
    <Stack spacing="xl">
      {/* Location Information */}
      {locationInfo.length > 0 && (
        <Box>
          <Text className={classes.sectionTitle}>Location Details</Text>
          <SimpleGrid cols={2} spacing="md">
            {locationInfo.map((info) => (
              <Card key={info.key} className={classes.locationCard}>
                <Group spacing="md">
                  <ThemeIcon size="lg" className={classes.locationIcon} radius="md">
                    {info.icon}
                  </ThemeIcon>
                  <Box>
                    <Text size="sm" color="dimmed" weight={500}>
                      {info.label}
                    </Text>
                    <Text size="lg" weight={600} color="#2c3e50">
                      {info.value}
                    </Text>
                  </Box>
                </Group>
              </Card>
            ))}
          </SimpleGrid>
        </Box>
      )}

      {/* Map Section */}
      <Divider />
      <Box>
        <Group spacing="md" mb="md">
          <ThemeIcon size="lg" className={classes.locationIcon} radius="md">
            <IconMap size={20} />
          </ThemeIcon>
          <Box>
            <Text className={classes.sectionTitle} style={{ marginBottom: 0 }}>
              Property Location
            </Text>
            <Text size="sm" color="dimmed">
              Interactive map showing the exact location of this property
            </Text>
          </Box>
        </Group>

        <Box className={classes.mapContainer} style={{ height: "400px" }}>
          {hasMap ? (
            <LocationMap
              lat={property?.propertyLocation?.coordinates[1]}
              lng={property?.propertyLocation?.coordinates[0]}
            />
          ) : (
            <div
              style={{
                height: "400px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "#f8f9fa",
                border: "1px solid #e9ecef",
                borderRadius: "12px",
              }}
            >
              <Text color="dimmed">No location coordinates available for this property</Text>
            </div>
          )}
        </Box>
      </Box>

      {/* No Location Data */}
      {locationInfo.length === 0 && !hasMap && (
        <Box>
          <Text className={classes.sectionTitle}>Location Details</Text>
          <Card className={classes.locationCard}>
            <Group spacing="md">
              <ThemeIcon size="lg" className={classes.locationIcon} radius="md">
                <IconMapPin size={20} />
              </ThemeIcon>
              <Box>
                <Text weight={600} color="#2c3e50">
                  Location Information
                </Text>
                <Text color="dimmed" mt="xs">
                  No detailed location information available for this property.
                </Text>
              </Box>
            </Group>
          </Card>
        </Box>
      )}

      {/* Location Status Badge */}
      {property?.propertyCity && (
        <Box>
          <Group spacing="sm">
            <Text size="sm" color="dimmed">
              Location Status:
            </Text>
            <Badge color="green" variant="light" leftSection={<IconMapPin size={14} />}>
              Verified Location
            </Badge>
          </Group>
        </Box>
      )}
    </Stack>
  );
};

export default LocationDetails;
