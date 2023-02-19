import React, { useEffect } from "react"
import { useState } from "react"
import { toast } from "react-hot-toast"
import Shop from "../components/shops/Shop"

const Pages = () => {
  const [shopItems ,setShopItems ]=useState([])
  const [loading, setLoading] = useState(false)
  const getProducts = async() =>{
     try{
      setLoading(true)
       await fetch('https://dummyjson.com/products')
      .then(res => res.json())
      .then(json => {
        setLoading(false)
        setShopItems(json?.products)})
     }
     catch(e){
      setLoading(false)
      toast.error(e?.message)
     }
  }
  useEffect(()=>{
    getProducts()
  },[])
  return (<>
      {loading ? <div className="mt-40 flex justify-center align-items-center"> <div className="loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-32 w-32 md:h-64 md:w-64"></div></div> :<Shop shopItems={shopItems}  />}

  </>
  )
}

export default Pages
