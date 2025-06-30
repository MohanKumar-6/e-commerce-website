import styled from "styled-components";
import { useState } from "react";
import { publicRequest } from "../requestMethods";
import Navbar from "../components/Navbar";

const Container = styled.div`
  width: 100vw;
  min-height: 100vh;
  background: linear-gradient(
      rgba(255, 240, 250, 0.5),
      rgba(255, 255, 255, 0.4)
    ),
    url("images/registerbg.jpg") center;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: 'Poppins', sans-serif;
`;

const Wrapper = styled.div`
  width: 45%;
  padding: 30px;
  border-radius: 30px;
  backdrop-filter: blur(24px) saturate(180%);
  -webkit-backdrop-filter: blur(24px) saturate(180%);
  background-color: rgba(255, 255, 255, 0.35);
  border: 1px solid rgba(255, 255, 255, 0.25);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
  color: #333;

  @media (max-width: 900px) {
    width: 70%;
    padding: 18px;
    border-radius: 20px;
  }
  @media (max-width: 600px) {
    width: 98vw;
    padding: 8px;
    border-radius: 12px;
    min-width: unset;
  }
`;

const Title = styled.h1`
  font-size: 28px;
  font-weight: 600;
  color: #d63384;
  margin-bottom: 20px;
  text-align: center;

  @media (max-width: 600px) {
    font-size: 18px;
    margin-bottom: 10px;
  }
`;

const Form = styled.form`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

const Input = styled.input`
  flex: 1;
  min-width: 40%;
  margin: 10px;
  padding: 12px 16px;
  border: none;
  border-radius: 12px;
  font-size: 14px;
  background-color: rgba(255, 255, 255, 0.9);
  box-shadow: 0 1px 4px rgba(200, 200, 200, 0.3);
  outline: none;

  &:focus {
    border: 1px solid #ffbde6;
  }

  @media (max-width: 900px) {
    min-width: 80%;
    margin: 8px 0;
    font-size: 13px;
    padding: 10px 12px;
  }
  @media (max-width: 600px) {
    min-width: 95%;
    margin: 6px 0;
    font-size: 12px;
    padding: 8px 8px;
    border-radius: 8px;
  }
`;

const Agreement = styled.div`
  font-size: 12px;
  margin: 20px 10px;
  color: #555;

  @media (max-width: 600px) {
    font-size: 10px;
    margin: 10px 0;
  }
`;

const Button = styled.button`
  width: 40%;
  margin: 20px 10px;
  padding: 14px;
  border: none;
  border-radius: 12px;
  background: linear-gradient(135deg, #f9a8d4, #f472b6);
  color: white;
  font-weight: 600;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: linear-gradient(135deg, #f472b6, #ec4899);
  }

  @media (max-width: 900px) {
    width: 60%;
    margin: 14px 0;
    padding: 12px;
    font-size: 13px;
    border-radius: 10px;
  }
  @media (max-width: 600px) {
    width: 90%;
    margin: 10px 0;
    padding: 10px;
    font-size: 12px;
    border-radius: 8px;
  }
`;

const Register = () => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const handleFirstName = (e) => setFirstName(e.target.value);
    const handleLastName = (e) => setLastName(e.target.value);
    const handleUsername = (e) => setUsername(e.target.value);
    const handleEmail = (e) => setEmail(e.target.value);
    const handlePassword = (e) => setPassword(e.target.value);
    const handleConfirmPassword = (e) => setConfirmPassword(e.target.value);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            alert("Passwords do not match!");
            return;
        }
        // Here you would typically send the data to your backend
        const registerAccount = async () => {
            const res = publicRequest.post('/auth/register', {
                firstName,
                lastName,
                username,
                email,
                password
            });
            res.then(response => {
                if (response.status === 201) {
                    alert("Account created successfully!");
                    // Redirect to login or home page
                }
            }).catch(error => {
                console.error("Error creating account:", error);
                alert("Failed to create account. Please try again.");
            });

        }
        registerAccount();
    }

return (
    <Container>
        <Wrapper>
            <Title>🧵 Create Your Deccan Threads Account</Title>
            <Form onSubmit={handleSubmit}>
                <Input placeholder="First Name" onChange={handleFirstName} />
                <Input placeholder="Last Name" onChange={handleLastName} />
                <Input placeholder="Username" onChange={handleUsername} />
                <Input placeholder="Email" onChange={handleEmail} />
                <Input placeholder="Password" type="password" onChange={handlePassword} />
                <Input placeholder="Confirm Password" type="password" onChange={handleConfirmPassword} />
                <Agreement>
                    By creating an account, I consent to the processing of my personal
                    data in accordance with the <b>PRIVACY POLICY</b>.
                </Agreement>
                <Button type="submit">🎀 Create Account</Button>
            </Form>
        </Wrapper>
    </Container>
);
};

export default Register;