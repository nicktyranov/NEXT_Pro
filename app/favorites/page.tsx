import cn from 'classnames';
import styles from './page.module.css';
import FavoriteList from '@/components/FavoriteList/FavoriteList';

export default function Favorites() {
   return (
      <div className={styles['wrapper']}>
         <h2 className={styles['heading']}>Favorites</h2>
         <div>
            <FavoriteList className={styles['list']} />
         </div>
      </div>
   );
}
