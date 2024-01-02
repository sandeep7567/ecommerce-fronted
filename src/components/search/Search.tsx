"use client";

import React, { FC, useCallback, useEffect, useRef, useState } from "react";
import styled from "styled-components";

import axios from "axios";

import { debounce } from "lodash";

import Center from "../Center";
import Input from "../Input";

import ProductsGrid from "../ProductsGrid";

interface SearchProps {
  children?: React.ReactNode;
}

const SearchInput = styled(Input)`
  padding: 5px 10px;
  border-radius: 5px;
  font-size: 1.4rem;
`;

const InputWrapper = styled.div`
  position: sticky;
  inset: 1%;
  margin: 25px 0;
  padding: 5px 0;
  background-color: #eeeeeeaa;
`;

const Search: FC<SearchProps> = ({ children }) => {
  const [phrase, setPhrase] = useState("");
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  console.log(products.length);

  useEffect(() => {
    if (phrase.length > 0) {
      setIsLoading(true);
      debounceSearch(phrase);
    } else {
      setProducts([]);
    }
  }, [phrase]);

  const searchProducts = (phrase: string) => {
    axios
      .get(`/api/products?phrase=${encodeURIComponent(phrase)}`)
      .then((res) => {
        setProducts(res?.data);
        setIsLoading(false);
      });
  };

  const debounceSearch = useCallback(
    debounce((phrase) => searchProducts(phrase), 500),
    []
  );

  return (
    <React.Fragment>
      <Center>
        <InputWrapper>
          <SearchInput
            autoFocus
            placeholder="Search for products..."
            value={phrase}
            onChange={(e) => setPhrase(e.target.value)}
          />
        </InputWrapper>
        {!isLoading && phrase !== "" && products.length === 0 && (
          <h2>{`No Products found for search ${phrase}`}</h2>
        )}
        {isLoading && <>Spinner...</>}
        {!isLoading && phrase.length > 0 && (
          <ProductsGrid products={products} />
        )}
      </Center>
      {children}
    </React.Fragment>
  );
};

export default Search;
