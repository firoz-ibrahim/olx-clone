import React, { useContext, useEffect, useState } from "react";

import Heart from "../../assets/Heart";
import "./Post.css";
import { firbaseContext } from "../../context/AuthContext";
import { collection, getDocs, getFirestore } from "firebase/firestore";

function Posts() {
  const { firbaseApp } = useContext(firbaseContext);
  const [products, setProducts] = useState([]);
  const db = getFirestore(firbaseApp);
  useEffect(() => {
    (async function fetchData() {
      const items = collection(db, "products");
      const proudctsShapshot = await getDocs(items); // Changed getDoc to getDocs
      const productList = proudctsShapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setProducts(productList);
    })();
  }, []); // Added empty dependency array

  return (
    <div className="postParentDiv">
      <div className="moreView">
        <div className="heading">
          <span>Quick Menu</span>
          <span>View more</span>
        </div>
        <div className="cards">
          {products.map((product) => (
            <div className="card" key={product.id}>
              <div className="favorite">
                <Heart></Heart>
              </div>
              <div className="image">
                <img src={product.url} alt="" />
              </div>
              <div className="content">
                <p className="rate">&#x20B9; {product.price}</p>
                <span className="kilometer">{product.name}</span>
                <p className="name">{product.category}</p>
              </div>
              <div className="date">
                {/* Format createdAt date */}
                {(() => {
                  const dateString = product.createdAt;
                  const date = new Date(dateString);
                  const day = date.getDate().toString().padStart(2, "0");
                  const month = (date.getMonth() + 1)
                    .toString()
                    .padStart(2, "0");
                  const year = date.getFullYear();
                  const formattedDate = `${day}/${month}/${year}`;
                  return <span>{formattedDate}</span>;
                })()}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="recommendations">
        <div className="heading">
          <span>Fresh recommendations</span>
        </div>
        <div className="cards">
          {products.map((product) => (
            <div className="card" key={product.id}>
              <div className="favorite">
                <Heart></Heart>
              </div>
              <div className="image">
                <img src={product.url} alt="" />
              </div>
              <div className="content">
                <p className="rate">&#x20B9; {product.price}</p>
                <span className="kilometer">{product.name}</span>
                <p className="name">{product.category}</p>
              </div>
              <div className="date">
                {/* Format createdAt date */}
                {(() => {
                  const dateString = product.createdAt;
                  const date = new Date(dateString);
                  const day = date.getDate().toString().padStart(2, "0");
                  const month = (date.getMonth() + 1)
                    .toString()
                    .padStart(2, "0");
                  const year = date.getFullYear();
                  const formattedDate = `${day}/${month}/${year}`;
                  return <span>{formattedDate}</span>;
                })()}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Posts;
