import React from "react";
import { Box, Group, Input, Text, Button } from "@mantine/core";
import { IconSearch } from "@tabler/icons";
import { useMediaQuery } from "@mantine/hooks";

const SearchSection = ({ filteredData, query, setQuery, opened, setOpened, propertyType = "Properties" }) => {
  const match1200 = useMediaQuery("(max-width: 1280px)");

  return (
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
            {propertyType} Found
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
          placeholder={`Search by city, property type, or keywords...`}
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
  );
};

export default SearchSection;
