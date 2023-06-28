import { useState, useContext } from "react";
import { CartContext } from "../../context/CartContext";
import {db} from '../../services/firebase/firebaseConfig';
import {collection, addDoc, updateDoc, doc, getDoc} from 'firebase/firestore';
import './Checkout.css'


const Checkout = () => {
    const {cart, clearCart, total} = useContext(CartContext);
    const [name, setNombre] = useState("");
    const [apellido, setApellido] = useState("");
    const [telefono, setTelefono] = useState("");
    const [email, setEmail] = useState("");
    const [emailConfirmation, setemailConfirmation] = useState("");
    const [error, setError] = useState("");
    const [ordenId, setOrdenId] = useState("");
    

    const manejadorFormulario = (event) => {
        event.preventDefault();

        if(!name || !apellido || !telefono || !email || !emailConfirmation) {
            setError("Por favor complete todos los campos"); 
            return;
        }

        if(email !== emailConfirmation) {
            setError("Los campos del email no coinciden");
            return;
        }


        const orden = {
            items: cart.map(products => ({
                id: products.item.id,
                name: products.item.name,
                quantity: products.quantity
            })),
            total: cart.reduce((total, products)=> total + products.item.price * products.quantity, 0),
            name,
            apellido, 
            telefono,
            email,
            fecha: new Date(),
        };


        Promise.all(
            orden.items.map(async (productsOrden) => {

                const productsRef = doc(db, "items", productsOrden.id);
                const productsDoc = await getDoc(productsRef);
                const stockActual = productsDoc.data().stock;

                await updateDoc(productsRef, {
                    stock: stockActual - productsOrden.quantity,
                });

            })
        )
            .then(() => {

                addDoc(collection(db, "ordenes"), orden)
                    .then((docRef) => {
                        setOrdenId(docRef.id);
                        clearCart();
                    })
                    .catch((error) => {
                        console.error("Error al crear la orden", error);
                        setError("Se produjo un error al crear la orden");
                    })
            })
            .catch((error) => {
                console.error("Error al actualizar el stock", error);
                setError("Se produjo un error al actualizar el stock de los productos, vuelva más tarde");
            })
    }

    return(


    <div>
        <h2>Checkout</h2>
        <form onSubmit={ manejadorFormulario } className="formulario">
            {cart.map(products => (
                <div className="total-productos" key={products.item.id}>
                    <p>
                        {products.item.name} x {products.quantity}
                    </p>
                    <p> Precio $: {products.item.price} </p>
                    <hr />
                </div>
            ))}
            <div>
                <p className="total-compra">Total Compra: ${total} </p>
                
            </div>
            <hr />

                <div className="form-group">
                    <label htmlFor=""> Nombre: </label>
                    <input type="text" value={name} onChange={(e)=>setNombre(e.target.value)}/>
                </div>
                
                <div className="form-group">
                    <label htmlFor=""> Apellido: </label>
                    <input type="text" value={apellido} onChange={(e)=>setApellido(e.target.value)}/>
                </div>

                <div className="form-group">
                    <label htmlFor=""> Telefono: </label>
                    <input type="text" value={telefono} onChange={(e)=>setTelefono(e.target.value)}/>
                </div>

                <div className="form-group">
                    <label htmlFor=""> Email: </label>
                    <input type="email" value={email} onChange={(e)=> setEmail(e.target.value)} />
                </div>

                <div className="form-group">
                    <label htmlFor=""> Email Confirmación: </label>
                    <input type="email" value={emailConfirmation} onChange={(e)=> setemailConfirmation(e.target.value)} />
                </div>

                {error && <p style={{color:"red"}}> {error} </p>}
                <button className="miBtn" type="submit"> Finalizar Compra </button>
        </form>
        {
            ordenId && (
                <strong className="ordenId">¡Gracias por tu compra! Tu número de Orden es {ordenId} </strong>
            )
        }
    </div>
    )
}

export default Checkout