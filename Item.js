// import React, { useEffect, useState } from "react";
// import axios from "axios";

// const Item = () => {
//     const [products, setProducts] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);

//     useEffect(() => {
//         axios
//             .get("http://localhost:5500/items") // ✅ Correct API route
//             .then((response) => {
//                 console.log("Fetched items:", response.data);
//                 setProducts(response.data);
//                 setLoading(false);
//             })
//             .catch((error) => {
//                 console.error("Error fetching items:", error);
//                 setError("Failed to fetch items");
//                 setLoading(false);
//             });
//     }, []);

//     if (loading) return <p>Loading items...</p>;
//     if (error) return <p>{error}</p>;

//     return (
//         <div>
//             <h2>Available Items</h2>
//             <ul>
//                 {products.map((item) => (
//                     <li key={item._id}>
//                         <img src={item.image} alt={item.name} width="50" />
//                         {item.name} - ₹{item.price}
//                     </li>
//                 ))}
//             </ul>
//         </div>
//     );
// };

// export default Item;
