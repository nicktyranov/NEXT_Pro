import { Metadata } from 'next';

export const metadata: Metadata = {
   title: 'Shop App | About',
   description: 'About the Shoppe'
};

export default function AboutLayout({
   children
}: {
   children: React.ReactNode;
}) {
   return <div>{children}</div>;
}
