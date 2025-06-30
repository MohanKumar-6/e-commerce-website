import styled from "styled-components";
import { productFetch } from "../redux/apiCalls";
import Product from "./Product";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

// Styled Components
const Container = styled.div`
  overflow-x: hidden;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 24px;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  width: 100%;
  box-sizing: border-box;
  
  /* Ensure consistent card heights */
  align-items: start;

  @media (max-width: 1200px) {
    max-width: 1000px;
    gap: 20px;
  }

  @media (max-width: 1024px) {
    grid-template-columns: repeat(3, 1fr);
    gap: 20px;
    max-width: 800px;
  }

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 16px;
    padding: 0 16px;
    max-width: 100%;
  }

  @media (max-width: 480px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 12px;
    padding: 0 12px;
  }

  @media (max-width: 360px) {
    gap: 10px;
    padding: 0 10px;
  }
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 40px 20px;
  width: 100%;
  max-width: 100vw;
  overflow-x: hidden;
  box-sizing: border-box;
  background: linear-gradient(135deg, #faf0e6 0%, #fff5f5 100%);
  min-height: 100vh;

  @media (max-width: 768px) {
    padding: 30px 16px;
  }

  @media (max-width: 480px) {
    padding: 20px 12px;
  }
`;

const ViewMoreButton = styled(Link)`
  margin-top: 40px;
  margin-bottom: 20px;
  padding: 14px 32px;
  background: linear-gradient(135deg, #ffc0cb 0%, #ff91a4 100%);
  color: white;
  font-size: 16px;
  font-weight: 600;
  border-radius: 30px;
  text-decoration: none;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  text-align: center;
  display: inline-block;
  box-shadow: 0 8px 24px rgba(255, 182, 193, 0.3);
  text-transform: uppercase;
  letter-spacing: 1px;

  &:hover {
    background: linear-gradient(135deg, #ff91a4 0%, #ff6b9d 100%);
    transform: translateY(-2px);
    box-shadow: 0 12px 32px rgba(255, 182, 193, 0.4);
  }

  &:active {
    transform: translateY(0);
  }

  @media (max-width: 768px) {
    margin-top: 32px;
    padding: 12px 28px;
    font-size: 15px;
    border-radius: 25px;
  }

  @media (max-width: 480px) {
    margin-top: 24px;
    padding: 10px 24px;
    font-size: 14px;
    border-radius: 20px;
    width: 90%;
    max-width: 280px;
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
