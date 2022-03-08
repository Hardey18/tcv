import React from "react";

import "./card.css";

function Card({ title, category }: any) {
  return (
    <div className="item">
      <div className="top-container">
        <div className="name">{title}</div>
        <div className="content">{category}</div>
      </div>
    </div>
  );
}

export default Card;
