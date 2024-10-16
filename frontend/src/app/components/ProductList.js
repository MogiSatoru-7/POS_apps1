import { useEffect, useState } from 'react';

const ProductList = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // FastAPIのエンドポイントから商品データを取得
    fetch('http://http://127.0.0.1:8000/products')
      .then(response => response.json())
      .then(data => setProducts(data))
      .catch(error => console.error("Error fetching products:", error));
  }, []);

  return (
    <div>
      <h1>Product List</h1>
      <ul>
        {products.map(product => (
          <li key={product.PRD_ID}>
            {product.NAME}: {product.PRICE} 円
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductList;
