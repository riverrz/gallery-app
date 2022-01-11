import React, { useRef, useEffect } from "react";

const options = {
  root: document.querySelector("#scrollArea"),
  rootMargin: "5px",
  threshold: 0.7,
};

export default function InfiniteScroll({
  children,
  finished,
  loadData,
  loading,
}) {
  const targetRef = useRef(null);

  useEffect(() => {
    if (finished || loading) {
      return;
    }
    const observer = new IntersectionObserver((entries) => {
      const { isIntersecting } = entries[0];
      if (isIntersecting) {
        loadData();
      }
    }, options);
    observer.observe(targetRef.current);
    return () => observer.disconnect();
  }, [finished, loadData, loading]);

  return (
    <div id="infiniteScrollContainer">
      {children}
      {!loading && (
        <div ref={targetRef} style={{ width: "5px", height: "5px" }}></div>
      )}
    </div>
  );
}
