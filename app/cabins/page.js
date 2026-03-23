import React from 'react'
import Navigation from '../components/Navigation'

async function Page() {

   const res = await fetch('https://jsonplaceholder.typicode.com/users')
   const data = await res.jspn()
   console.log(data);
   

    return (
      
        <>
         
    <div>Cabins Page</div>

    
        </>
  )
}

export default Page