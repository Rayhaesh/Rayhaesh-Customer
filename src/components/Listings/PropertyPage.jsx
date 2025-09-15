import {
  Group,
  Text,
  createStyles,
  Tabs,
  Stack,
  Grid,
  Paper,
  Button,
  Input,
  Modal,
  Container,
  Box,
  Badge,
  Card,
  Divider,
  Avatar,
  Rating,
  SimpleGrid,
  ActionIcon,
  Title,
} from "@mantine/core";
import {
  IconAdjustmentsHorizontal,
  IconArrowRight,
  IconFileInfo,
  IconFiles,
  IconMap2,
  IconMapPin,
  IconPhoto,
  IconShoppingBag,
  IconVideo,
  IconPhone,
  IconMail,
  IconHeart,
  IconShare,
  IconBed,
  IconBath,
  IconCar,
  IconRuler,
  IconCalendar,
  IconUser,
  IconBuilding,
  IconHome,
  IconCopy,
  IconCheck,
  IconBrandFacebook,
  IconBrandTwitter,
  IconBrandWhatsapp,
  IconBrandLinkedin,
  IconBrandTelegram,
  IconQrcode,
} from "@tabler/icons";
import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { useMediaQuery } from "@mantine/hooks";
import { useNavigate } from "react-router-dom";
import { showNotification } from "@mantine/notifications";
import VideosCarousel from "../Carousel/VideosCarousel";
import ImagesCarousel from "../Carousel/ImagesCarousel";
import AgencyDetails from "../ListingTabs/AgencyDetails";
import ServicesDetails from "../ListingTabs/ServicesDetails";
import AboutDetails from "../ListingTabs/AboutDetails";
import LocationDetails from "../ListingTabs/LocationDetails";
import DocumentViewer from "../ListingTabs/DocumentViewer";
import useAuth from "../hooks/useAuth";
import axios from "axios";

const PropertyPage = () => {
  const useStyles = createStyles((theme) => ({
    heroSection: {
      background: "linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)",
      borderRadius: "12px",
      padding: "24px",
      marginBottom: "24px",
    },
    priceCard: {
      background: "linear-gradient(45deg, #D92228, #ff6b6b)",
      color: "white",
      borderRadius: "12px",
      padding: "24px",
      textAlign: "center",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      minHeight: "200px",
    },
    featureCard: {
      border: "1px solid #e9ecef",
      borderRadius: "12px",
      padding: "20px",
      transition: "all 0.2s ease",
      backgroundColor: "white",
      height: "100%",
      display: "flex",
      alignItems: "center",
      "&:hover": {
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
        transform: "translateY(-2px)",
        borderColor: "#D92228",
      },
    },
    bookingCard: {
      border: "1px solid #e9ecef",
      borderRadius: "12px",
      padding: "24px",
      background: "white",
      boxShadow: "0 4px 20px rgba(0, 0, 0, 0.08)",
    },
  }));

  const { classes } = useStyles();
  const location = useLocation();
  const { id } = useParams();
  const [property, setProperty] = React.useState({});
  const [loading, setLoading] = useState(false);
  const isMobile = useMediaQuery("(max-width: 768px)");
  const match1200 = useMediaQuery("(max-width: 1200px)");

  useEffect(() => {
    if (location.state?.data) {
      setProperty(location.state.data);
    } else if (id) {
      // Direct URL access - fetch property by ID
      fetchPropertyById(id);
    }
  }, [location, id]);

  const fetchPropertyById = async (propertyId) => {
    setLoading(true);
    try {
      const response = await axios.get(`${import.meta.env.VITE_REACT_APP_BACKEND_URL}/user/getAllProperties`);
      if (response.data?.body) {
        // Find the specific property by ID from the list
        const foundProperty = response.data.body.find((property) => property._id === propertyId);
        if (foundProperty) {
          setProperty(foundProperty);
        } else {
          showNotification({
            title: "Error",
            message: "Property not found",
            color: "red",
          });
        }
      }
    } catch (error) {
      console.error("Error fetching property:", error);
      showNotification({
        title: "Error",
        message: "Failed to load property details",
        color: "red",
      });
    } finally {
      setLoading(false);
    }
  };

  const [opened, setOpened] = useState(false);
  const [shareOpened, setShareOpened] = useState(false);
  const [isFavorited, setIsFavorited] = useState(false);
  const [linkCopied, setLinkCopied] = useState(false);
  const navigate = useNavigate();
  const { auth, setAuth } = useAuth();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  useEffect(() => {
    axios
      .get(import.meta.env.VITE_REACT_APP_BACKEND_URL + "/user/getUserProfile", {
        headers: {
          token: localStorage.getItem("token"),
        },
      })
      .then((res) => {
        setName(res.data?.body?.name);
        setEmail(res.data?.body?.email);
        setPhone(res.data?.body?.cellPhoneNumber);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleBookingSubmit = (e) => {
    e.preventDefault();
    if (name === "" || email === "" || phone === "") {
      showNotification({
        title: "Error",
        message: "Please fill in all the fields",
        color: "red",
      });
    } else {
      navigate(`/booking/${property?._id}`, {
        state: { data: property },
      });
    }
  };

  const formatPrice = (price) => {
    if (!price) return "Contact for Price";
    return new Intl.NumberFormat("en-PK").format(price);
  };

  const getPropertyTypeIcon = (type) => {
    switch (type?.toLowerCase()) {
      case "house":
        return <IconHome size={20} />;
      case "flat":
      case "apartment":
        return <IconBuilding size={20} />;
      default:
        return <IconHome size={20} />;
    }
  };

  const getPropertyStatusBadge = (status) => {
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

  if (loading) {
    return (
      <Box
        style={{
          background: "#f8f9fa",
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Text size="lg">Loading property details...</Text>
      </Box>
    );
  }

  if (!property || Object.keys(property).length === 0) {
    return (
      <Box
        style={{
          background: "#f8f9fa",
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Text size="lg" color="red">
          Property not found
        </Text>
      </Box>
    );
  }

  return (
    <Box style={{ background: "#f8f9fa", minHeight: "100vh" }}>
      <Container size="xl" py="xl">
        {/* Hero Section */}
        <Box className={classes.heroSection}>
          <Grid>
            <Grid.Col span={match1200 ? 12 : 8}>
              <Stack spacing="md">
                <Group position="apart" align="flex-start">
                  <Box style={{ flex: 1 }}>
                    <Group spacing="md" mb="sm">
                      {getPropertyStatusBadge(property?.propertyIs)}
                      <Badge variant="outline" color="gray">
                        {property?.propertyCategory}
                      </Badge>
                      <Badge variant="outline" color="gray">
                        {property?.propertySubCategory}
                      </Badge>
                    </Group>

                    <Title
                      order={1}
                      style={{
                        fontSize: isMobile ? "24px" : "32px",
                        fontWeight: 800,
                        color: "#2c3e50",
                        marginBottom: "8px",
                        lineHeight: 1.2,
                      }}
                    >
                      {property?.propertyTitle || "Property Title"}
                    </Title>

                    <Group spacing="xs" mb="md">
                      <IconMapPin size={18} color="#6c757d" />
                      <Text size="lg" color="dimmed" weight={500}>
                        {property?.propertyCity || "City Name"}
                      </Text>
                    </Group>

                    <Text size="md" color="dimmed" style={{ lineHeight: 1.6 }}>
                      {property?.propertyDescription || "Property description will appear here..."}
                    </Text>
                  </Box>

                  <Group spacing="sm">
                    <ActionIcon
                      size="lg"
                      variant={isFavorited ? "filled" : "outline"}
                      color="red"
                      onClick={() => setIsFavorited(!isFavorited)}
                    >
                      <IconHeart size={18} fill={isFavorited ? "currentColor" : "none"} />
                    </ActionIcon>
                    <ActionIcon size="lg" variant="outline" color="gray" onClick={() => setShareOpened(true)}>
                      <IconShare size={18} />
                    </ActionIcon>
                  </Group>
                </Group>

                {/* Property Highlights - Most Important Only (Max 4) */}
                <Box>
                  <Text size="lg" weight={600} color="#2c3e50" mb="md">
                    Property Highlights
                  </Text>
                  <SimpleGrid
                    cols={isMobile ? 2 : 4}
                    spacing="lg"
                    breakpoints={[
                      { maxWidth: "sm", cols: 2, spacing: "md" },
                      { maxWidth: "md", cols: 3, spacing: "md" },
                      { minWidth: "lg", cols: 4, spacing: "lg" },
                    ]}
                  >
                    {/* Area Size - Always show if available */}
                    {property?.areaSize && (
                      <Card className={classes.featureCard} shadow="sm">
                        <Group spacing="md" noWrap>
                          <Box
                            style={{
                              width: "48px",
                              height: "48px",
                              borderRadius: "12px",
                              backgroundColor: "#fff5f5",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              flexShrink: 0,
                            }}
                          >
                            <IconRuler size={24} color="#D92228" />
                          </Box>
                          <Box style={{ flex: 1, minWidth: 0 }}>
                            <Text size="xs" color="dimmed" weight={500} mb="xs">
                              Area
                            </Text>
                            <Text size="lg" weight={700} color="#2c3e50">
                              {property.areaSize} {property.areaSizeUnit || "sq ft"}
                            </Text>
                          </Box>
                        </Group>
                      </Card>
                    )}

                    {/* Bedrooms - Only for residential, most important */}
                    {property?.propertyCategory === "Residential" && property?.noOfBedRooms && (
                      <Card className={classes.featureCard} shadow="sm">
                        <Group spacing="md" noWrap>
                          <Box
                            style={{
                              width: "48px",
                              height: "48px",
                              borderRadius: "12px",
                              backgroundColor: "#fff5f5",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              flexShrink: 0,
                            }}
                          >
                            <IconBed size={24} color="#D92228" />
                          </Box>
                          <Box style={{ flex: 1, minWidth: 0 }}>
                            <Text size="xs" color="dimmed" weight={500} mb="xs">
                              Bedrooms
                            </Text>
                            <Text size="lg" weight={700} color="#2c3e50">
                              {property.noOfBedRooms}
                            </Text>
                          </Box>
                        </Group>
                      </Card>
                    )}

                    {/* Bathrooms - Only for residential, most important */}
                    {property?.propertyCategory === "Residential" && property?.noOfBathrooms && (
                      <Card className={classes.featureCard} shadow="sm">
                        <Group spacing="md" noWrap>
                          <Box
                            style={{
                              width: "48px",
                              height: "48px",
                              borderRadius: "12px",
                              backgroundColor: "#fff5f5",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              flexShrink: 0,
                            }}
                          >
                            <IconBath size={24} color="#D92228" />
                          </Box>
                          <Box style={{ flex: 1, minWidth: 0 }}>
                            <Text size="xs" color="dimmed" weight={500} mb="xs">
                              Bathrooms
                            </Text>
                            <Text size="lg" weight={700} color="#2c3e50">
                              {property.noOfBathrooms}
                            </Text>
                          </Box>
                        </Group>
                      </Card>
                    )}

                    {/* Parking - Important for all property types */}
                    {property?.parkingSpace && (
                      <Card className={classes.featureCard} shadow="sm">
                        <Group spacing="md" noWrap>
                          <Box
                            style={{
                              width: "48px",
                              height: "48px",
                              borderRadius: "12px",
                              backgroundColor: "#fff5f5",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              flexShrink: 0,
                            }}
                          >
                            <IconCar size={24} color="#D92228" />
                          </Box>
                          <Box style={{ flex: 1, minWidth: 0 }}>
                            <Text size="xs" color="dimmed" weight={500} mb="xs">
                              Parking
                            </Text>
                            <Text size="lg" weight={700} color="#2c3e50">
                              {property.parkingSpace}
                            </Text>
                          </Box>
                        </Group>
                      </Card>
                    )}

                    {/* Occupancy Status - Only for residential if bedrooms/bathrooms not shown */}
                    {property?.propertyCategory === "Residential" &&
                      property?.occupied &&
                      (!property?.noOfBedRooms || !property?.noOfBathrooms) && (
                        <Card className={classes.featureCard} shadow="sm">
                          <Group spacing="md" noWrap>
                            <Box
                              style={{
                                width: "48px",
                                height: "48px",
                                borderRadius: "12px",
                                backgroundColor: "#fff5f5",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                flexShrink: 0,
                              }}
                            >
                              <IconHome size={24} color="#D92228" />
                            </Box>
                            <Box style={{ flex: 1, minWidth: 0 }}>
                              <Text size="xs" color="dimmed" weight={500} mb="xs">
                                Status
                              </Text>
                              <Text
                                size="lg"
                                weight={700}
                                color={property.occupied === "Vacant" ? "#27ae60" : "#f39c12"}
                              >
                                {property.occupied}
                              </Text>
                            </Box>
                          </Group>
                        </Card>
                      )}
                  </SimpleGrid>
                </Box>
              </Stack>
            </Grid.Col>

            <Grid.Col span={match1200 ? 12 : 4}>
              <Box className={classes.priceCard}>
                <Text size="lg" weight={600} mb="xs">
                  {property?.propertyIs === "For Rent" ? "Monthly Rent" : "Price"}
                </Text>
                <Text size="xl" weight={800} mb="md">
                  Rs. {formatPrice(property?.totalPrice || property?.monthlyRent)}
                </Text>
                {property?.propertyIs === "For Rent" && property?.securityDeposit && (
                  <Text size="sm" opacity={0.9}>
                    Security Deposit: Rs. {formatPrice(property?.securityDeposit)}
                  </Text>
                )}
                <Button
                  size="lg"
                  variant="white"
                  color="dark"
                  fullWidth
                  mt="md"
                  onClick={() => setOpened(true)}
                  style={{
                    fontWeight: 600,
                    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.2)",
                  }}
                >
                  Contact Agent
                </Button>
              </Box>
            </Grid.Col>
          </Grid>
        </Box>

        <Grid>
          {/* Main Content */}
          <Grid.Col span={match1200 ? 12 : 8}>
            {/* Media Tabs */}
            <Paper shadow="sm" radius="md" p="md" mb="xl">
              <Tabs color="red" variant="pills" defaultValue="photos" keepMounted={false}>
                <Tabs.List>
                  {property?.images?.length > 0 && (
                    <Tabs.Tab value="photos" icon={<IconPhoto size={16} />}>
                      Photos ({property?.images?.length})
                    </Tabs.Tab>
                  )}
                  {property?.videos?.length > 0 && (
                    <Tabs.Tab value="videos" icon={<IconVideo size={16} />}>
                      Videos ({property?.videos?.length})
                    </Tabs.Tab>
                  )}
                  {property?.documents?.length > 0 && (
                    <Tabs.Tab value="documents" icon={<IconFiles size={16} />}>
                      Documents ({property?.documents?.length})
                    </Tabs.Tab>
                  )}
                </Tabs.List>

                <Tabs.Panel value="photos" pt="md">
                  <ImagesCarousel property={property} />
                </Tabs.Panel>

                <Tabs.Panel value="videos" pt="md">
                  <VideosCarousel property={property} />
                </Tabs.Panel>

                {property?.documents && (
                  <Tabs.Panel value="documents" pt="md">
                    <DocumentViewer property={property} />
                  </Tabs.Panel>
                )}
              </Tabs>
            </Paper>

            {/* Property Details Tabs */}
            <Paper shadow="sm" radius="md" p="md">
              <Tabs color="red" variant="default" defaultValue="about" keepMounted>
                <Tabs.List>
                  <Tabs.Tab value="about" icon={<IconFileInfo size={16} />}>
                    About Property
                  </Tabs.Tab>
                  <Tabs.Tab value="services" icon={<IconAdjustmentsHorizontal size={16} />}>
                    Services & Amenities
                  </Tabs.Tab>
                  <Tabs.Tab value="location" icon={<IconMapPin size={16} />}>
                    Location
                  </Tabs.Tab>
                  {property?.agency && (
                    <Tabs.Tab value="agency" icon={<IconBuilding size={16} />}>
                      Agency Info
                    </Tabs.Tab>
                  )}
                </Tabs.List>

                <Tabs.Panel value="about" pt="md">
                  <AboutDetails property={property} />
                </Tabs.Panel>

                <Tabs.Panel value="services" pt="md">
                  <ServicesDetails property={property} />
                </Tabs.Panel>

                <Tabs.Panel value="location" pt="md">
                  <LocationDetails property={property} />
                </Tabs.Panel>

                {property?.agency && (
                  <Tabs.Panel value="agency" pt="md">
                    <AgencyDetails property={property} />
                  </Tabs.Panel>
                )}
              </Tabs>
            </Paper>
          </Grid.Col>

          {/* Sidebar */}
          <Grid.Col span={match1200 ? 12 : 4}>
            <Box style={{ position: match1200 ? "static" : "sticky", top: "110px" }}>
              {/* Contact Form */}
              <Paper className={classes.bookingCard} mb="xl">
                <Stack spacing="md">
                  <Title order={3} style={{ color: "#D92228", textAlign: "center" }}>
                    Contact Agent
                  </Title>

                  <form onSubmit={handleBookingSubmit}>
                    <Stack spacing="md">
                      <Input.Wrapper label="Full Name" required>
                        <Input
                          placeholder="Enter your name"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          icon={<IconUser size={16} />}
                          radius="md"
                        />
                      </Input.Wrapper>

                      <Input.Wrapper label="Email Address" required>
                        <Input
                          placeholder="Enter your email"
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          icon={<IconMail size={16} />}
                          radius="md"
                        />
                      </Input.Wrapper>

                      <Input.Wrapper label="Phone Number" required>
                        <Input
                          placeholder="Enter your phone"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          icon={<IconPhone size={16} />}
                          radius="md"
                        />
                      </Input.Wrapper>

                      <Button
                        type="submit"
                        fullWidth
                        size="lg"
                        radius="md"
                        style={{
                          background: "linear-gradient(45deg, #D92228, #ff6b6b)",
                          border: "none",
                          fontWeight: 600,
                          boxShadow: "0 4px 12px rgba(217, 34, 40, 0.3)",
                        }}
                        rightIcon={<IconArrowRight size={16} />}
                      >
                        Send Message
                      </Button>
                    </Stack>
                  </form>
                </Stack>
              </Paper>

              {/* Agent Info */}
              {property?.agency && (
                <Paper shadow="sm" radius="md" p="md">
                  <Stack spacing="md">
                    <Title order={4} style={{ color: "#2c3e50" }}>
                      Agent Information
                    </Title>

                    <Group spacing="md">
                      <Avatar
                        size="lg"
                        color="red"
                        radius="md"
                        src={property?.agency?.agencyPointOfContact?.profileImage}
                      >
                        {property?.agency?.agencyPointOfContact?.name?.charAt(0) ||
                          property?.agency?.agencyTitle?.charAt(0) ||
                          "A"}
                      </Avatar>
                      <Box style={{ flex: 1 }}>
                        <Text weight={600} size="md">
                          {property?.agency?.agencyPointOfContact?.name ||
                            property?.agency?.agencyTitle ||
                            "Agent Name"}
                        </Text>
                        <Text size="sm" color="dimmed">
                          {property?.agency?.agencyTitle || "Real Estate Agent"}
                        </Text>
                        <Rating value={4.5} readOnly size="sm" mt="xs" />
                      </Box>
                    </Group>

                    <Divider />

                    <Group spacing="md">
                      <ActionIcon color="red" variant="light" size="lg">
                        <IconPhone size={16} />
                      </ActionIcon>
                      <Box>
                        <Text size="xs" color="dimmed">
                          Phone
                        </Text>
                        <Text weight={500}>
                          {property?.agency?.agencyPointOfContact?.cellPhoneNumber
                            ? `${property?.agency?.agencyPointOfContact?.cellPhoneCountryCode} ${property?.agency?.agencyPointOfContact?.cellPhoneNumber}`
                            : property?.agency?.agencyPhone || "+92 XXX XXXXXX"}
                        </Text>
                      </Box>
                    </Group>

                    <Group spacing="md">
                      <ActionIcon color="red" variant="light" size="lg">
                        <IconMail size={16} />
                      </ActionIcon>
                      <Box>
                        <Text size="xs" color="dimmed">
                          Email
                        </Text>
                        <Text weight={500}>
                          {property?.agency?.agencyPointOfContact?.email ||
                            property?.agency?.agencyInfoEmail ||
                            "agent@example.com"}
                        </Text>
                      </Box>
                    </Group>

                    {property?.agency?.agencyWhatsapp && (
                      <Group spacing="md">
                        <ActionIcon color="green" variant="light" size="lg">
                          <IconPhone size={16} />
                        </ActionIcon>
                        <Box>
                          <Text size="xs" color="dimmed">
                            WhatsApp
                          </Text>
                          <Text weight={500}>
                            {property?.agency?.agencyPointOfContact?.whatsappNumber
                              ? `${property?.agency?.agencyPointOfContact?.whatsappCountryCode} ${property?.agency?.agencyPointOfContact?.whatsappNumber}`
                              : property?.agency?.agencyWhatsapp}
                          </Text>
                        </Box>
                      </Group>
                    )}

                    {property?.agency?.agencyAddress && (
                      <Group spacing="md">
                        <ActionIcon color="blue" variant="light" size="lg">
                          <IconMapPin size={16} />
                        </ActionIcon>
                        <Box>
                          <Text size="xs" color="dimmed">
                            Address
                          </Text>
                          <Text weight={500} size="sm">
                            {property?.agency?.agencyAddress}
                          </Text>
                        </Box>
                      </Group>
                    )}
                  </Stack>
                </Paper>
              )}
            </Box>
          </Grid.Col>
        </Grid>
      </Container>

      {/* Mobile Booking Modal */}
      <Modal
        opened={opened}
        onClose={() => setOpened(false)}
        title="Contact Agent"
        size="md"
        centered
        styles={{
          modal: { borderRadius: "12px" },
          header: { borderBottom: "1px solid #e9ecef", paddingBottom: 16 },
        }}
      >
        <form onSubmit={handleBookingSubmit}>
          <Stack spacing="md">
            <Input.Wrapper label="Full Name" required>
              <Input
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                icon={<IconUser size={16} />}
                radius="md"
              />
            </Input.Wrapper>

            <Input.Wrapper label="Email Address" required>
              <Input
                placeholder="Enter your email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                icon={<IconMail size={16} />}
                radius="md"
              />
            </Input.Wrapper>

            <Input.Wrapper label="Phone Number" required>
              <Input
                placeholder="Enter your phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                icon={<IconPhone size={16} />}
                radius="md"
              />
            </Input.Wrapper>

            <Button
              type="submit"
              fullWidth
              size="lg"
              radius="md"
              style={{
                background: "linear-gradient(45deg, #D92228, #ff6b6b)",
                border: "none",
                fontWeight: 600,
                boxShadow: "0 4px 12px rgba(217, 34, 40, 0.3)",
              }}
              rightIcon={<IconArrowRight size={16} />}
            >
              Send Message
            </Button>
          </Stack>
        </form>
      </Modal>

      {/* Enhanced Share Modal */}
      <Modal
        opened={shareOpened}
        onClose={() => setShareOpened(false)}
        title={
          <Group spacing="sm">
            <IconShare size={20} style={{ color: "#D92228" }} />
            <Text weight={600} size="lg">
              Share Property
            </Text>
          </Group>
        }
        size="lg"
        centered
        styles={{
          modal: {
            borderRadius: "16px",
            boxShadow: "0 10px 40px rgba(0, 0, 0, 0.1)",
          },
          header: {
            borderBottom: "1px solid #e9ecef",
            paddingBottom: 16,
            marginBottom: 8,
          },
        }}
      >
        <Stack spacing="xl">
          <Text size="sm" color="dimmed" style={{ textAlign: "center" }}>
            Share this amazing property with friends and family
          </Text>

          {/* Copy Link Section */}
          <Box>
            <Text size="sm" weight={600} mb="md" style={{ color: "#2c3e50" }}>
              Property Link
            </Text>
            <Group spacing="xs">
              <Input
                value={window.location.href}
                readOnly
                style={{ flex: 1 }}
                styles={{
                  input: {
                    backgroundColor: "#f8f9fa",
                    border: "2px solid #e9ecef",
                    borderRadius: "8px",
                    fontSize: "14px",
                  },
                }}
                rightSection={
                  <Button
                    size="sm"
                    variant={linkCopied ? "filled" : "light"}
                    color={linkCopied ? "green" : "blue"}
                    leftIcon={linkCopied ? <IconCheck size={16} /> : <IconCopy size={16} />}
                    onClick={() => {
                      navigator.clipboard.writeText(window.location.href);
                      setLinkCopied(true);
                      showNotification({
                        title: "Link Copied!",
                        message: "Property link copied to clipboard",
                        color: "green",
                        icon: <IconCheck size={16} />,
                      });
                      setTimeout(() => setLinkCopied(false), 2000);
                    }}
                    style={{
                      backgroundColor: linkCopied ? "#28a745" : "#007bff",
                      color: "white",
                      fontWeight: 600,
                    }}
                  >
                    {linkCopied ? "Copied!" : "Copy Link"}
                  </Button>
                }
              />
            </Group>
          </Box>

          {/* Social Media Sharing */}
          <Box>
            <Text size="sm" weight={600} mb="md" style={{ color: "#2c3e50" }}>
              Share on Social Media
            </Text>
            <SimpleGrid cols={3} spacing="md">
              <Button
                variant="outline"
                color="blue"
                leftIcon={<IconBrandFacebook size={18} />}
                onClick={() => {
                  const url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
                    window.location.href
                  )}`;
                  window.open(url, "_blank");
                }}
                style={{
                  borderColor: "#1877f2",
                  color: "#1877f2",
                  fontWeight: 600,
                }}
              >
                Facebook
              </Button>
              <Button
                variant="outline"
                color="blue"
                leftIcon={<IconBrandTwitter size={18} />}
                onClick={() => {
                  const url = `https://twitter.com/intent/tweet?url=${encodeURIComponent(
                    window.location.href
                  )}&text=${encodeURIComponent(property?.propertyTitle || "Check out this amazing property!")}`;
                  window.open(url, "_blank");
                }}
                style={{
                  borderColor: "#1da1f2",
                  color: "#1da1f2",
                  fontWeight: 600,
                }}
              >
                Twitter
              </Button>
              <Button
                variant="outline"
                color="green"
                leftIcon={<IconBrandWhatsapp size={18} />}
                onClick={() => {
                  const url = `https://wa.me/?text=${encodeURIComponent(
                    `🏠 Check out this amazing property: ${property?.propertyTitle} - ${window.location.href}`
                  )}`;
                  window.open(url, "_blank");
                }}
                style={{
                  borderColor: "#25d366",
                  color: "#25d366",
                  fontWeight: 600,
                }}
              >
                WhatsApp
              </Button>
              <Button
                variant="outline"
                color="blue"
                leftIcon={<IconBrandLinkedin size={18} />}
                onClick={() => {
                  const url = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
                    window.location.href
                  )}`;
                  window.open(url, "_blank");
                }}
                style={{
                  borderColor: "#0077b5",
                  color: "#0077b5",
                  fontWeight: 600,
                }}
              >
                LinkedIn
              </Button>
              <Button
                variant="outline"
                color="blue"
                leftIcon={<IconBrandTelegram size={18} />}
                onClick={() => {
                  const url = `https://t.me/share/url?url=${encodeURIComponent(
                    window.location.href
                  )}&text=${encodeURIComponent(property?.propertyTitle || "Check out this property!")}`;
                  window.open(url, "_blank");
                }}
                style={{
                  borderColor: "#0088cc",
                  color: "#0088cc",
                  fontWeight: 600,
                }}
              >
                Telegram
              </Button>
              <Button
                variant="outline"
                color="gray"
                leftIcon={<IconMail size={18} />}
                onClick={() => {
                  const subject = `🏠 Property: ${property?.propertyTitle}`;
                  const body = `Check out this amazing property:\n\n${property?.propertyTitle}\n${property?.propertyCity} • ${property?.areaSize} ${property?.areaSizeUnit}\n\nView details: ${window.location.href}`;
                  const url = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
                  window.open(url);
                }}
                style={{
                  borderColor: "#6c757d",
                  color: "#6c757d",
                  fontWeight: 600,
                }}
              >
                Email
              </Button>
            </SimpleGrid>
          </Box>

          {/* Property Summary Card */}
          <Box
            style={{
              background: "linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)",
              padding: "20px",
              borderRadius: "12px",
              border: "1px solid #e9ecef",
              position: "relative",
              overflow: "hidden",
            }}
          >
            <Box
              style={{
                position: "absolute",
                top: 0,
                right: 0,
                width: "100px",
                height: "100px",
                background: "linear-gradient(45deg, #D92228, #ff6b6b)",
                borderRadius: "0 12px 0 100px",
                opacity: 0.1,
              }}
            />
            <Group spacing="md" align="flex-start">
              {property?.images?.[0] && (
                <Image
                  src={property.images[0]}
                  alt={property.propertyTitle}
                  width={80}
                  height={80}
                  radius="md"
                  style={{ objectFit: "cover" }}
                />
              )}
              <Box style={{ flex: 1 }}>
                <Text size="md" weight={700} color="#2c3e50" mb="xs">
                  {property?.propertyTitle || "Amazing Property"}
                </Text>
                <Group spacing="xs" mb="xs">
                  <IconMapPin size={14} style={{ color: "#6c757d" }} />
                  <Text size="sm" color="dimmed">
                    {property?.propertyCity} • {property?.areaSize} {property?.areaSizeUnit}
                  </Text>
                </Group>
                <Group spacing="xs" mb="xs">
                  <IconBed size={14} style={{ color: "#6c757d" }} />
                  <Text size="sm" color="dimmed">
                    {property?.noOfBedRooms} Bed • {property?.noOfBathrooms} Bath
                  </Text>
                </Group>
                <Text size="lg" weight={700} color="#D92228">
                  Rs. {formatPrice(property?.totalPrice || property?.monthlyRent)}
                  {property?.propertyIs === "For Rent" && "/Month"}
                </Text>
              </Box>
            </Group>
          </Box>

          {/* QR Code Option */}
          <Box style={{ textAlign: "center" }}>
            <Text size="sm" color="dimmed" mb="md">
              Or scan this QR code to view the property
            </Text>
            <Button
              variant="light"
              color="gray"
              leftIcon={<IconQrcode size={18} />}
              onClick={() => {
                // You can implement QR code generation here
                showNotification({
                  title: "QR Code",
                  message: "QR code feature coming soon!",
                  color: "blue",
                });
              }}
              style={{
                backgroundColor: "#f8f9fa",
                color: "#6c757d",
                border: "1px solid #e9ecef",
              }}
            >
              Generate QR Code
            </Button>
          </Box>
        </Stack>
      </Modal>
    </Box>
  );
};

export default PropertyPage;
