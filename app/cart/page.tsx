import { IProductBySKU } from '@/interfaces/interface.bySku';
import { cookies } from 'next/headers';
import ShippingForm from '@/components/ShippingForm/ShippingForm';
import OrderForm from '@/components/OrderForm/OrderForm';
import { CartItem } from '@/components/CartContext/CartContext';
import styles from './page.module.css';

export async function getData(id: string): Promise<IProductBySKU> {
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

export default async function Cart() {
   const cookieStore = cookies();
   const cart = cookieStore.get('shoppe_cart');
   if (!cart) {
      return <>Empty cart</>;
   }

   let arraySKU: string[] = [];
   const data: CartItem[] = JSON.parse(cart?.value);
   if (cart) {
      arraySKU = data.map((item) => item.sku);
   }
   let productData = [];
   if (arraySKU) {
      for (let i = 0; i < arraySKU.length; i++) {
         const element = await getData(arraySKU[i]);
         productData.push(element);
      }
   }

   return (
      <div className={styles['wrapper']}>
         <h2 className={styles['heading']}>Cart</h2>
         <div className={styles['products-form-wrapper']}>
            <div>
               {!productData ||
                  (productData.length < 1 && (
                     <p className={styles['empty-cart']}>¯\_(ツ)_/¯</p>
                  ))}
               {productData &&
                  productData.map((item) => {
                     const productAmount =
                        data.find((el) => el.sku === item.sku.toString())
                           ?.amount || 0;
                     return (
                        <OrderForm
                           data={item}
                           key={item.sku}
                           amount={productAmount}
                        />
                     );
                  })}
            </div>

            <div className={styles['form-wrapper']}>
               <ShippingForm />
            </div>
         </div>
      </div>
   );
}
