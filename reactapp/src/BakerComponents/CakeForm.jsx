import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import API_BASE_URL from '../apiConfig';
import BakerNavbar from './BakerNavbar';
import './CakeForm.css';

const CakeForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [filePreview, setFilePreview] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    price: '',
    quantity: '',
    cakeImage: null
  });
  const [errors, setErrors] = useState({});
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (id) {
      fetchCake(id);
    }
  }, [id]);

  useEffect(() => {
    return () => {
      if (filePreview && typeof filePreview === 'string') {
        URL.revokeObjectURL(filePreview);
      }
    };
  }, [filePreview]);

  const fetchCake = async (id) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/cakes/${id}`);
      if (response.status === 200) {
        const cake = response.data;
        if (cake.cakeImage) {
          setFilePreview(cake.cakeImage);
        }
        setFormData({
          name: cake.name,
          category: cake.category,
          price: cake.price,
          quantity: cake.quantity,
          cakeImage: null
        });
      }
    } catch (error) {
      console.error("Error fetching cake:", error);
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = 'Name is required';
    if (!formData.category) newErrors.category = 'Category is required';
    if (!formData.price) newErrors.price = 'Price is required';
    if (!formData.quantity) newErrors.quantity = 'Quantity is required';
    if (!id && !formData.cakeImage) newErrors.cakeImage = 'Image is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const onSubmit = async (event) => {
    event.preventDefault();

    if (!validateForm()) return;

    try {
      const payload = {
        name: formData.name,
        category: formData.category,
        price: formData.price,
        quantity: formData.quantity,
        cakeImage: id ? filePreview : formData.cakeImage
      };

      console.log("Payload:", payload);

      const response = id
        ? await axios.put(`${API_BASE_URL}/api/cakes/${id}`, payload)
        : await axios.post(`${API_BASE_URL}/api/cakes`, payload);

      if (response.status === 200 || response.status === 201) {
        setShowModal(true);
      }
    } catch (error) {
      console.error("Error adding or updating cake:", error.response ? error.response.data : error.message);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFilePreview(reader.result);
        setFormData({
          ...formData,
          cakeImage: reader.result
        });
      };
      reader.readAsDataURL(file);
      setErrors(prevErrors => ({ ...prevErrors, cakeImage: undefined }));
    } else {
      setFilePreview(null);
      setFormData({
        ...formData,
        cakeImage: null
      });
    }
  };

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [id]: value
    }));
  };

  return (
    <div>
      <BakerNavbar />
      <div className="cake-form-container">
        <button className="back-button" onClick={() => navigate(-1)}>
          Back
        </button>
        <h2>{id ? 'Edit Cake' : 'Create New Cake'}</h2>
        <form onSubmit={onSubmit}>
          <label htmlFor="name">Name<span className="required-asterisk">*</span></label>
          <input
            type="text"
            id="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleInputChange}
          />
          {errors.name && <span className="error">{errors.name}</span>}

          <label htmlFor="category">Category<span className="required-asterisk">*</span></label>
          <select
            id="category"
            value={formData.category}
            onChange={handleInputChange}
            className="form-input"
          >
            <option value="" disabled>Select a category</option>
            <option value="Cake">Cake</option>
            <option value="Bread">Bread</option>
            <option value="Brownie">Brownie</option>
            <option value="Pastry">Pastry</option>
            <option value="Cookies">Cookies</option>
          </select>
          {errors.category && <span className="error">{errors.category}</span>}

          <label htmlFor="price">Price<span className="required-asterisk">*</span></label>
          <input
            type="number"
            id="price"
            placeholder="Price"
            value={formData.price}
            onChange={handleInputChange}
            step="0.01"
          />
          {errors.price && <span className="error">{errors.price}</span>}

          <label htmlFor="quantity">Quantity<span className="required-asterisk">*</span></label>
          <input
            type="number"
            id="quantity"
            placeholder="Quantity"
            value={formData.quantity}
            onChange={handleInputChange}
            step="0.01"
          />
          {errors.quantity && <span className="error">{errors.quantity}</span>}

          <label htmlFor="cakeImage">cake Image<span className="required-asterisk">*</span></label>
          <input
            type="file"
            id="cakeImage"
            onChange={handleFileChange}
            accept=".jpg, .jpeg, .png"
          />
          {errors.cakeImage && <span className="error">{errors.cakeImage}</span>}

          {filePreview && <img src={filePreview} alt="Cake Preview" className="cake-preview" />}

          <button type="submit" className="submit-button">{id ? 'Update Cake' : 'Add Cake'}</button>
        </form>

        {showModal && (
          <div className="modal-overlay">
            <div className="modal-popup">
              <p>{id ? 'Cake updated successfully!' : 'Cake added successfully!'}</p>
              <button onClick={() => navigate('/viewcake')}>Close</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CakeForm;