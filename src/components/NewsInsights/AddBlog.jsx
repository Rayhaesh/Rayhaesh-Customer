import {
  Button,
  Container,
  Group,
  Paper,
  Stack,
  Text,
  TextInput,
  Textarea,
  Title,
  Box,
  Card,
  Divider,
  createStyles,
  Alert,
  Progress,
} from "@mantine/core";
import { Dropzone, IMAGE_MIME_TYPE } from "@mantine/dropzone";
import { useMediaQuery } from "@mantine/hooks";
import {
  IconCheck,
  IconPhoto,
  IconUpload,
  IconX,
  IconArrowLeft,
  IconAlertCircle,
  IconFileText,
  IconUser,
  IconMail,
  IconCalendar,
} from "@tabler/icons";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import DropZone from "../Generic/DropZone";
import axios from "axios";
import { uploadImage } from "../services/fileUpload";
import { showNotification } from "@mantine/notifications";
import { useForm } from "@mantine/form";

const useStyles = createStyles((theme) => ({
  heroSection: {
    background: "linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)",
    borderRadius: "16px",
    padding: "32px 24px",
    marginBottom: "32px",
    textAlign: "center",
    border: "1px solid #e9ecef",
  },
  formCard: {
    border: "1px solid #e9ecef",
    borderRadius: "16px",
    padding: "32px",
    backgroundColor: "white",
    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.05)",
  },
  formSection: {
    marginBottom: "32px",
  },
  sectionTitle: {
    fontSize: "18px",
    fontWeight: 700,
    color: "#2c3e50",
    marginBottom: "16px",
    display: "flex",
    alignItems: "center",
    gap: "8px",
  },
  inputGroup: {
    marginBottom: "20px",
  },
  label: {
    fontSize: "14px",
    fontWeight: 600,
    color: "#495057",
    marginBottom: "8px",
    display: "block",
  },
  input: {
    borderRadius: "8px",
    border: "2px solid #e9ecef",
    fontSize: "14px",
    padding: "12px 16px",
    transition: "all 0.2s ease",
    "&:focus": {
      borderColor: "#D92228",
      boxShadow: "0 0 0 3px rgba(217, 34, 40, 0.1)",
    },
  },
  textarea: {
    borderRadius: "8px",
    border: "2px solid #e9ecef",
    fontSize: "14px",
    padding: "12px 16px",
    minHeight: "120px",
    transition: "all 0.2s ease",
    "&:focus": {
      borderColor: "#D92228",
      boxShadow: "0 0 0 3px rgba(217, 34, 40, 0.1)",
    },
  },
  actionButtons: {
    marginTop: "32px",
    paddingTop: "24px",
    borderTop: "1px solid #e9ecef",
  },
  progressContainer: {
    marginBottom: "24px",
  },
}));

const AddBlog = () => {
  const [coverImage, setCoverImage] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  const [uploadProgress, setUploadProgress] = React.useState(0);
  const [error, setError] = React.useState(null);
  const { classes } = useStyles();
  const match700 = useMediaQuery("(max-width: 700px)");

  const navigate = useNavigate();

  const handleSubmit = async (values) => {
    setLoading(true);

    const imageURL = await uploadImage(coverImage, "blog-covers");
    values.coverImage = imageURL;
    axios
      .post(
        import.meta.env.VITE_REACT_APP_BACKEND_URL + "/blog/addBlog",

        values,
        {
          headers: {
            token: localStorage.getItem("token"),
          },
        }
      )
      .then((res) => {
        console.log("====================================");
        console.log("res", res);
        console.log("====================================");

        if (res?.data?.success === true) {
          showNotification({
            title: "Blog Added",
            message: "Your blog has been added and is live!",
            color: "green",
            icon: <IconCheck size={14} />,
            autoClose: true,
          });
        } else {
          showNotification({
            title: "Upload Failed",
            message: "Blog posting failed. Please try again.",
            color: "red",
            icon: <IconX size={14} />,
            autoClose: true,
          });
        }
        navigate("/blogs");
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        console.log("====================================");
        console.log("err", err);
        console.log("====================================");
      });
  };

  const form = useForm({
    initialValues: {
      name: "",
      title: "",
      blog: "",
      createdAt: new Date(),
      email: "",
    },

    validate: {
      name: (value) => (value.length < 2 ? "Name must have at least 2 letters" : null),
      title: (value) => (value.length < 5 ? "Title must have at least 5 letters" : null),
      blog: (value) => (value.length < 50 ? "Message must have at least 50 letters" : null),
      email: (value) => (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value) ? "Invalid email address" : null),
    },
  });

  return (
    <>
      <Container size={"xl"}>
        <Paper p={"xl"}>
          <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
            <Text
              weight={700}
              align="center"
              style={{
                fontSize: "2rem",
              }}
              mt={"xl"}
              mb={"xl"}
            >
              Add Blog Details
            </Text>

            <TextInput
              label="Username"
              style={{
                width: "100%",
              }}
              mb={"md"}
              styles={{
                input: { border: "1px solid #a7a7a8" },
                label: {
                  fontSize: "1.1rem",
                  fontWeight: 600,
                },
              }}
              size="md"
              variant="filled"
              {...form.getInputProps("name")}
            />

            <TextInput
              label="Email"
              style={{
                width: "100%",
              }}
              mb={"md"}
              styles={{
                input: { border: "1px solid #a7a7a8" },
                label: {
                  fontSize: "1.1rem",
                  fontWeight: 600,
                },
              }}
              size="md"
              variant="filled"
              {...form.getInputProps("email")}
            />

            <TextInput
              label="Blog Title"
              style={{
                width: "100%",
              }}
              mb={"md"}
              styles={{
                input: { border: "1px solid #a7a7a8" },
                label: {
                  fontSize: "1.1rem",
                  fontWeight: 600,
                },
              }}
              size="md"
              variant="filled"
              {...form.getInputProps("title")}
            />
            <Textarea
              label="Blog Content"
              placeholder="Place the blog content here"
              style={{
                width: "100%",
              }}
              mb={"md"}
              styles={{
                input: { border: "1px solid #a7a7a8" },
                label: {
                  fontSize: "1.1rem",
                  fontWeight: 600,
                },
              }}
              size="md"
              variant="filled"
              {...form.getInputProps("blog")}
            />

            <Group position="center">
              <DropZone value={coverImage} setValue={setCoverImage} />
            </Group>

            <Group mt={"xl"} noWrap position="right">
              <Button color={"red"} onClick={() => navigate("/blogs")}>
                Cancel
              </Button>
              <Button color={"green"} type="submit" loading={loading}>
                Add Blog
              </Button>
            </Group>
          </form>
        </Paper>
      </Container>
    </>
  );
};

export default AddBlog;
