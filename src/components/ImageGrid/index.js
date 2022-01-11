import React from "react";
import { Card, ResponsiveGrid } from "../atoms";

function ImageGrid({ data }) {
  if (!data) {
    return null;
  }
  return (
    <ResponsiveGrid>
      {data.map(({ urls, description, alt_description, id }) => {
        const { thumb } = urls;
        return (
          <Card
            imgUrl={thumb}
            description={description || alt_description}
            key={id}
          />
        );
      })}
    </ResponsiveGrid>
  );
}

export default React.memo(ImageGrid);
