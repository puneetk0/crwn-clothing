import React from "react";
import "./category-item.scss";

const categoryItem = ({category}) => {
  const {id,imageUrl, title} = category;
  return (
    <div key={id} className="category-container">
      <img src={imageUrl} className="background-image" />
      <div className="category-body-container">
        <h2>{title}</h2>
        <p>Shop now</p>
      </div>
    </div>
  );
};

export default categoryItem;
