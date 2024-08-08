'use client';
import { IShippingFormProps } from './ShippingForm.props';
import Image from 'next/image';
import cn from 'classnames';
import styles from './ShippingForm.module.css';
import Input from '../Input/Input';
import Rating from '../Rating/Rating';
import Button from '../Button/Button';
import CheckBox from '../CheckBox/CheckBox';
import { useEffect, useRef, useState } from 'react';
import { showNotification } from '../Notification/Notification';
import { useCart } from '../CartContext/CartContext';

type RequestStatus = {
   success: boolean;
   message: string;
};

export default function ShippingForm({
   className,
   placeholder,
   isLogined,
   ...props
}: IShippingFormProps) {
   const [email, setEmail] = useState('');
   const [password, setPassword] = useState('');
   const [username, setUsername] = useState('');
   const [address, setAddress] = useState('');
   const [mobileNumber, setMobileNumber] = useState('');
   const [errorUsername, setErrorUsername] = useState('');
   const [errorEmail, setErrorEmail] = useState('');
   const [errorPassword, setErrorPassword] = useState('');
   const [errorAddress, setErrorAddress] = useState('');
   const [errorMobile, setErrorMobile] = useState('');
   const [validForm, setValidForm] = useState(true);
   const [successPost, setSuccessPost] = useState<boolean>();
   const formRef = useRef<HTMLFormElement>(null);

   const isLoginedStatus = isLogined || false;

   const { cart } = useCart();
   const totalCost = cart.reduce((sum, x) => sum + x.price * x.amount, 0);

   useEffect(() => {
      if (email.length < 1) {
         return;
      }
      if (checkEmail(email)) {
         setErrorEmail('');
      } else {
         setErrorEmail('Invalid email. Try again');
      }
   }, [email]);

   const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setEmail(e.target.value);
   };

   function checkEmail(email: string) {
      const regex =
         /^((([0-9A-Za-z]{1}[-0-9A-z]{1,}[0-9A-Za-z]{1})|([0-9А-Яа-я]{1}[-0-9А-я.]{1,}[0-9А-Яа-я]{1}))@([-A-Za-z]{1,}\.){1,2}[-A-Za-z]{2,})$/;
      return regex.test(email);
   }

   const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setPassword(e.target.value);
      if (e.target.value.length < 5) {
         setErrorPassword(
            'Your passwordext is too short. At least 6 characters long '
         );
      } else {
         setErrorPassword('');
      }
   };

   const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.value.length < 4) {
         setErrorAddress('Address must be at least 4 characters long');
      } else {
         setErrorAddress('');
      }
      setAddress(e.target.value);
   };

   const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const inputData = e.target.value.trim();
      if (inputData.length < 4) {
         setErrorUsername('Name must be at least 4 characters long');
      } else if (!/^[a-zA-Z]+$/.test(inputData)) {
         setErrorUsername('Name must contain only letters');
      } else {
         setErrorUsername('');
      }
      setUsername(e.target.value);
   };

   const handleMobileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const inputData = e.target.value.trim();
      if (inputData.length !== 10) {
         setErrorMobile('Mobile must be at least 10 characters long');
      } else if (!/^\d+$/.test(inputData)) {
         setErrorMobile('Mobile must contain only numbers');
      } else {
         setErrorMobile('');
      }
      setMobileNumber(e.target.value);
   };

   const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
      console.log(`handleFormSubmit`);
      e.preventDefault();
      if (
         email &&
         password &&
         username &&
         address &&
         mobileNumber &&
         !errorUsername &&
         !errorEmail &&
         !errorPassword &&
         !errorMobile &&
         !errorUsername
      ) {
         setValidForm(true);
         console.log({
            email,
            password,
            username,
            address,
            mobileNumber
         });

         // try {
         //    const response = await fetch(
         //       `${process.env.NEXT_PUBLIC_DOMAIN}/api-demo/products/sku/${sku}/review`,
         //       {
         //          headers: {
         //             'Content-Type': 'application/json'
         //          },
         //          method: 'POST',
         //          body: JSON.stringify({
         //             name: username,
         //             email: email,
         //             rating: reviewRating
         //          })
         //       }
         //    );
         //    console.log(`response =${response}`);
         //    const result: RequestStatus = await response.json();
         //    console.log(`result =${result.success}`);

         //    if (result.success) {
         //       console.log(`result.status === 'success'`);
         //       setSuccessPost(true);
         //       showNotification(
         //          'Your review has been sent for moderation.',
         //          true
         //       );
         //       formRef.current?.reset();
         //    } else {
         //       setSuccessPost(false);
         //       showNotification(
         //          'There is a problem with the connetction to the server',
         //          false
         //       );
         //    }
         // } catch (error) {
         //    setSuccessPost(false);
         //    console.error('Error submitting form:', error);
         // }
      } else {
         setValidForm(false);
      }
      console.log(`setValidForm  ${validForm}`);
   };

   return (
      <div className={cn(styles['wrapper'], className)} {...props}>
         {/* <h2 className={styles['heading']}>Shipping and Contact information</h2> */}
         <form
            ref={formRef}
            className={styles['form']}
            onSubmit={handleFormSubmit}
         >
            {!isLoginedStatus && (
               <div className={styles['guest-user']}>
                  <div>
                     <label htmlFor="email" />
                     {errorEmail && (
                        <div className={styles.error}>{errorEmail}</div>
                     )}
                     <Input
                        placeholder="Your email*"
                        className={styles['input-element']}
                        name="email"
                        id="email"
                        value={email}
                        onChange={handleEmailChange}
                     />
                  </div>

                  <div>
                     <label htmlFor="password" />
                     {errorPassword && (
                        <div className={styles.error}>{errorPassword}</div>
                     )}
                     <Input
                        placeholder="Your password*"
                        type="password"
                        className={styles['input-element']}
                        name="password"
                        id="password"
                        value={password}
                        onChange={handlePasswordChange}
                     />
                  </div>
               </div>
            )}

            <div>
               <label htmlFor="address" />
               {errorAddress && (
                  <div className={styles.error}>{errorAddress}</div>
               )}
               <Input
                  placeholder="Your address*"
                  className={styles['input-element']}
                  name="address"
                  id="address"
                  value={address}
                  onChange={handleAddressChange}
               />
            </div>

            <div>
               <label htmlFor="username" />
               {errorUsername && (
                  <div className={styles.error}>{errorUsername}</div>
               )}
               <Input
                  placeholder="Your name*"
                  className={styles['input-element']}
                  name="username"
                  id="username"
                  value={username}
                  onChange={handleUsernameChange}
               />
            </div>

            <div>
               <label htmlFor="mobileNumber" />
               {errorMobile && (
                  <div className={styles.error}>{errorMobile}</div>
               )}
               <Input
                  placeholder="Your mobile number*"
                  className={styles['input-element']}
                  name="mobileNumber"
                  id="mobileNumber"
                  value={mobileNumber}
                  onChange={handleMobileChange}
               />
            </div>

            <div className={styles.summary}>
               <p>Summary</p>
               <p>
                  <span>Total cost</span>
                  <span>${totalCost}</span>
               </p>
            </div>

            {!validForm && (
               <div className={styles.error}>
                  There is a mistake in this form. Check your input information
               </div>
            )}
            <Button text="SEND" className={styles.button} />
         </form>
      </div>
   );
}
