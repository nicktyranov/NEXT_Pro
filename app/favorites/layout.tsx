import { Metadata } from 'next';

export const metadata: Metadata = {
   title: 'Shop App | Favorites',
   description: 'About the Shoppe'
};

export default function Layout({ children }: { children: React.ReactNode }) {
   return <div>{children}</div>;
}
