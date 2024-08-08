'use client';

import { useEffect, useState } from 'react';
import Button from '@/components/Button/Button';
import Counter from '@/components/Counter/Counter';
import styles from './AddToCart.module.css';
import { IAddToCartProps } from './AddToCart.props';
import { useCart } from '../CartContext/CartContext';
import { useAddToCart } from '../Cart/CartFunction';
import cn from 'classnames';

export default function AddToCart({
   productSKU,
   productPrice
}: IAddToCartProps) {
   const [quantity, setQuantity] = useState(1);
   const addToCart = useAddToCart();
   const { cart } = useCart();

   useEffect(() => {
      const product = cart.find((item) => item.sku === productSKU);
      if (product) {
         setQuantity(product.amount);
      }
   }, [cart, productSKU]);

   return (
      <div className={styles['buttons']}>
         <Counter
            className={styles['button']}
            amount={quantity}
            onChange={setQuantity}
         />
         <Button
            text="Add to the cart"
            className={cn(styles['button'], styles['cart-btn'])}
            onClick={() =>
               addToCart({ productSKU, quantity, price: productPrice })
            }
         />
      </div>
   );
}
