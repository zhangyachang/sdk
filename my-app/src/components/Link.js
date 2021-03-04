import React from "react";
import PropTypes from "prop-types";

const Link = (props) => {
  const { active, children, onClick } = props;
  console.log("link的父组件", props, active, children, onClick);
  if (active) {
    return <span>{children}</span>;
  }

  return (
    <a
      href="/"
      onClick={(e) => {
        e.preventDefault();
        onClick && onClick();
      }}
    >
      {children}
    </a>
  );
};

Link.propTypes = {
  active: PropTypes.bool.isRequired,
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default Link;
