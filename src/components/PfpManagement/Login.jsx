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
  Modal,
  Stack,
  Box,
  Divider,
} from "@mantine/core";
import { IconAt, IconCheck, IconX, IconLock, IconArrowLeft } from "@tabler/icons";
import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import axios from "axios";
import { showNotification } from "@mantine/notifications";
import { useForm } from "@mantine/form";
import { useMediaQuery } from "@mantine/hooks";

export default function Login() {
  const [loading, setLoading] = useState(false);
  const [opened, setOpened] = useState(false);
  const isMobile = useMediaQuery("(max-width: 768px)");

  const navigate = useNavigate();
  const location = useLocation();
  const [routerHistory, setRouterHistory] = useState([]);
  const [loggingInAs, setLoggingInAs] = useState("");

  const from = location.state?.from || "/";

  useEffect(() => {
    setRouterHistory((routerHistory) => [...routerHistory, from]);
  }, [from]);

  const prevLocation = routerHistory[routerHistory.length - 1];

  const { setAuth } = useAuth();

  const form = useForm({
    initialValues: {
      email: "",
      password: "",
    },

    validate: {
      email: (value) => (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value) ? "Invalid email address" : null),
      password: (value) => (value?.length < 4 ? "Password must have at least 4 characters" : null),
    },
  });

  const handleSubmit = (values) => {
    setLoading(true);
    axios
      .post(import.meta.env.VITE_REACT_APP_BACKEND_URL + "/user/login", values, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      })
      .then((response) => {
        console.log(response?.data);
        console.log(JSON.stringify(response));

        if (
          response?.data?.body?.userType === "agencyOwner" ||
          response?.data?.body?.userType === "agencyAgent" ||
          response?.data?.body?.userType === "admin"
        ) {
          setLoggingInAs(response?.data?.body?.userType);
          setOpened(true);
          setLoading(false);
          return;
        }
        const accessToken = response?.data?.token;
        localStorage.setItem("token", accessToken);
        console.log("====================================LoginCheckings");
        console.log(localStorage.getItem("token"));
        console.log(localStorage);
        console.log("====================================LoginChecking");
        setLoading(false);

        if (response?.data?.success === true) {
          showNotification({
            title: "Login Successful",
            message: "You have been successfully logged in!",
            color: "green",
            icon: <IconCheck size={14} />,
            autoClose: true,
          });
          setAuth({
            name: response.data.body?.name,
            email: response.data.body?.email,
            accessToken,
          });
          navigate("/dashboard", { replace: true });
        } else {
          showNotification({
            title: "Login Failed",
            message: "Invalid Credentials",
            color: "red",
            icon: <IconX size={14} />,
            autoClose: true,
          });
        }
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        console.log("====================================");
        console.log(err);
        console.log("====================================");
        if (!err.response) {
          console.log("No response from the server");
          showNotification({
            title: "Login Failed",
            message: "No response from the server",
            color: "red",
            icon: <IconX size={14} />,
            autoClose: true,
          });
        } else if (err.response.status === 401) {
          console.log("Unauthorized");
          showNotification({
            title: "Login Failed",
            message: "Unauthorized",
            color: "red",
            icon: <IconX size={14} />,
            autoClose: true,
          });
        } else if (err.response.status === 400) {
          console.log("Missing Username or password");
          showNotification({
            title: "Login Failed",
            message: "Missing Username or password",
            color: "red",
            icon: <IconX size={14} />,
            autoClose: true,
          });
        } else {
          console.log("Something went wrong, Login Failed");
          showNotification({
            title: "Login Failed",
            message: "Something went wrong, Login Failed",
            color: "red",
            icon: <IconX size={14} />,
            autoClose: true,
          });
        }
      });
  };

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
      <Container size={isMobile ? "100%" : 480} style={{ maxWidth: "100%" }}>
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
              Welcome Back!
            </Title>
            <Text
              size="lg"
              style={{
                color: "#6c757d",
                fontWeight: 500,
                marginBottom: 24,
              }}
            >
              Sign in to continue your property search
            </Text>
          </Box>

          {/* Form */}
          <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
            <Stack spacing="xl">
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
                placeholder="Enter your password"
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

              <Group position="apart" mt="md">
                <Anchor
                  onClick={() => navigate("/forgotPassword")}
                  size="sm"
                  style={{
                    color: "#D92228",
                    textDecoration: "none",
                    fontWeight: 600,
                    transition: "color 0.2s ease",
                    "&:hover": {
                      color: "#b71c1c",
                    },
                  }}
                >
                  Forgot password?
                </Anchor>
              </Group>

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
                {loading ? "Signing In..." : "Sign In"}
              </Button>
            </Stack>
          </form>

          {/* Footer */}
          <Box style={{ textAlign: "center", marginTop: 32, position: "relative", zIndex: 1 }}>
            <Divider
              label="Don't have an account?"
              labelPosition="center"
              style={{
                marginBottom: 20,
                "& .mantine-Divider-label": {
                  color: "#6c757d",
                  fontWeight: 500,
                },
              }}
            />
            <Link to="/register" style={{ textDecoration: "none" }}>
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
                Create New Account
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

      {/* Modal for agency login redirect */}
      <Modal
        opened={opened}
        onClose={() => setOpened(false)}
        title={<Text style={{ fontSize: 20, fontWeight: 700, color: "#2c3e50" }}>Redirect Required</Text>}
        size="md"
        centered
        styles={{
          modal: {
            borderRadius: "8px",
          },
          header: {
            borderBottom: "1px solid #e9ecef",
            paddingBottom: 16,
          },
        }}
      >
        <Stack spacing="md">
          <Text style={{ color: "#6c757d", lineHeight: 1.6 }}>
            You are trying to login as an <strong>{loggingInAs}</strong>. To access the {loggingInAs} dashboard, please
            visit the dedicated portal below.
          </Text>
          <Button
            fullWidth
            component="a"
            href="https://tra-rems-admin-mui.vercel.app/"
            target="_blank"
            style={{
              background: "linear-gradient(45deg, #D92228, #ff6b6b)",
              border: "none",
              fontWeight: 600,
            }}
            onClick={() => setOpened(false)}
          >
            Go to {loggingInAs} Portal
          </Button>
        </Stack>
      </Modal>
    </Box>
  );
}
