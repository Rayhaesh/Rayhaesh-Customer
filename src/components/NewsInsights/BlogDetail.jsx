import {
  Container,
  Paper,
  Text,
  Title,
  Image,
  Group,
  Avatar,
  Badge,
  Box,
  Divider,
  Button,
  ActionIcon,
  Skeleton,
  Alert,
  createStyles,
  Stack,
} from "@mantine/core";
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { IconArrowLeft, IconCalendar, IconUser, IconHeart, IconShare, IconAlertCircle, IconClock } from "@tabler/icons";
import { useMediaQuery } from "@mantine/hooks";

const useStyles = createStyles((theme) => ({
  heroSection: {
    background: "linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)",
    borderRadius: "16px",
    padding: "32px 24px",
    marginBottom: "32px",
    border: "1px solid #e9ecef",
  },
  blogContainer: {
    maxWidth: "800px",
    margin: "0 auto",
  },
  blogImage: {
    borderRadius: "12px",
    marginBottom: "24px",
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
  },
  blogContent: {
    lineHeight: 1.8,
    fontSize: "16px",
    color: "#2c3e50",
    "& h1, & h2, & h3, & h4, & h5, & h6": {
      color: "#D92228",
      marginTop: "24px",
      marginBottom: "12px",
    },
    "& p": {
      marginBottom: "16px",
    },
    "& ul, & ol": {
      marginBottom: "16px",
      paddingLeft: "24px",
    },
    "& li": {
      marginBottom: "8px",
    },
    "& blockquote": {
      borderLeft: "4px solid #D92228",
      paddingLeft: "16px",
      margin: "16px 0",
      fontStyle: "italic",
      backgroundColor: "#f8f9fa",
      padding: "16px",
      borderRadius: "8px",
    },
    "& img": {
      maxWidth: "100%",
      height: "auto",
      borderRadius: "8px",
      margin: "16px 0",
    },
  },
  authorCard: {
    border: "1px solid #e9ecef",
    borderRadius: "12px",
    padding: "20px",
    backgroundColor: "white",
    marginTop: "32px",
  },
  actionButtons: {
    position: "sticky",
    top: "20px",
    zIndex: 10,
  },
  backButton: {
    marginBottom: "24px",
  },
  loadingSkeleton: {
    borderRadius: "12px",
  },
}));

const BlogDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { classes } = useStyles();
  const match700 = useMediaQuery("(max-width: 700px)");

  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${import.meta.env.VITE_REACT_APP_BACKEND_URL}/blog/getAllBlogs`);

        if (response.data?.success && response.data.body) {
          // Find the specific blog by ID from the list
          const foundBlog = response.data.body.find((blog) => blog._id === id);
          if (foundBlog) {
            setBlog(foundBlog);
          } else {
            setError("Blog not found");
          }
        } else {
          setError("Failed to load blogs");
        }
      } catch (err) {
        console.error("Error fetching blog:", err);
        setError("Failed to load blog. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchBlog();
    }
  }, [id]);

  const formatDate = (dateString) => {
    if (!dateString) return "Unknown date";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const getReadingTime = (content) => {
    if (!content) return "1 min read";
    const wordsPerMinute = 200;
    const wordCount = content.replace(/<[^>]*>/g, "").split(/\s+/).length;
    const minutes = Math.ceil(wordCount / wordsPerMinute);
    return `${minutes} min read`;
  };

  if (loading) {
    return (
      <Container size="xl" py="xl">
        <Box className={classes.blogContainer}>
          <Skeleton height={40} width={200} className={classes.loadingSkeleton} mb="xl" />
          <Skeleton height={300} className={classes.loadingSkeleton} mb="xl" />
          <Skeleton height={24} mb="md" />
          <Skeleton height={16} mb="sm" />
          <Skeleton height={16} mb="sm" />
          <Skeleton height={16} mb="sm" />
          <Skeleton height={16} width="60%" />
        </Box>
      </Container>
    );
  }

  if (error) {
    return (
      <Container size="xl" py="xl">
        <Alert icon={<IconAlertCircle size={16} />} title="Error Loading Blog" color="red" variant="light">
          {error}
        </Alert>
        <Button
          leftIcon={<IconArrowLeft size={16} />}
          onClick={() => navigate("/blogs")}
          mt="md"
          style={{ backgroundColor: "#D92228" }}
        >
          Back to Blogs
        </Button>
      </Container>
    );
  }

  if (!blog) {
    return (
      <Container size="xl" py="xl">
        <Alert icon={<IconAlertCircle size={16} />} title="Blog Not Found" color="yellow" variant="light">
          The blog you're looking for doesn't exist or has been removed.
        </Alert>
        <Button
          leftIcon={<IconArrowLeft size={16} />}
          onClick={() => navigate("/blogs")}
          mt="md"
          style={{ backgroundColor: "#D92228" }}
        >
          Back to Blogs
        </Button>
      </Container>
    );
  }

  return (
    <Container size="xl" py="xl">
      <Box className={classes.blogContainer}>
        {/* Back Button */}
        <Button
          variant="subtle"
          leftIcon={<IconArrowLeft size={16} />}
          onClick={() => navigate("/blogs")}
          className={classes.backButton}
          style={{ color: "#D92228" }}
        >
          Back to Blogs
        </Button>

        {/* Blog Header */}
        <Paper className={classes.heroSection}>
          <Title
            order={1}
            style={{
              fontSize: match700 ? "1.8rem" : "2.5rem",
              fontWeight: 800,
              color: "#2c3e50",
              marginBottom: "16px",
              lineHeight: 1.2,
            }}
          >
            {blog.title}
          </Title>

          <Group spacing="lg" mb="md">
            <Group spacing="xs">
              <IconCalendar size={16} style={{ color: "#6c757d" }} />
              <Text size="sm" color="dimmed">
                {formatDate(blog.createdAt)}
              </Text>
            </Group>
            <Group spacing="xs">
              <IconClock size={16} style={{ color: "#6c757d" }} />
              <Text size="sm" color="dimmed">
                {getReadingTime(blog.blog)}
              </Text>
            </Group>
          </Group>

          <Group position="apart" align="center">
            <Group spacing="sm">
              <Avatar size="md" radius="xl" color="red" style={{ backgroundColor: "#D92228" }}>
                {blog?.addedBy?.name?.charAt(0) || "U"}
              </Avatar>
              <Box>
                <Text weight={600} size="sm">
                  {blog?.addedBy?.name || "Unknown Author"}
                </Text>
                <Text size="xs" color="dimmed">
                  Author
                </Text>
              </Box>
            </Group>

            <Group spacing="xs">
              <ActionIcon variant="subtle" color="red" size="lg" style={{ backgroundColor: "rgba(217, 34, 40, 0.1)" }}>
                <IconHeart size={18} />
              </ActionIcon>
              <ActionIcon variant="subtle" color="gray" size="lg">
                <IconShare size={18} />
              </ActionIcon>
            </Group>
          </Group>
        </Paper>

        {/* Blog Image */}
        {blog.coverImage && (
          <Image
            src={blog.coverImage}
            alt={blog.title}
            className={classes.blogImage}
            fallbackSrc="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAwIiBoZWlnaHQ9IjQwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjNmNGY2Ii8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSIxOCIgZmlsbD0iIzZjNzU3ZCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPk5vIEltYWdlPC90ZXh0Pjwvc3ZnPg=="
          />
        )}

        {/* Blog Content */}
        <Paper
          p="xl"
          style={{
            border: "1px solid #e9ecef",
            borderRadius: "16px",
            backgroundColor: "white",
          }}
        >
          <div className={classes.blogContent} dangerouslySetInnerHTML={{ __html: blog.blog }} />
        </Paper>

        {/* Author Card */}
        <Paper className={classes.authorCard}>
          <Group spacing="md">
            <Avatar size="xl" radius="xl" color="red" style={{ backgroundColor: "#D92228" }}>
              {blog?.addedBy?.name?.charAt(0) || "U"}
            </Avatar>
            <Box style={{ flex: 1 }}>
              <Title order={4} style={{ color: "#2c3e50", marginBottom: "8px" }}>
                {blog?.addedBy?.name || "Unknown Author"}
              </Title>
              <Text color="dimmed" size="sm" mb="md">
                Real Estate Expert
              </Text>
              <Text size="sm" color="dimmed">
                Published on {formatDate(blog.createdAt)}
              </Text>
            </Box>
          </Group>
        </Paper>

        {/* Action Buttons */}
        <Group position="center" mt="xl">
          <Button
            leftIcon={<IconArrowLeft size={16} />}
            onClick={() => navigate("/blogs")}
            variant="outline"
            size="lg"
            style={{
              borderColor: "#D92228",
              color: "#D92228",
            }}
          >
            Back to All Blogs
          </Button>
        </Group>
      </Box>
    </Container>
  );
};

export default BlogDetail;
