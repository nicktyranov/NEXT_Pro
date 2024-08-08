import iconMail from './icon-mail.svg';
import Image from 'next/image';
import Favorite from '@/components/Favorite/Favorite';
import TabContent from '@/components/TabContent/TabContent';
import { IProductBySKU } from '@/interfaces/interface.bySku';
import { Metadata } from 'next';
import Gallery from '@/components/Gallery/Gallery';
import cn from 'classnames';
import styles from './page.module.css';
import Rating from '@/components/Rating/Rating';
import { notFound } from 'next/navigation';
import AddToCart from '@/components/AddToCart/AddToCart';

const dataDescription =
   'Universal classic. The earrings are made of rose gold with a path of diamonds and emeralds. Delicate, sophisticated, they will suit not only a business suit, but will also complement the image of any fashionista.';

export async function generateMetadata({
   params
}: {
   params: { [key: string]: number };
}): Promise<Metadata> {
   const id = params.sku;
   const res = await fetch(
      process.env.NEXT_PUBLIC_DOMAIN + '/api-demo/products/sku/' + id
   );
   const data = await res.json();

   return {
      title: `Buy ${data.name} in the Shoppe`,
      description: `${data.name} - ${data.description}`
   };
}

async function getData(id: number): Promise<IProductBySKU> {
   const res = await fetch(
      process.env.NEXT_PUBLIC_DOMAIN + '/api-demo/products/sku/' + id
   );
   if (!res) {
      throw new Error(
         'There is a problem with the connection to the server. Try to refresh page'
      );
   }

   return await res.json();
}

export default async function Product({
   params
}: {
   params: { [key: string]: number };
}) {
   const { sku } = params;
   if (!sku) {
      throw new Error(
         'There is a problem with the connection to the server. Try to refresh page'
      );
   }
   if (sku < 1 || sku > 6) notFound();

   const data = await getData(sku);
   if (!data) {
      throw new Error(
         'There is a problem with the connection to the server. Try to refresh page'
      );
   }

   const translateCategory = (id: number) => {
      switch (id) {
         case 1:
            return 'Hairpins';
         case 2:
            return 'Earrings';
         case 3:
            return 'Pendants';
         default:
            return 'Unknown';
      }
   };

   return (
      <div className={styles['wrapper']}>
         <div className={styles['description']}>
            <Gallery
               images={data.images}
               alt={`images of ${data.name}`}
               width={540}
               className={styles['gallery']}
            />

            <div className={styles['short-data']}>
               <h2 className={styles['heading']}>{data.name}</h2>
               <p className={styles['price']}>${data.price}</p>
               <Rating reviews={data.reviews} reviewsSummary />
               <p
                  className={cn(
                     styles['description-text'],
                     styles['short-description']
                  )}
               >
                  {dataDescription}
               </p>
               <div className={styles['buttons']}>
                  <AddToCart
                     productName={data.name}
                     productPrice={data.price}
                     productSKU={data.sku.toString()}
                  />
               </div>
               <div className={styles['icons']}>
                  <div>
                     <Favorite
                        className={styles['icon']}
                        width={18}
                        height={18}
                        sku={sku.toString()}
                     />
                  </div>
                  <div>
                     <Image
                        src={iconMail}
                        alt="icon mail"
                        className={styles['icon']}
                     />
                  </div>
               </div>
               <div className={styles['info-labels']}>
                  <p className={styles['label']}>
                     SKU:<span>{data.sku}</span>
                  </p>
                  <p className={styles['label']}>
                     Category:<span>{translateCategory(data.categoryId)}</span>
                  </p>
               </div>
            </div>
         </div>
         <TabContent
            description={dataDescription}
            reviews={data.reviews}
            className={styles['tab-content']}
            sku={sku}
         />
      </div>
   );
}
