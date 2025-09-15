import {
  Group,
  Stack,
  Text,
  createStyles,
  SimpleGrid,
  Card,
  Divider,
  Box,
  ThemeIcon,
  Badge,
  Anchor,
  Avatar,
  Button,
} from "@mantine/core";
import {
  IconBuilding,
  IconMail,
  IconPhone,
  IconWorld,
  IconBrandFacebook,
  IconBrandInstagram,
  IconUser,
  IconMapPin,
  IconCrown,
  IconExternalLink,
} from "@tabler/icons";
import React from "react";

const AgencyDetails = ({ property }) => {
  const useStyles = createStyles((theme) => ({
    agencyCard: {
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
    contactCard: {
      border: "1px solid #e9ecef",
      borderRadius: "12px",
      padding: "20px",
      background: "linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)",
    },
    agencyIcon: {
      backgroundColor: "#fff5f5",
      color: "#D92228",
    },
    premiumBadge: {
      background: "linear-gradient(45deg, #D92228, #ff6b6b)",
      color: "white",
    },
  }));

  const { classes } = useStyles();

  if (!property?.agency) {
    return (
      <Box>
        <Text className={classes.sectionTitle}>Agency Information</Text>
        <Card className={classes.agencyCard}>
          <Group spacing="md">
            <ThemeIcon size="lg" className={classes.agencyIcon} radius="md">
              <IconBuilding size={20} />
            </ThemeIcon>
            <Box>
              <Text weight={600} color="#2c3e50">
                No Agency Information
              </Text>
              <Text color="dimmed" mt="xs">
                This property is not associated with any agency.
              </Text>
            </Box>
          </Group>
        </Card>
      </Box>
    );
  }

  const agency = property.agency;

  const contactInfo = [
    {
      key: "agencyPhone",
      label: "Phone",
      icon: <IconPhone size={20} />,
      value: agency?.agencyPhone,
      type: "phone",
    },
    {
      key: "agencyLandline",
      label: "Landline",
      icon: <IconPhone size={20} />,
      value: agency?.agencyLandline,
      type: "phone",
    },
    {
      key: "agencyWhatsapp",
      label: "WhatsApp",
      icon: <IconPhone size={20} />,
      value: agency?.agencyWhatsapp,
      type: "phone",
    },
    {
      key: "agencyInfoEmail",
      label: "Email",
      icon: <IconMail size={20} />,
      value: agency?.agencyInfoEmail,
      type: "email",
    },
    {
      key: "agencyFeedbackEmail",
      label: "Feedback Email",
      icon: <IconMail size={20} />,
      value: agency?.agencyFeedbackEmail,
      type: "email",
    },
  ].filter((info) => info.value);

  const socialLinks = [
    {
      key: "agencyWebsite",
      label: "Website",
      icon: <IconWorld size={20} />,
      value: agency?.agencyWebsite,
      color: "blue",
    },
    {
      key: "agencyFacebook",
      label: "Facebook",
      icon: <IconBrandFacebook size={20} />,
      value: agency?.agencyFacebook,
      color: "blue",
    },
    {
      key: "agencyInstagram",
      label: "Instagram",
      icon: <IconBrandInstagram size={20} />,
      value: agency?.agencyInstagram,
      color: "pink",
    },
  ].filter((link) => link.value);

  return (
    <Stack spacing="xl">
      {/* Agency Header */}
      <Box>
        <Group spacing="md" mb="md">
          <Avatar size="xl" color="red" radius="md">
            {agency?.agencyTitle?.charAt(0) || "A"}
          </Avatar>
          <Box style={{ flex: 1 }}>
            <Group spacing="md" align="flex-start">
              <Box style={{ flex: 1 }}>
                <Text size="xl" weight={800} color="#2c3e50">
                  {agency?.agencyTitle || "Agency Name"}
                </Text>
                <Text color="dimmed" mt="xs">
                  {agency?.agencyDescription || "Professional Real Estate Agency"}
                </Text>
              </Box>
              {agency?.subscription && (
                <Badge className={classes.premiumBadge} leftSection={<IconCrown size={14} />} size="lg">
                  {agency.subscription}
                </Badge>
              )}
            </Group>
          </Box>
        </Group>
      </Box>

      {/* Contact Information */}
      {contactInfo.length > 0 && (
        <Box>
          <Text className={classes.sectionTitle}>Contact Information</Text>
          <SimpleGrid cols={2} spacing="md">
            {contactInfo.map((info) => (
              <Card key={info.key} className={classes.contactCard}>
                <Group spacing="md">
                  <ThemeIcon size="lg" className={classes.agencyIcon} radius="md">
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

      {/* Social Media & Website */}
      {socialLinks.length > 0 && (
        <>
          <Divider />
          <Box>
            <Text className={classes.sectionTitle}>Social Media & Website</Text>
            <SimpleGrid cols={3} spacing="md">
              {socialLinks.map((link) => (
                <Card key={link.key} className={classes.agencyCard}>
                  <Group spacing="md">
                    <ThemeIcon size="lg" color={link.color} variant="light" radius="md">
                      {link.icon}
                    </ThemeIcon>
                    <Box style={{ flex: 1 }}>
                      <Text size="sm" color="dimmed" weight={500}>
                        {link.label}
                      </Text>
                      <Anchor
                        href={link.value}
                        target="_blank"
                        rel="noopener noreferrer"
                        size="sm"
                        style={{ wordBreak: "break-all" }}
                      >
                        Visit {link.label}
                        <IconExternalLink size={12} style={{ marginLeft: 4 }} />
                      </Anchor>
                    </Box>
                  </Group>
                </Card>
              ))}
            </SimpleGrid>
          </Box>
        </>
      )}

      {/* Agency Details */}
      <Divider />
      <Box>
        <Text className={classes.sectionTitle}>Agency Details</Text>
        <SimpleGrid cols={2} spacing="md">
          {agency?.agencyPointOfContact?.name && (
            <Card className={classes.agencyCard}>
              <Group spacing="md">
                <ThemeIcon size="lg" className={classes.agencyIcon} radius="md">
                  <IconUser size={20} />
                </ThemeIcon>
                <Box>
                  <Text size="sm" color="dimmed" weight={500}>
                    Point of Contact
                  </Text>
                  <Text size="lg" weight={600} color="#2c3e50">
                    {agency.agencyPointOfContact.name}
                  </Text>
                </Box>
              </Group>
            </Card>
          )}

          {agency?.agencyAddress && (
            <Card className={classes.agencyCard}>
              <Group spacing="md">
                <ThemeIcon size="lg" className={classes.agencyIcon} radius="md">
                  <IconMapPin size={20} />
                </ThemeIcon>
                <Box>
                  <Text size="sm" color="dimmed" weight={500}>
                    Agency Address
                  </Text>
                  <Text size="md" weight={500} color="#2c3e50">
                    {agency.agencyAddress}
                  </Text>
                </Box>
              </Group>
            </Card>
          )}
        </SimpleGrid>
      </Box>

      {/* Contact Agency Button */}
      <Box style={{ textAlign: "center" }}>
        <Button
          size="lg"
          radius="md"
          style={{
            background: "linear-gradient(45deg, #D92228, #ff6b6b)",
            border: "none",
            fontWeight: 600,
            boxShadow: "0 4px 12px rgba(217, 34, 40, 0.3)",
          }}
          leftIcon={<IconPhone size={18} />}
        >
          Contact This Agency
        </Button>
      </Box>
    </Stack>
  );
};

export default AgencyDetails;
