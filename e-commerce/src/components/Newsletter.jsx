import { Send } from '@material-ui/icons';
import styled from 'styled-components';

const Container = styled.div`
  height: 60vh;
  background: rgba(255, 240, 250, 0.7);
  backdrop-filter: blur(10px);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  border-radius: 20px;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h1`
  font-size: 60px;
  color: #e48abf;
  margin-bottom: 10px;
  font-family: 'Cursive', sans-serif;
`;

const Desc = styled.p`
  font-size: 20px;
  font-weight: 300;
  color: #444;
  margin-bottom: 30px;
  text-align: center;
  max-width: 600px;
`;

const InputContainer = styled.div`
  width: 50%;
  height: 45px;
  background-color: white;
  border-radius: 30px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-left: 20px;
  border: 1px solid #f0c6de;
  box-shadow: 0 2px 6px rgba(220, 180, 200, 0.3);
`;

const Input = styled.input`
  border: none;
  flex: 8;
  font-size: 16px;
  outline: none;
  color: #555;
  background: transparent;
`;

const Button = styled.button`
  flex: 1;
  height: 100%;
  border: none;
  border-top-right-radius: 30px;
  border-bottom-right-radius: 30px;
  background: linear-gradient(135deg, #f9a8d4, #f472b6);
  color: white;
  cursor: pointer;
  transition: 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background: linear-gradient(135deg, #f472b6, #ec4899);
  }
`;

const Newsletter = () => {
  return (
    <Container>
      <Title>Join Our Thread</Title>
      <Desc>
        Get cozy updates, pattern drops, and crochet inspiration directly to your inbox. No spam, just warm yarn vibes!
      </Desc>
      <InputContainer>
        <Input placeholder="Your email" />
        <Button>
          <Send />
        </Button>
      </InputContainer>
    </Container>
  );
};

export default Newsletter;
