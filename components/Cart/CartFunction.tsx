import { useCart } from '../CartContext/CartContext';

export function useAddToCart() {
   const { cart, updateCart } = useCart();

   function addToCart({
      productSKU,
      quantity,
      price
   }: {
      productSKU: string;
      quantity: number;
      price: number;
   }) {
      const currentCart = [...cart];
      const productIndex = currentCart.findIndex(
         (item) => item.sku === productSKU
      );
      const newEntry = { sku: productSKU, amount: quantity, price: price };

      if (productIndex !== -1) {
         currentCart[productIndex] = newEntry;
      } else {
         currentCart.push(newEntry);
      }

      updateCart(currentCart);
      console.log(`Added to cart: SKU - ${productSKU}, Amount - ${quantity}`);
   }

   return addToCart;
}
