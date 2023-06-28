import { useState, useEffect } from 'react'
import ItemList from '../ItemList/ItemList'
// import { getProducts,getProductsByCategory } from '../../asyncMock'
import { useParams } from 'react-router-dom'

import { collection, getDocs, where, query } from 'firebase/firestore';
import { db } from '../../services/firebase/firebaseConfig';


const ItemListContainer = ({ greeting }) => {
    const [products, setProducts] = useState([]);

    const { categoryId } = useParams();

    useEffect(() => {

    const productsFunc = categoryId ? query(collection(db, "items"), where("categoryId", "==", categoryId)) : collection(db, "items");

    getDocs(productsFunc)
        .then(res =>{
          const newProducts = res.docs.map(doc => {
            const data = doc.data()
            return {id: doc.id, ...data}
        }) 
        setProducts(newProducts);
      })
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