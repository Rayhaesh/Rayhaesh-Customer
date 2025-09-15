import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { filtering } from "../components/Buy/BuyFilter";

export const usePropertyListings = (propertyType) => {
  // Filter states
  const [city, setCity] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [categoryValue, setCategoryValue] = useState([]);
  const [subCategoryValue, setSubCategoryValue] = useState([]);
  const [areaValue, setAreaValue] = useState([]);
  const [priceValue, setPriceValue] = useState([]);

  // Data states
  const [allproperties, setAllProperties] = useState([]);
  const [error, setError] = useState("");
  const [loading, setIsLoaded] = useState(true);
  const [query, setQuery] = useState("");

  // Modal state
  const [opened, setOpened] = useState(false);

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(9);

  const location = useLocation();

  // Initialize filters from location state
  useEffect(() => {
    let cityFromLocation = location?.state?.city
      ? Array.isArray(location?.state?.city)
        ? location?.state?.city
        : [location?.state?.city]
      : [];
    let subCategoryFromLocation = location?.state?.SubCategory
      ? Array.isArray(location?.state?.SubCategory)
        ? location?.state?.SubCategory
        : [location?.state?.SubCategory]
      : [];
    let priceFromLocation = location?.state?.price
      ? Array.isArray(location?.state?.price)
        ? location?.state?.price
        : [location?.state?.price]
      : [];

    setCity(cityFromLocation);
    setSubCategoryValue(subCategoryFromLocation);
    setPriceValue(priceFromLocation);
  }, [location]);

  // Apply filters
  useEffect(() => {
    setFilteredData(filtering(city, categoryValue, subCategoryValue, areaValue, priceValue, allproperties));
  }, [city, categoryValue, areaValue, priceValue, subCategoryValue, allproperties]);

  // Fetch properties
  useEffect(() => {
    axios
      .get(import.meta.env.VITE_REACT_APP_BACKEND_URL + "/user/getAllProperties")
      .then((data) => {
        setIsLoaded(false);

        let filteredProperties;
        if (propertyType) {
          filteredProperties = data.data.body.filter((property) => property?.propertyIs === propertyType);
        } else {
          filteredProperties = data.data.body;
        }

        setAllProperties(filteredProperties);
        setFilteredData(filteredProperties);
      })
      .catch((error) => {
        setIsLoaded(false);
        setError(error);
      });
  }, [propertyType]);

  // Pagination calculations
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

  return {
    // Filter states
    city,
    setCity,
    categoryValue,
    setCategoryValue,
    subCategoryValue,
    setSubCategoryValue,
    areaValue,
    setAreaValue,
    priceValue,
    setPriceValue,

    // Data states
    allproperties,
    filteredData,
    loading,
    error,
    query,
    setQuery,

    // Modal state
    opened,
    setOpened,

    // Pagination
    currentPage,
    postsPerPage,
    currentPosts,
    paginate,
  };
};
