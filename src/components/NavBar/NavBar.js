import React, { useEffect, useState } from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Button from 'react-bootstrap/Button';
import { useCartContext } from '../../contexts/CartContext/CartContext';
import { Link } from 'react-router-dom';

function NavBar() {
  const { hookTotal } = useCartContext();

  return (
    <Navbar bg="light" variant="light">
      <Link to={"/"}>
        <Navbar.Brand>MdqStore</Navbar.Brand>
      </Link>
      <Nav className="mr-auto">
        <Link to={"/"}>
          <Nav.Link href="/" >Home</Nav.Link>
        </Link>
        <Link to={"/Categorys"}>
          <Nav.Link>Categorys</Nav.Link>
        </Link>
      </Nav>
      <Link to={"/Cart"}>
        <Button variant="outline-primary">Cart {hookTotal} </Button>
      </Link>
    </Navbar>
  );
}

export default NavBar;
