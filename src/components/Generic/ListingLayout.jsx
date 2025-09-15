import React from "react";
import { Container, Grid } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import Filter from "../Filters/Filter";
import SearchSection from "./SearchSection";
import PropertyGrid from "./PropertyGrid";
import FilterModal from "./FilterModal";
import ListingPagination from "./ListingPagination";

const ListingLayout = ({
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

  // Modal state
  opened,
  setOpened,

  // Data states
  loading,
  allproperties,
  filteredData,
  currentPosts,
  query,
  setQuery,

  // Pagination
  postsPerPage,
  paginate,
  currentPage,

  // Property type for display
  propertyType = "Properties",
}) => {
  const match1200 = useMediaQuery("(max-width: 1280px)");

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
            <SearchSection
              filteredData={filteredData}
              query={query}
              setQuery={setQuery}
              opened={opened}
              setOpened={setOpened}
              propertyType={propertyType}
            />

            <PropertyGrid
              loading={loading}
              allproperties={allproperties}
              filteredData={filteredData}
              currentPosts={currentPosts}
              query={query}
              propertyType={propertyType}
            />

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

      <FilterModal
        opened={opened}
        setOpened={setOpened}
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
        filteredData={filteredData}
      />
    </>
  );
};

export default ListingLayout;
