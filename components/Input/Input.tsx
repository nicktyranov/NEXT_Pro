'use client';
import { IInputProps } from './Input.props';
import Image from 'next/image';
import iconArrow from './Icon arrow.svg';
import cn from 'classnames';
import styles from './Input.module.css';

export default function Input({
   className,
   placeholder,
   icon,
   value,
   onChange,
   ...props
}: IInputProps) {
   return (
      <div className={cn(styles['input-wrapper'], className)}>
         <input
            className={styles.input}
            type="text"
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            {...props}
         />
         {icon && (
            <Image
               src={iconArrow}
               alt="search icon"
               className={cn(styles.icon)}
               height={19}
               width={25}
            />
         )}
      </div>
   );
}
