import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const Container = styled.div`
  min-height: 70vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #fff8dc 60%, #ffeef8 100%);
  font-family: 'Poppins', sans-serif;
`;

const Title = styled.h1`
  color: #b3005e;
  font-size: 2.2rem;
  margin-bottom: 10px;
  text-align: center;

  @media (max-width: 600px) {
    font-size: 1.3rem;
  }
`;

const Message = styled.p`
  color: #444;
  font-size: 1.1rem;
  margin-bottom: 30px;
  text-align: center;

  @media (max-width: 600px) {
    font-size: 0.98rem;
  }
`;

const Button = styled.button`
  padding: 12px 28px;
  border: none;
  border-radius: 20px;
  background: linear-gradient(135deg, #f9a8d4, #f472b6);
  color: white;
  font-weight: 600;
  font-size: 1rem;
  cursor: pointer;
  transition: background 0.3s;

  &:hover {
    background: linear-gradient(135deg, #f472b6, #ec4899);
  }

  @media (max-width: 600px) {
    font-size: 0.95rem;
    padding: 10px 0;
    width: 90vw;
    max-width: 300px;
  }
`;

const Success = () => {
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleContinue = () => {
    navigate("/");
  };

  return (
    <Container>
      <Title>🎉 Thank You for Shopping with Deccan Threads!</Title>
      <Message>
        Your order was placed successfully.<br />
        We hope our products bring a little more joy and coziness to your day.<br />
        You’ll receive an email confirmation soon.
      </Message>
      <Button onClick={handleContinue}>Continue Shopping</Button>
    </Container>
  );
};

export default Success;