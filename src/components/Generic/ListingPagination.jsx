import { Pagination, Group, Text, Box } from "@mantine/core";
import React from "react";
import { useMediaQuery } from "@mantine/hooks";

const ListingPagination = ({ postsPerPage, totalPosts, paginate, currentPosts, filteredData, currentPage }) => {
  const pageNumbers = [];
  const match768 = useMediaQuery("(max-width: 768px)");

  filteredData?.length > 0 ? (totalPosts = filteredData.length) : totalPosts;

  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i);
  }

  const startIndex = (currentPage - 1) * postsPerPage + 1;
  const endIndex = Math.min(currentPage * postsPerPage, totalPosts);

  return (
    currentPosts?.length > 0 &&
    pageNumbers.length > 1 && (
      <Box
        style={{
          backgroundColor: "#f8f9fa",
          padding: "20px",
          borderRadius: "12px",
          border: "1px solid #e9ecef",
          marginTop: "24px",
        }}
      >
        <Group position="apart" align="center" mb="md">
          <Text
            style={{
              fontSize: "14px",
              color: "#6c757d",
              fontWeight: 500,
            }}
          >
            Showing {startIndex} to {endIndex} of {totalPosts} properties
          </Text>

          <Text
            style={{
              fontSize: "14px",
              color: "#495057",
              fontWeight: 600,
            }}
          >
            Page {currentPage} of {pageNumbers.length}
          </Text>
        </Group>

        <Group position="center">
          <Pagination
            total={pageNumbers.length}
            page={currentPage}
            onChange={(page) => paginate(page)}
            withEdges
            size={match768 ? "sm" : "md"}
            styles={{
              item: {
                border: "2px solid #e9ecef",
                borderRadius: "8px",
                fontWeight: 600,
                "&:hover": {
                  borderColor: "#D92228",
                  backgroundColor: "#fff5f5",
                },
                "&[data-active]": {
                  backgroundColor: "#D92228",
                  borderColor: "#D92228",
                  color: "white",
                  "&:hover": {
                    backgroundColor: "#c41e3a",
                    borderColor: "#c41e3a",
                  },
                },
              },
              dots: {
                color: "#6c757d",
                fontWeight: 600,
              },
            }}
          />
        </Group>
      </Box>
    )
  );
};

export default ListingPagination;
