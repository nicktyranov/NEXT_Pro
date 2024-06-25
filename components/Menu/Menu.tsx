'use client';
import { IMenuProps } from './Menu.props';
import Image from 'next/image';
import logo from './logo.svg';
import likeIcon from './like-icon.svg';
import userIcon from './user-icon.svg';
import mobileMenuIcon from './mobileMenu.svg';
import logoutIcon from './logout-icon.svg';
import Search from '../Search/Search';
import Link from 'next/link';
import Cart from '../Cart/Cart';
import { useState } from 'react';
import { motion } from 'framer-motion';
import styles from './Menu.module.css';

export default function Menu({}: IMenuProps) {
   const [isMobileMenuOpened, setIsMobileMenuOpened] = useState(false);
   const isLogined = true;
   return (
      <div className={styles.wrapper}>
         <div className={styles.menu}>
            <div>
               <Image src={logo} alt="Logo" className={styles.logo} priority />
            </div>
            <nav className={styles.nav}>
               <Link href={'/shop'} className={styles.shop}>
                  Shop
               </Link>
               <Link href={'/about'} className={styles.about}>
                  About
               </Link>
               <Search isClicked={false} />
               <Link href={'/cart'} className={styles.cart}>
                  <Cart amount={10} />
               </Link>
               <Link href={'/favorites'} className={styles.about}>
                  <Image src={likeIcon} alt="favorites icon" />
               </Link>
               <Link href={'/user'} className={styles.user}>
                  <Image src={userIcon} alt="user icon" />
               </Link>
            </nav>
         </div>
         <div className={styles['mobile-menu']}>
            <div>
               <Image src={logo} alt="Logo" className={styles.logo} priority />
            </div>
            <Link href={'/cart'} className={styles.cart}>
               <Cart amount={10} />
            </Link>
            <Image
               src={mobileMenuIcon}
               alt="mobile menu icon"
               id="mobileMenuIcon"
               onClick={() => setIsMobileMenuOpened(!isMobileMenuOpened)}
            />
            <Search isClicked={true} className={styles['mobile-search']} />
            {isMobileMenuOpened && (
               <motion.div
                  className={styles['mobile-navigation-wrapper']}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
               >
                  <nav className={styles['mobile-navigation']}>
                     <Link href={'/shop'}>Main</Link>
                     <Link href={'/shop'}>Shop</Link>
                     <Link href={'/about'}>About</Link>
                     <hr />
                     <Link href={'/user'} className={styles['link-with-icon']}>
                        <Image src={userIcon} alt="user icon" />
                        <p>My account</p>
                     </Link>
                     <Link
                        href={'/favorites'}
                        className={styles['link-with-icon']}
                     >
                        <Image src={likeIcon} alt="favorites icon" />
                        <p>My favorites</p>
                     </Link>

                     {isLogined && (
                        <Link
                           href={'/logout'}
                           className={styles['link-with-icon']}
                        >
                           <Image src={logoutIcon} alt="logout icon" />
                           <p>Logout</p>
                        </Link>
                     )}
                  </nav>
               </motion.div>
            )}
         </div>
      </div>
   );
}
