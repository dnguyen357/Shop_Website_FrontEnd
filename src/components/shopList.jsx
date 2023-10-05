import { createContext, useState,useEffect } from "react";
export const ShopContext = createContext(null);

export const ShopContextProvider = (props) => {
    const [token,setToken]= useState("")
    const [id,setId]= useState("")
    const [products,setProducts]= useState([])
    const [isAdded, setIsAdded] = useState(false);
    const [cartList,setCartList] = useState([])
    const[userId,setUserId] = useState("")
    const[productId,setProductId] = useState("")
    const[quantity,setQuantity] = useState("")

    const BASE_URL = `https://store-dcq8.onrender.com/api`

    async function fetchProducts() {
        const response = await fetch(`${BASE_URL}/products`)
        const result = await response.json()
        setProducts(result)
        
    }
    useEffect(() => {
        fetchProducts();
    }, [])
    
    async function getCart(userId,token){
        console.log(userId, token)
        try {
            const response = await fetch(`${BASE_URL}/carts/find/${userId}`, {
              method: "GET",
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
              },
            });
            const result = await response.json()
            const  cart = result[0].products
            // console.log(cart);
            // setCartList(cart)
            return cart

          } catch (err) {
            console.error(err);
          }
    }
    

    async function addToCart(event,token,userId,productId,quantity,price,title,image) {
        event.preventDefault();
        console.log(productId)
        try {
            const response = await fetch(`${BASE_URL}/carts`, {
              method: "POST",
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
              },
              body: JSON.stringify({
                    userId : userId,
                    products:[
                      {
                        "productId": productId,
                        "quantity" :quantity,
                        "price" : price,
                        "title" : title,
                        "image" : image
                    }]
              })
            });
            
            const result = await response.json();
            // console.log(result)
            // console.log(cartList)
            setIsAdded(!isAdded)
          } catch (err) {
            console.error(err);
          }
            
    }
   
    

    async function updateCart(event,token,userId,productId,quantity,price,title,image) {
        event.preventDefault();
    
        try {
            const response = await fetch(`${BASE_URL}/carts/${userId}`, {
              method: "PATCH",
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
              },
              body: JSON.stringify({
                products:[
                  {
                    productId: productId,
                    quantity :quantity,
                    price : price,
                    title : title,
                    image : image
                  }]
              })
            });
            const result = await response.json();
            setIsAdded(!isAdded)
          } catch (err) {
            console.error(err);
          }
            
    }
    async function deleteFromCart(event,cartId) {
        event.preventDefault();
    
        try {
            const response = await fetch(`${BASE_URL}/carts/${cartId}`, {
              method: "DELETE",
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
              },
    
            });
            const result = await response.json();
            window.location.reload();
            
          } catch (err) {
            console.error(err);
          }
            
    }

    // useEffect(()=>{
    //   getCart(userId)
    // },[isAdded,userId])

    // const getTotalCost = () =>{
    //     let total=0;
    //     for(const item in cartList){
    //         total += cartList[item].price * cartList[item].quantity
    //     }
    //     return total
    // }
    

    const contextValue={getCart,addToCart,deleteFromCart,updateCart,token,setToken,id,setId,userId,setUserId,products,isAdded}
    return <ShopContext.Provider value={contextValue}> {props.children}</ShopContext.Provider>
}