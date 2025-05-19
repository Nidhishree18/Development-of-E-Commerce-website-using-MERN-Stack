import React,{useEffect,useState} from 'react';
import axios from 'axios';
import {useParams} from 'react-router-dom';


const ShowItem = () => {
    const [item,setItem] = useState({});
    const [loading,setLoading] = useState(false);
    const{id} = useParams();

    // useEffect(() => {
    //     setLoading(true);
    //     axios.get(`http://localhost:5500/items/${id}`)


    //     .then((response) => {
    //         setItem(response.data);
    //         setLoading(false);
    //     })
    //     .catch((error)=> {
    //         console.log(error);
    //         setLoading(false);
    //     });
    // },[])
    return(
        
        <div>ShowItem</div>
    )
}

export default ShowItem;
