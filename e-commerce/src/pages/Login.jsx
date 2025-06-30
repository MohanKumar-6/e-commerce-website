import { useState } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../redux/apiCalls";
import { Link } from "react-router-dom";

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: linear-gradient(
      rgba(255, 255, 255, 0.2),
      rgba(255, 255, 255, 0.3)
    ),
    url("images/loginbg.jpeg") center;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: "Poppins", sans-serif;
`;

const Wrapper = styled.div`
  width: 26%;
  min-width: 300px;
  padding: 30px;
  backdrop-filter: blur(16px) saturate(200%);
  -webkit-backdrop-filter: blur(16px) saturate(200%);
  background-color: rgba(17, 25, 40, 0.4);
  border-radius: 24px;
  border: 1px solid rgba(255, 255, 255, 0.125);
  color: white;

  @media (max-width: 900px) {
    width: 60%;
    padding: 24px;
  }

  @media (max-width: 600px) {
    width: 95%;
    padding: 12px;
    border-radius: 14px;
    min-width: unset;
  }
`;

const Logo = styled.h1`
  font-family: "Poppins", cursive;
  font-size: 2rem;
  text-align: center;
  margin-bottom: 10px;
  color: #ffc8dd;

  @media (max-width: 600px) {
    font-size: 1.3rem;
  }
`;

const Title = styled.h2`
  font-size: 18px;
  font-weight: 300;
  margin-bottom: 20px;
  text-align: center;
  color: #f8e1f4;

  @media (max-width: 600px) {
    font-size: 15px;
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  flex: 1;
  margin: 10px 0;
  padding: 12px 16px;
  border: none;
  border-radius: 10px;
  background-color: #ffffffdd;
  color: #333;
  font-size: 14px;
  outline: none;

  &:focus {
    border: 1px solid #f48fb1;
  }

  @media (max-width: 600px) {
    font-size: 13px;
    padding: 10px 12px;
  }
`;

const Button = styled.button`
  width: 100%;
  border: none;
  padding: 15px;
  margin-top: 10px;
  border-radius: 12px;
  background: linear-gradient(135deg, #f9a8d4, #f472b6);
  color: white;
  font-weight: bold;
  cursor: pointer;
  font-size: 14px;
  transition: background 0.3s ease;

  &:hover {
    background: linear-gradient(135deg, #f472b6, #ec4899);
  }

  &:disabled {
    background: #d1d5db;
    color: #9ca3af;
    cursor: not-allowed;
  }

  @media (max-width: 600px) {
    font-size: 13px;
    padding: 12px;
  }
`;

const LinkStyle = styled.a`
  margin: 10px 0;
  font-size: 14px;
  color: #ffddf4;
  text-align: center;
  text-decoration: underline;
  font-weight: 500;
  cursor: pointer;
  transition: color 0.3s ease;

  &:hover {
    color: #f9a8d4;
  }

  @media (max-width: 600px) {
    font-size: 13px;
  }
`;

const Error = styled.span`
  color: #f87171;
  font-size: 13px;
  text-align: center;
  margin-top: 5px;

  @media (max-width: 600px) {
    font-size: 12px;
  }
`;


const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const { isFetching, error } = useSelector((state) => state.user);

  const handleClick = (e) => {
    e.preventDefault();
    login(dispatch, { username, password });
  };

  return (
    <Container>
      <Wrapper>
        <Logo>🧵 Deccan Threads</Logo>
        <Title>Welcome back! 🪡</Title>
        <Form>
          <Input
            placeholder="🧶 Username"
            onChange={(e) => setUsername(e.target.value)}
          />
          <Input
            type="password"
            placeholder="🔒 Password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button onClick={handleClick} disabled={isFetching}>
            {isFetching ? "Logging in..." : "🧵 Login"}
          </Button>
          {error && <Error>⚠️ Oops! Something went wrong.</Error>}
          <LinkStyle><Link to="/forgotpassword">🔑 Forgot your password?</Link></LinkStyle>
          <LinkStyle><Link to="/register">🆕 Create a new account</Link></LinkStyle>
        </Form>
      </Wrapper>
    </Container>
  );
};

export default Login;
