import { useState, useEffect } from 'react'
import Header from './Components/Header'
import Guitar from './Components/Guitar'
import {db} from './data/db'
 
function App() {

  const intialCart = () => {
    const localStorageCart = localStorage.getItem('cart')
    return localStorageCart ? JSON.parse(localStorageCart):[]
  }
   const [data] = useState(db)
   const [cart, setCart] = useState(intialCart)


   useEffect(() => {
    localStorage.setItem('cart',JSON.stringify(cart))
   }, [cart])
   

   function addToCart(item){
    const itemExists = cart.findIndex(guitar => guitar.id === item.id)
    if(itemExists >= 0){
       const updatedCart = [...cart]
        updatedCart[itemExists].quantity++
        setCart(updatedCart)
    }else {
        item.quantity = 1
        setCart([...cart,item])
    }
   }

   function increaseQuantity(id){
    const updateCart = cart.map(item =>{
      if(item.id === id && item.quantity < 5){
        return{
          ...item,
          quantity: item.quantity +1
        }
      }
      return item
    })
    setCart(updateCart)
  }

  function decrementarQuantity(id){
    const updateCart = cart.map(item => {
      if(item.id === id && item.quantity > 1){
        return{
          ...item,
          quantity: item.quantity - 1
        }
      }
      return item
    })
    setCart(updateCart)
  }
    
  function removeFrontCart(id){
    setCart(precCart => precCart.filter(guitar => guitar.id !== id))
  }
 
  function clearCart() {
    setCart([])
  }

  
  return (
    <>
    <Header cart={cart} removeFrontCart={removeFrontCart} 
    increaseQuantity={increaseQuantity} decrementarQuantity={decrementarQuantity}
    clearCart={clearCart}
    />
    <main className="container-xl mt-5">
        <h2 className="text-center">Nuestra Colección</h2>

        <div className="row mt-5">
          {data.map((guitar)=>(
                <Guitar
                key={guitar.id}
                guitar = {guitar}
                setCart= {setCart}
                addToCart={addToCart}
                />
          )
          )}
        </div>
    </main>


    <footer className="bg-dark mt-5 py-5">
        <div className="container-xl">
            <p className="text-white text-center fs-4 mt-4 m-md-0">GuitarLA - Todos los derechos Reservados</p>
        </div>
    </footer>
    </>
  )
}

export default App
