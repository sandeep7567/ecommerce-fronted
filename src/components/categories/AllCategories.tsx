"use client";

import styled from "styled-components";
import Center from "../Center";
import ProductBox from "../home/ProductBox";
import Link from "next/link";

const CategoryGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 30px;
  @media screen and (min-width: 768px) {
    grid-template-columns: repeat(4, 1fr);
  }
`;

const CategoryWrapper = styled.div`
  margin-bottom: 40px;
`;

const CategoryTitle = styled.div`
  display: flex;
  margin-top: 10px;
  margin-bottom: 0;
  align-items: center;
  gap: 15px;
  h2 {
    margin-bottom: 10px;
    margin-top: 10px;
  }
  a {
    color: #555;
    display: inline-block;
  }
`;

const ShowAllSquare = styled(Link)`
  background-color: #ddd;
  height: 150px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 15px;
  color: #555;
  text-decoration: none;
`;

const AllCategory = ({ mainCategories, categoriesProducts }: any) => {
  return (
    <Center>
      {mainCategories.map((cat: any) => (
        <CategoryWrapper>
          <CategoryTitle>
            <h2>{cat?.name}</h2>
            <div>
              <Link href={`/category/${cat?._id}`}>Show All</Link>
            </div>
          </CategoryTitle>
          <CategoryGrid>
            {categoriesProducts[cat._id].length > 0 ? (
              categoriesProducts[cat._id].map((p: any) => <ProductBox {...p} />)
            ) : (
              <h5>Category related product not found</h5>
            )}
            <ShowAllSquare href={`/category/${cat?._id}`}>
              Show All &rarr;
            </ShowAllSquare>
          </CategoryGrid>
        </CategoryWrapper>
      ))}
    </Center>
  );
};

export default AllCategory;
