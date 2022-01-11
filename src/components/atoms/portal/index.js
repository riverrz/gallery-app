import { useEffect, useRef } from "react";
import ReactDOM from "react-dom";

function Portal({ children, el = "div" }) {
  const container = useRef(document.createElement(el));

  useEffect(() => {
    const node = container.current;
    document.body.appendChild(node);
    return () => document.body.removeChild(node);
  }, []);

  return ReactDOM.createPortal(children, container.current);
}

export default Portal;
