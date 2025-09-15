import { Box, Button, Checkbox, Group, Input, NumberInput, Stack, Text } from "@mantine/core";
import React from "react";
import { Divider } from "@mantine/core";
import { MultiSelect } from "@mantine/core";
import PropertyCategoryCB from "./Checkboxes/PropertyCategoryCB";
import PropertySubCategoryCB from "./Checkboxes/PropertySubCategoryCB";
import AreaCB from "./Checkboxes/AreaCB";
import PriceCB from "./Checkboxes/PriceCB";
import { useMediaQuery } from "@mantine/hooks";
import { PakistanCities } from "./cities";

const Filter = ({
  city = [],
  setCity,
  categoryValue = [],
  setCategoryValue,
  subCategoryValue = [],
  setSubCategoryValue,
  areaValue = [],
  setAreaValue,
  priceValue = [],
  setPriceValue,
}) => {
  const match1200 = useMediaQuery("(max-width: 1200px)");
  const cityData = PakistanCities.map((city) => ({
    label: city.label,
    value: city.value,
  }));

  const hasActiveFilters =
    city?.length > 0 ||
    categoryValue?.length > 0 ||
    subCategoryValue?.length > 0 ||
    areaValue?.length > 0 ||
    priceValue?.length > 0;

  return (
    <Box
      style={{
        padding: !match1200 ? 24 : 20,
        backgroundColor: "#ffffff",
        borderRadius: "12px",
        border: "1px solid #e9ecef",
        boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
      }}
    >
      {!match1200 && (
        <Group mb="lg">
          <Button
            style={{
              width: "100%",
              backgroundColor: hasActiveFilters ? "#D92228" : "#6c757d",
              color: "white",
              borderRadius: "8px",
              fontWeight: 600,
              padding: "12px 24px",
            }}
            onClick={() => {
              setCity([]);
              setCategoryValue([]);
              setSubCategoryValue([]);
              setAreaValue([]);
              setPriceValue([]);
            }}
            disabled={!hasActiveFilters}
          >
            {hasActiveFilters ? "Clear All Filters" : "No Filters Applied"}
          </Button>
        </Group>
      )}

      <Stack spacing={"xl"}>
        <Box>
          <Text
            style={{
              fontSize: 16,
              fontWeight: 600,
              color: "#2c3e50",
              marginBottom: 8,
            }}
          >
            Location
          </Text>
          <MultiSelect
            data={cityData}
            placeholder="Select cities..."
            value={city}
            onChange={setCity}
            searchable
            clearable
            styles={{
              input: {
                borderRadius: "8px",
                border: "2px solid #e9ecef",
                "&:focus": {
                  borderColor: "#D92228",
                  boxShadow: "0 0 0 3px rgba(217, 34, 40, 0.1)",
                },
              },
              label: {
                fontSize: "14px",
                fontWeight: 500,
                color: "#495057",
                marginBottom: 6,
              },
            }}
          />
        </Box>

        <Divider
          style={{
            borderColor: "#e9ecef",
            margin: "8px 0",
          }}
        />

        <PropertyCategoryCB categoryValue={categoryValue} setCategoryValue={setCategoryValue} />

        <PropertySubCategoryCB subCategoryValue={subCategoryValue} setSubCategoryValue={setSubCategoryValue} />

        <AreaCB areaValue={areaValue} setAreaValue={setAreaValue} />

        <PriceCB priceValue={priceValue} setPriceValue={setPriceValue} />
      </Stack>
    </Box>
  );
};

export default Filter;
