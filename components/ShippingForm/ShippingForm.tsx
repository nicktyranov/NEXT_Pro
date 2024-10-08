'use client';
import { IShippingFormProps } from './ShippingForm.props';
import cn from 'classnames';
import Input from '../Input/Input';
import Button from '../Button/Button';
import { useEffect, useRef, useState } from 'react';
import { useCart } from '../CartContext/CartContext';
import { useOrders } from '../OrdersContext/OrdersContext';
import { useAuth } from '../AuthContext/AuthContext';
import Cookies from 'js-cookie';
import { checkEmail } from '@/helpers/emailHelper';
import styles from './ShippingForm.module.css';

export type ErrorResponse = {
   statusCode: number;
   message: string;
   error: string;
};

export type SuccessResponse = {
   access_token: string;
};

export type ApiResponse = ErrorResponse | SuccessResponse;

type ErrorResponseCreateOrder = {
   message: string[];
   error: string;
   statusCode: number;
};

type SuccessResponseCreateOrder = {
   id: number;
   userId: number;
   status: string;
   createdAt: string;
   data: ServerOrderData[];
};

type ServerOrderData = {
   name: string;
   count: number;
   price: number;
};

type ApiResponseCreateOrder =
   | ErrorResponseCreateOrder
   | SuccessResponseCreateOrder;

export default function ShippingForm({
   className,
   placeholder,
   setIsOrderSuccess,
   ...props
}: IShippingFormProps) {
   const [email, setEmail] = useState('');
   const [password, setPassword] = useState('');
   const [username, setUsername] = useState('');
   const [address, setAddress] = useState('');
   const [mobileNumber, setMobileNumber] = useState('');
   const [, setSubmitBtn] = useState(false);
   const [errorUsername, setErrorUsername] = useState('');
   const [errorEmail, setErrorEmail] = useState('');
   const [errorPassword, setErrorPassword] = useState('');
   const [errorAddress, setErrorAddress] = useState('');
   const [errorMobile, setErrorMobile] = useState('');
   const [errorSubmit, setErrorSubmit] = useState('');
   const [validForm, setValidForm] = useState(true);
   const formRef = useRef<HTMLFormElement>(null);
   const { cart, totalCost } = useCart();
   const { auth, register, login, getProfile, updateProfile, isLogined } =
      useAuth();

   const { addOrder } = useOrders();

   useEffect(() => {
      if (validForm && cart.length > 0) {
         setSubmitBtn(true);
      } else {
         setSubmitBtn(false);
      }
   }, [validForm, cart]);

   useEffect(() => {
      if (
         email &&
         password &&
         username &&
         address &&
         mobileNumber &&
         !errorUsername &&
         !errorEmail &&
         !errorAddress &&
         !errorPassword &&
         !errorMobile &&
         !isLogined
      ) {
         setValidForm(true);
      } else if (
         isLogined &&
         username &&
         address &&
         mobileNumber &&
         !errorUsername &&
         !errorAddress &&
         !errorMobile
      ) {
         setValidForm(true);
      } else {
         setValidForm(false);
      }
   }, [
      validForm,
      errorEmail,
      errorMobile,
      errorUsername,
      errorPassword,
      errorAddress,
      isLogined,
      email,
      password,
      username,
      address,
      mobileNumber
   ]);

   useEffect(() => {
      if (totalCost === 0) {
         setValidForm(false);
      }
   }, [totalCost]);

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

   const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setPassword(e.target.value);
      if (e.target.value.length < 5) {
         setErrorPassword(
            'Your password is too short. At least 6 characters long '
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

   const createOrder = async (
      token: string,
      orderItems: ServerOrderData[]
   ): Promise<ApiResponseCreateOrder> => {
      const response = await fetch(
         `${process.env.NEXT_PUBLIC_DOMAIN}/api-demo/order`,
         {
            headers: {
               'Content-Type': 'application/json',
               Authorization: `Bearer ${token}`
            },
            method: 'POST',
            body: JSON.stringify({ items: orderItems })
         }
      );
      return await response.json();
   };

   const hasValidationError =
      !validForm && (email || password || username || address || mobileNumber);
   const hasNoProductsInCart = cart.length < 1 && validForm;
   const validationErrorMessage = hasValidationError
      ? 'There is a mistake in this form. Check your input information'
      : '';
   const noProductsErrorMessage = hasNoProductsInCart
      ? 'No products in the cart. First, add products to the cart.'
      : '';

   const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (!validForm) {
         setValidForm(false);
         return;
      }

      try {
         if (!isLogined) {
            const registerResult = await register(
               email,
               password,
               username,
               mobileNumber,
               address
            );
            if (!registerResult.access_token) {
               console.error(`Error: ${registerResult.message}`);
               setErrorSubmit(`${registerResult.message}`);
               return;
            }
         }

         let loginResult;
         if (!isLogined) {
            loginResult = await login({ email, password });
         } else if (auth?.jwt) {
            loginResult = { access_token: auth.jwt };
         } else {
            loginResult = { message: 'Authorization token is missing.' };
         }

         if (loginResult && loginResult.access_token) {
            Cookies.set('shoppe_jwt', loginResult.access_token, { expires: 7 });
         }

         if (loginResult.access_token) {
            const currentProfile = await getProfile(loginResult.access_token);

            if ('id' in currentProfile) {
               const updateCurrentProfile = await updateProfile(
                  loginResult.access_token,
                  {
                     email: currentProfile.email,
                     name: currentProfile.name ? currentProfile.name : username,
                     phone: currentProfile.phone
                        ? currentProfile.phone
                        : mobileNumber,
                     address: currentProfile.address
                        ? currentProfile.address
                        : address
                  }
               );
            }

            const orderItems = cart.map((item) => ({
               name: item.name,
               count: item.amount,
               price: item.price
            }));
            const orderResult = await createOrder(
               loginResult.access_token,
               orderItems
            );
            if ('id' in orderResult) {
               console.log('Order created successfully:', orderResult);
               addOrder({
                  id: orderResult.id,
                  userId: orderResult.userId,
                  status: orderResult.status,
                  createdAt: orderResult.createdAt,
                  data: cart,
                  username: username,
                  email: email || auth?.email,
                  address,
                  mobileNumber
               });
               setIsOrderSuccess(true);
            } else {
               console.error('Error creating order:', orderResult);
            }
         } else {
            console.error(`Error: ${loginResult.message}`);
            setErrorSubmit(`${loginResult.message}`);
         }
      } catch (error) {
         console.error('Error handling form submission:', error);
      }
   };

   return (
      <div className={cn(styles['wrapper'], className)} {...props}>
         <form
            ref={formRef}
            className={styles['form']}
            onSubmit={handleFormSubmit}
         >
            {!isLogined && (
               <div className={styles['guest-user']}>
                  <div>
                     <label htmlFor="email" />
                     {errorEmail && <div className={'error'}>{errorEmail}</div>}
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
                        <div className={'error'}>{errorPassword}</div>
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
               {errorAddress && <div className={'error'}>{errorAddress}</div>}
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
               {errorUsername && <div className={'error'}>{errorUsername}</div>}
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
               {errorMobile && <div className={'error'}>{errorMobile}</div>}
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
            <div>
               {(validationErrorMessage || noProductsErrorMessage) && (
                  <div className={'error'}>
                     {validationErrorMessage}
                     {noProductsErrorMessage}
                  </div>
               )}
               {errorSubmit && <div className={'error'}>{errorSubmit}</div>}
               <Button
                  text="SEND"
                  className={cn(styles.button, {
                     [styles['button-disabled']]: !validForm || cart.length < 1
                  })}
                  disabled={!validForm || cart.length < 1}
               />
            </div>
         </form>
      </div>
   );
}
