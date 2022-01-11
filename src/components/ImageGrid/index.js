import React, { useContext } from "react";
import { Card, ResponsiveGrid } from "../atoms";
import { ModalContext } from "../../contexts/modal.context";

function ImageGrid({ data }) {
  const { openModal } = useContext(ModalContext);

  if (!data) {
    return null;
  }
  return (
    <ResponsiveGrid>
      {data.map(({ urls, description, alt_description, id }) => {
        const { thumb, full } = urls;
        return (
          <Card
            imgUrl={thumb}
            description={description || alt_description}
            key={id}
            onClick={() =>
              openModal(
                <div>
                  <img src={full} alt={description} />
                </div>
              )
            }
          />
        );
      })}
    </ResponsiveGrid>
  );
}

export default React.memo(ImageGrid);
