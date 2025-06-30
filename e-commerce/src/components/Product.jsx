import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { addProduct } from "../redux/cartRedux"; // Adjust path if needed

// Styled components
const Card = styled.div`
  width: 100%;
  background: rgba(255, 255, 255, 0.25);
  border-radius: 24px;
  overflow: hidden;
  backdrop-filter: blur(15px);
  border: 1px solid rgba(255, 255, 255, 0.4);
  box-shadow: 0 12px 40px rgba(255, 182, 193, 0.15);
  display: flex;
  flex-direction: column;
  padding: 16px;
  transition: all 0.35s cubic-bezier(0.4, 0, 0.2, 1);
  opacity: ${(props) => (props.outOfStock ? 0.65 : 1)};
  position: relative;
  box-sizing: border-box;
  height: fit-content;

  &:hover {
    transform: ${(props) => (props.outOfStock ? "none" : "translateY(-8px) scale(1.02)")};
    box-shadow: ${(props) =>
      props.outOfStock
        ? "0 12px 40px rgba(255, 182, 193, 0.15)"
        : "0 24px 50px rgba(255, 182, 193, 0.25)"};
  }

  @media (max-width: 768px) {
    padding: 14px;
    border-radius: 20px;
    
    &:hover {
      transform: ${(props) => (props.outOfStock ? "none" : "translateY(-4px)")};
    }
  }

  @media (max-width: 480px) {
    padding: 12px;
    border-radius: 18px;
  }
`;

const ImageLink = styled(Link)`
  width: 100%;
  aspect-ratio: 1 / 1;
  border-radius: 18px;
  overflow: hidden;
  background: linear-gradient(135deg, #fdf0f5 0%, #fce4ec 100%);
  flex-shrink: 0;
  position: relative;

  @media (max-width: 768px) {
    border-radius: 16px;
  }

  @media (max-width: 480px) {
    border-radius: 14px;
  }
`;

const ProductImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);

  ${Card}:hover & {
    transform: scale(1.05);
  }
`;

const ProductContent = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  min-width: 0;
  padding-top: 12px;
`;

const Title = styled(Link)`
  display: block;
  font-size: 15px;
  font-weight: 600;
  text-align: center;
  color: #2d3748;
  text-decoration: none;
  padding: 0 4px;
  line-height: 1.4;
  margin-bottom: 8px;
  
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  min-height: 2.8em;
  word-wrap: break-word;

  &:hover {
    color: #ff6b9d;
  }

  @media (max-width: 768px) {
    font-size: 14px;
    min-height: 2.8em;
    -webkit-line-clamp: 2;
  }

  @media (max-width: 480px) {
    font-size: 13px;
    min-height: 2.6em;
  }
`;

const ProductDetails = styled.div`
  margin-top: auto;
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
`;

const Price = styled.div`
  font-size: 18px;
  font-weight: 700;
  color: #2d3748;
  text-align: center;
  letter-spacing: -0.5px;

  @media (max-width: 768px) {
    font-size: 17px;
  }

  @media (max-width: 480px) {
    font-size: 16px;
  }
`;

const AddButton = styled.button`
  border: none;
  background: linear-gradient(135deg, #ffc0cb 0%, #ff91a4 100%);
  padding: 10px 16px;
  border-radius: 16px;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  color: white;
  width: 100%;
  box-shadow: 0 4px 12px rgba(255, 182, 193, 0.3);
  text-transform: uppercase;
  letter-spacing: 0.5px;

  &:hover {
    background: linear-gradient(135deg, #ff91a4 0%, #ff6b9d 100%);
    transform: translateY(-1px);
    box-shadow: 0 6px 16px rgba(255, 182, 193, 0.4);
  }

  &:active {
    transform: translateY(0);
  }

  &:disabled {
    background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
    color: #6c757d;
    cursor: not-allowed;
    transform: none;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  }

  @media (max-width: 768px) {
    padding: 9px 14px;
    font-size: 12px;
    border-radius: 14px;
  }

  @media (max-width: 480px) {
    padding: 8px 12px;
    font-size: 11px;
    border-radius: 12px;
  }
`;

const StockBadge = styled.div`
  position: absolute;
  top: 12px;
  left: 12px;
  background: linear-gradient(135deg, #dc3545 0%, #c82333 100%);
  color: white;
  font-size: 10px;
  font-weight: 700;
  padding: 4px 10px;
  border-radius: 20px;
  box-shadow: 0 4px 12px rgba(220, 53, 69, 0.3);
  z-index: 2;
  text-transform: uppercase;
  letter-spacing: 0.5px;

  @media (max-width: 768px) {
    top: 10px;
    left: 10px;
    font-size: 9px;
    padding: 3px 8px;
  }

  @media (max-width: 480px) {
    font-size: 8px;
    padding: 3px 7px;
  }
`;

const AddedBadge = styled.div`
  background: linear-gradient(135deg, #28a745 0%, #20c997 100%);
  color: white;
  padding: 10px 16px;
  border-radius: 16px;
  font-size: 13px;
  font-weight: 600;
  text-align: center;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  box-shadow: 0 4px 12px rgba(40, 167, 69, 0.3);

  @media (max-width: 768px) {
    padding: 9px 14px;
    font-size: 12px;
    border-radius: 14px;
  }

  @media (max-width: 480px) {
    padding: 8px 12px;
    font-size: 11px;
    border-radius: 12px;
  }
`;

const Product = ({ item }) => {
  const dispatch = useDispatch();
  const outOfStock = item.stock <= 0;
  const [quantity, setQuantity] = useState(0);

  const handleAdd = () => {
    setQuantity(1);
    dispatch(addProduct({ ...item, quantity: 1 }));
  };

  return (
    <Card outOfStock={outOfStock}>
      {outOfStock && <StockBadge>Out of Stock</StockBadge>}

      <ImageLink to={`/product/${item._id}`}>
        <ProductImage src={item.thumbnail} alt={item.title} />
      </ImageLink>

      <ProductContent>
        <Title to={`/product/${item._id}`} title={item.title}>
          {item.title}
        </Title>

        <ProductDetails>
          <Price>₹{item.price}</Price>
          
          {outOfStock ? (
            <AddButton disabled>Sold Out</AddButton>
          ) : quantity === 0 ? (
            <AddButton onClick={handleAdd}>Add to Cart</AddButton>
          ) : (
            <AddedBadge>Added to Cart ✓</AddedBadge>
          )}
        </ProductDetails>
      </ProductContent>
    </Card>
  );
};

export default Product;
