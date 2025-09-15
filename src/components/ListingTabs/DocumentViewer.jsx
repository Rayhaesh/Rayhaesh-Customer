import {
  Group,
  Text,
  createStyles,
  Card,
  Button,
  Stack,
  ThemeIcon,
  Box,
  Anchor,
  Badge,
  ActionIcon,
} from "@mantine/core";
import { IconFileText, IconDownload, IconEye, IconFile, IconX } from "@tabler/icons";
import React, { useState } from "react";

const DocumentViewer = ({ property }) => {
  const [viewingDocument, setViewingDocument] = useState(null);

  const useStyles = createStyles((theme) => ({
    container: {
      height: "500px",
      display: "flex",
      flexDirection: "column",
    },
    sectionTitle: {
      fontSize: "18px",
      fontWeight: 600,
      color: "#2c3e50",
      marginBottom: "16px",
    },
    documentsContainer: {
      flex: 1,
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      padding: "40px 20px",
    },
    documentGrid: {
      display: "flex",
      flexWrap: "wrap",
      gap: "24px",
      width: "100%",
      maxWidth: "800px",
      justifyContent: "center",
    },
    documentCard: {
      border: "1px solid #e9ecef",
      borderRadius: "16px",
      padding: "32px 24px",
      transition: "all 0.3s ease",
      cursor: "pointer",
      textAlign: "center",
      background: "linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)",
      boxShadow: "0 4px 20px rgba(0, 0, 0, 0.08)",
      minWidth: "280px",
      maxWidth: "320px",
      position: "relative",
      overflow: "hidden",
      "&:hover": {
        borderColor: "#D92228",
        boxShadow: "0 12px 40px rgba(217, 34, 40, 0.2)",
        transform: "translateY(-6px)",
      },
      "&::before": {
        content: '""',
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        height: "4px",
        background: "linear-gradient(90deg, #D92228, #ff6b6b)",
        borderRadius: "16px 16px 0 0",
      },
    },
    noDocumentsCard: {
      border: "2px dashed #dee2e6",
      borderRadius: "16px",
      padding: "80px 40px",
      textAlign: "center",
      height: "100%",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      background: "linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)",
      boxShadow: "0 4px 20px rgba(0, 0, 0, 0.05)",
      position: "relative",
      overflow: "hidden",
      "&::before": {
        content: '""',
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        height: "4px",
        background: "linear-gradient(90deg, #6c757d, #adb5bd)",
        borderRadius: "16px 16px 0 0",
      },
    },
    documentIcon: {
      backgroundColor: "rgba(217, 34, 40, 0.1)",
      color: "#D92228",
      marginBottom: "20px",
      boxShadow: "0 4px 12px rgba(217, 34, 40, 0.15)",
    },
    documentTitle: {
      fontSize: "18px",
      fontWeight: 700,
      color: "#2c3e50",
      marginBottom: "8px",
      letterSpacing: "-0.5px",
    },
    documentType: {
      fontSize: "11px",
      color: "#6c757d",
      marginBottom: "24px",
      textTransform: "uppercase",
      letterSpacing: "1px",
      fontWeight: 600,
    },
    actionButtons: {
      display: "flex",
      gap: "12px",
      justifyContent: "center",
      marginTop: "8px",
    },
    actionButton: {
      borderRadius: "10px",
      padding: "10px 16px",
      fontSize: "13px",
      fontWeight: 600,
      transition: "all 0.2s ease",
      border: "none",
      cursor: "pointer",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      minWidth: "80px",
      "&:hover": {
        transform: "translateY(-2px)",
      },
    },
    viewButton: {
      backgroundColor: "#D92228",
      color: "white",
      border: "none",
      "&:hover": {
        backgroundColor: "#c41e3a",
      },
    },
    downloadButton: {
      backgroundColor: "transparent",
      color: "#D92228",
      border: "1px solid #D92228",
      "&:hover": {
        backgroundColor: "#D92228",
        color: "white",
      },
    },
    modalContent: {
      height: "80vh",
      display: "flex",
      flexDirection: "column",
    },
    modalHeader: {
      padding: "16px",
      borderBottom: "1px solid #e9ecef",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
    },
    modalBody: {
      flex: 1,
      padding: "16px",
      overflow: "auto",
    },
  }));

  const { classes } = useStyles();

  const getFileType = (url) => {
    const extension = url.split(".").pop()?.toLowerCase();
    switch (extension) {
      case "pdf":
        return { type: "PDF", color: "red" };
      case "doc":
      case "docx":
        return { type: "DOC", color: "blue" };
      case "xls":
      case "xlsx":
        return { type: "XLS", color: "green" };
      case "jpg":
      case "jpeg":
      case "png":
        return { type: "IMG", color: "orange" };
      default:
        return { type: "FILE", color: "gray" };
    }
  };

  const getFileIcon = (url) => {
    const extension = url.split(".").pop()?.toLowerCase();
    switch (extension) {
      case "pdf":
        return <IconFileText size={20} />;
      default:
        return <IconFile size={20} />;
    }
  };

  if (!property?.documents || property.documents.length === 0) {
    return (
      <Box className={classes.container}>
        <Text className={classes.sectionTitle}>Documents</Text>
        <Box className={classes.documentsContainer}>
          <Card className={classes.noDocumentsCard}>
            <ThemeIcon size="xl" className={classes.documentIcon} radius="md" mb="md">
              <IconFileText size={48} />
            </ThemeIcon>
            <Text size="xl" weight={600} color="dimmed" mb="xs">
              No Documents Available
            </Text>
            <Text size="md" color="dimmed">
              Documents will appear here once uploaded
            </Text>
          </Card>
        </Box>
      </Box>
    );
  }

  return (
    <Box className={classes.container}>
      <Text className={classes.sectionTitle}>Documents ({property.documents.length})</Text>

      <Box className={classes.documentsContainer}>
        <Box className={classes.documentGrid}>
          {property.documents.map((document, index) => {
            const fileType = getFileType(document);
            return (
              <Card
                key={index}
                className={classes.documentCard}
                onClick={() =>
                  setViewingDocument({ url: document, name: `Document ${index + 1}`, type: fileType.type })
                }
              >
                <ThemeIcon size="xl" className={classes.documentIcon} radius="md">
                  {getFileIcon(document)}
                </ThemeIcon>

                <Text className={classes.documentTitle}>Document {index + 1}</Text>

                <Text className={classes.documentType}>{fileType.type} file</Text>

                <Box
                  style={{
                    width: "40px",
                    height: "2px",
                    background: "linear-gradient(90deg, #D92228, #ff6b6b)",
                    margin: "0 auto 20px auto",
                    borderRadius: "1px",
                  }}
                />

                <Box className={classes.actionButtons}>
                  <button
                    className={`${classes.actionButton} ${classes.viewButton}`}
                    onClick={(e) => {
                      e.stopPropagation();
                      window.open(document, "_blank");
                    }}
                  >
                    <IconEye size={14} style={{ marginRight: "4px" }} />
                    View
                  </button>
                  <button
                    className={`${classes.actionButton} ${classes.downloadButton}`}
                    onClick={(e) => {
                      e.stopPropagation();
                      const link = document.createElement("a");
                      link.href = document;
                      link.download = `document-${index + 1}.${fileType.type.toLowerCase()}`;
                      link.click();
                    }}
                  >
                    <IconDownload size={14} style={{ marginRight: "4px" }} />
                    Download
                  </button>
                </Box>
              </Card>
            );
          })}
        </Box>
      </Box>

      {/* Document Viewer Modal */}
      {viewingDocument && (
        <Box
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0, 0, 0, 0.8)",
            zIndex: 1000,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "20px",
          }}
          onClick={() => setViewingDocument(null)}
        >
          <Box
            className={classes.modalContent}
            style={{
              backgroundColor: "white",
              borderRadius: "8px",
              width: "100%",
              maxWidth: "800px",
              maxHeight: "90vh",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <Box className={classes.modalHeader}>
              <Group spacing="md">
                <ThemeIcon size="md" className={classes.documentIcon} radius="md">
                  {getFileIcon(viewingDocument.url)}
                </ThemeIcon>
                <Box>
                  <Text weight={500}>{viewingDocument.name}</Text>
                  <Text size="xs" color="dimmed">
                    {viewingDocument.type} file
                  </Text>
                </Box>
              </Group>
              <ActionIcon variant="subtle" color="gray" onClick={() => setViewingDocument(null)}>
                <IconX size={18} />
              </ActionIcon>
            </Box>

            <Box className={classes.modalBody}>
              <iframe
                src={viewingDocument.url}
                style={{
                  width: "100%",
                  height: "100%",
                  border: "none",
                  borderRadius: "4px",
                }}
                title={viewingDocument.name}
              />
            </Box>
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default DocumentViewer;
