import { Group, Stack, Text, createStyles, SimpleGrid, Card, Badge, Divider, Box } from "@mantine/core";
import { IconMapPin, IconCalendar, IconHome, IconBuilding, IconKey, IconRuler } from "@tabler/icons";
import React from "react";

const AboutDetails = ({ property }) => {
  const useStyles = createStyles((theme) => ({
    detailCard: {
      border: "1px solid #e9ecef",
      borderRadius: "12px",
      padding: "16px",
      transition: "all 0.2s ease",
      "&:hover": {
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
        transform: "translateY(-2px)",
      },
    },
    detailLabel: {
      fontSize: "14px",
      fontWeight: 600,
      color: "#D92228",
      textTransform: "uppercase",
      letterSpacing: "0.5px",
    },
    detailValue: {
      fontSize: "16px",
      fontWeight: 500,
      color: "#2c3e50",
    },
    sectionTitle: {
      fontSize: "20px",
      fontWeight: 700,
      color: "#2c3e50",
      marginBottom: "16px",
      borderBottom: "2px solid #D92228",
      paddingBottom: "8px",
    },
  }));

  const { classes } = useStyles();

  const formatPrice = (price) => {
    if (!price) return "Contact for Price";
    return new Intl.NumberFormat("en-PK").format(price);
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case "For Sale":
        return (
          <Badge color="green" variant="filled">
            For Sale
          </Badge>
        );
      case "For Rent":
        return (
          <Badge color="blue" variant="filled">
            For Rent
          </Badge>
        );
      case "For Exchange":
        return (
          <Badge color="orange" variant="filled">
            For Exchange
          </Badge>
        );
      default:
        return (
          <Badge color="gray" variant="filled">
            {status}
          </Badge>
        );
    }
  };

  const getOccupancyBadge = (occupied) => {
    return occupied ? (
      <Badge color="red" variant="light">
        Occupied
      </Badge>
    ) : (
      <Badge color="green" variant="light">
        Available
      </Badge>
    );
  };

  return (
    <Stack spacing="xl">
      {/* Property Overview */}
      <Box>
        <Text className={classes.sectionTitle}>Property Overview</Text>
        <SimpleGrid cols={2} spacing="md">
          <Card className={classes.detailCard}>
            <Stack spacing="xs">
              <Text className={classes.detailLabel}>Property Type</Text>
              <Group spacing="xs">
                <IconHome size={16} color="#D92228" />
                <Text className={classes.detailValue}>{property?.propertyCategory}</Text>
              </Group>
            </Stack>
          </Card>

          <Card className={classes.detailCard}>
            <Stack spacing="xs">
              <Text className={classes.detailLabel}>Sub Category</Text>
              <Group spacing="xs">
                <IconBuilding size={16} color="#D92228" />
                <Text className={classes.detailValue}>{property?.propertySubCategory}</Text>
              </Group>
            </Stack>
          </Card>

          <Card className={classes.detailCard}>
            <Stack spacing="xs">
              <Text className={classes.detailLabel}>Status</Text>
              {getStatusBadge(property?.propertyIs)}
            </Stack>
          </Card>

          <Card className={classes.detailCard}>
            <Stack spacing="xs">
              <Text className={classes.detailLabel}>Availability</Text>
              {getOccupancyBadge(property?.occupied)}
            </Stack>
          </Card>
        </SimpleGrid>
      </Box>

      <Divider />

      {/* Property Details */}
      <Box>
        <Text className={classes.sectionTitle}>Property Details</Text>
        <SimpleGrid cols={2} spacing="md">
          <Card className={classes.detailCard}>
            <Stack spacing="xs">
              <Text className={classes.detailLabel}>Area Size</Text>
              <Group spacing="xs">
                <IconRuler size={16} color="#D92228" />
                <Text className={classes.detailValue}>
                  {property?.areaSize || "N/A"} {property?.areaSizeUnit || "sq ft"}
                </Text>
              </Group>
            </Stack>
          </Card>

          <Card className={classes.detailCard}>
            <Stack spacing="xs">
              <Text className={classes.detailLabel}>Location</Text>
              <Group spacing="xs">
                <IconMapPin size={16} color="#D92228" />
                <Text className={classes.detailValue}>{property?.propertyCity || "N/A"}</Text>
              </Group>
            </Stack>
          </Card>

          {property?.propertyIs !== "For Rent" && (
            <Card className={classes.detailCard}>
              <Stack spacing="xs">
                <Text className={classes.detailLabel}>Price</Text>
                <Text className={classes.detailValue} style={{ fontSize: "18px", fontWeight: 700, color: "#D92228" }}>
                  Rs. {formatPrice(property?.totalPrice)}
                </Text>
              </Stack>
            </Card>
          )}

          {property?.propertyAvailabilityStatus && (
            <Card className={classes.detailCard}>
              <Stack spacing="xs">
                <Text className={classes.detailLabel}>Availability Status</Text>
                <Text className={classes.detailValue}>{property?.propertyAvailabilityStatus}</Text>
              </Stack>
            </Card>
          )}
        </SimpleGrid>
      </Box>

      {/* Rental Details */}
      {property?.propertyIs === "For Rent" && (
        <>
          <Divider />
          <Box>
            <Text className={classes.sectionTitle}>Rental Information</Text>
            <SimpleGrid cols={2} spacing="md">
              <Card className={classes.detailCard}>
                <Stack spacing="xs">
                  <Text className={classes.detailLabel}>Monthly Rent</Text>
                  <Text className={classes.detailValue} style={{ fontSize: "18px", fontWeight: 700, color: "#D92228" }}>
                    Rs. {formatPrice(property?.monthlyRent)}
                  </Text>
                </Stack>
              </Card>

              <Card className={classes.detailCard}>
                <Stack spacing="xs">
                  <Text className={classes.detailLabel}>Security Deposit</Text>
                  <Text className={classes.detailValue}>Rs. {formatPrice(property?.securityDeposit)}</Text>
                </Stack>
              </Card>

              <Card className={classes.detailCard}>
                <Stack spacing="xs">
                  <Text className={classes.detailLabel}>Minimum Contract</Text>
                  <Group spacing="xs">
                    <IconCalendar size={16} color="#D92228" />
                    <Text className={classes.detailValue}>{property?.minimumContractPeriod || "N/A"} month(s)</Text>
                  </Group>
                </Stack>
              </Card>

              <Card className={classes.detailCard}>
                <Stack spacing="xs">
                  <Text className={classes.detailLabel}>Advance Rent Required</Text>
                  <Text className={classes.detailValue}>{property?.advanceRent ? "Yes" : "No"}</Text>
                </Stack>
              </Card>
            </SimpleGrid>
          </Box>
        </>
      )}

      {/* Exchange Details */}
      {property?.propertyIs === "For Exchange" && (
        <>
          <Divider />
          <Box>
            <Text className={classes.sectionTitle}>Exchange Information</Text>
            <SimpleGrid cols={2} spacing="md">
              <Card className={classes.detailCard}>
                <Stack spacing="xs">
                  <Text className={classes.detailLabel}>Exchange With</Text>
                  <Text className={classes.detailValue}>{property?.exchangeWith || "N/A"}</Text>
                </Stack>
              </Card>

              <Card className={classes.detailCard}>
                <Stack spacing="xs">
                  <Text className={classes.detailLabel}>Minimum Exchange Value</Text>
                  <Text className={classes.detailValue}>Rs. {formatPrice(property?.minimumExchangeValue)}</Text>
                </Stack>
              </Card>

              {property?.inInstallments && (
                <>
                  <Card className={classes.detailCard}>
                    <Stack spacing="xs">
                      <Text className={classes.detailLabel}>Down Payment</Text>
                      <Text className={classes.detailValue}>Rs. {formatPrice(property?.downPayment)}</Text>
                    </Stack>
                  </Card>

                  <Card className={classes.detailCard}>
                    <Stack spacing="xs">
                      <Text className={classes.detailLabel}>Total Installments</Text>
                      <Text className={classes.detailValue}>{property?.totalNumberOfInstallments || "N/A"}</Text>
                    </Stack>
                  </Card>

                  <Card className={classes.detailCard}>
                    <Stack spacing="xs">
                      <Text className={classes.detailLabel}>Monthly Installment</Text>
                      <Text className={classes.detailValue}>Rs. {formatPrice(property?.monthlyInstallment)}</Text>
                    </Stack>
                  </Card>

                  <Card className={classes.detailCard}>
                    <Stack spacing="xs">
                      <Text className={classes.detailLabel}>Installment Duration</Text>
                      <Text className={classes.detailValue}>{property?.installmentDuration || "N/A"}</Text>
                    </Stack>
                  </Card>
                </>
              )}
            </SimpleGrid>
          </Box>
        </>
      )}

      {/* Property Description */}
      {property?.propertyDescription && (
        <>
          <Divider />
          <Box>
            <Text className={classes.sectionTitle}>Description</Text>
            <Card className={classes.detailCard}>
              <Text style={{ lineHeight: 1.6, color: "#2c3e50" }}>{property?.propertyDescription}</Text>
            </Card>
          </Box>
        </>
      )}
    </Stack>
  );
};

export default AboutDetails;
