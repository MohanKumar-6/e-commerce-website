import { Search, ShoppingCartOutlined, Menu as MenuIcon, Close } from '@material-ui/icons';
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
    width: 100%;
    min-width: 0;
    height: 64px;
    position: sticky;
    top: 0;
    z-index: 1002;
    background: rgba(255, 255, 255, 0.95);
    backdrop-filter: blur(16px);
    border-bottom: 1px solid #f9a8d4;
    box-shadow: 0 2px 12px rgba(255, 107, 157, 0.07);

    @media (max-width: 768px) {
        height: 60px;
    }
`;

const Wrapper = styled.div`
    max-width: 1200px;
    margin: 0 auto;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 18px;

    @media (max-width: 768px) {
        padding: 0 12px;
        position: relative;
    }
`;

const Left = styled.div`
    display: flex;
    align-items: center;
    flex: 1;
    min-width: 0;

    @media (max-width: 768px) {
        flex: 0 0 auto;
        order: 1;
    }
`;

const Logo = styled(Link)`
    font-weight: 700;
    font-size: 1.5rem;
    background: linear-gradient(135deg, #ff6b9d, #c44569);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    text-fill-color: transparent;
    text-decoration: none;
    cursor: pointer;
    letter-spacing: 1px;
    transition: all 0.3s;

    &:hover {
        transform: scale(1.04);
    }

    @media (max-width: 768px) {
        font-size: 1.2rem;
        letter-spacing: 0.5px;
    }
`;

const Center = styled.div`
    flex: 2;
    display: flex;
    align-items: center;
    justify-content: center;
    min-width: 0;
    position: relative;

    @media (max-width: 768px) {
        position: absolute;
        top: 100%;
        left: 0;
        right: 0;
        background: rgba(255, 255, 255, 0.98);
        backdrop-filter: blur(16px);
        border-bottom: 1px solid #f9a8d4;
        padding: 8px 12px;
        z-index: 1001;
        transform: ${props => props.showSearch ? 'translateY(0)' : 'translateY(-100%)'};
        opacity: ${props => props.showSearch ? '1' : '0'};
        visibility: ${props => props.showSearch ? 'visible' : 'hidden'};
        transition: all 0.3s ease;
        order: 4;
    }
`;

const SearchContainer = styled.div`
    display: flex;
    align-items: center;
    background: #fff;
    border: 1.5px solid #f9a8d4;
    border-radius: 22px;
    padding: 6px 14px;
    width: 100%;
    max-width: 340px;
    min-width: 0;
    box-shadow: 0 2px 8px rgba(255, 107, 157, 0.07);

    @media (max-width: 900px) {
        max-width: 220px;
        padding: 5px 10px;
    }
    
    @media (max-width: 768px) {
        max-width: 100%;
        padding: 8px 12px;
        border-radius: 20px;
    }
`;

const Input = styled.input`
    border: none;
    background: transparent;
    flex: 1;
    outline: none;
    font-size: 14px;
    color: #333;
    min-width: 0;

    &::placeholder {
        color: #b3005e99;
    }

    @media (max-width: 768px) {
        font-size: 16px; /* Prevents zoom on iOS */
    }
`;

const SearchIcon = styled(Search)`
    color: #b3005e;
    cursor: pointer;
    margin-left: 4px;
    font-size: 1.2rem;
    transition: color 0.3s;

    &:hover {
        color: #ff6b9d;
    }
`;

const Dropdown = styled.div`
    position: absolute;
    top: 110%;
    left: 0;
    width: 100%;
    background: #fff;
    border-radius: 10px;
    box-shadow: 0 8px 16px rgba(255, 107, 157, 0.08);
    z-index: 999;
    max-height: 180px;
    overflow-y: auto;
    font-size: 13px;

    @media (max-width: 768px) {
        top: calc(100% + 4px);
        border-radius: 12px;
        max-height: 200px;
    }
`;

const DropdownItem = styled.div`
    padding: 8px 14px;
    cursor: pointer;
    color: #b3005e;
    border-bottom: 1px solid #ffeef8;
    transition: background 0.2s;

    &:hover {
        background: #ffeef8;
        color: #ff6b9d;
    }
    &:last-child {
        border-bottom: none;
    }

    @media (max-width: 768px) {
        padding: 12px 16px;
        font-size: 14px;
    }
`;

const Right = styled.div`
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    gap: 18px;
    min-width: 0;

    @media (max-width: 768px) {
        flex: 0 0 auto;
        gap: 8px;
        order: 3;
    }
`;

const MobileControls = styled.div`
    display: none;
    
    @media (max-width: 768px) {
        display: flex;
        align-items: center;
        gap: 8px;
        order: 2;
        flex: 1;
        justify-content: center;
    }
`;

const SearchToggle = styled.button`
    display: none;
    
    @media (max-width: 768px) {
        display: flex;
        align-items: center;
        justify-content: center;
        background: #fff;
        border: 1.5px solid #f9a8d4;
        border-radius: 50%;
        width: 36px;
        height: 36px;
        cursor: pointer;
        transition: all 0.3s;
        
        &:hover {
            background: #ffeef8;
            border-color: #ff6b9d;
        }
        
        .search-icon {
            color: #b3005e;
            font-size: 1.1rem;
        }
    }
`;

const MenuItems = styled(Link)`
    font-size: 14px;
    font-weight: 500;
    color: #b3005e;
    text-decoration: none;
    margin: 0 2px;
    transition: color 0.2s;
    cursor: pointer;

    &:hover {
        color: #ff6b9d;
    }

    @media (max-width: 768px) {
        display: none;
    }
`;

const CartIcon = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    background: #fff;
    border: 1.5px solid #f9a8d4;
    border-radius: 50%;
    width: 36px;
    height: 36px;
    transition: all 0.3s;
    cursor: pointer;

    &:hover {
        background: #ffeef8;
        border-color: #ff6b9d;
    }

    @media (max-width: 768px) {
        width: 36px;
        height: 36px;
    }
`;

const ProfileIcon = styled(AccountCircleIcon)`
    && {
        font-size: 2rem;
        color: #b3005e;
        cursor: pointer;
        background: #fff;
        border: 1.5px solid #f9a8d4;
        border-radius: 50%;
        padding: 4px;
        transition: all 0.3s;

        &:hover {
            color: #ff6b9d;
            background: #ffeef8;
            border-color: #ff6b9d;
        }

        @media (max-width: 768px) {
            font-size: 1.6rem;
            padding: 6px;
        }
    }
`;

const StyledMenu = styled(Menu)`
    .MuiPaper-root {
        background: #fff;
        border-radius: 12px;
        box-shadow: 0 8px 32px rgba(255, 107, 157, 0.13);
        margin-top: 10px;
        
        @media (max-width: 768px) {
            min-width: 160px;
            margin-top: 8px;
        }
    }
    .MuiMenuItem-root {
        font-weight: 500;
        color: #b3005e;
        transition: all 0.3s;
        
        &:hover {
            background: #ffeef8;
            color: #ff6b9d;
        }
        
        @media (max-width: 768px) {
            padding: 12px 16px;
            font-size: 14px;
        }
    }
`;

const AuthSection = styled.div`
    display: flex;
    align-items: center;
    gap: 10px;

    @media (max-width: 768px) {
        display: none;
    }
`;

const MobileOverlay = styled.div`
    display: none;
    
    @media (max-width: 768px) {
        display: ${props => props.show ? 'block' : 'none'};
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0, 0, 0, 0.2);
        z-index: 1000;
    }
`;

const Navbar = () => {
    const quantity = useSelector(state => state.cart.quantity);
    const user = useSelector(state => state.user.currentUser);
    const [anchorEl, setAnchorEl] = useState(null);
    const [showMobileSearch, setShowMobileSearch] = useState(false);
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
            setShowMobileSearch(false);
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

    const toggleMobileSearch = () => {
        setShowMobileSearch(!showMobileSearch);
        if (showMobileSearch) {
            setSearchTerm("");
            setShowDropdown(false);
        }
    };

    // Close mobile search when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (showMobileSearch && !event.target.closest('[data-search-container]')) {
                setShowMobileSearch(false);
            }
        };

        document.addEventListener('click', handleClickOutside);
        return () => document.removeEventListener('click', handleClickOutside);
    }, [showMobileSearch]);

    return (
        <>
            <Container>
                <Wrapper>
                    <Left>
                        <Logo to="/">Deccan Threads</Logo>
                    </Left>
                    
                    <MobileControls>
                        <SearchToggle onClick={toggleMobileSearch}>
                            <Search className="search-icon" />
                        </SearchToggle>
                    </MobileControls>
                    
                    <Center showSearch={showMobileSearch} data-search-container>
                        <SearchContainer>
                            <Input
                                placeholder="Search products..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                onFocus={() => {
                                    if (filtered.length > 0) setShowDropdown(true);
                                }}
                                onBlur={() => setTimeout(() => setShowDropdown(false), 200)}
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
                                            setShowMobileSearch(false);
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
                                    <MenuItems to="/register">REGISTER</MenuItems>
                                    <MenuItems to="/login">SIGN IN</MenuItems>
                                </>
                            )}
                        </AuthSection>
                        <Link to="/cart">
                            <CartIcon>
                                <Badge badgeContent={quantity} color="primary">
                                    <ShoppingCartOutlined style={{ color: '#b3005e' }} />
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
                            {!user && <MenuItem onClick={() => {handleClose(); navigate('/login');}}>Sign In</MenuItem>}
                            {!user && <MenuItem onClick={() => {handleClose(); navigate('/register');}}>Register</MenuItem>}
                            {user && <MenuItem onClick={handleLogout}>Logout</MenuItem>}
                        </StyledMenu>
                    </Right>
                </Wrapper>
            </Container>
            <MobileOverlay show={showMobileSearch} onClick={() => setShowMobileSearch(false)} />
        </>
    );
};

export default Navbar;