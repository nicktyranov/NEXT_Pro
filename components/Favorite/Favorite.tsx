'use client';
import { IFavoriteProps } from './Favorite.props';
import cn from 'classnames';
import icon from './like-icon.svg';
import icon2 from './like-icon-colored.svg';
import styles from './Favorite.module.css';
import { useState } from 'react';
import Image from 'next/image';
import { useFavorites } from '../FavoritesContext/FavoritesContext';

export default function Favorite({
   // Liked,
   width,
   height,
   sku,
   className,
   ...props
}: IFavoriteProps) {
   const { favoriteList, updateFavorites } = useFavorites();
   const [isLiked, setIsLiked] = useState(
      favoriteList.includes(sku) ? true : false
   );

   const handleClick = () => {
      const currentFavoriteList = [...favoriteList];
      if (!currentFavoriteList.includes(sku)) {
         currentFavoriteList.push(sku);
         setIsLiked(true);
         updateFavorites(currentFavoriteList);
      } else {
         const updatedFavorites = currentFavoriteList.filter(
            (el) => el !== sku
         );
         setIsLiked(false);
         updateFavorites(updatedFavorites);
      }
   };

   return (
      <button
         className={cn(styles['button'], className)}
         {...props}
         onClick={handleClick}
      >
         <Image
            src={isLiked ? icon2 : icon}
            alt="like icon"
            width={width}
            height={height}
            className={styles.icon}
         />
      </button>
   );
}
