import cn from 'classnames';
import styles from './page.module.css';
import img1 from './about1.png';
import img2 from './about2.png';
import Image from 'next/image';

export default function About() {
   return (
      <div className={styles['wrapper']}>
         <h2 className={styles['heading']}>About</h2>
         <h3 className={styles['heading-small']}>
            We make gorgeous jewelry for you
         </h3>
         <p className={styles['text']}>
            Welcome to our jewelry world, where each piece tells a story crafted
            in precious metals and gemstones. Our company specializes in
            offering unique jewelry pieces created with love and attention to
            detail. We take pride in providing our customers with a wide range
            of designs, from classic to contemporary, that enhance your
            individuality and style.
         </p>
         <Image src={img1} alt={'jewelry image'} className={styles['image']} />
         <p className={styles['text']}>
            We collaborate with the finest artisans and designers to ensure
            every detail is flawless. Our goal is not just to sell jewelry but
            to give you a piece of joy that you can wear every day. We are
            confident that you will find exactly what you are looking for in our
            catalog, whether it is a gift for a loved one or a new addition to
            your personal collection. Join our community of jewelry enthusiasts
            and let us be a part of your special moments.
         </p>
         <Image
            src={img2}
            alt={'jewelry image 2'}
            className={styles['image']}
         />
      </div>
   );
}
