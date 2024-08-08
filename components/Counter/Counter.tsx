'use client';
import { ICounterProps } from './Counter.props';
import cn from 'classnames';
import { useEffect, useState } from 'react';
import styles from './Counter.module.css';

export default function Counter({
   amount,
   onChange = () => {},
   className,
   ...props
}: ICounterProps) {
   const [value, setValue] = useState(amount || 1);
   if (!amount || amount < 1) {
      amount = 1;
   }

   useEffect(() => {
      onChange(value);
   }, [value, onChange]);

   const handleChangeIncrease = () => {
      setValue(value + 1);
   };

   const handleChangeDecrease = () => {
      if (value > 1) {
         setValue(value - 1);
      }
   };
   return (
      <div className={cn(styles['wrapper'], className)} {...props}>
         <button className={styles['button']} onClick={handleChangeDecrease}>
            -
         </button>
         <span className={styles['number']}>{amount}</span>
         <button className={styles['button']} onClick={handleChangeIncrease}>
            +
         </button>
      </div>
   );
}
