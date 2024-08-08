'use client';

import React, {
   createContext,
   useContext,
   useState,
   ReactNode,
   useEffect
} from 'react';

interface FavoritesContextType {
   favoriteList: string[];
   updateFavorites: (newSku: string[]) => void;
}

const FavoritesContext = createContext<FavoritesContextType | null>(null);

export const FavoritesContextProvider = ({
   children
}: {
   children: ReactNode;
}) => {
   const [favoriteList, setIsFavorited] = useState<string[]>([]);

   useEffect(() => {
      const storedFavorites = JSON.parse(
         localStorage.getItem('shoppe_favorites') || '[]'
      );
      setIsFavorited(storedFavorites);
   }, []);

   const updateFavorites = (newSku: string[]) => {
      setIsFavorited(newSku);
      localStorage.setItem('shoppe_favorites', JSON.stringify(newSku));
   };

   return (
      <FavoritesContext.Provider value={{ favoriteList, updateFavorites }}>
         {children}
      </FavoritesContext.Provider>
   );
};

export const useFavorites = () => {
   const context = useContext(FavoritesContext);
   if (!context) {
      throw new Error(
         'useFavorites must be used within a FavoritesContextProvider'
      );
   }
   return context;
};
