import './ItemDetailContainer.css'
import { useState, useEffect } from 'react'
// import { getProductById } from '../../asyncMock'
import ItemDetail from '../ItemDetail/ItemDetail'
import { useParams } from 'react-router-dom'

import {getDoc, doc} from "firebase/firestore";
import { db } from '../../services/firebase/firebaseConfig';;

const ItemDetailContainer = () => {
    const [products, setProducts] = useState (null)

    const {itemId} = useParams ()

    useEffect (() => {
        const newDoc = doc(db, "items", itemId);

        getDoc(newDoc)
            .then(res => {
                const data = res.data();
                const newProduct = {id: res.id, ...data}
                setProducts(newProduct);
            })
            .catch (error => {
                console.error(error)
            })
    }, [itemId])

    return (
        <div className='ItemDetailContainer'>
            <ItemDetail {...products} />
        </div>
    )
}

export default ItemDetailContainer