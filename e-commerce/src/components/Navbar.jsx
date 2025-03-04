import { Search, ShoppingCartOutlined } from '@material-ui/icons';
import {Badge}  from '@material-ui/core';
import styled from 'styled-components';
import {useState} from "react"
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Menu, MenuItem, IconButton, Avatar } from "@mui/material";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { persistor } from "../../src/redux/store"; 


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

const StyledLink = styled(Link)`
  text-decoration: none;
  color: inherit;
`;

const Right = styled.div`
    flex: 1;
    display: flex;
    justify-content: end;
`;

const Navbar = () => {
    const quantity = useSelector(state => state.cart.quantity)
    const [anchorEl, setAnchorEl] = useState(null);

    const open = Boolean(anchorEl);
    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleLogout = () => {
        persistor.purge()
        handleClose();
        window.location.reload()
    }

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
                    <StyledLink to="/">
                        <Logo>MANTRA.</Logo>
                    </StyledLink>
                </Center>
                <Right>
                    <StyledLink to="/register">
                    <MenuItems>REGISTER</MenuItems>
                    </StyledLink>
                    <StyledLink to="/login">
                    <MenuItems>SIGN IN</MenuItems>
                    </StyledLink>
                    <Link to="/cart">
                        <MenuItems>
                            <Badge badgeContent={quantity} color="primary">
                                <ShoppingCartOutlined/>
                            </Badge>
                        </MenuItems>    
                    </Link>
                    <AccountCircleIcon style={{ fontSize: '2rem', marginTop: "-7px", marginLeft: "20px", padding: "0"}} onClick={handleClick}/>
                    <Menu
                        id="basic-menu"
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleClose}
                        MenuListProps={{
                        'aria-labelledby': 'basic-button',
                        }}
                    >
                        <MenuItem onClick={handleClose}>Profile</MenuItem>
                        <MenuItem onClick={handleClose}>My account</MenuItem>
                        <MenuItem onClick={handleLogout}>Logout</MenuItem>
                    </Menu>
                </Right>
            </Wrapper>
        </Container>
    )
}

export default Navbar;