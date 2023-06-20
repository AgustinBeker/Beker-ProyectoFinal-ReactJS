import './ItemDetailContainer.css'
import { useState, useEffect } from 'react'
import { getProductById } from '../../asyncMock'
import ItemDetail from '../ItemDetail/ItemDetail'
import { useParams } from 'react-router-dom'

const ItemDetailContainer = () => {
    const [products, setProducts] = useState (null)

    const {itemId} = useParams ()

    useEffect (() => {
        getProductById (itemId)
            .then (response => {
                setProducts (response)
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