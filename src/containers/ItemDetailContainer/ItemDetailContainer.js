import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ItemDetail from '../../components/ItemDetail/ItemDetail';
//import Loading from '../../components/loading/loading';
import { GetDBFireBase } from '../../Tools/firebase';

function ItemDetailContainer() {
    const { itemId } = useParams();
    const [item, setItem] = useState(null);

    useEffect(() => {
        const getprods = GetDBFireBase().collection("Productos");
        const thisOne = getprods.doc(itemId);

        thisOne.get().then((result) => {
            if (result.exist) {
                console.log("Sin resultados - Result:");
                return;
            }
            const documents = ({ id: result.id, ...result.data() })
            //const documents = result.docs.map(doc => ({ ...doc.data(), id: doc.id }));
            setItem(documents);

        })
            .catch((error) => console.log(error))
            .finally(() => { });
    }, [])


    return (
        <React.Fragment>
            {item ? <ItemDetail itemId={item} /> : <h1>LoAdInG. . . . </h1>}
        </React.Fragment>
    )
}

export default ItemDetailContainer;