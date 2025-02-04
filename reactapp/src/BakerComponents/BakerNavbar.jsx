import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import "./BakerNavbar.css"

const BakerNavbar = () => {

  const navigate = useNavigate();


  useEffect(() => {
  }, []);

  return (
    <nav className='adminnav'>
     <h1 className="site-title" id="heading">
        <Link to="/*" style={{ color: 'inherit', textDecoration: 'inherit'}}>CakeCraft</Link>
      </h1>
      <ul className="nav-links">
    
            <li><Link to="/*">Home</Link></li>      
              <li className="dropdown">
                <span className="dropdown-label">Cake</span>
                <ul className="dropdown-menu">
                  <li><Link to="/newcake">Add Cake</Link></li>
                  <li><Link to="/viewcake">View Cake</Link></li>
                </ul>
              </li>

             </ul>

      </nav>
  );
};

export default BakerNavbar;
