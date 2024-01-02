"use client";

import styled from "styled-components";
import Center from "../Center";
import ProductsGrid from "../ProductsGrid";
import { useEffect, useState } from "react";
import axios from "axios";
import Heading from "../Heading";

const CategoryHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  h1 {
    font-size: 1.5rem;
  }
`;

const FiltersWrapper = styled.div`
  display: flex;
  gap: 15px;
`;

const Filters = styled.div`
  background-color: #ddd;
  padding: 5px;
  border-radius: 5px;
  display: flex;
  gap: 5px;
  color: #444;
  select {
    background-color: transparent;
    border: none;
    outline: none;
    font-size: inherit;
    color: #444;
  }
`;

const CategoryListById = ({
  category,
  subCategories,
  products: originalProducts,
}: any) => {
  const defaultSorting = "_id-asc";
  const defaultFilterValues = category.properties.map((p: any) => ({
    name: p.name,
    value: "all",
  }));

  const [products, setProducts] = useState(originalProducts);

  const [filterValues, setFilterValues] = useState(defaultFilterValues);
  const [sortValue, setSortValue] = useState(defaultSorting);

  const [isFilterChanged, setIsFileterdChanged] = useState(false);
  const [isLoadingProducts, setIsLoadingProducts] = useState(false);

  console.log(filterValues);

  const handleFilterChange = (filterName: string, filterValue: string) => {
    setFilterValues((prev: any) => {
      return prev.map((p: any) => ({
        name: p.name,
        value: p.name === filterName ? filterValue : p.value,
      }));
    });
    setIsFileterdChanged(true);
  };

  useEffect(() => {
    if (!isFilterChanged) {
      return;
    }
    setIsLoadingProducts(true);
    const catIds = [category?._id, ...subCategories];

    // new URLSearchParams :--> useful to set query (?id=1&a=2&b=3)
    const params = new URLSearchParams();
    // set multiple category id in the form of string; param-set-01
    params.set("categories", catIds.join(","));

    // param-set-02
    filterValues.forEach((f: any) => {
      if (f?.value !== "all") {
        params.set(f.name, f.value);
      }
    });

    // param-set-03
    params.set("sort", sortValue);

    const url = `/api/products?${params.toString()}`;

    console.log(params.toString());

    axios.get(url).then((res) => {
      setProducts(res.data);
      setIsLoadingProducts(false);
    });
  }, [filterValues, sortValue, isFilterChanged]);

  return (
    <Center>
      <CategoryHeader>
        <h1>{category?.name}</h1>
        <FiltersWrapper>
          {category?.properties.map((prop: any) => {
            return (
              <Filters key={prop?.name}>
                <span>{prop.name}:</span>
                <select
                  value={
                    filterValues.find((f: any) => f.name === prop?.name).value
                  }
                  onChange={(e) =>
                    handleFilterChange(prop?.name, e.target.value)
                  }
                >
                  <option value={"all"}>All</option>
                  {prop.values.map((val: any) => (
                    <option key={val} value={val}>
                      {val}
                    </option>
                  ))}
                </select>
              </Filters>
            );
          })}
          <Filters>
            <span>Sort:</span>
            <select
              name=""
              id=""
              value={sortValue}
              onChange={(e) => {
                setSortValue(e.target.value);
                setIsFileterdChanged(true);
              }}
            >
              <option value="price-asc">highest price</option>
              <option value="price-desc">lowest Price</option>
              <option value="_id-asc">Newest first</option>
              <option value="_id-desc">Oldest first</option>
            </select>
          </Filters>
        </FiltersWrapper>
      </CategoryHeader>
      {isLoadingProducts && <Heading>spinner...</Heading>}
      {!isLoadingProducts && (
        <div>
          {products.length > 0 && <ProductsGrid products={products} />}
          {products.length === 0 && <div>Sorry, No products found</div>}
        </div>
      )}
    </Center>
  );
};

export default CategoryListById;
