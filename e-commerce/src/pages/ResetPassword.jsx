import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";

const Container = styled.div`
  min-height: 100vh;
  width: 100vw;
  background: linear-gradient(
      rgba(255, 240, 250, 0.5),
      rgba(255, 255, 255, 0.4)
    ),
    url("/images/loginbg.jpeg") center;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: 'Poppins', sans-serif;
`;

const Wrapper = styled.div`
  width: 90%;
  max-width: 350px;
  padding: 30px 20px;
  border-radius: 20px;
  background: rgba(255,255,255,0.7);
  box-shadow: 0 8px 32px rgba(31, 38, 135, 0.1);

  @media (max-width: 600px) {
    padding: 14px 4vw;
    border-radius: 12px;
  }
`;

const Title = styled.h2`
  text-align: center;
  color: #b3005e;
  margin-bottom: 18px;
  font-size: 1.5rem;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 14px;
`;

const Input = styled.input`
  padding: 12px;
  border-radius: 10px;
  border: 1px solid #f9a8d4;
  font-size: 14px;
  outline: none;

  @media (max-width: 600px) {
    font-size: 13px;
    padding: 10px;
  }
`;

const Button = styled.button`
  padding: 12px;
  border: none;
  border-radius: 10px;
  background: linear-gradient(135deg, #f9a8d4, #f472b6);
  color: white;
  font-weight: 600;
  font-size: 15px;
  cursor: pointer;
  margin-top: 10px;
  transition: all 0.3s;

  &:hover {
    background: linear-gradient(135deg, #f472b6, #ec4899);
  }
`;

const Message = styled.div`
  margin-top: 10px;
  text-align: center;
  font-size: 14px;
  color: ${props => props.error ? "#e11d48" : "#16a34a"};
`;

const ResetPassword = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");
    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }
    if (password !== confirm) {
      setError("Passwords do not match.");
      return;
    }
    try {
      await axios.post("http://localhost:5000/api/auth/reset-password", {
        token,
        password,
      });
      setMessage("Password reset successful! Redirecting to login...");
      setTimeout(() => navigate("/login"), 2000);
    } catch (err) {
      setError(
        err.response?.data?.message ||
        "Failed to reset password. The link may have expired."
      );
    }
  };

  return (
    <Container>
      <Wrapper>
        <Title>🔑 Reset Your Password</Title>
        <Form onSubmit={handleSubmit}>
          <Input
            type="password"
            placeholder="New Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />
          <Input
            type="password"
            placeholder="Confirm New Password"
            value={confirm}
            onChange={e => setConfirm(e.target.value)}
            required
          />
          <Button type="submit">Set New Password</Button>
        </Form>
        {error && <Message error>{error}</Message>}
        {message && <Message>{message}</Message>}
      </Wrapper>
    </Container>
  );
};

export default ResetPassword;