import { useState } from "react";
import styled from "styled-components"
import { useDispatch, useSelector } from "react-redux";
import { login } from "../redux/apiCalls";

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: linear-gradient(
      rgba(255, 255, 255, 0.13),
      rgba(255, 255, 255, 0.25)
    ),
    url("images/3907c41616c1bdec6a582573b1915b86.jpg")
      center;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.div`
  width: 25%;
  padding: 20px;
  color: white;
  backdrop-filter: blur(16px) saturate(200%);
    -webkit-backdrop-filter: blur(16px) saturate(200%);
    background-color: rgba(17, 25, 40, 0.44);
    border-radius: 12px;
    border: 1px solid rgba(255, 255, 255, 0.125);
  border-radius: 30px;
`;

const Title = styled.h1`
  font-size: 20px;
  font-weight: 300;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  flex: 1;
  min-width: 40%;
  margin: 10px 0;
  padding: 10px;
`;

const Logo = styled.div`
  font-family: "Playwrite GB S", cursive;
  font-optical-sizing: auto;
  font-weight: 300;
  font-style: normal;
  font-size: 1.5rem;
  margin-bottom: 20px;
`

const Button = styled.button`
  width: 40%;
  border: none;
  padding: 15px 20px;
  background-color: teal;
  color: white;
  cursor: pointer;
  margin-bottom: 10px;
  &:disabled{
    color: green;
    cursor: not-allowed;
  }
`;

const Link = styled.a`
  margin: 5px 0px;
  font-size: 12px;
  text-decoration: underline;
  cursor: pointer;
`;

const Error = styled.span`
  color: red;
`

const Login = () => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const dispatch = useDispatch()
  const { isFetching, error } = useSelector((state) => state.user)

  const handleClick = (e) => {
    e.preventDefault()
    login( dispatch, {username, password})
  }

    return(
        <Container>
            <Wrapper>
                <Logo>Mantra</Logo>
                <Title>SIGN IN</Title>
                <Form>
                    <Input placeholder="username" onChange={(e)=>{setUsername(e.target.value)}}/> 
                    <Input placeholder="password" type="password" onChange={(e)=>{setPassword(e.target.value)}}/>
                    <Button disabled={isFetching} onClick={handleClick}>LOGIN</Button>
                    {error && <Error>Something Went Wrong!</Error>}
                    <Link>FORGOT YOUR PASSWORD</Link>
                    <Link>CREATE A NEW PASSWORD</Link>
                </Form>
            </Wrapper>
        </Container>
    )
}

export default Login;