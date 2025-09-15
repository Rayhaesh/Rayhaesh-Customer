import React from "react";
import { Modal, Group, Text, Button } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import Filter from "../Filters/Filter";

const FilterModal = ({
  opened,
  setOpened,
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
  filteredData,
}) => {
  const match1200 = useMediaQuery("(max-width: 1280px)");

  return (
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
  );
};

export default FilterModal;
