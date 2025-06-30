import styled from "styled-components";
import { productFetch } from "../redux/apiCalls";
import Product from "./Product";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

// Styled Components
const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 30px;
  max-width: 1200px;
  margin: 20px auto;
  padding: 40px 20px;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  paddding: 20px;
`;

const ViewMoreButton = styled(Link)`
  margin-top: 30px;
  margin-bottom: 20px;
  padding: 12px 24px;
  background-color: #ffc0cb;
  color: white;
  font-size: 16px;
  font-weight: bold;
  border-radius: 30px;
  text-decoration: none;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #ff7fa3;
  }
`;

const Products = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.product.products);
  console.log(products);


  useEffect(() => {
    productFetch(dispatch);
  }, []);



  return (
    <Wrapper>
      <Container>
        {products?.slice(0, 8).map((item) => (
          <Product item={item} key={item._id || item.id} />
        ))}
      </Container>
      <ViewMoreButton to="/products/:category">View More Products</ViewMoreButton>
    </Wrapper>
  );
};

export default Products;
