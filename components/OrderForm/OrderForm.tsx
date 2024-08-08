'use client';
import { useRef, useState } from 'react';
import Counter from '@/components/Counter/Counter';
import { IOrderFormProps } from './OrderForm.props';
import { CartItem, useCart } from '../CartContext/CartContext';
import icon from './iconCross.svg';
import Image from 'next/image';
import cn from 'classnames';
import styles from './OrderForm.module.css';

export default function OrderForm({ data, amount }: IOrderFormProps) {
   const [quantity, setQuantity] = useState(amount || 1);
   const [deleted, setDeleted] = useState(false);
   const { cart, updateCart } = useCart();
   const previousCartRef = useRef<CartItem[]>(cart);

   const handleQuantityChange = (newQuantity: number) => {
      setQuantity(newQuantity);
      const updatedCart = cart.map((item) =>
         item.sku === data.sku.toString()
            ? { ...item, amount: newQuantity }
            : item
      );
      if (
         JSON.stringify(updatedCart) !== JSON.stringify(previousCartRef.current)
      ) {
         updateCart(updatedCart);
         previousCartRef.current = updatedCart;
      }
   };

   const handleDelete = (id: number) => {
      updateCart(cart.filter((el) => el.sku !== id.toString()));
      setDeleted(true);
   };

   return (
      <div
         className={cn(styles['wrapper'], {
            [styles['deleted']]: deleted
         })}
      >
         <div className={styles['product-element']}>
            <div className={styles['product-image']}>
               <Image
                  src={data.images[0]}
                  alt="products-element"
                  width={135}
                  height={135}
                  priority
                  className={styles['product-image']}
               />
            </div>
            <div className={styles['product-info']}>
               <h2>{data.name}</h2>
               <p>${data.price}</p>
            </div>

            <div className={styles['counter']}>
               <Counter
                  className={styles['button']}
                  amount={quantity}
                  onChange={handleQuantityChange}
               />
            </div>

            <button
               onClick={() => handleDelete(data.sku)}
               className={styles['delete-btn']}
            >
               <Image src={icon} alt="delete icon" />
            </button>
         </div>
      </div>
   );
}
