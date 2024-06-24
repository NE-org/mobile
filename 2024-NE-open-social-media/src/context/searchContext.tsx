import React, { createContext, useContext, useState } from 'react';

// Create the context
const SearchContext = createContext({
  searchText: '',
  setSearchText: (text: string) => {},
});

// Create a provider component
export const SearchProvider = ({ children }: any) => {
  const [searchText, setSearchText] = useState('');

  return (
    <SearchContext.Provider value={{ searchText, setSearchText }}>
      {children}
    </SearchContext.Provider>
  );
};

// Create a custom hook to use the context
export const useSearch = () => useContext(SearchContext);
