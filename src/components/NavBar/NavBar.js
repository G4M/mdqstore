import React, { useEffect, useState } from 'react';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Nav from 'react-bootstrap/Nav';
import Button from 'react-bootstrap/Button';
import { useCartContext } from '../../contexts/CartContext/CartContext';
import { Link } from 'react-router-dom';
import { GetDBFireBase } from "../../Tools/firebase";

function NavBar() {
  const { hookTotal } = useCartContext();
  const [categorys, setCategorys] = useState(null);

  useEffect(() => {
    const getprods = GetDBFireBase().collection("Category");

    getprods.get().then((result) => {
      if (result.size === 0) {
        console.log("Sin resultados");
      }
      const documents = result.docs.map(doc => ({ ...doc.data(), idFirebase: doc.id }));
      setCategorys(documents);
    })
      .catch((error) => console.log(error))
      .finally(() => { });
  }
    , [])

  return (
    <Navbar bg="light" variant="light">
      <Link to={"/"}>
        <Navbar.Brand>MdqStore</Navbar.Brand>
      </Link>
      <Nav className="mr-auto">
        <Link to={"/"}>
          <Nav.Link href="/" >Home</Nav.Link>
        </Link>
        <NavDropdown title="Categorys" id="collasible-nav-dropdown">
          {categorys ?
            categorys.map((item, index) =>
              <NavDropdown.Item key={item.id+index} >
                <Link to={"/Categorys/" + item.id}>
                  {item.name}
                </Link>
              </NavDropdown.Item>
            ) : <></>}
        </NavDropdown>
      </Nav>
      <Link to={"/Cart"}>
        <Button variant="outline-primary">Cart {hookTotal} </Button>
      </Link>
    </Navbar>
  );
}

export default NavBar;
