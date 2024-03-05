import React, { Fragment, useState, useContext } from "react";
import "./Create.css";
import Header from "../Header/Header";
import { AuthContext, firbaseContext } from "../../context/AuthContext";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { addDoc, collection, getFirestore } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

const Create = () => {
  const { firebaseApp } = useContext(firbaseContext);
  const { user } = useContext(AuthContext);
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async () => {
    console.log("submit", image);
    if (!image) {
      alert("No image selected");
      return;
    }

    try {
      const storage = getStorage(firebaseApp);
      const imageRef = ref(storage, `Image/${image.name}`);
      console.log("Image reference:", imageRef);

      // Upload image to storage
      await uploadBytes(imageRef, image);
      console.log("Image uploaded successfully");

      // Get download URL
      const url = await getDownloadURL(imageRef);

      // Add data to Firestore collection
      const db = getFirestore(firebaseApp);
      const productsCollection = collection(db, "products");

      await addDoc(productsCollection, {
        userId: user?.uid || "", // Ensure user is authenticated
        name,
        category,
        price,
        url,
        createdAt: new Date().toISOString(), // Use ISO format for timestamps
      });

      // Provide user feedback (optional)
      navigate("/");
    } catch (error) {
      console.error("Error uploading image:", error);
      alert("An error occurred. Please try again.");
    }
  };

  return (
    <Fragment>
      <Header />
      <card>
        <div className="centerDiv bg-black/70 text-white">
          <label htmlFor="fname">Name</label>
          <br />
          <input
            onChange={(e) => setName(e.target.value)}
            className="input"
            type="text"
            id="fname"
            name="Name"
          />
          <br />
          <label htmlFor="fname">Category</label>
          <br />
          <input
            onChange={(e) => setCategory(e.target.value)}
            className="input"
            type="text"
            id="fname"
            name="category"
          />
          <br />
          <label htmlFor="fname">Price</label>
          <br />
          <input
            onChange={(e) => setPrice(e.target.value)}
            className="input"
            type="number"
            id="fname"
            name="Price"
          />
          <br />

          <br />
          {image && (
            <img
              alt="Posts"
              width="200px"
              height="200px"
              src={image ? URL.createObjectURL(image) : ""}
            />
          )}

          <br />
          <input onChange={(e) => setImage(e.target.files[0])} type="file" />
          <br />
          <button onClick={handleSubmit} className="uploadBtn">
            upload and Submit
          </button>
        </div>
      </card>
    </Fragment>
  );
};

export default Create;
