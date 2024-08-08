'use client';
import { INotificationProps } from './Notification.props';
import Image from 'next/image';
import iconSuccess from './icon-subscribtion.svg';
import cn from 'classnames';
import toast from 'react-hot-toast';
import styles from './Notification.module.css';

export function showNotification(text: string, status?: boolean) {
   toast.custom(
      <div
         className={cn(styles.email, {
            [styles.wrong]: !status
         })}
      >
         {status && (
            <Image
               src={iconSuccess}
               width={20}
               height={20}
               alt="icon successful subscribtion"
            />
         )}
         {text}
      </div>,
      { position: 'bottom-center' }
   );
}

export default function Notification({
   className,
   ...props
}: INotificationProps) {
   return <div></div>;
}
