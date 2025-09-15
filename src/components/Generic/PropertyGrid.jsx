import React from "react";
import { SimpleGrid, Group, Text } from "@mantine/core";
import { Link } from "react-router-dom";
import BuyCards from "../Buy/BuyCards";
import SixCardSkeleton from "../Skeletons/SixCardSkeleton";

const PropertyGrid = ({ loading, allproperties, filteredData, currentPosts, query, propertyType = "Properties" }) => {
  if (loading) {
    return <SixCardSkeleton />;
  }

  if (allproperties.length === 0) {
    return (
      <Group position="center" mt={"md"}>
        <Text>No {propertyType} Found</Text>
      </Group>
    );
  }

  return (
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
          return null;
        })
        ?.map((property) => {
          return (
            <Link
              to={`/property/${property?._id}`}
              state={{ data: property }}
              style={{ textDecoration: "none" }}
              key={property._id}
            >
              <BuyCards property={property} />
            </Link>
          );
        })}
    </SimpleGrid>
  );
};

export default PropertyGrid;
