import React, { FC, forwardRef, useImperativeHandle, useState } from 'react';


interface ProductsProps {
  title?:string
}
//פרמטר שני שנשלח לקומפוננטה הוא האפשרות חיבור מאבא לבן
const Products = forwardRef((props:ProductsProps,ref) => {
  const [personArr,setPersonArr]=useState([
    "תמר",
    "רותי",
    "קרן"
  ])

  //פונקציה מקלת את הצינור לאבא ופונקציה שמחזירה את הנתונים שאנחנו רוצים לחשוף באבא
  useImperativeHandle(ref,()=>{

   if(ref)
   return{
    listPerson:personArr
   }
  })

 return  <div className="PersonList">
    
    <ul>
    {personArr.map(a=>{
      return <li>{a}</li>
    })}
    </ul>
    
  </div>
})
export default Products;
