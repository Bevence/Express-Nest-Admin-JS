import { Box, Label } from "@adminjs/design-system";
import { BasePropertyProps } from "adminjs";
import React from "react";

const GalleryView = (props: BasePropertyProps) => {
  const APP_URL = (window as any).AdminJS.env.APP_URL;

  const { record, property } = props;
  let images: string[] = [];
  if (record?.params) {
    Object.keys(record.params).forEach((d) => {
      if (d.startsWith("gallery.key")) images.push(record.params[d]);
    });
  }

  return (
    <>
      <Label>{property.label[0].toUpperCase() + property.label.slice(1)}</Label>
      <Box variant="grey" id="gallery">
        <Box variant="container" flex flexWrap="wrap" style={{ rowGap: 32 }}>
          {images.map((image, index) => (
            <Box
              key={index}
              width={220}
              height={220}
              style={{ textAlign: "center" }}
            >
              <img
                src={`${APP_URL}${image}`}
                alt={`${record?.params?.galleryAlternativeText}` ?? "gallery"}
                style={{ maxWidth: 200, maxHeight: 200 }}
              />
            </Box>
          ))}
        </Box>
      </Box>
      {/* <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          width: "120px",
          height: "120px",
          border: "1px solid #ccc",
          borderRadius: "50%",
          overflow: "hidden",
          textAlign: "center",
          backgroundColor: "#f0f0f0",
        }}
      >
        <img
          src={"actualPath"}
          alt="te"
          style={{ width: "100%", height: "auto" }}
        />
      </div> */}
    </>
  );
};

export default GalleryView;
