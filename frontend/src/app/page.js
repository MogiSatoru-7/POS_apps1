// src/app/page.js
"use client";  // Client Componentとして動作させる

import { useState } from 'react';
import ProductInput from '../../components/ProductInput';
import ProductDisplay from '../../components/ProductDisplay';
import PurchaseList from '../../components/PurchaseList';
import '../styles/main.css';


const Page = () => {
  const [productData, setProductData] = useState(null);
  const [purchases, setPurchases] = useState([]);
  const [total, setTotal] = useState(0); // 合計金額のステートを追加

  // 商品を購入リストに追加する関数
  const addToPurchaseList = () => {
    if (productData) {
      const newPurchase = { ...productData, quantity: 1 };
      setPurchases([...purchases, newPurchase]);
      // 合計金額を更新
      setTotal(total + productData.PRICE);
      // 商品データをクリアする
      setProductData(null);
    }
  };

  const handlePurchase = async () => {
    try {
      // 各商品をバックエンドに送信する
      for (const item of purchases) {
        const response = await fetch('http://127.0.0.1:8000/purchase', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            product_code: item.CODE,
            quantity: item.quantity,
          }),
        });
  
        if (!response.ok) {
          throw new Error('購入処理中にエラーが発生しました');
        }
      }
      // 成功した場合に購入リストをクリアし、合計金額をリセット
      setPurchases([]);
      setTotal(0);

      // 成功メッセージを表示
      alert('購入が完了しました！');
    } catch (error) {
      console.error('購入処理中にエラーが発生しました:', error);
      alert(error.message || '購入処理中にエラーが発生しました。もう一度試してください。');
    }
  };

  return (
    <div>
      <h1>POS Application</h1>
      <ProductInput onProductData={setProductData} />
      <ProductDisplay product={productData} />
      {/* 「追加」ボタンをProductDisplayの下に配置 */}
      <button onClick={addToPurchaseList}>追加</button>
      <PurchaseList purchases={purchases} total={total} onPurchase={handlePurchase} />
    </div>
  );
};

export default Page;

// nextjs初期画面
// import Image from "next/image";

// export default function Home() {
//   return (
//     <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
//       <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
//         <Image
//           className="dark:invert"
//           src="/next.svg"
//           alt="Next.js logo"
//           width={180}
//           height={38}
//           priority
//         />
//         <ol className="list-inside list-decimal text-sm text-center sm:text-left font-[family-name:var(--font-geist-mono)]">
//           <li className="mb-2">
//             Get started by editing{" "}
//             <code className="bg-black/[.05] dark:bg-white/[.06] px-1 py-0.5 rounded font-semibold">
//               src/app/page.js
//             </code>
//             .
//           </li>
//           <li>Save and see your changes instantly.</li>
//         </ol>

//         <div className="flex gap-4 items-center flex-col sm:flex-row">
//           <a
//             className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5"
//             href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
//             target="_blank"
//             rel="noopener noreferrer"
//           >
//             <Image
//               className="dark:invert"
//               src="/vercel.svg"
//               alt="Vercel logomark"
//               width={20}
//               height={20}
//             />
//             Deploy now
//           </a>
//           <a
//             className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:min-w-44"
//             href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
//             target="_blank"
//             rel="noopener noreferrer"
//           >
//             Read our docs
//           </a>
//         </div>
//       </main>
//       <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
//         <a
//           className="flex items-center gap-2 hover:underline hover:underline-offset-4"
//           href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           <Image
//             aria-hidden
//             src="/file.svg"
//             alt="File icon"
//             width={16}
//             height={16}
//           />
//           Learn
//         </a>
//         <a
//           className="flex items-center gap-2 hover:underline hover:underline-offset-4"
//           href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           <Image
//             aria-hidden
//             src="/window.svg"
//             alt="Window icon"
//             width={16}
//             height={16}
//           />
//           Examples
//         </a>
//         <a
//           className="flex items-center gap-2 hover:underline hover:underline-offset-4"
//           href="https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           <Image
//             aria-hidden
//             src="/globe.svg"
//             alt="Globe icon"
//             width={16}
//             height={16}
//           />
//           Go to nextjs.org →
//         </a>
//       </footer>
//     </div>
//   );
// }
