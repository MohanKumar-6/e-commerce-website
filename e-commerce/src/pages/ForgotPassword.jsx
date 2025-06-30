import { useState } from "react";
import styled from "styled-components";
import { publicRequest } from "../requestMethods";

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: linear-gradient(
      rgba(255, 240, 250, 0.5),
      rgba(255, 255, 255, 0.4)
    ),
    url("images/loginbg.jpeg") no-repeat 50% 50%;
      center;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: "Poppins", sans-serif;
`;

const Wrapper = styled.div`
  width: 35%;
  padding: 30px;
  border-radius: 25px;
  backdrop-filter: blur(20px) saturate(180%);
  -webkit-backdrop-filter: blur(20px) saturate(180%);
  background-color: rgba(255, 255, 255, 0.3);
  border: 1px solid rgba(255, 255, 255, 0.25);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
  color: #333;
`;

const Title = styled.h2`
  font-size: 24px;
  font-weight: 600;
  color: #d63384;
  text-align: center;
  margin-bottom: 20px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  margin: 10px 0;
  padding: 12px 16px;
  border: none;
  border-radius: 10px;
  background-color: rgba(255, 255, 255, 0.9);
  font-size: 14px;
  outline: none;

  &:focus {
    border: 1px solid #f48fb1;
  }
`;

const Button = styled.button`
  margin-top: 20px;
  padding: 12px;
  border: none;
  border-radius: 10px;
  background: linear-gradient(135deg, #f9a8d4, #f472b6);
  color: white;
  font-weight: 600;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: linear-gradient(135deg, #f472b6, #ec4899);
  }
`;

const Message = styled.div`
  margin-top: 20px;
  font-size: 14px;
  color: #16a34a;
  text-align: center;
`;

const ForgotPassword = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await publicRequest.post(
        "auth/forgot-password",
        { username, email }
      );
      setSubmitted(true);
    } catch (err) {
      setError(
        err.response?.data?.message ||
        "Failed to send reset link. Please check your details."
      );
    }
  };

  return (
    <Container>
      <Wrapper>
        <Title>🔐 Forgot Password</Title>
        {!submitted ? (
          <Form onSubmit={handleSubmit}>
            <Input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            <Input
              type="email"
              placeholder="Registered Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <Button type="submit">Send Reset Link ✉️</Button>
            {error && <Message style={{ color: "#e11d48" }}>{error}</Message>}
          </Form>
        ) : (
          <Message>
            ✅ If your details are correct, a password reset link will be sent to your email. Stay cozy 🧣
          </Message>
        )}
      </Wrapper>
    </Container>
  );
};

export default ForgotPassword;
