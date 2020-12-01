import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ItemDetail from "../../components/ItemDetail/ItemDetail";
import Loading from "../../components/Loading/Loading";
import { GetDBFireBase } from "../../Tools/firebase";

function ItemDetailContainer() {
  const { itemId } = useParams();
  const [item, setItem] = useState(null);
  const [loader, setLoader] = useState(true);

  useEffect(() => {
    const getprods = GetDBFireBase().collection("Productos");
    const thisOne = getprods.doc(itemId);

    thisOne
      .get()
      .then((result) => {
        if (result.data() === undefined) {
          console.log("Sin resultados - Result:");
          return;
        }
        const documents = { id: result.id, ...result.data() };
        setItem(documents);
      })
      .catch((error) => console.log(error))
      .finally(() => {
        setLoader(false);
      });
      // eslint-disable-next-line
  }, []);

  return (
    <React.Fragment>
      {item ? (
        <ItemDetail itemId={item} />
      ) : loader ? (
        <Loading />
      ) : (
        <h3>
          No se encontraron resultados con el id <br /> {itemId} <br /> en la
          base de datos
        </h3>
      )}
    </React.Fragment>
  );
}

export default ItemDetailContainer;
