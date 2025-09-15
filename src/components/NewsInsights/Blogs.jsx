import {
  Button,
  Center,
  Container,
  Grid,
  Group,
  Image,
  Paper,
  Text,
  Card,
  Badge,
  Stack,
  Avatar,
  ActionIcon,
  Skeleton,
  Alert,
  Title,
  Box,
  Divider,
  createStyles,
  Modal,
  Input,
  SimpleGrid,
} from "@mantine/core";
import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { useMediaQuery } from "@mantine/hooks";
import { useNavigate } from "react-router-dom";
import {
  IconCalendar,
  IconUser,
  IconEye,
  IconHeart,
  IconShare,
  IconArrowRight,
  IconAlertCircle,
  IconCopy,
  IconCheck,
  IconBrandFacebook,
  IconBrandTwitter,
  IconBrandWhatsapp,
  IconBrandLinkedin,
  IconBrandTelegram,
  IconMail,
  IconMapPin,
  IconQrcode,
} from "@tabler/icons";

const useStyles = createStyles((theme) => ({
  heroSection: {
    background: "linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)",
    borderRadius: "16px",
    padding: "40px 24px",
    marginBottom: "32px",
    textAlign: "center",
    border: "1px solid #e9ecef",
  },
  blogCard: {
    border: "1px solid #e9ecef",
    borderRadius: "16px",
    padding: "0",
    transition: "all 0.3s ease",
    backgroundColor: "white",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    overflow: "hidden",
    "&:hover": {
      boxShadow: "0 8px 25px rgba(0, 0, 0, 0.1)",
      transform: "translateY(-4px)",
      borderColor: "#D92228",
    },
  },
  blogImage: {
    height: "250px",
    objectFit: "cover",
    transition: "transform 0.3s ease",
    "&:hover": {
      transform: "scale(1.05)",
    },
  },
  blogContent: {
    padding: "24px",
    flex: 1,
    display: "flex",
    flexDirection: "column",
  },
  blogTitle: {
    fontSize: "20px",
    fontWeight: 700,
    lineHeight: 1.3,
    marginBottom: "12px",
    color: "#2c3e50",
    display: "-webkit-box",
    WebkitLineClamp: 2,
    WebkitBoxOrient: "vertical",
    overflow: "hidden",
  },
  blogExcerpt: {
    color: "#6c757d",
    lineHeight: 1.6,
    fontSize: "14px",
    display: "-webkit-box",
    WebkitLineClamp: 3,
    WebkitBoxOrient: "vertical",
    overflow: "hidden",
    flex: 1,
  },
  authorInfo: {
    marginTop: "16px",
    paddingTop: "16px",
    borderTop: "1px solid #f1f3f4",
  },
  actionButtons: {
    marginTop: "16px",
    paddingTop: "16px",
    borderTop: "1px solid #f1f3f4",
  },
  emptyState: {
    textAlign: "center",
    padding: "60px 20px",
    color: "#6c757d",
  },
  loadingSkeleton: {
    borderRadius: "16px",
  },
}));

const Blogs = () => {
  const match1000 = useMediaQuery("(max-width: 1000px)");
  const match700 = useMediaQuery("(max-width: 700px)");
  const match400 = useMediaQuery("(max-width: 400px)");
  const { classes } = useStyles();

  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [shareOpened, setShareOpened] = useState(false);
  const [selectedBlog, setSelectedBlog] = useState(null);
  const [linkCopied, setLinkCopied] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    axios
      .get(import.meta.env.VITE_REACT_APP_BACKEND_URL + "/blog/getAllBlogs")
      .then((res) => {
        setBlogs(res.data?.body || []);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setError("Failed to load blogs. Please try again later.");
        setLoading(false);
      });
  }, []);

  const formatDate = (dateString) => {
    if (!dateString) return "Unknown date";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const stripHtml = (html) => {
    if (!html) return "";
    const doc = new DOMParser().parseFromString(html, "text/html");
    return doc.body.textContent || "";
  };

  const getExcerpt = (content, maxLength = 150) => {
    const plainText = stripHtml(content);
    return plainText.length > maxLength ? plainText.substring(0, maxLength) + "..." : plainText;
  };

  const handleShare = (blog) => {
    setSelectedBlog(blog);
    setShareOpened(true);
  };

  const handleCopyLink = () => {
    const blogUrl = `${window.location.origin}/blog/${selectedBlog?._id}`;
    navigator.clipboard.writeText(blogUrl);
    setLinkCopied(true);
    setTimeout(() => setLinkCopied(false), 2000);
  };

  if (error) {
    return (
      <Container size="xl" py="xl">
        <Alert icon={<IconAlertCircle size={16} />} title="Error Loading Blogs" color="red" variant="light">
          {error}
        </Alert>
      </Container>
    );
  }

  return (
    <Container size="xl" py="xl">
      {/* Hero Section */}
      <Box className={classes.heroSection}>
        <Title
          order={1}
          style={{
            fontSize: match700 ? "2rem" : "2.5rem",
            fontWeight: 800,
            color: "#D92228",
            marginBottom: "16px",
          }}
        >
          REMS News & Insights
        </Title>
        <Text
          size="lg"
          style={{
            color: "#6c757d",
            maxWidth: "600px",
            margin: "0 auto",
            marginBottom: "24px",
          }}
        >
          Stay updated with the latest real estate trends, market insights, and expert advice
        </Text>
      </Box>

      {/* Loading State */}
      {loading && (
        <Grid>
          {[...Array(6)].map((_, index) => (
            <Grid.Col key={index} xs={12} sm={6} md={4}>
              <Card className={classes.blogCard}>
                <Skeleton height={250} className={classes.loadingSkeleton} />
                <Box className={classes.blogContent}>
                  <Skeleton height={24} mb="xs" />
                  <Skeleton height={16} mb="sm" />
                  <Skeleton height={16} mb="sm" />
                  <Skeleton height={16} width="60%" />
                </Box>
              </Card>
            </Grid.Col>
          ))}
        </Grid>
      )}

      {/* Empty State */}
      {!loading && blogs.length === 0 && (
        <Box className={classes.emptyState}>
          <IconAlertCircle size={48} style={{ color: "#6c757d", marginBottom: "16px" }} />
          <Title order={3} style={{ color: "#6c757d", marginBottom: "8px" }}>
            No Blogs Available
          </Title>
          <Text size="lg" style={{ color: "#6c757d", marginBottom: "24px" }}>
            Check back later for the latest real estate insights and news
          </Text>
        </Box>
      )}

      {/* Blog Grid */}
      {!loading && blogs.length > 0 && (
        <Grid>
          {blogs.map((blog, index) => (
            <Grid.Col key={blog._id || index} xs={12} sm={6} md={4}>
              <Card className={classes.blogCard}>
                {/* Blog Image */}
                <Box style={{ position: "relative", overflow: "hidden" }}>
                  <Image
                    src={blog?.coverImage}
                    alt={blog?.title}
                    height={250}
                    className={classes.blogImage}
                    fallbackSrc="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjNmNGY2Ii8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSIxNCIgZmlsbD0iIzZjNzU3ZCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPk5vIEltYWdlPC90ZXh0Pjwvc3ZnPg=="
                  />
                  <Badge
                    style={{
                      position: "absolute",
                      top: "12px",
                      right: "12px",
                      backgroundColor: "rgba(217, 34, 40, 0.9)",
                      color: "white",
                      fontWeight: 600,
                    }}
                  >
                    Blog #{index + 1}
                  </Badge>
                </Box>

                {/* Blog Content */}
                <Box className={classes.blogContent}>
                  <Text
                    className={classes.blogTitle}
                    style={{ cursor: "pointer" }}
                    onClick={() => navigate(`/blog/${blog._id}`)}
                  >
                    {blog?.title || "Untitled Blog"}
                  </Text>

                  <Text className={classes.blogExcerpt}>{getExcerpt(blog?.blog)}</Text>

                  {/* Author Info */}
                  <Box className={classes.authorInfo}>
                    <Group spacing="sm">
                      <Avatar size="sm" radius="xl" color="red" style={{ backgroundColor: "#D92228" }}>
                        {blog?.addedBy?.name?.charAt(0) || "U"}
                      </Avatar>
                      <Box style={{ flex: 1 }}>
                        <Text size="sm" weight={500} color="dark">
                          {blog?.addedBy?.name || "Unknown Author"}
                        </Text>
                        <Group spacing="xs" mt={4}>
                          <IconCalendar size={12} style={{ color: "#6c757d" }} />
                          <Text size="xs" color="dimmed">
                            {formatDate(blog?.createdAt)}
                          </Text>
                        </Group>
                      </Box>
                    </Group>
                  </Box>

                  {/* Action Buttons */}
                  <Box className={classes.actionButtons}>
                    <Group position="apart">
                      <Group spacing="xs">
                        <ActionIcon
                          variant="subtle"
                          color="red"
                          size="sm"
                          style={{ backgroundColor: "rgba(217, 34, 40, 0.1)" }}
                        >
                          <IconHeart size={16} />
                        </ActionIcon>
                        <ActionIcon variant="subtle" color="gray" size="sm" onClick={() => handleShare(blog)}>
                          <IconShare size={16} />
                        </ActionIcon>
                      </Group>
                      <Button
                        variant="subtle"
                        size="sm"
                        rightIcon={<IconArrowRight size={14} />}
                        style={{
                          color: "#D92228",
                          fontWeight: 600,
                        }}
                        onClick={() => navigate(`/blog/${blog._id}`)}
                      >
                        Read More
                      </Button>
                    </Group>
                  </Box>
                </Box>
              </Card>
            </Grid.Col>
          ))}
        </Grid>
      )}

      {/* Enhanced Share Modal */}
      <Modal
        opened={shareOpened}
        onClose={() => setShareOpened(false)}
        title={
          <Group spacing="sm">
            <IconShare size={20} style={{ color: "#D92228" }} />
            <Text weight={600} size="lg">
              Share Blog
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
            Share this insightful blog with friends and colleagues
          </Text>

          {/* Copy Link Section */}
          <Box>
            <Text size="sm" weight={600} mb="md" style={{ color: "#2c3e50" }}>
              Blog Link
            </Text>
            <Group spacing="xs">
              <Input
                value={`${window.location.origin}/blog/${selectedBlog?._id}`}
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
                    onClick={handleCopyLink}
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
                    `${window.location.origin}/blog/${selectedBlog?._id}`
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
                    `${window.location.origin}/blog/${selectedBlog?._id}`
                  )}&text=${encodeURIComponent(selectedBlog?.title || "Check out this amazing blog post!")}`;
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
                    `📝 Check out this blog post: ${selectedBlog?.title} - ${window.location.origin}/blog/${selectedBlog?._id}`
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
                    `${window.location.origin}/blog/${selectedBlog?._id}`
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
                    `${window.location.origin}/blog/${selectedBlog?._id}`
                  )}&text=${encodeURIComponent(selectedBlog?.title || "Check out this blog post!")}`;
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
                  const subject = `📝 Blog: ${selectedBlog?.title}`;
                  const body = `Check out this insightful blog post:\n\n${selectedBlog?.title}\n\nRead more: ${window.location.origin}/blog/${selectedBlog?._id}`;
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

          {/* Blog Summary Card */}
          {selectedBlog && (
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
                {selectedBlog?.coverImage && (
                  <Image
                    src={selectedBlog.coverImage}
                    alt={selectedBlog.title}
                    width={80}
                    height={80}
                    radius="md"
                    style={{ objectFit: "cover" }}
                  />
                )}
                <Box style={{ flex: 1 }}>
                  <Text size="md" weight={700} color="#2c3e50" mb="xs">
                    {selectedBlog?.title || "Amazing Blog Post"}
                  </Text>
                  <Group spacing="xs" mb="xs">
                    <IconUser size={14} style={{ color: "#6c757d" }} />
                    <Text size="sm" color="dimmed">
                      {selectedBlog?.addedBy?.name || "Unknown Author"}
                    </Text>
                  </Group>
                  <Group spacing="xs" mb="xs">
                    <IconCalendar size={14} style={{ color: "#6c757d" }} />
                    <Text size="sm" color="dimmed">
                      {formatDate(selectedBlog?.createdAt)}
                    </Text>
                  </Group>
                  <Text size="sm" color="dimmed" style={{ lineHeight: 1.4 }}>
                    {getExcerpt(selectedBlog?.blog, 100)}
                  </Text>
                </Box>
              </Group>
            </Box>
          )}

          {/* QR Code Option */}
          <Box style={{ textAlign: "center" }}>
            <Text size="sm" color="dimmed" mb="md">
              Or scan this QR code to view the blog
            </Text>
            <Button
              variant="light"
              color="gray"
              leftIcon={<IconQrcode size={18} />}
              onClick={() => {
                // You can implement QR code generation here
                console.log("QR code generation for blog:", selectedBlog?._id);
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
    </Container>
  );
};

export default Blogs;
