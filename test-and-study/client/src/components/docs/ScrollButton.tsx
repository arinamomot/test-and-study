import React, { useState } from "react";
import { FaArrowCircleUp } from "react-icons/fa";
import { Button } from "@mui/material";


const ScrollButton = () => {
  const [visible, setVisible] = useState(false);

  const toggleVisible = () => {
    const scrolled = document.documentElement.scrollTop;
    if (scrolled > 300) {
      setVisible(true);
    } else if (scrolled <= 300) {
      setVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
      /* you can also use 'auto' behaviour
               in place of 'smooth' */
    });
  };

  if (typeof window !== "undefined") {
    window.addEventListener("scroll", toggleVisible);
  }

  return (
    <Button
      sx={{
        position: "fixed",
        right: "0",
        bottom: "40px",
        height: "20px",
        fontSize: "2.5rem",
        zIndex: "100",
        cursor: "pointer",
        color: "black",
      }}
    >
      <FaArrowCircleUp
        onClick={scrollToTop}
        style={{ display: visible ? "inline" : "none" }}
      />
    </Button>
  );
};

export default ScrollButton;
