'use client';
import { ICardProps } from './Card.props';
import Image from 'next/image';
import iconLike from './like-icon-colored.svg';
import iconCart from './cart-icon.svg';
import iconView from './eye-icon.svg';
import cn from 'classnames';
import testImg from './Img 01.png';
import styles from './Card.module.css';
import Link from 'next/link';
import Favorite from '../Favorite/Favorite';
import { useAddToCart } from '../Cart/CartFunction';
import { useFavorites } from '../FavoritesContext/FavoritesContext';
import { useEffect, useState } from 'react';

export default function Card({
   discount,
   // isLiked,
   soldOut,
   heading,
   price,
   img,
   sku,
   main,
   className,
   ...props
}: ICardProps) {
   const addToCart = useAddToCart();
   const { favoriteList, updateFavorites } = useFavorites();
   const [isLiked, setIsLiked] = useState<boolean>(
      favoriteList.includes(sku.toString()) ? true : false
   );

   useEffect(() => {
      setIsLiked(favoriteList.includes(sku.toString()));
   }, [favoriteList, sku]);

   let productSKU = sku.toString();
   let quantity = 1;

   let width, height;
   if (main) {
      width = 380;
      height = 380;
   } else {
      width = 300;
      height = 300;
   }

   return (
      <div
         className={cn(styles['card-wrapper'], {
            [styles['card-wrapper-main']]: main
         })}
         {...props}
      >
         <div className={cn(styles['poster-wrapper'], className)}>
            <Image
               src={img || testImg}
               alt="search icon"
               className={cn(styles.poster)}
               width={width}
               height={height}
               priority
            />
            <div className={styles['hover-buttons']}>
               <button
                  className={styles['hover-button-element']}
                  onClick={() =>
                     addToCart({ productSKU, quantity, price: Number(price) })
                  }
               >
                  <Image
                     src={iconCart}
                     alt="icon cart"
                     width={25}
                     height={25}
                  />
               </button>
               <Link href={`/shop/${sku}`}>
                  <button className={styles['hover-button-element']}>
                     <Image
                        src={iconView}
                        alt="icon view"
                        width={32}
                        height={32}
                     />
                  </button>
               </Link>
               <Favorite
                  className={styles['hover-button-element']}
                  width={25}
                  height={25}
                  sku={sku.toString()}
               />
            </div>
         </div>
         {isLiked && (
            <Image
               src={iconLike}
               alt="Like icon"
               className={cn(styles['poster-icon-right'])}
               width={19}
               height={18}
            />
         )}
         <Link href={`/shop/${sku}`}>
            <h2 className={styles.heading}>{heading}</h2>
            <p className={styles.price}>${price}.00</p>

            {discount && !soldOut && (
               <p className={cn(styles['poster-icon-left'])}>{discount}</p>
            )}
         </Link>
      </div>
   );
}
