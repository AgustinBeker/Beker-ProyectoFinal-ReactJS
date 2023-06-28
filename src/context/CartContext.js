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

    const addItem = (item, quantity) => {

        const isInCart = cart.find(prod => prod.item.id === item.id);

        if (!isInCart) {
            setCart(prev => [...prev, { item, quantity }]);
            setTotalQuantity( prev => prev + quantity);
            setTotal(prev => prev + (item.price * quantity));
        } else {
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


    const removeItem = (id) => {
        const itemDeleted = cart.find(prod => prod.item.id === id);
        const cartUpdated = cart.filter(prod => prod.item.id !== id);
        setCart(cartUpdated);
        setTotalQuantity(prev => prev - itemDeleted.quantity);
        setTotal(prev => prev - (itemDeleted.item.price * itemDeleted.quantity));
    }   


    const clearCart = () => {
        setCart([]);
        setTotalQuantity(0);
        setTotal(0);
    }



    return (
        <CartContext.Provider value={{ cart, addItem, removeItem, clearCart, total, totalQuantity }}>
            {children}

        </CartContext.Provider>
    )
}