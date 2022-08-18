import React,{useState,useEffect} from 'react';
import "./Todo.css"

function Quotes() {

    const [quotes,setQuotes] = useState("");


    useEffect(() =>{
        const Fetchquotes = async() => 
     await fetch(`https://type.fit/api/quotes`)
     .then(res => res.json())
     .then(data => {
      
      console.log(data);
        var a=Math.random()*data.length
        
        setQuotes(data[Math.round(a)].text);
     })
     Fetchquotes ();
  },[])
   
    
   
 
  return (
    <>
  <p className='text'> {quotes}</p>
      
    </>
  )
}

export default Quotes
