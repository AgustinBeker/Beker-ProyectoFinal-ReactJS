import { useContext } from "react"
import { CartContext } from "../../context/CartContext"

const CartItem = ({item, quantity}) => {
    const {removeItem} = useContext(CartContext);
  return (
    <div>
        <h4> {item.name} </h4>
        <p>Cantidad: {quantity} </p>
        <p>Precio: ${item.price} </p>
        <button onClick={()=> removeItem(item.id)}> Eliminar </button>
    </div>
  )
}

export default CartItem