import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="navbar">
        <h1>VHS rental shop</h1>
        <div className="links">
           <Link to='/' >Home</Link>
           <Link to="/create">Add new movie</Link>
        </div>
    </nav>
  );
}

export default Navbar;