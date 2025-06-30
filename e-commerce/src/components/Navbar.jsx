import { Search, ShoppingCartOutlined } from '@material-ui/icons';
import { Badge } from '@material-ui/core';
import styled from 'styled-components';
import { useState, useEffect } from "react"
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, MenuItem } from "@mui/material";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { persistor } from "../../src/redux/store";
import { publicRequest } from "../../src/requestMethods";

const Container = styled.div`
    height: 80px;
    position: sticky;
    top: 0;
    z-index: 1000;
    background: rgba(255, 255, 255, 0.25);
    backdrop-filter: blur(20px);
    border-bottom: 1px solid rgba(255, 255, 255, 0.18);
    box-shadow: 0 8px 32px rgba(31, 38, 135, 0.1);

    @media (max-width: 600px) {
        height: 60px;
    }
`;

const Wrapper = styled.div`
    padding: 15px 40px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 100%;
    max-width: 1400px;
    margin: 0 auto;

    @media (max-width: 900px) {
        padding: 10px 16px;
    }
    @media (max-width: 600px) {
        flex-direction: column;
        align-items: center; // changed from stretch to center
        padding: 6px 4vw;
        gap: 6px;
    }
`;

const Left = styled.div`
    display: flex;
    align-items: center;
    flex: 1;
    justify-content: flex-start;

    @media (max-width: 600px) {
        justify-content: center;
        width: 100%;
    }
`;

const Logo = styled.div`
    font-weight: 700;
    font-size: 28px;
    background: linear-gradient(135deg, #ff6b9d, #c44569);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    cursor: pointer;
    transition: all 0.3s ease;
    
    &:hover {
        transform: scale(1.05);
    }

    @media (max-width: 600px) {
        font-size: 20px;
    }
`;

const SearchContainer = styled.div`
    display: flex;
    align-items: center;
    background: rgba(255, 255, 255, 0.2);
    border: 1px solid rgba(255, 255, 255, 0.3);
    border-radius: 25px;
    padding: 10px 20px;
    backdrop-filter: blur(10px);
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
    transition: all 0.3s ease;
    min-width: 300px;

    &:hover {
        background: rgba(255, 255, 255, 0.3);
        border-color: rgba(255, 255, 255, 0.4);
        box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15);
    }
    
    &:focus-within {
        background: rgba(255, 255, 255, 0.35);
        border-color: #ff6b9d;
        box-shadow: 0 6px 25px rgba(255, 107, 157, 0.2);
    }

    @media (max-width: 900px) {
        min-width: 180px;
        padding: 7px 12px;
    }
    @media (max-width: 600px) {
        min-width: unset;
        width: 100%;
        padding: 5px 8px;
        margin: 0 auto;
    }
`;

const Input = styled.input`
    border: none;
    background: transparent;
    flex: 1;
    outline: none;
    font-size: 14px;
    color: #333;
    
    &::placeholder {
        color: rgba(51, 51, 51, 0.6);
    }

    @media (max-width: 600px) {
        font-size: 12px;
    }
`;

const SearchIcon = styled(Search)`
    color: #666;
    cursor: pointer;
    transition: color 0.3s ease;
    
    &:hover {
        color: #ff6b9d;
    }
`;

const Right = styled.div`
    flex: 1;
    display: flex;
    justify-content: flex-end;
    align-items: center; // ensure vertical centering
    gap: 25px;

    @media (max-width: 900px) {
        gap: 12px;
    }
    @media (max-width: 600px) {
        justify-content: center;
        gap: 10px;
        margin-top: 0; // remove margin
        width: 100%;
    }
`;

const MenuItems = styled.div`
    font-size: 14px;
    font-weight: 500;
    cursor: pointer;
    color: #333;
    transition: all 0.3s ease;
    position: relative;
    
    &:hover {
        color: #ff6b9d;
        transform: translateY(-2px);
    }
    
    &::after {
        content: '';
        position: absolute;
        width: 0;
        height: 2px;
        bottom: -5px;
        left: 50%;
        background: linear-gradient(135deg, #ff6b9d, #c44569);
        transition: all 0.3s ease;
        transform: translateX(-50%);
    }
    
    &:hover::after {
        width: 100%;
    }

    @media (max-width: 600px) {
        font-size: 12px;
    }
`;

const StyledLink = styled(Link)`
    text-decoration: none;
    color: inherit;
`;

const CartIcon = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(255, 255, 255, 0.2);
    border: 1px solid rgba(255, 255, 255, 0.3);
    border-radius: 50%;
    width: 45px;
    height: 45px;
    backdrop-filter: blur(10px);
    transition: all 0.3s ease;
    cursor: pointer;
    
    &:hover {
        background: rgba(255, 255, 255, 0.3);
        transform: scale(1.1);
        box-shadow: 0 4px 15px rgba(255, 107, 157, 0.2);
    }

    @media (max-width: 600px) {
        width: 32px;
        height: 32px;
    }
`;

const ProfileIcon = styled(AccountCircleIcon)`
    && {
        font-size: 2.2rem;
        color: #666;
        cursor: pointer;
        transition: all 0.3s ease;
        background: rgba(255, 255, 255, 0.2);
        border: 1px solid rgba(255, 255, 255, 0.3);
        border-radius: 50%;
        padding: 8px;
        backdrop-filter: blur(10px);
        
        &:hover {
            color: #ff6b9d;
            background: rgba(255, 255, 255, 0.3);
            transform: scale(1.1);
            box-shadow: 0 4px 15px rgba(255, 107, 157, 0.2);
        }

        @media (max-width: 600px) {
            font-size: 1.4rem;
            padding: 4px;
        }
    }
`;

const StyledMenu = styled(Menu)`
    .MuiPaper-root {
        background: rgba(255, 255, 255, 0.9);
        backdrop-filter: blur(20px);
        border: 1px solid rgba(255, 255, 255, 0.3);
        border-radius: 15px;
        box-shadow: 0 8px 32px rgba(31, 38, 135, 0.2);
        margin-top: 10px;
    }
    
    .MuiMenuItem-root {
        font-weight: 500;
        color: #333;
        transition: all 0.3s ease;
        
        &:hover {
            background: rgba(255, 107, 157, 0.1);
            color: #ff6b9d;
        }
    }
`;

const AuthSection = styled.div`
    display: flex;
    align-items: center;
    gap: 20px;
`;

const Dropdown = styled.div`
  position: absolute;
  top: 105%;
  width: 100%;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(12px);
  border-radius: 10px;
  box-shadow: 0 8px 16px rgba(0,0,0,0.1);
  max-height: 250px;
  overflow-y: auto;
  z-index: 999;
  scrollbar-width: thin;
  scrollbar-color: #ff6b9d transparent;

  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #ff6b9d;
    border-radius: 10px;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
  }

  @media (max-width: 600px) {
    font-size: 12px;
    max-height: 180px;
  }
`;

const DropdownItem = styled.div`
  padding: 10px 16px;
  cursor: pointer;
  font-size: 14px;
  color: #333;
  transition: all 0.2s ease;
  border-bottom: 1px solid rgba(0,0,0,0.05);

  &:hover {
    background: rgba(255, 107, 157, 0.1);
    color: #ff6b9d;
  }

  &:last-child {
    border-bottom: none;
  }

  @media (max-width: 600px) {
    font-size: 12px;
    padding: 8px 10px;
  }
`;

const Center = styled.div`
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center; // ensure vertical centering
    position: relative;
    margin-bottom: 0; // remove margin

    @media (max-width: 600px) {
        margin-top: 2px;
        width: 100%;
    }
`;

const Navbar = () => {
    const quantity = useSelector(state => state.cart.quantity);
    const user = useSelector(state => state.user.currentUser);
    const [anchorEl, setAnchorEl] = useState(null);
    const navigate = useNavigate();
    
    const [searchTerm, setSearchTerm] = useState("");
    const [allProducts, setAllProducts] = useState([]);
    const [filtered, setFiltered] = useState([]);
    const [showDropdown, setShowDropdown] = useState(false);

    const open = Boolean(anchorEl);

    useEffect(() => {
        const fetchProducts = async () => {
            const res = await publicRequest.get("/products");
            setAllProducts(res.data);
        };
        fetchProducts();
    }, []);

    useEffect(() => {
        const term = searchTerm.trim().toLowerCase();
        if (!term) {
            setFiltered([]);
            setShowDropdown(false);
            return;
        }

        const matches = allProducts.filter((p) =>
            p.tags?.some((tag) =>
                tag.toLowerCase().includes(term)
            )
        );

        setFiltered(matches);
        setShowDropdown(true);
    }, [searchTerm, allProducts]);

    const handleSearch = () => {
        if (searchTerm.trim()) {
            navigate(`/search?q=${encodeURIComponent(searchTerm.trim())}`);
        }
    };

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleProfile = () => {
        handleClose();
        navigate("/profile");
    };

    const handleLogout = () => {
        persistor.purge();
        handleClose();
        window.location.reload();
    };

    return (
        <Container>
            <Wrapper>
                <Left>
                    <StyledLink to="/">
                        <Logo>Deccan Threads</Logo>
                    </StyledLink>
                </Left>

                <Center>
                    <SearchContainer>
                        <Input
                            placeholder="Search products..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            onFocus={() => {
                                if (filtered.length > 0) setShowDropdown(true);
                            }}
                            onKeyDown={(e) => {
                                if (e.key === "Enter") handleSearch();
                            }}
                        />
                        <SearchIcon onClick={handleSearch} />
                    </SearchContainer>

                    {showDropdown && filtered.length > 0 && (
                        <Dropdown>
                            {filtered.slice(0, 6).map((product) => (
                                <DropdownItem
                                    key={product._id}
                                    onClick={() => {
                                        navigate(`/product/${product._id}`);
                                        setSearchTerm("");
                                        setShowDropdown(false);
                                    }}
                                >
                                    {product.title}
                                </DropdownItem>
                            ))}
                        </Dropdown>
                    )}
                </Center>

                <Right>
                    <AuthSection>
                        {!user && (
                            <>
                                <StyledLink to="/register">
                                    <MenuItems>REGISTER</MenuItems>
                                </StyledLink>
                                <StyledLink to="/login">
                                    <MenuItems>SIGN IN</MenuItems>
                                </StyledLink>
                            </>
                        )}
                    </AuthSection>

                    <Link to="/cart">
                        <CartIcon>
                            <Badge badgeContent={quantity} color="primary">
                                <ShoppingCartOutlined style={{ color: '#666' }} />
                            </Badge>
                        </CartIcon>
                    </Link>

                    <ProfileIcon onClick={handleClick} />

                    <StyledMenu
                        id="basic-menu"
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleClose}
                        MenuListProps={{
                            'aria-labelledby': 'basic-button',
                        }}
                    >
                        <MenuItem onClick={handleProfile}>Profile</MenuItem>
                        <MenuItem onClick={handleClose}>My account</MenuItem>
                        <MenuItem onClick={handleLogout}>Logout</MenuItem>
                    </StyledMenu>
                </Right>
            </Wrapper>
        </Container>
    );
};

export default Navbar;