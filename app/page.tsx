import styles from './page.module.css';
import Card from '@/components/Card/Card';
import ImageSlider from '@/components/ImageSlider/ImageSlider';
import { IGetProducts, IProductList } from '@/interfaces/interface.products';
import Link from 'next/link';

async function getProducts(): Promise<IProductList> {
   const limit = 6;
   const offset = 0;

   const res = await fetch(
      process.env.NEXT_PUBLIC_DOMAIN +
         `/api-demo/products?limit=${limit}&offset=${offset}`
   );

   if (!res.ok) {
      throw new Error('Failed to fetch products');
   }

   const data: IProductList = await res.json();
   if (!data || !data.products) {
      throw new Error('Invalid products data');
   }
   return data;
}

export default async function Home({}) {
   const products = await getProducts();

   const pageData = products.products.slice(0, 6);

   console.log(products.products.length);

   return (
      <>
         <ImageSlider />
         <div className={styles.heading}>
            <h1 className={styles.h1}>Last arrivals</h1>
            <Link href={'/shop'}>all</Link>
         </div>

         <div className={styles.products}>
            {pageData.map((product, index) => (
               <Card
                  key={`${product.sku}-${index}`}
                  sku={product.sku}
                  price={product.price}
                  heading={product.name}
                  img={product.images[0]}
                  main={true}
                  // isLiked={true}
               />
            ))}
         </div>
      </>
   );
}
