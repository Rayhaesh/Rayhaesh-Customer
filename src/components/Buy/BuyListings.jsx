import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Container,
  Grid,
  Group,
  Input,
  Paper,
  Skeleton,
  Text,
  Modal,
  createStyles,
  SimpleGrid,
} from "@mantine/core";
import BuyCards from "./BuyCards";
import axios from "axios";
import Filter from "../Filters/Filter";
import SixCardSkeleton from "../Skeletons/SixCardSkeleton";
import { Link, useLocation } from "react-router-dom";
import { Pagination } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { IconSearch } from "@tabler/icons";
import ListingPagination from "../Generic/ListingPagination";
import { filtering } from "./BuyFilter";

const BuyListings = () => {
  const [opened, setOpened] = useState(false);
  const match1200 = useMediaQuery("(max-width: 1280px)");

  // Filter Hooks here

  //City Hooks
  const [city, setCity] = React.useState([]);
  const [filteredData, setFilteredData] = React.useState([]);

  //Category Hooks
  const [categoryValue, setCategoryValue] = useState([]);

  //SubCategory Hooks
  const [subCategoryValue, setSubCategoryValue] = useState([]);

  //Area Hooks
  const [areaValue, setAreaValue] = useState([]);

  //Price Hooks
  const [priceValue, setPriceValue] = useState([]);

  // ----------------------------------------------

  const [allproperties, setAllProperties] = useState([]);
  const [error, setError] = useState("");
  const [loading, setIsLoaded] = useState(true);

  const [query, setQuery] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(9);

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = filteredData.slice(indexOfFirstPost, indexOfLastPost);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const location = useLocation();

  useEffect(() => {
    let city = location?.state?.city
      ? Array.isArray(location?.state?.city)
        ? location?.state?.city
        : [location?.state?.city]
      : [];
    let SubCategory = location?.state?.SubCategory
      ? Array.isArray(location?.state?.SubCategory)
        ? location?.state?.SubCategory
        : [location?.state?.SubCategory]
      : [];
    let Price = location?.state?.price
      ? Array.isArray(location?.state?.price)
        ? location?.state?.price
        : [location?.state?.price]
      : [];

    setCity(city);
    setSubCategoryValue(SubCategory);
    setPriceValue(Price);
  }, [location]);

  useEffect(() => {
    setFilteredData(filtering(city, categoryValue, subCategoryValue, areaValue, priceValue, allproperties));
  }, [city, categoryValue, areaValue, priceValue, subCategoryValue, allproperties]);

  useEffect(() => {
    axios
      .get(import.meta.env.VITE_REACT_APP_BACKEND_URL + "/user/getAllProperties")
      .then((data) => {
        setIsLoaded(false);
        setAllProperties(data?.data?.body);
        setFilteredData(data?.data?.body);
      })
      .catch((error) => {
        setIsLoaded(false);
        setError(error);
      });
  }, []);

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <>
      <Container size="xl">
        <Grid py="md">
          <Grid.Col md={3} hidden={match1200 ? true : false}>
            <Filter
              city={city}
              setCity={setCity}
              categoryValue={categoryValue}
              setCategoryValue={setCategoryValue}
              subCategoryValue={subCategoryValue}
              setSubCategoryValue={setSubCategoryValue}
              areaValue={areaValue}
              setAreaValue={setAreaValue}
              priceValue={priceValue}
              setPriceValue={setPriceValue}
            />
          </Grid.Col>

          <Grid.Col md={!match1200 ? 9 : 12}>
            <Box
              style={{
                backgroundColor: "#f8f9fa",
                padding: "20px",
                borderRadius: "12px",
                marginBottom: "24px",
                border: "1px solid #e9ecef",
              }}
            >
              <Group
                style={{
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
                mb="md"
              >
                <Group noWrap spacing={8}>
                  <Text
                    style={{
                      fontWeight: 700,
                      fontSize: "18px",
                      color: "#2c3e50",
                    }}
                  >
                    {filteredData?.length}
                  </Text>
                  <Text
                    style={{
                      fontSize: "16px",
                      color: "#6c757d",
                    }}
                  >
                    Properties Found
                  </Text>
                </Group>

                {match1200 && (
                  <Button
                    onClick={() => {
                      setOpened(true);
                    }}
                    style={{
                      backgroundColor: "#D92228",
                      color: "white",
                      borderRadius: "8px",
                      fontWeight: 600,
                      padding: "12px 20px",
                      boxShadow: "0 2px 8px rgba(217, 34, 40, 0.3)",
                    }}
                    leftIcon={<IconSearch size={16} />}
                    size="md"
                  >
                    Filters
                  </Button>
                )}
              </Group>

              <Group
                style={{
                  width: "100%",
                }}
                position="apart"
                noWrap
              >
                <Input
                  placeholder="Search by city, property type, or keywords..."
                  icon={<IconSearch size={18} />}
                  style={{
                    width: match1200 ? "100%" : "400px",
                    flex: match1200 ? 1 : "none",
                  }}
                  onChange={(e) => setQuery(e.target.value)}
                  value={query}
                  styles={{
                    input: {
                      borderRadius: "8px",
                      border: "2px solid #e9ecef",
                      fontSize: "14px",
                      padding: "12px 16px",
                      "&:focus": {
                        borderColor: "#D92228",
                        boxShadow: "0 0 0 3px rgba(217, 34, 40, 0.1)",
                      },
                    },
                  }}
                />
              </Group>
            </Box>
            {loading ? (
              <SixCardSkeleton />
            ) : allproperties.length === 0 ? (
              <Group position="center" mt={"md"}>
                <Text>No Properties Found</Text>
              </Group>
            ) : (
              <SimpleGrid
                cols={3}
                breakpoints={[
                  { maxWidth: 1000, cols: 2, spacing: "sm" },
                  { maxWidth: 600, cols: 1, spacing: "xs" },
                ]}
                sx={{
                  "& > div": {
                    padding: "4px",
                    display: "flex",
                    justifyContent: "center",
                  },
                }}
              >
                {currentPosts
                  .filter((property) => {
                    if (query === "") {
                      return property;
                    } else if (property?.propertyCity?.toLowerCase().includes(query.toLowerCase())) {
                      return property;
                    }
                  })
                  ?.map((property) => {
                    return (
                      <Link
                        to={`/property/${property?._id}`}
                        state={{ data: property }}
                        style={{ textDecoration: "none" }}
                      >
                        <BuyCards property={property} key={property._id} />
                      </Link>
                    );
                  })}
              </SimpleGrid>
            )}
            <ListingPagination
              postsPerPage={postsPerPage}
              totalPosts={allproperties.length}
              paginate={paginate}
              currentPosts={currentPosts}
              filteredData={filteredData}
              currentPage={currentPage}
            />
          </Grid.Col>
        </Grid>
      </Container>
      <Modal
        opened={opened}
        onClose={() => setOpened(false)}
        title={
          <Group position="apart" style={{ width: "100%" }}>
            <Text style={{ fontSize: 22, fontWeight: 700, color: "#2c3e50" }}>Advanced Filters</Text>
            <Group noWrap spacing={8}>
              <Text style={{ fontSize: 14, color: "#6c757d" }}>{filteredData?.length} results</Text>
            </Group>
          </Group>
        }
        size="lg"
        fullScreen={match1200}
        styles={{
          modal: {
            borderRadius: match1200 ? "0" : "16px",
            maxHeight: match1200 ? "100vh" : "90vh",
          },
          header: {
            borderBottom: "1px solid #e9ecef",
            paddingBottom: 16,
            marginBottom: 20,
            backgroundColor: "#f8f9fa",
            borderRadius: match1200 ? "0" : "16px 16px 0 0",
          },
          body: {
            padding: match1200 ? "20px" : "24px",
            maxHeight: match1200 ? "calc(100vh - 80px)" : "calc(90vh - 80px)",
            overflowY: "auto",
          },
        }}
      >
        <Filter
          city={city}
          setCity={setCity}
          categoryValue={categoryValue}
          setCategoryValue={setCategoryValue}
          subCategoryValue={subCategoryValue}
          setSubCategoryValue={setSubCategoryValue}
          areaValue={areaValue}
          setAreaValue={setAreaValue}
          priceValue={priceValue}
          setPriceValue={setPriceValue}
        />

        {match1200 && (
          <Group mt="xl" position="center">
            <Button
              onClick={() => setOpened(false)}
              style={{
                backgroundColor: "#D92228",
                color: "white",
                borderRadius: "8px",
                fontWeight: 600,
                padding: "12px 32px",
                minWidth: "120px",
              }}
              size="lg"
            >
              Apply Filters
            </Button>
          </Group>
        )}
      </Modal>
    </>
  );
};

export default BuyListings;
