import { Link } from "react-router-dom";
import styled from "styled-components";

const Container = styled.div`
  flex: 1;
  margin: 10px;
  height: 70vh;
  border-radius: 20px;
  overflow: hidden;
  position: relative;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease-in-out;

  &:hover {
    transform: scale(1.02);
  }
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const Info = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  padding: 20px;
  backdrop-filter: blur(10px);
  background-color: rgba(255, 255, 255, 0.15);
  color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 2;
  border-top: 1px solid rgba(255, 255, 255, 0.2);
`;

const Title = styled.h1`
  font-size: 22px;
  font-weight: 600;
  color: white;
  margin-bottom: 10px;
  text-shadow: 0 0 5px rgba(0, 0, 0, 0.4);
`;

const Button = styled.button`
  border: none;
  padding: 10px 20px;
  background-color: rgba(255, 255, 255, 0.25);
  color: white;
  font-weight: 500;
  border-radius: 20px;
  backdrop-filter: blur(4px);
  box-shadow: 0 2px 8px rgba(255, 255, 255, 0.1);
  transition: all 0.3s ease-in-out;
  cursor: pointer;

  &:hover {
    background-color: rgba(255, 255, 255, 0.35);
  }
`;

const CategoryItem = ({ item }) => {
  return (
    <Container>
      <Link to={`/products/${item.cat}`} style={{ textDecoration: "none" }}>
        <Image src={item.img} />
        <Info>
          <Title>{item.title}</Title>
          <Button>SHOP NOW</Button>
        </Info>
      </Link>
    </Container>
  );
};

export default CategoryItem;
