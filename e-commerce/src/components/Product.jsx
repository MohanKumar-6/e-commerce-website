import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { addProduct } from "../redux/cartRedux"; // Adjust path if needed

// Styled components
const Card = styled.div`
  width: 100%;
  max-width: 250px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 20px;
  overflow: hidden;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.3);
  box-shadow: 0 8px 32px rgba(31, 38, 135, 0.1);
  display: flex;
  flex-direction: column;
  padding: 12px;
  transition: all 0.3s ease;
  opacity: ${(props) => (props.outOfStock ? 0.6 : 1)};
  position: relative;

  &:hover {
    transform: ${(props) => (props.outOfStock ? "none" : "translateY(-6px)")};
    box-shadow: ${(props) =>
      props.outOfStock
        ? "0 10px 20px rgba(255, 182, 193, 0.3)"
        : "0 18px 35px rgba(255, 182, 193, 0.4)"};
  }
`;

const ImageLink = styled(Link)`
  width: 100%;
  aspect-ratio: 1 / 1;
  border-radius: 15px;
  overflow: hidden;
  background-color: #fdf0f5;
`;

const ProductImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;

  ${Card}:hover & {
    transform: scale(1.03);
  }
`;

const Title = styled(Link)`
  display: block;
  margin-top: 10px;
  font-size: 16px;
  font-weight: 600;
  text-align: center;
  color: #333;
  text-decoration: none;
  padding: 0 5px;

  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  &:hover {
    color: #ff7fa3;
  }
`;

const ProductDetails = styled.div`
  margin-top: 12px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Price = styled.span`
  font-size: 17px;
  font-weight: 600;
  color: #444;
`;

const ButtonWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
`;

const AddButton = styled.button`
  border: none;
  background-color: #ffc0cb;
  padding: 6px 12px;
  border-radius: 12px;
  font-size: 14px;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;
  color: white;

  &:hover {
    background-color: #ff7fa3;
  }

  &:disabled {
    background-color: #ffe4ec;
    color: #999;
    cursor: not-allowed;
  }
`;


const Quantity = styled.span`
  font-size: 15px;
  font-weight: 600;
`;

const StockBadge = styled.div`
  position: absolute;
  top: 10px;
  left: 10px;
  background-color: crimson;
  color: white;
  font-size: 11px;
  font-weight: bold;
  padding: 4px 10px;
  border-radius: 20px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
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
      {outOfStock && <StockBadge>OUT OF STOCK</StockBadge>}

      <ImageLink to={`/product/${item._id}`}>
        <ProductImage src={item.thumbnail} alt={item.title} />
      </ImageLink>

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
          <AddButton disabled>Added</AddButton>
        )}
      </ProductDetails>
    </Card>
  );
};

export default Product;
