// // src/app/components/ItemsList.js
// import { useEffect, useState } from 'react';

// const ItemsList = () => {
//   const [items, setItems] = useState([]);

//   const fetchItems = async () => {
//     const response = await fetch('http://localhost:8000/items/');
//     const data = await response.json();
//     setItems(data.items);
//   };

//   useEffect(() => {
//     fetchItems();
//   }, []);

//   return (
//     <div>
//       <h2>商品一覧</h2>
//       <ul>
//         {items.map((item, index) => (
//           <li key={index}>{item}</li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default ItemsList;
