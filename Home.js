import React,{useEffect, useState} from 'react';
import axios from 'axios';
import Card from './Card';
import {Link} from 'react-router-dom';


const Home = () => {
  const[items,setItems] = useState([]);
  const[loading,setLoading] = useState(false);
  useEffect(()=> {
    setLoading(true);
    axios.get("http://localhost:5500/items")  // Make sure the port is correct

    .then((response)=> {
      setItems(response.data);
      setLoading(false);
    })
    .catch((error) => {
      console.log(error);
      setLoading(false);
    });
   }, []);
  return (
  <div>
    <Card/>
  </div>
  );
};
export default Home;