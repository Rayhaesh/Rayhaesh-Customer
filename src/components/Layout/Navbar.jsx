import {
  createStyles,
  Header,
  Group,
  Button,
  Text,
  Divider,
  Menu,
  Burger,
  Drawer,
  ScrollArea,
  Box,
  Stack,
} from "@mantine/core";
import RemsLogo from "../../assets/images/Logo.png";
import { useLocation, useNavigate } from "react-router-dom";
import { Avatar } from "@mantine/core";
import { Link } from "react-router-dom";

import { useDisclosure, useMediaQuery } from "@mantine/hooks";
import {
  IconLogout,
  IconSettings,
  IconHome,
  IconShoppingBag,
  IconCash,
  IconExchange,
  IconHome2,
  IconNews,
  IconCategory,
} from "@tabler/icons";
import { useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";
import axios from "axios";

const useStyles = createStyles((theme) => ({
  link: {
    display: "flex",
    alignItems: "center",
    paddingLeft: theme.spacing.md,
    paddingRight: theme.spacing.md,
    textDecoration: "none",
    color: "black",
    fontWeight: 400,
    fontSize: "1.2rem",
    fontFamily: "Poppins",

    [theme.fn.smallerThan("sm")]: {
      height: 42,
      display: "flex",
      alignItems: "center",
      width: "100%",
    },

    ...theme.fn.hover({
      backgroundColor: theme.colorScheme === "dark" ? theme.colors.red[6] : theme.colors.red[0],
    }),
  },

  imageContainer: {
    width: "95px",
    height: "80px",

    [theme.fn.smallerThan("xs")]: {
      width: "160px",
      height: "40px",
    },
  },

  mobileLink: {
    display: "flex",
    alignItems: "center",
    width: "80%",
    textDecoration: "none",
    color: "black",
    fontWeight: 500,
    fontSize: "1.2rem",
    fontFamily: "Poppins",

    [theme.fn.smallerThan("sm")]: {
      height: 42,
      display: "flex",
      alignItems: "center",
      width: "85%",
    },

    ...theme.fn.hover({
      backgroundColor: theme.colorScheme === "dark" ? theme.colors.red[6] : theme.colors.red[0],
    }),
  },

  hiddenMobile: {
    [theme.fn.smallerThan("xl")]: {
      display: "none",
    },
  },

  hiddenDesktop: {
    display: "block",
    [theme.fn.largerThan("lg")]: {
      display: "none",
    },
  },
}));

export default function Navbar() {
  const [loggedIn, setLoggedIn] = useState(true);
  const navigate = useNavigate();
  const isMobile = useMediaQuery("(max-width: 768px)");

  const { auth, setAuth } = useAuth();

  // Debug logging
  console.log("isMobile:", isMobile);
  console.log("drawerOpened:", drawerOpened);

  // console.log('====================================')
  // console.log('auth checking in the navbar: ', auth)
  // console.log('====================================')

  const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] = useDisclosure(false);
  const { classes, theme } = useStyles();
  const [error, setError] = useState("");

  const [allUsers, setAllUsers] = useState([]);
  const [loggedUser, setLoggedUser] = useState({});

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [profileImage, setProfileImage] = useState(null);

  const location = useLocation();

  useEffect(() => {
    axios
      .get(import.meta.env.VITE_REACT_APP_BACKEND_URL + "/admin/getAllUsers")
      .then((data) => {
        setAllUsers(data.data);
      })
      .catch((error) => {
        setError(error);
      });
  }, []);

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
        setProfileImage(res.data?.body?.profileImage);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const activeLinkStyles = {
    backgroundColor: "#D92228",
    color: "white",
    borderColor: "#D92228",
    fontWeight: 600,
    boxShadow: "0 2px 4px rgba(217, 34, 40, 0.3)",
  };

  const normalLinkStyles = {
    color: "#495057",
    borderColor: "#e9ecef",
    backgroundColor: "transparent",
    fontWeight: 500,
    "&:hover": {
      backgroundColor: "#f8f9fa",
      borderColor: "#D92228",
      color: "#D92228",
    },
  };

  return (
    <>
      <Header
        height={95}
        px="md"
        style={{
          position: "sticky",
          top: 0,
          zIndex: 20,
          backgroundColor: "white",
          borderBottom: "1px solid #e9ecef",
          boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
        }}
      >
        <Group position="apart" sx={{ height: "100%" }}>
          <Box
            sx={{
              "&:hover": {
                cursor: "pointer",
              },
            }}
            onClick={() => {
              navigate("/");
            }}
          >
            <img src={RemsLogo} alt="TRA Rems Logo" className={classes.imageContainer} />
          </Box>
          <Group sx={{ height: "100%" }} spacing={12} className={classes.hiddenMobile}>
            <Button
              variant="outline"
              sx={location.pathname === "/" ? activeLinkStyles : normalLinkStyles}
              className={classes.link}
              onClick={() => {
                navigate("/");
              }}
              size="md"
              radius="md"
            >
              Home
            </Button>

            <Button
              variant="outline"
              sx={location.pathname === "/properties" ? activeLinkStyles : normalLinkStyles}
              className={classes.link}
              onClick={() => {
                navigate("/properties");
              }}
              size="md"
              radius="md"
            >
              Buy
            </Button>

            <Button
              variant="outline"
              sx={location.pathname === "/exchange" ? activeLinkStyles : normalLinkStyles}
              className={classes.link}
              onClick={() => {
                navigate("/exchange");
              }}
              size="md"
              radius="md"
            >
              Exchange
            </Button>

            <Button
              variant="outline"
              sx={location.pathname === "/rent" ? activeLinkStyles : normalLinkStyles}
              className={classes.link}
              onClick={() => {
                navigate("/rent");
              }}
              size="md"
              radius="md"
            >
              Rent
            </Button>

            <Button
              variant="outline"
              sx={location.pathname === "/blogs" ? activeLinkStyles : normalLinkStyles}
              className={classes.link}
              onClick={() => {
                navigate("/blogs");
              }}
              size="md"
              radius="md"
            >
              News & Insights
            </Button>
            {/*
            {auth ? (
              <Button
                variant="outline"
                sx={
                  location.pathname === "/subscription"
                    ? activeLinkStyles
                    : normalLinkStyles
                }
                className={classes.link}
                onClick={() => {
                  navigate("/subscription");
                }}
              >
                Subscription
              </Button>
            ) : null} */}

            <Button
              variant="outline"
              sx={location.pathname === "/contact" ? activeLinkStyles : normalLinkStyles}
              className={classes.link}
              onClick={() => {
                navigate("/contact");
              }}
              size="md"
              radius="md"
            >
              Feedback
            </Button>
          </Group>

          <Group className={classes.hiddenMobile} spacing={"sm"}>
            {!auth ? (
              <>
                <Button
                  variant="outline"
                  sx={{
                    color: "#D92228",
                    borderColor: "#D92228",
                    fontFamily: "poppins",
                    fontWeight: 600,
                    "&:hover": {
                      backgroundColor: "#f8f9fa",
                      borderColor: "#c41e3a",
                    },
                  }}
                  size="md"
                  radius="md"
                  onClick={() => {
                    navigate("/login");
                  }}
                >
                  Log in
                </Button>
                <Button
                  variant="outline"
                  sx={{
                    color: "#D92228",
                    borderColor: "#D92228",
                    fontFamily: "poppins",
                    fontWeight: 600,
                    "&:hover": {
                      backgroundColor: "#f8f9fa",
                      borderColor: "#c41e3a",
                    },
                  }}
                  size="md"
                  radius="md"
                  onClick={() => {
                    navigate("/register");
                  }}
                >
                  Sign up
                </Button>
                <Button
                  style={{
                    color: "white",
                    backgroundColor: "#D92228",
                    fontFamily: "poppins",
                    fontWeight: 600,
                    boxShadow: "0 2px 4px rgba(217, 34, 40, 0.3)",
                    "&:hover": {
                      backgroundColor: "#c41e3a",
                    },
                  }}
                  size="md"
                  radius="md"
                  onClick={() => {
                    navigate("/subscription");
                  }}
                >
                  Subscription
                </Button>
              </>
            ) : (
              <Menu
                transition="pop-top-right"
                position="top-end"
                width={200}
                withinPortal
                sx={{
                  "&:hover": {
                    cursor: "pointer",
                  },
                }}
              >
                <Menu.Target>
                  <Avatar src={profileImage} alt="" size={40} color="red" mr={"xl"} />
                </Menu.Target>

                <Menu.Dropdown style={{ borderColor: "#D92228" }}>
                  <Menu.Item
                    icon={<IconCategory size={20} style={{ color: "blueviolet" }} />}
                    onClick={() => {
                      navigate("/dashboard", {
                        state: {
                          activeTab: "properties",
                        },
                      });
                    }}
                  >
                    <Text style={{ fontFamily: "poppins" }}>Dashboard</Text>
                  </Menu.Item>
                  <Menu.Item
                    icon={<IconSettings size={20} style={{ color: "blueviolet" }} />}
                    onClick={() => {
                      navigate("/dashboard", {
                        state: {
                          activeTab: "settings",
                        },
                      });
                    }}
                  >
                    <Text style={{ fontFamily: "poppins" }}>Settings</Text>
                  </Menu.Item>
                  <Menu.Item
                    icon={<IconLogout size={20} style={{ color: "#D92228" }} />}
                    onClick={() => {
                      navigate("/");
                      setAuth(null);
                      localStorage.clear("token");
                    }}
                  >
                    <Text
                      style={{
                        fontFamily: "poppins",
                      }}
                    >
                      Logout
                    </Text>
                  </Menu.Item>
                </Menu.Dropdown>
              </Menu>
            )}
          </Group>

          <Burger
            opened={drawerOpened}
            onClick={() => {
              console.log("Burger clicked, drawerOpened:", drawerOpened);
              toggleDrawer();
            }}
            color="#D92228"
            size="lg"
            style={{
              display: isMobile ? "block" : "none",
              visibility: "visible",
              opacity: 1,
              zIndex: 1000,
            }}
          />
        </Group>
      </Header>

      <Drawer
        opened={drawerOpened && isMobile}
        onClose={closeDrawer}
        size={350}
        zIndex={1000000}
        styles={{
          closeButton: {
            color: "white",
            backgroundColor: "#D92228",
            borderRadius: 20,
            top: 10,
            right: 10,
            "&:hover": {
              backgroundColor: "#c41e3a",
            },
          },
          drawer: {
            backgroundColor: "#f8f9fa",
          },
        }}
        position="right"
        title="Menu"
      >
        <ScrollArea sx={{ height: "calc(100vh - 60px)" }}>
          {auth && (
            <Group
              style={{
                justifyContent: "left",
                cursor: "pointer",
              }}
              pl={35}
              noWrap
              p={"xs"}
              bg={theme.colorScheme === "dark" ? "dark.5" : "gray.1"}
            >
              <Avatar src={profileImage} alt="User Info here" size={50} color="red" radius={50} />

              <Stack spacing={0}>
                <Text
                  style={{
                    fontSize: "16px",
                    fontWeight: 500,
                    wordBreak: "break-all",
                  }}
                  lineClamp={1}
                >
                  {auth?.email}
                </Text>
              </Stack>
            </Group>
          )}

          <Divider my="sm" color={theme.colorScheme === "dark" ? "dark.5" : "gray.1"} />
          <Group
            spacing="lg"
            style={{
              justifyContent: "center",
            }}
          >
            <Button
              sx={{
                color: "white",
                backgroundColor: "#D92228",
                fontFamily: "poppins",
                fontWeight: 600,
                borderRadius: "8px",
                "&:hover": {
                  backgroundColor: "#c41e3a",
                },
              }}
              className={classes.mobileLink}
              size="md"
              leftIcon={<IconCategory />}
              onClick={() => {
                navigate("/dashboard");
                closeDrawer();
              }}
            >
              Dashboard
            </Button>

            <Button
              sx={{
                color: "white",
                backgroundColor: "#D92228",
                fontFamily: "poppins",
                fontWeight: 600,
                borderRadius: "8px",
                "&:hover": {
                  backgroundColor: "#c41e3a",
                },
              }}
              className={classes.mobileLink}
              size="md"
              leftIcon={<IconHome />}
              onClick={() => {
                navigate("/");
                closeDrawer();
              }}
            >
              Home
            </Button>

            <Button
              sx={{
                color: "white",
                backgroundColor: "#D92228",
                fontFamily: "poppins",
                fontWeight: 600,
                borderRadius: "8px",
                "&:hover": {
                  backgroundColor: "#c41e3a",
                },
              }}
              className={classes.mobileLink}
              size="md"
              leftIcon={<IconShoppingBag />}
              onClick={() => {
                navigate("/properties");
                closeDrawer();
              }}
            >
              Buy
            </Button>

            <Button
              sx={{
                color: "white",
                backgroundColor: "#D92228",
                fontFamily: "poppins",
                fontWeight: 600,
                borderRadius: "8px",
                "&:hover": {
                  backgroundColor: "#c41e3a",
                },
              }}
              className={classes.mobileLink}
              size="md"
              leftIcon={<IconExchange />}
              onClick={() => {
                navigate("/exchange");
                closeDrawer();
              }}
            >
              Exchange
            </Button>

            <Button
              sx={{
                color: "white",
                backgroundColor: "#D92228",
                fontFamily: "poppins",
                fontWeight: 600,
                borderRadius: "8px",
                "&:hover": {
                  backgroundColor: "#c41e3a",
                },
              }}
              className={classes.mobileLink}
              size="md"
              leftIcon={<IconHome2 />}
              onClick={() => {
                navigate("/rent");
                closeDrawer();
              }}
            >
              Rent
            </Button>

            <Button
              sx={{
                color: "white",
                backgroundColor: "#D92228",
                fontFamily: "poppins",
                fontWeight: 600,
                borderRadius: "8px",
                "&:hover": {
                  backgroundColor: "#c41e3a",
                },
              }}
              className={classes.mobileLink}
              size="md"
              leftIcon={<IconNews />}
              onClick={() => {
                navigate("/blogs");
                closeDrawer();
              }}
            >
              News & Insights
            </Button>
            {/*
            <Button
              sx={{
                color: "white",
                backgroundColor: "#D92228",
                fontFamily: "poppins",
              }}
              className={classes.mobileLink}
              size="md"
              leftIcon={<IconNews />}
              onClick={() => {
                navigate("/subscription");
                closeDrawer();
              }}
            >
              Subscription
            </Button> */}

            <Button
              sx={{
                color: "white",
                backgroundColor: "#D92228",
                fontFamily: "poppins",
                fontWeight: 600,
                borderRadius: "8px",
                "&:hover": {
                  backgroundColor: "#c41e3a",
                },
              }}
              className={classes.mobileLink}
              size="md"
              leftIcon={<IconCash />}
              onClick={() => {
                navigate("/contact");
                closeDrawer();
              }}
            >
              Contact
            </Button>
          </Group>

          <Divider my="sm" color={theme.colorScheme === "dark" ? "dark.5" : "gray.1"} />

          {!auth ? (
            <Group position="center" grow px={"2rem"}>
              <Button
                variant="outline"
                style={{
                  color: "#D92228",
                  borderColor: "#D92228",
                  fontWeight: 600,
                  borderRadius: "8px",
                }}
                onClick={() => {
                  navigate("/login");
                  closeDrawer();
                }}
              >
                Log in
              </Button>
              <Button
                variant="filled"
                style={{
                  backgroundColor: "#D92228",
                  color: "white",
                  fontWeight: 600,
                  borderRadius: "8px",
                  boxShadow: "0 2px 4px rgba(217, 34, 40, 0.3)",
                }}
                onClick={() => {
                  navigate("/register");
                  closeDrawer();
                }}
              >
                Sign up
              </Button>
            </Group>
          ) : (
            <Group position="center" grow pb="xl" px={32}>
              <Button
                variant="outline"
                onClick={() => {
                  setAuth(null);
                  closeDrawer();
                }}
                style={{
                  color: "#D92228",
                  borderColor: "#D92228",
                  fontWeight: 600,
                  borderRadius: "8px",
                }}
              >
                Sign Out
              </Button>
            </Group>
          )}
        </ScrollArea>
      </Drawer>
    </>
  );
}
