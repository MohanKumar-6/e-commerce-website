import { Search, ShoppingCartOutlined } from '@material-ui/icons';
import {Badge}  from '@material-ui/core';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';


const Container = styled.div`
    height: 60px;
`;
const Language = styled.span`
    font-size:14px;
    cursor: pointer;
`
const SearchContainer = styled.div`
    border: 1px solid lightgrey;
    display: flex;
    align-items: center;
    margin-left: 25px;
    padding: 5px;
`;

const Input = styled.input`
    border: none;
`;

const Wrapper = styled.div`
    padding: 10px 20px;
    display: flex;
    justify-content: space-betwwen;
    align-items: center;
`;

const MenuItems = styled.div`
    font-size: 14px;
    cursor: pointer;
    margin-left: 25px;
`

const Logo = styled.div`
    font-weight: Bold;
    font-size: 20px;
    text-align: center;
`

const Left = styled.div`
    display: flex;
    align-items: center;
    flex: 1;
`;

const Center = styled.div`
    flex: 1;
`;

const Right = styled.div`
    flex: 1;
    display: flex;
    justify-content: end;
`;

const Navbar = () => {
    const quantity = useSelector(state => state.cart.quantity)

    return (
        <Container>
            <Wrapper>
                <Left>
                    <Language>EN</Language>
                    <SearchContainer>
                        <Input />
                        <Search style={{color:"grey", fontSize:16}}/>
                    </SearchContainer>
                </Left>
                <Center>
                    <Logo>MANTRA.</Logo>
                </Center>
                <Right>
                    <Link to="/register">
                    <MenuItems>REGISTER</MenuItems>
                    </Link>
                    <Link to="/login">
                    <MenuItems>SIGN IN</MenuItems>
                    </Link>
                    <Link to="/cart">
                        <MenuItems>
                            <Badge badgeContent={quantity} color="primary">
                                <ShoppingCartOutlined/>
                            </Badge>
                        </MenuItems>
                    </Link>
                </Right>
            </Wrapper>
        </Container>
    )
}

export default Navbar;