import {
  TextInput,
  PasswordInput,
  Anchor,
  Paper,
  Title,
  Text,
  Container,
  Group,
  Button,
  Stack,
  Radio,
  Box,
  Divider,
  Card,
} from "@mantine/core";
import { IconAt, IconCheck, IconX, IconLock, IconUser, IconArrowLeft, IconBuilding, IconHome } from "@tabler/icons";
import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { showNotification } from "@mantine/notifications";
import { useForm } from "@mantine/form";
import { useMediaQuery } from "@mantine/hooks";

export default function SignUp() {
  const [loading, setLoading] = useState(false);
  const isMobile = useMediaQuery("(max-width: 768px)");
  const navigate = useNavigate();

  const form = useForm({
    initialValues: {
      email: "",
      password: "",
      confirmPassword: "",
      gender: "",
      name: "",
      userType: "buyer",
    },

    validate: {
      email: (value) => (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value) ? "Invalid email address" : null),
      password: (value) => (value?.length < 4 ? "Password must have at least 4 characters" : null),
      confirmPassword: (value) => (value !== form.values?.password ? "Passwords must match" : null),
      name: (value) => (value?.length < 2 ? "Name must have at least 2 letters" : null),
      gender: (value) => (value === "" ? "Select a Gender!" : null),
    },
  });

  const handleSubmit = (values) => {
    setLoading(true);
    axios
      .post(import.meta.env.VITE_REACT_APP_BACKEND_URL + "/user/signup", values, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      })
      .then((res) => {
        console.log(res?.data);
        console.log(res?.accessToken);
        console.log(JSON.stringify(res));
        setLoading(false);

        if (res?.data?.success === true) {
          showNotification({
            title: "Registration Successful",
            message: "Your account has been created successfully!",
            color: "green",
            icon: <IconCheck size={14} />,
            autoClose: true,
          });
          navigate("/login", { replace: true });
        } else {
          showNotification({
            title: "Registration Failed",
            message: "Email Already Taken!",
            color: "red",
            icon: <IconX size={14} />,
            autoClose: true,
          });
        }
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
        showNotification({
          title: "Registration Failed",
          message: "No Response from the server!",
          color: "red",
          icon: <IconX size={14} />,
          autoClose: true,
        });
      });
  };

  console.log("====================================");
  console.log("buyerType", form.values?.userType);
  console.log("====================================");

  return (
    <Box
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: isMobile ? "20px" : "40px",
      }}
    >
      <Container size={isMobile ? "100%" : 520} style={{ maxWidth: "100%" }}>
        <Paper
          shadow="xl"
          p={isMobile ? 24 : 40}
          radius="md"
          style={{
            border: "1px solid #e9ecef",
            background: "white",
            position: "relative",
            overflow: "hidden",
          }}
        >
          {/* Background decoration */}
          <Box
            style={{
              position: "absolute",
              top: -50,
              right: -50,
              width: 100,
              height: 100,
              borderRadius: "50%",
              background: "linear-gradient(45deg, #D92228, #ff6b6b)",
              opacity: 0.1,
            }}
          />
          <Box
            style={{
              position: "absolute",
              bottom: -30,
              left: -30,
              width: 60,
              height: 60,
              borderRadius: "50%",
              background: "linear-gradient(45deg, #D92228, #ff6b6b)",
              opacity: 0.1,
            }}
          />

          {/* Header */}
          <Box style={{ textAlign: "center", marginBottom: 32, position: "relative", zIndex: 1 }}>
            <Title
              order={1}
              style={{
                fontSize: isMobile ? "28px" : "36px",
                fontWeight: 800,
                color: "#2c3e50",
                marginBottom: 8,
                background: "linear-gradient(45deg, #D92228, #ff6b6b)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Join Our Community!
            </Title>
            <Text
              size="lg"
              style={{
                color: "#6c757d",
                fontWeight: 500,
                marginBottom: 24,
              }}
            >
              Create your account and start your property journey
            </Text>
          </Box>

          {/* Form */}
          <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
            <Stack spacing="xl">
              {/* User Type Selection */}
              <Box>
                <Text size="sm" weight={600} style={{ color: "#2c3e50", marginBottom: 12 }}>
                  I want to sign up as:
                </Text>
                <Group spacing="md">
                  <Card
                    style={{
                      border: `2px solid ${form.values.userType === "buyer" ? "#D92228" : "#e9ecef"}`,
                      cursor: "pointer",
                      transition: "all 0.2s ease",
                      backgroundColor: form.values.userType === "buyer" ? "#fff5f5" : "white",
                    }}
                    onClick={() => form.setFieldValue("userType", "buyer")}
                    p="md"
                  >
                    <Group spacing="sm">
                      <IconHome size={20} color={form.values.userType === "buyer" ? "#D92228" : "#6c757d"} />
                      <Text
                        weight={600}
                        style={{
                          color: form.values.userType === "buyer" ? "#D92228" : "#6c757d",
                        }}
                      >
                        Buyer
                      </Text>
                    </Group>
                  </Card>
                  <Card
                    style={{
                      border: `2px solid ${form.values.userType === "agencyOwner" ? "#D92228" : "#e9ecef"}`,
                      cursor: "pointer",
                      transition: "all 0.2s ease",
                      backgroundColor: form.values.userType === "agencyOwner" ? "#fff5f5" : "white",
                    }}
                    onClick={() => form.setFieldValue("userType", "agencyOwner")}
                    p="md"
                  >
                    <Group spacing="sm">
                      <IconBuilding size={20} color={form.values.userType === "agencyOwner" ? "#D92228" : "#6c757d"} />
                      <Text
                        weight={600}
                        style={{
                          color: form.values.userType === "agencyOwner" ? "#D92228" : "#6c757d",
                        }}
                      >
                        Seller
                      </Text>
                    </Group>
                  </Card>
                </Group>
              </Box>

              <TextInput
                icon={<IconUser size={18} />}
                label="Full Name"
                placeholder="Enter your full name"
                size="lg"
                radius="md"
                {...form.getInputProps("name")}
                styles={{
                  input: {
                    border: "2px solid #e9ecef",
                    fontSize: "16px",
                    padding: "16px 20px",
                    transition: "all 0.2s ease",
                    "&:focus": {
                      borderColor: "#D92228",
                      boxShadow: "0 0 0 3px rgba(217, 34, 40, 0.1)",
                    },
                  },
                  label: {
                    fontWeight: 600,
                    color: "#2c3e50",
                    marginBottom: 8,
                  },
                }}
              />

              <TextInput
                icon={<IconAt size={18} />}
                label="Email Address"
                placeholder="Enter your email address"
                size="lg"
                radius="md"
                {...form.getInputProps("email")}
                styles={{
                  input: {
                    border: "2px solid #e9ecef",
                    fontSize: "16px",
                    padding: "16px 20px",
                    transition: "all 0.2s ease",
                    "&:focus": {
                      borderColor: "#D92228",
                      boxShadow: "0 0 0 3px rgba(217, 34, 40, 0.1)",
                    },
                  },
                  label: {
                    fontWeight: 600,
                    color: "#2c3e50",
                    marginBottom: 8,
                  },
                }}
              />

              <PasswordInput
                icon={<IconLock size={18} />}
                label="Password"
                placeholder="Create a strong password"
                size="lg"
                radius="md"
                {...form.getInputProps("password")}
                styles={{
                  input: {
                    border: "2px solid #e9ecef",
                    fontSize: "16px",
                    padding: "16px 20px",
                    transition: "all 0.2s ease",
                    "&:focus": {
                      borderColor: "#D92228",
                      boxShadow: "0 0 0 3px rgba(217, 34, 40, 0.1)",
                    },
                  },
                  label: {
                    fontWeight: 600,
                    color: "#2c3e50",
                    marginBottom: 8,
                  },
                }}
              />

              <PasswordInput
                icon={<IconLock size={18} />}
                label="Confirm Password"
                placeholder="Confirm your password"
                size="lg"
                radius="md"
                {...form.getInputProps("confirmPassword")}
                styles={{
                  input: {
                    border: "2px solid #e9ecef",
                    fontSize: "16px",
                    padding: "16px 20px",
                    transition: "all 0.2s ease",
                    "&:focus": {
                      borderColor: "#D92228",
                      boxShadow: "0 0 0 3px rgba(217, 34, 40, 0.1)",
                    },
                  },
                  label: {
                    fontWeight: 600,
                    color: "#2c3e50",
                    marginBottom: 8,
                  },
                }}
              />

              {/* Gender Selection */}
              <Box>
                <Text size="sm" weight={600} style={{ color: "#2c3e50", marginBottom: 12 }}>
                  Gender:
                </Text>
                <Radio.Group {...form.getInputProps("gender")} spacing="lg">
                  <Group spacing="lg">
                    <Radio
                      value="male"
                      label="Male"
                      color="red"
                      size="md"
                      styles={{
                        label: {
                          fontWeight: 500,
                          color: "#2c3e50",
                        },
                      }}
                    />
                    <Radio
                      value="female"
                      label="Female"
                      color="red"
                      size="md"
                      styles={{
                        label: {
                          fontWeight: 500,
                          color: "#2c3e50",
                        },
                      }}
                    />
                  </Group>
                </Radio.Group>
              </Box>

              <Button
                fullWidth
                size="lg"
                radius="md"
                type="submit"
                loading={loading}
                style={{
                  background: "linear-gradient(45deg, #D92228, #ff6b6b)",
                  border: "none",
                  fontWeight: 700,
                  fontSize: "16px",
                  padding: "16px",
                  marginTop: 8,
                  boxShadow: "0 4px 15px rgba(217, 34, 40, 0.3)",
                  transition: "all 0.2s ease",
                  color: "white",
                }}
                styles={{
                  root: {
                    color: "white !important",
                    "&:hover": {
                      transform: "translateY(-2px)",
                      boxShadow: "0 6px 20px rgba(217, 34, 40, 0.4)",
                      backgroundColor: "#D92228 !important",
                      color: "white !important",
                    },
                    "&:active": {
                      transform: "translateY(0)",
                    },
                  },
                }}
              >
                {loading ? "Creating Account..." : "Create Account"}
              </Button>
            </Stack>
          </form>

          {/* Footer */}
          <Box style={{ textAlign: "center", marginTop: 32, position: "relative", zIndex: 1 }}>
            <Divider
              label="Already have an account?"
              labelPosition="center"
              style={{
                marginBottom: 20,
                "& .mantine-Divider-label": {
                  color: "#6c757d",
                  fontWeight: 500,
                },
              }}
            />
            <Link to="/login" style={{ textDecoration: "none" }}>
              <Button
                variant="outline"
                size="lg"
                radius="md"
                fullWidth
                style={{
                  borderColor: "#D92228",
                  color: "#D92228",
                  fontWeight: 600,
                  fontSize: "16px",
                  padding: "16px",
                  transition: "all 0.2s ease",
                }}
                styles={{
                  root: {
                    "&:hover": {
                      backgroundColor: "#D92228",
                      color: "white !important",
                      transform: "translateY(-1px)",
                      boxShadow: "0 4px 12px rgba(217, 34, 40, 0.3)",
                    },
                  },
                }}
              >
                Sign In Instead
              </Button>
            </Link>
          </Box>
        </Paper>

        {/* Back to Home */}
        <Box style={{ textAlign: "center", marginTop: 24 }}>
          <Link to="/" style={{ textDecoration: "none" }}>
            <Group
              spacing={8}
              style={{
                color: "#6c757d",
                cursor: "pointer",
                transition: "color 0.2s ease",
                justifyContent: "center",
              }}
              className="hover:text-red-600"
            >
              <IconArrowLeft size={16} />
              <Text size="sm" weight={500}>
                Back to Home
              </Text>
            </Group>
          </Link>
        </Box>
      </Container>
    </Box>
  );
}
