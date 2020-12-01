import React, { useEffect, useState } from 'react';
import { GetDBFireBase } from "../../Tools/firebase";
import Item from '../Item/Item';
import Loading from '../Loading/Loading';
import { useParams } from 'react-router-dom';

function ItemList(params) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const {categoryId} = useParams();
  let categorys = JSON.parse(localStorage.getItem('categorys'));

  useEffect(() => {
    const isOnCat = categorys.find(item => item.name === categoryId);
    let getprods;
    categoryId? getprods = GetDBFireBase().collection("Productos").where("categoryId", "==",parseInt(isOnCat.id)) :
    getprods = GetDBFireBase().collection("Productos").limit(100);

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
  // eslint-disable-next-line
    , [])

  return (
    loading ? <Loading/> :
      <React.Fragment>
        <div className="ItemList">
          <div className="container col-12">
            <div className="row">
              {products.map((item, index) => <Item
                key={item.id+index}
                cat={categoryId}
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
