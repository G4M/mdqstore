import React, { useContext, useState } from "react";
export const CartContext = React.createContext();
export const useCartContext = () => useContext(CartContext);
export function CartContexProvider({ children }) {

  const inmaxmin = [1, 0, 5];
  const [cartContent, setCartContent] = useState([{ "totalCash": 0, "totalItems":0 }])
  const [hookTotal, setHookTotal] =useState(0)

  function totalCart() {
    let actualContent = cartContent;
    actualContent.pop();
    const total = actualContent.reduce((acc, item) => acc + item.price * ((100-item.discount)/100) * item.cant, 0);
    const items = actualContent.reduce((acc, item) => acc + item.cant, 0);
    actualContent.push({"totalCash":total, "totalItems":items});
    setCartContent(actualContent)
    setHookTotal(items);
    console.log(cartContent);
  }

  function updateCart(categoryId, description, discount, id, image, price, stock, title, cant) {
    const newProduct = {
      "categoryId": categoryId,
      "description": description,
      "discount": discount,
      "id": id,
      "image": image,
      "price": price,
      "stock": stock,
      "title": title,
      "cant": cant
    }

    const isOnCart = cartContent.find(item => item.id === newProduct.id);
    let actualCartContent = cartContent;
    if (isOnCart) {
      let indice = actualCartContent.indexOf(isOnCart);
      newProduct.cant = isOnCart.cant + newProduct.cant;
      actualCartContent.splice(indice, 1);
      actualCartContent.unshift(newProduct);
      setCartContent(actualCartContent)
      totalCart()
    } else { 
      actualCartContent.unshift(newProduct);
      setCartContent(actualCartContent)
      totalCart();
    }
  }

  return <>
    <CartContext.Provider value={{ updateCart, inmaxmin, cartContent,hookTotal}} >
      {children}
    </CartContext.Provider>
  </>
}