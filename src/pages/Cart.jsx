import { useState,useEffect } from 'react'
import '../App.css'
import { ShopContext } from '../components/shopList';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
export default function Cart(){
    const { getCart,addToCart,deleteFromCart,updateCart,token,setToken,id,setId,userId,setUserId,products,isAdded}= useContext(ShopContext)
    const navigate = useNavigate();
    const [cartList,setCartList] =useState([])
    const [totalAmount,setTotalAmount]= useState(0)
    const [quantityUp, setQuantityUp] = useState(1);
    const [quantityDown, setQuantityDown] = useState(1);

    const fetchCart = async () => {
        try {
          const result = await getCart(userId,token);
          setCartList(result);
          console.log(cartList)
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };
    useEffect(() => {
        fetchCart();
      }, [isAdded]);
    
    function Cart({product}){
        return (
            <div className="cart-product">
                <div className='cart-product-left'>
                    <Link to={`/Product/${product._id}`} style={{ textDecoration: 'none' ,color: 'black',}}>
                        <img src={product.image} alt="product-image" className='image'/>
                    </Link>
                </div>
                <div className="cart-product-right">
                    <p className='cart-product-right-title'>{product.title}</p>
                    <p className='cart-product-right-price'>Price: ${product.price}</p>
                    <div>
                        <button onClick={(e)=>{updateCart(e,token,userId,product.productId,product.quantity-1,product.price,product.title,product.image)}}>-</button>
                        <input readOnly value={product.quantity} className='cart-input'/>
                        <button onClick={(e)=>{updateCart(e,token,userId,product.productId,product.quantity+1,product.price,product.title,product.image)}}>+</button>
                    </div>
                </div>
            </div>
           
        )
    }
    const getTotalCost = () =>{
        let total=0;
        for(const item in cartList){
            total += cartList[item].price * cartList[item].quantity
        }
        return total
    }
    useEffect(()=>{
        setTotalAmount(getTotalCost());
    },[cartList])
    return (
        <div className="cart-container">
        <div className="cart-left">
            {
               cartList.map((product)=>{
                    // return (cartList[product._id] >= 1 ? <Cart key={product._id} product={product} />:<div key={product._id}></div>)
                    return <Cart key={product._id} product={product} />
               })
            }
        </div>
        <div className='cart-right'>
            <p className='cart-right-price'>Subtotal: ${totalAmount.toFixed(2)}</p>
            <button className='cart-right-button' onClick={()=>{navigate('/Products')}}>Continue Shopping</button>
            <button className='cart-right-button'>Checkout</button>
        </div>
        </div>
        
    )
}