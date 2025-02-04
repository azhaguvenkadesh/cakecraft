import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import BakerNavbar from "./BakerNavbar";
import API_BASE_URL from "../apiConfig";
import "./ViewCake.css";

const ViewCake = () => {
  const navigate = useNavigate();
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [cakeToDelete, setCakeToDelete] = useState(null);
  const [availableCakes, setAvailableCakes] = useState([]);

  const handleDeleteClick = (cakeId) => {
    setCakeToDelete(cakeId);
    setShowDeletePopup(true);
  };

  const handleConfirmDelete = async () => {
    try {
      if (cakeToDelete) {
        const response = await axios.delete(
          `${API_BASE_URL}/api/cakes/${cakeToDelete}`
        );
        if (response.status === 200) {
          fetchAvailableCakes();
        } else {
          console.error("Error deleting cake:", response.statusText);
        }
        closeDeletePopup();
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const closeDeletePopup = () => {
    setCakeToDelete(null);
    setShowDeletePopup(false);
  };

  const fetchAvailableCakes = async () => {
    try {
      const res = await axios.get(`${API_BASE_URL}/api/cakes`);
      if (res.status === 200) {
        setAvailableCakes(res.data);
      } else {
        console.error("Error fetching cakes:", res.statusText);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    fetchAvailableCakes();
  }, []);

  const handleEditClick = (cakeId) => {
    navigate(`/editcake/${cakeId}`);
  };

  return (
    <div id="parent">
      <BakerNavbar />
      <div id="cakeHomeBody" className={showDeletePopup ? "blur" : ""}>
        <h1>Cakes</h1>

        <table className="cake-table">
          <thead>
            <tr>
              <th>Image</th>
              <th>Name</th>
              <th>Category</th>
              <th>Quantity</th>
              <th>Price</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {availableCakes.length > 0 ? (
              availableCakes.map((cake) => (
                <tr key={cake.cakeId}>
                  <td>
                    <img
                      src={cake.coverImage || '/path/to/fallback-image.jpg'}
                      alt="Cake"
                      className="cake-image"
                    />
                  </td>
                  <td>{cake.name}</td>
                  <td>{cake.category}</td>
                  <td>{`${cake.quantity} kg`}</td>
                  <td>{`Rs. ${parseFloat(cake.price).toFixed(2)}`}</td>
                  <td>
                    <button
                      id="greenButton"
                      className="edit-button"
                      onClick={() => handleEditClick(cake.cakeId)}
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteClick(cake.cakeId)}
                      id="deleteButton"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className="no-records-cell">
                  Oops! No records found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      {showDeletePopup && (
        <div className="delete-popup">
          <p>Are you sure you want to delete this cake?</p>
          <button onClick={handleConfirmDelete}>Yes, Delete</button>
          <button onClick={closeDeletePopup}>Cancel</button>
        </div>
      )}
    </div>
  );
};

export default ViewCake;