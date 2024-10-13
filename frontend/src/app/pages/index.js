// src/pages/index.js
import ItemsList from '@/components/ItemsList';

const HomePage = () => {
  return (
    <div>
      <h1>ホームページ</h1>
      <ItemsList />  {/* 商品一覧コンポーネントを表示 */}
    </div>
  );
};

export default HomePage;

//テスト