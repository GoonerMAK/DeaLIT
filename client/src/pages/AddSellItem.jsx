import React, { useState } from "react";
import Announcement from "../components/Announcement";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "./AddSellItem.css"

const AddSellItem = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [categories, setCategories] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("Title:", title);
    console.log("Description:", description);
    console.log("Price:", price);
    console.log("Categories:", categories);

  
    setTitle("");
    setDescription("");
    setPrice("");
    setCategories("");
  };
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    // Perform necessary operations with the selected file
    // For example, you can store it in state or display a preview of the image.
    console.log("Selected file:", file);
  };

  return (
    <div>
      <Announcement />
      <Navbar />

      <div className="container">
        <h1>Add Items For Sell</h1>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="title">Title:</label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="description">Description:</label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
          </div>
          <div>
          <label htmlFor="image">Image:</label>
          <input
            type="file"
            id="image"
            accept="image/*"
            onChange={handleImageChange}
          />
        </div>
          <div>
            <label htmlFor="price">Price:</label>
            <input
              type="text"
              id="price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="categories">Categories:</label>
            <input
              type="text"
              id="categories"
              value={categories}
              onChange={(e) => setCategories(e.target.value)}
            />
          </div>
          <button type="submit">Add Product</button>
        </form>
      </div>

      <Footer />
    </div>
  );
};

export default AddSellItem;


