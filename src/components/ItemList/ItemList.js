import React, { useEffect, useState } from 'react';
import { GetDBFireBase } from "../../Tools/firebase";
import Item from '../Item/Item';
import Spinner from 'react-bootstrap/Spinner';

function ItemList() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getprods = GetDBFireBase().collection("Productos");

    getprods.get().then((result) => {
      if (result.size === 0) {
        console.log("Sin resultados");
      }
      const documents = result.docs.map(doc => ({ ...doc.data(), id: doc.id }));
      setProducts(documents);
      setTimeout(() => {
        setLoading(false);
      }, 3000);

    })
      .catch((error) => console.log(error))
      .finally(() => { });
  }
    , [])

  return (
    loading ? <div className="container"><Spinner animation="grow" size="sm" /><p>Loading...</p><Spinner animation="border" size="sm" /> </div> :
      <React.Fragment>
        <div className="ItemList">
          <div className="container col-12">
            <div className="row">
              {products.map((item, index) => <Item
                key={index}
                categoryId={item.categoryId}
                description={item.description}
                discount={item.discount}
                id={item.id}
                image={item.image}
                price={item.price}
                stock={item.stock}
                title={item.title} />)}
            </div></div></div>
      </React.Fragment>
  );
}

export default ItemList;
