import React from "react";
import { Card, ResponsiveGrid } from "../atoms";

function ImageGrid({ data }) {
  if (!data) {
    return null;
  }
  return (
    <ResponsiveGrid>
      {data.map(({ cover_photo: { urls }, description, id }) => {
        const { thumb } = urls;
        return <Card imgUrl={thumb} alt={description} key={id} />;
      })}
    </ResponsiveGrid>
  );
}

export default React.memo(ImageGrid);
