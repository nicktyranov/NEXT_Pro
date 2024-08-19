export interface IShippingFormProps
   extends React.InputHTMLAttributes<HTMLInputElement> {
   className?: string;
   isLogined?: boolean;
   setIsOrderSuccess: (isOrderSuccess: boolean) => void;
}
