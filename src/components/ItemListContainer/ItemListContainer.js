import { useState, useEffect } from 'react'
import ItemList from '../ItemList/ItemList'
import { getProducts,getProductsByCategory } from '../../asyncMock'
import { useParams } from 'react-router-dom'

const ItemListContainer = ({ greeting }) => {
    const [products, setProducts] = useState([]);

    const { categoryId } = useParams();

    useEffect(() => {

    const productsFunc = categoryId ? getProductsByCategory : getProducts;

    productsFunc(categoryId)
        .then(res => setProducts(res))
        .catch(error => console.error(error))
    }, [categoryId])

  return (
    <>
      <h2> {greeting} </h2>
      <ItemList products={products} />
    </>
  )
}

export default ItemListContainer