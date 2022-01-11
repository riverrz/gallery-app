import React, { useContext } from "react";
import { Card, ResponsiveGrid } from "../atoms";
import { ModalContext } from "../../contexts/modal.context";
import FullImageView from "../fullImageView";

function ImageGrid({ data }) {
  const { openModal } = useContext(ModalContext);

  if (!data) {
    return null;
  }
  return (
    <ResponsiveGrid>
      {data.map(({ urls, description, alt_description, id }) => {
        const { thumb, full } = urls;
        const alt = description || alt_description;
        return (
          <Card
            imgUrl={thumb}
            description={alt}
            key={id}
            onClick={() => openModal(<FullImageView url={full} alt={alt} />)}
          />
        );
      })}
    </ResponsiveGrid>
  );
}

export default React.memo(ImageGrid);
