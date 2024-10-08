import cn from 'classnames';
import styles from './page.module.css';
import LoginForm from '@/components/LoginForm/LoginForm';
import OrderList from '@/components/OrderList/OrderList';

export default function Orders() {
   return (
      <div className={styles['wrapper']}>
         <h2 className={styles['heading']}>My orders</h2>
         <OrderList />
      </div>
   );
}
