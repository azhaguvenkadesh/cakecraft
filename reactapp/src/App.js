import React from 'react';
import HomePage from './Components/HomePage';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import ErrorPage from './Components/ErrorPage';
import CakeForm from './BakerComponents/CakeForm';
import ViewCake from './BakerComponents/ViewCake';

function App() {
  return (
  <BrowserRouter>
    <Routes>
      <Route path="/*" element={<HomePage />} />
      <Route path="/viewcake" element={<ViewCake />} />
      <Route path="/newcake" element={<CakeForm />} />
      <Route path="/editcake/:id" element={<CakeForm />} />
      <Route path="/error" element={<ErrorPage />} />
    </Routes>
  </BrowserRouter>
  );
}

export default App;
