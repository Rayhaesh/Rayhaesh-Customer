import { Paper, Title, Text, TextInput, Button, Container, Group, Anchor, Box, Stack } from "@mantine/core";
import { useForm } from "@mantine/form";
import { showNotification } from "@mantine/notifications";
import { IconArrowLeft, IconCheck, IconX, IconAt } from "@tabler/icons";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMediaQuery } from "@mantine/hooks";

export default function ForgotPassword() {
  const [loading, setLoading] = useState(false);
  const isMobile = useMediaQuery("(max-width: 768px)");
  const navigate = useNavigate();

  const form = useForm({
    initialValues: {
      email: "",
    },
    validate: {
      email: (value) => (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value) ? "Invalid email address" : null),
    },
  });

  const handleSubmit = async (values) => {
    setLoading(true);
    try {
      const response = await axios.post(import.meta.env.VITE_REACT_APP_BACKEND_URL + "/user/forgotPassword", values);
      console.log("====================================");
      console.log("response:", response);
      console.log("====================================");
      if (response?.status === 200) {
        showNotification({
          title: "Success",
          message: "Check your email for a reset link",
          color: "green",
          icon: <IconCheck />,
        });
        // navigate('/login')
      }
    } catch (error) {
      console.log("====================================");
      console.log("error:", error);
      console.log("====================================");
      showNotification({
        title: "Error",
        message: error?.response?.data?.message,
        color: "red",
        icon: <IconX />,
      });
    }
    setLoading(false);
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
              Forgot Password?
            </Title>
            <Text
              size="lg"
              style={{
                color: "#6c757d",
                fontWeight: 500,
                marginBottom: 24,
              }}
            >
              Don't worry, we'll help you reset it
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
                {loading ? "Sending Reset Link..." : "Send Reset Link"}
              </Button>
            </Stack>
          </form>

          {/* Back to Login */}
          <Box style={{ textAlign: "center", marginTop: 32, position: "relative", zIndex: 1 }}>
            <Anchor
              onClick={() => navigate("/login")}
              style={{
                color: "#6c757d",
                textDecoration: "none",
                fontWeight: 500,
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                transition: "color 0.2s ease",
                cursor: "pointer",
              }}
              className="hover:text-red-600"
            >
              <IconArrowLeft size={16} />
              <Text size="sm" weight={500}>
                Back to Login
              </Text>
            </Anchor>
          </Box>
        </Paper>

        {/* Back to Home */}
        <Box style={{ textAlign: "center", marginTop: 24 }}>
          <Anchor
            onClick={() => navigate("/")}
            style={{
              color: "#6c757d",
              textDecoration: "none",
              fontWeight: 500,
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              transition: "color 0.2s ease",
              cursor: "pointer",
            }}
            className="hover:text-red-600"
          >
            <IconArrowLeft size={16} />
            <Text size="sm" weight={500}>
              Back to Home
            </Text>
          </Anchor>
        </Box>
      </Container>
    </Box>
  );
}
