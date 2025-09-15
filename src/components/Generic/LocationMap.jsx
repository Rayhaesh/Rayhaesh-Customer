import { Container, Stack, Text } from "@mantine/core";
import React, { useEffect } from "react";
import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Fix for default markers in react-leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

const LocationMap = ({ lat, lng }) => {
  const ResizeMap = () => {
    const map = useMap();
    useEffect(() => {
      const resizeObserver = new ResizeObserver(() => {
        map.invalidateSize();
      });
      const container = document.getElementById("map-container");
      if (container) {
        resizeObserver.observe(container);
      }
      return () => resizeObserver.disconnect();
    }, [map]);

    return null;
  };

  // Validate coordinates
  if (!lat || !lng || isNaN(lat) || isNaN(lng)) {
    return (
      <div
        style={{
          height: "400px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#f8f9fa",
          border: "1px solid #e9ecef",
        }}
      >
        <Text color="dimmed">Invalid coordinates provided</Text>
      </div>
    );
  }

  return (
    <MapContainer
      style={{
        height: "400px",
        width: "100%",
      }}
      id="map-container"
      center={[lat, lng]}
      zoom={15}
      scrollWheelZoom={true}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={[lat, lng]}>
        <Popup>
          <Stack spacing="xs">
            <Text weight={700} size="sm" color="#D92228">
              Property Location
            </Text>
            <Text size="xs" color="dimmed">
              Lat: {lat.toFixed(6)} <br />
              Lng: {lng.toFixed(6)}
            </Text>
          </Stack>
        </Popup>
      </Marker>
      <ResizeMap />
    </MapContainer>
  );
};

export default LocationMap;
