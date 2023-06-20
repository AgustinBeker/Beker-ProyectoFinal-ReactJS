import { useState, createContext } from "react";


export const CartContext = createContext({ 
    cart: [],
    total: 0,
    totalQuantity: 0
});



export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);
    const [total, setTotal] = useState(0);
    const [totalQuantity, setTotalQuantity] = useState(0);

    //Agregar productos al carrito: 
    const addItem = (item, quantity) => {
        //Verificamos si el producto ya esta en el carrito. 
        const isInCart = cart.find(prod => prod.item.id === item.id);

        if (!isInCart) {
            //Si el producto no existe, lo agregamos al carrito
            setCart(prev => [...prev, { item, quantity }]);
            setTotalQuantity( prev => prev + quantity);
            setTotal(prev => prev + (item.price * quantity));
        } else {
            //Si el producto ya existe, actualizamos su cantidad: 
            const cartUpdated = cart.map(prod => {
                if (prod.item.id === item.id) {
                    return { ...prod, quantity: prod.quantity + quantity };
                } else {
                    return prod;
                }
            });
            setCart(cartUpdated);
            setTotalQuantity( prev => prev + quantity);
            setTotal(prev => prev + (item.price * quantity));

        }
    }

    //Función para eliminar productos del carrito: 

    const removeItem = (id) => {
        const itemDeleted = cart.find(prod => prod.item.id === id);
        const cartUpdated = cart.filter(prod => prod.item.id !== id);
        setCart(cartUpdated);
        setTotalQuantity(prev => prev - itemDeleted.quantity);
        setTotal(prev => prev - ((itemDeleted.item.precio * itemDeleted.quantity)));
    }

    //Función para vaciar el carrito de compras: 
    const clearCart = () => {
        setCart([]);
        setTotalQuantity(0);
        setTotal(0);
    }

    //5) Usamos el componente CarritoContext.Provider para enviar el valor actual del carrito y los métodos a los componentes de mi app que lo necesiten. 

    return (
        <CartContext.Provider value={{ cart, addItem, removeItem, clearCart, total, totalQuantity }}>
            {children}

        </CartContext.Provider>
    )
}

//6)Children: propiedad especial que se utiliza para representar a todos aquellos componentes que puedan necesitar el carrito y sus métodos. 