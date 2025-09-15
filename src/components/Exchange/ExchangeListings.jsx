import React from "react";
import ListingLayout from "../Generic/ListingLayout";
import { usePropertyListings } from "../../hooks/usePropertyListings";

const ExchangeListings = () => {
  const {
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
    allproperties,
    filteredData,
    loading,
    error,
    query,
    setQuery,
    opened,
    setOpened,
    currentPage,
    postsPerPage,
    currentPosts,
    paginate,
  } = usePropertyListings("For Exchange");

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <ListingLayout
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
      opened={opened}
      setOpened={setOpened}
      loading={loading}
      allproperties={allproperties}
      filteredData={filteredData}
      currentPosts={currentPosts}
      query={query}
      setQuery={setQuery}
      postsPerPage={postsPerPage}
      paginate={paginate}
      currentPage={currentPage}
      propertyType="Exchange Properties"
    />
  );
};

export default ExchangeListings;
