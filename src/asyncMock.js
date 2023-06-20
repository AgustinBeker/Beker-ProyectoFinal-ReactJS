const products = [
    {
        id: '1',
        name: 'Marca tiento',
        price: 2200,
        category: 'Conjuntos',
        img: 'https://i.postimg.cc/FH2pSdvc/Conjunto1.jpg',
        stock: 22,
        description: 'Descripcion de Conjunto'
    },
    {
        id: '2', 
        name: 'Lody Underwear', 
        price: 1200, 
        category: 'Boxers', 
        img: 'https://i.postimg.cc/pXNP0xvH/Boxer1.jpg', 
        stock: 5, 
        description: 'Descripcion de Lody Underwear'
},
    {
        id: '3', 
        name: 'Saphirus', 
        price: 1400, 
        category: 'Saphirus', 
        img: 'https://i.postimg.cc/fRnpnTqw/Saphirus1.jpg', 
        stock: 8, 
        description: 'Descripcion de Saphirus'
},
{
    id: '4',
    name: 'Marca tiento',
    price: 2400,
    category: 'Conjuntos',
    img: 'https://i.postimg.cc/jS5dGcD6/Conjunto2.jpg',
    stock: 24,
    description: 'Descripcion de Conjunto'
},
{
    id: '5',
    name: 'Marca tiento',
    price: 2600,
    category: 'Conjuntos',
    img: 'https://i.postimg.cc/fyn1vz9q/Conjunto3.jpg',
    stock: 26,
    description: 'Descripcion de Conjunto'
},
{
    id: '6',
    name: 'Marca tiento',
    price: 2800,
    category: 'Conjuntos',
    img: 'https://i.postimg.cc/TYPJ48Jt/Conjunto4.jpg',
    stock: 28,
    description: 'Descripcion de Conjunto'
}
]


export const getProducts = () => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(products)
        }, 100)
    })
}

//Creamos una nueva función similar a la anterior pero que nos retorne un solo item:

export const getProductById = (id) => {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve (products.find(prod => prod.id === id));
        }, 100)
    })
}

//Creamos una nueva función que retorna toda la categoría. 

export const getProductsByCategory = (categoryId) => {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve( products.filter(prod => prod.category === categoryId));
        }, 100)
    })
}