import { BasePropertyProps } from "adminjs";
import React from "react";

const getInitials = (name: string) => {
  return name
    .split(" ")
    .map((word) => word[0])
    .join("")
    .toUpperCase()
    .slice(0, 3);
};

const Thumbnail = (props: BasePropertyProps) => {
  const APP_URL = (window as any).AdminJS.env.APP_URL;

  const { record, property } = props;
  const name = record.params.name;
  const filePath = record.params[`${property.name}.key`];
  const actualPath = filePath ? `${APP_URL}${filePath}` : null;

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "32px",
        height: "32px",
        border: "1px solid #ccc",
        borderRadius: "50%",
        overflow: "hidden",
        textAlign: "center",
        backgroundColor: "#f0f0f0",
      }}
    >
      {actualPath ? (
        <img
          src={actualPath}
          alt="Thumbnail"
          style={{ width: "100%", height: "auto" }}
        />
      ) : name ? (
        <span style={{ fontSize: "12px", color: "#888" }}>
          {getInitials(name)}
        </span>
      ) : (
        <p>No image found!!!</p>
      )}
    </div>
  );
};

export default Thumbnail;
