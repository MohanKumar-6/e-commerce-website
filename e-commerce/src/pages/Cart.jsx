import { Add, Remove, Delete } from "@material-ui/icons";
import styled from "styled-components";
import Announcement from "../components/Announcement";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { useSelector, useDispatch } from "react-redux";
import StripeCheckout from "react-stripe-checkout";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { userRequest } from "../requestMethods";
import { updateQuantity, removeProduct } from "../redux/cartRedux";

const KEY = process.env.REACT_APP_STRIPE;

const Container = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #faf0e6 0%, #fff5f5 100%);
`;

const Wrapper = styled.div`
  padding: 20px;
  max-width: 1200px;
  margin: auto;
  box-sizing: border-box;

  @media (max-width: 768px) {
    padding: 15px;
  }

  @media (max-width: 480px) {
    padding: 10px;
  }
`;

const Title = styled.h1`
  font-weight: 600;
  text-align: center;
  color: #333;
  font-size: 28px;
  margin-bottom: 30px;
  text-transform: uppercase;
  letter-spacing: 1px;

  @media (max-width: 768px) {
    font-size: 24px;
    margin-bottom: 20px;
  }

  @media (max-width: 480px) {
    font-size: 20px;
    margin-bottom: 15px;
  }
`;

const Top = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
  margin-bottom: 20px;
  background: rgba(255, 255, 255, 0.4);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  box-shadow: 0 8px 24px rgba(255, 182, 193, 0.15);

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 15px;
    padding: 15px;
    text-align: center;
  }

  @media (max-width: 480px) {
    padding: 12px;
    gap: 12px;
  }
`;

const TopButton = styled.button`
  padding: 12px 24px;
  font-weight: 600;
  border: ${(props) => (props.filled ? "none" : "2px solid #ff7fa3")};
  background: ${(props) => 
    props.filled 
      ? "linear-gradient(135deg, #ffc0cb 0%, #ff91a4 100%)" 
      : "transparent"};
  color: ${(props) => (props.filled ? "white" : "#ff7fa3")};
  cursor: pointer;
  border-radius: 25px;
  font-size: 14px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: ${(props) => 
    props.filled 
      ? "0 4px 12px rgba(255, 182, 193, 0.3)" 
      : "none"};

  &:hover {
    transform: translateY(-2px);
    box-shadow: ${(props) => 
      props.filled 
        ? "0 6px 16px rgba(255, 182, 193, 0.4)" 
        : "0 4px 12px rgba(255, 182, 193, 0.2)"};
    background: ${(props) => 
      props.filled 
        ? "linear-gradient(135deg, #ff91a4 0%, #ff6b9d 100%)" 
        : "rgba(255, 127, 163, 0.1)"};
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }

  @media (max-width: 768px) {
    padding: 10px 20px;
    font-size: 12px;
    width: auto;
    min-width: 140px;
  }

  @media (max-width: 480px) {
    padding: 8px 16px;
    font-size: 11px;
    min-width: 120px;
  }
`;

const TopTexts = styled.div`
  display: flex;
  gap: 20px;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 8px;
  }

  @media (max-width: 480px) {
    gap: 6px;
  }
`;

const TopText = styled.span`
  text-decoration: underline;
  cursor: pointer;
  color: #555;
  font-weight: 500;
  font-size: 14px;
  transition: color 0.3s ease;

  &:hover {
    color: #ff7fa3;
  }

  @media (max-width: 768px) {
    font-size: 13px;
  }

  @media (max-width: 480px) {
    font-size: 12px;
  }
`;

const Bottom = styled.div`
  display: flex;
  gap: 30px;
  justify-content: space-between;

  @media (max-width: 1024px) {
    gap: 20px;
  }

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 20px;
  }
`;

const Info = styled.div`
  flex: 3;
  min-width: 0;

  @media (max-width: 768px) {
    flex: none;
    width: 100%;
  }
`;

const ProductCard = styled.div`
  background: rgba(255, 255, 255, 0.4);
  backdrop-filter: blur(12px);
  border-radius: 20px;
  margin-bottom: 20px;
  display: flex;
  padding: 20px;
  box-shadow: 0 8px 24px rgba(255, 182, 193, 0.15);
  border: 1px solid rgba(255, 255, 255, 0.3);
  transition: all 0.3s ease;
  align-items: center;
  position: relative;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 12px 32px rgba(255, 182, 193, 0.2);
  }

  @media (max-width: 768px) {
    flex-direction: column;
    text-align: center;
    padding: 15px;
    gap: 15px;
  }

  @media (max-width: 480px) {
    padding: 12px;
    gap: 12px;
  }
`;

const DeleteButton = styled.button`
  position: absolute;
  top: 15px;
  right: 15px;
  background: rgba(255, 99, 132, 0.1);
  border: none;
  border-radius: 50%;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  color: #ff6384;

  &:hover {
    background: rgba(255, 99, 132, 0.2);
    transform: scale(1.1);
  }

  &:active {
    transform: scale(0.95);
  }

  @media (max-width: 768px) {
    position: static;
    width: 36px;
    height: 36px;
    margin-bottom: 10px;
  }
`;

const ProductImage = styled.img`
  width: 120px;
  height: 120px;
  border-radius: 15px;
  object-fit: cover;
  flex-shrink: 0;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);

  @media (max-width: 768px) {
    width: 100px;
    height: 100px;
  }

  @media (max-width: 480px) {
    width: 80px;
    height: 80px;
    border-radius: 12px;
  }
`;

const Details = styled.div`
  flex: 2;
  padding: 0 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  min-width: 0;

  @media (max-width: 768px) {
    padding: 0;
    flex: none;
    width: 100%;
    gap: 8px;
  }
`;

const ProductName = styled.span`
  font-size: 18px;
  font-weight: 600;
  color: #333;
  margin-bottom: 8px;
  line-height: 1.3;

  @media (max-width: 768px) {
    font-size: 16px;
    margin-bottom: 6px;
  }

  @media (max-width: 480px) {
    font-size: 15px;
  }
`;

const ProductId = styled.span`
  font-size: 12px;
  color: #777;
  margin-bottom: 8px;

  @media (max-width: 768px) {
    font-size: 11px;
  }
`;

const ProductColor = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${(props) => props.color};
  border: 2px solid white;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);

  @media (max-width: 768px) {
    margin: 0 auto;
    width: 18px;
    height: 18px;
  }
`;

const PriceDetail = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 15px;
  min-width: 120px;

  @media (max-width: 768px) {
    flex: none;
    width: 100%;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }

  @media (max-width: 480px) {
    flex-direction: column;
    gap: 10px;
  }
`;

const ProductQuantity = styled.div`
  display: flex;
  align-items: center;
  background: rgba(255, 255, 255, 0.6);
  border-radius: 25px;
  padding: 8px 12px;
  gap: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
`;

const QuantityButton = styled.div`
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background: linear-gradient(135deg, #ffc0cb 0%, #ff91a4 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  color: white;
  font-weight: bold;

  &:hover {
    transform: scale(1.1);
    background: linear-gradient(135deg, #ff91a4 0%, #ff6b9d 100%);
  }

  &:active {
    transform: scale(0.95);
  }
`;

const ProductQty = styled.span`
  font-size: 16px;
  font-weight: 600;
  color: #333;
  min-width: 20px;
  text-align: center;

  @media (max-width: 480px) {
    font-size: 15px;
  }
`;

const ProductPrice = styled.span`
  font-size: 20px;
  font-weight: 700;
  color: #333;
  letter-spacing: -0.5px;

  @media (max-width: 768px) {
    font-size: 18px;
  }

  @media (max-width: 480px) {
    font-size: 16px;
  }
`;

const Hr = styled.hr`
  border: none;
  border-top: 2px solid rgba(255, 182, 193, 0.2);
  margin: 30px 0;
  border-radius: 2px;

  @media (max-width: 768px) {
    margin: 20px 0;
  }
`;

const Summary = styled.div`
  flex: 1;
  min-width: 320px;
  max-width: 400px;
  background: rgba(255, 255, 255, 0.4);
  backdrop-filter: blur(12px);
  border-radius: 20px;
  padding: 25px;
  box-shadow: 0 8px 24px rgba(255, 182, 193, 0.15);
  border: 1px solid rgba(255, 255, 255, 0.3);
  height: fit-content;
  position: sticky;
  top: 20px;

  @media (max-width: 768px) {
    flex: none;
    width: 100%;
    max-width: none;
    min-width: 0;
    position: static;
    padding: 20px;
  }

  @media (max-width: 480px) {
    padding: 15px;
  }
`;

const SummaryTitle = styled.h2`
  font-weight: 600;
  text-align: center;
  color: #333;
  font-size: 20px;
  margin-bottom: 25px;
  text-transform: uppercase;
  letter-spacing: 1px;

  @media (max-width: 768px) {
    font-size: 18px;
    margin-bottom: 20px;
  }

  @media (max-width: 480px) {
    font-size: 16px;
  }
`;

const SummaryItem = styled.div`
  margin: 15px 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: ${(props) => (props.total ? "18px" : "15px")};
  font-weight: ${(props) => (props.total ? "700" : "500")};
  color: ${(props) => (props.total ? "#333" : "#555")};
  padding: ${(props) => (props.total ? "15px 0" : "8px 0")};
  border-top: ${(props) => (props.total ? "2px solid rgba(255, 182, 193, 0.3)" : "none")};

  @media (max-width: 768px) {
    font-size: ${(props) => (props.total ? "16px" : "14px")};
    margin: 12px 0;
  }

  @media (max-width: 480px) {
    font-size: ${(props) => (props.total ? "15px" : "13px")};
  }
`;

const CheckoutButton = styled.button`
  width: 100%;
  padding: 15px;
  background: linear-gradient(135deg, #ffc0cb 0%, #ff91a4 100%);
  color: white;
  font-weight: 600;
  border: none;
  border-radius: 25px;
  cursor: pointer;
  margin-top: 20px;
  font-size: 16px;
  text-transform: uppercase;
  letter-spacing: 1px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 6px 16px rgba(255, 182, 193, 0.3);

  &:hover {
    background: linear-gradient(135deg, #ff91a4 0%, #ff6b9d 100%);
    transform: translateY(-2px);
    box-shadow: 0 8px 20px rgba(255, 182, 193, 0.4);
  }

  &:active {
    transform: translateY(0);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }

  @media (max-width: 768px) {
    padding: 12px;
    font-size: 15px;
  }

  @media (max-width: 480px) {
    padding: 10px;
    font-size: 14px;
  }
`;

const EmptyCart = styled.div`
  text-align: center;
  padding: 60px 20px;
  color: #666;

  h3 {
    font-size: 24px;
    margin-bottom: 10px;
    color: #333;
  }

  p {
    font-size: 16px;
    margin-bottom: 30px;
  }

  @media (max-width: 768px) {
    padding: 40px 15px;
    
    h3 {
      font-size: 20px;
    }
    
    p {
      font-size: 14px;
    }
  }
`;

const LoadingSpinner = styled.div`
  border: 3px solid rgba(255, 182, 193, 0.3);
  border-top: 3px solid #ff91a4;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  animation: spin 1s linear infinite;
  margin: 0 auto;

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

const Cart = () => {
  const cart = useSelector((state) => state.cart);
  const user = useSelector((state) => state.user.currentUser);
  const navigate = useNavigate();
  const [stripeToken, setStripeToken] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const dispatch = useDispatch();

  const onToken = (token) => {
    setStripeToken(token);
    setIsProcessing(true);
  };

  useEffect(() => {
    const makeRequest = async () => {
      try {
        const res = await userRequest.post("/checkout/payment", {
          tokenId: stripeToken.id,
          amount: cart.total * 100,
        });
        navigate("/success", { state: res.data });
      } catch (err) {
        console.error("Payment failed:", err);
        alert("Payment failed. Please try again.");
      } finally {
        setIsProcessing(false);
        setStripeToken(null);
      }
    };
    
    if (stripeToken && cart.total > 0) {
      makeRequest();
    }
  }, [stripeToken, cart.total, navigate]);

  const changeQuantity = (productId, type) => {
    dispatch(updateQuantity({ productId, type }));
  };

  const handleDeleteProduct = (productId) => {
    if (window.confirm("Are you sure you want to remove this item from your cart?")) {
      dispatch(removeProduct(productId));
    }
  };

  const handleCheckoutClick = () => {
    if (!user) {
      navigate("/login");
      return;
    }
    
    if (cart.products.length === 0) {
      alert("Your cart is empty!");
      return;
    }
    
    if (cart.total <= 0) {
      alert("Invalid cart total!");
      return;
    }

    // If using Stripe, the StripeCheckout component will handle the rest
    // If not using Stripe, you can add custom checkout logic here
  };

  return (
    <Container>
      <Navbar />
      <Announcement />
      <Wrapper>
        <Title>Your Shopping Bag</Title>
        <Top>
          <TopButton onClick={() => navigate("/")}>Continue Shopping</TopButton>
          <TopTexts>
            <TopText>Shopping Bag ({cart.quantity})</TopText>
            <TopText>Your Wishlist (0)</TopText>
          </TopTexts>
          <TopButton 
            filled 
            onClick={handleCheckoutClick}
            disabled={cart.products.length === 0 || isProcessing}
          >
            {isProcessing ? "Processing..." : "Checkout Now"}
          </TopButton>
        </Top>
        
        {cart.products.length === 0 ? (
          <EmptyCart>
            <h3>Your cart is empty</h3>
            <p>Add some products to get started!</p>
            <TopButton onClick={() => navigate("/")}>Start Shopping</TopButton>
          </EmptyCart>
        ) : (
          <Bottom>
            <Info>
              {cart.products.map((prod) => (
                <ProductCard key={prod._id}>
                  <DeleteButton onClick={() => handleDeleteProduct(prod._id)}>
                    <Delete style={{ fontSize: 18 }} />
                  </DeleteButton>
                  <ProductImage src={prod.thumbnail} alt={prod.title} />
                  <Details>
                    <ProductName>{prod.title}</ProductName>
                    <ProductId>ID: {prod._id}</ProductId>
                    <ProductColor color={prod.color?.[0] || "#ffc0cb"} />
                  </Details>
                  <PriceDetail>
                    <ProductQuantity>
                      <QuantityButton onClick={() => changeQuantity(prod._id, "dec")}>
                        <Remove style={{ fontSize: 16 }} />
                      </QuantityButton>
                      <ProductQty>{prod.quantity}</ProductQty>
                      <QuantityButton onClick={() => changeQuantity(prod._id, "inc")}>
                        <Add style={{ fontSize: 16 }} />
                      </QuantityButton>
                    </ProductQuantity>
                    <ProductPrice>₹{prod.price * prod.quantity}</ProductPrice>
                  </PriceDetail>
                </ProductCard>
              ))}
              <Hr />
            </Info>
            <Summary>
              <SummaryTitle>Order Summary</SummaryTitle>
              <SummaryItem>
                <span>Subtotal</span>
                <span>₹{cart.total}</span>
              </SummaryItem>
              <SummaryItem>
                <span>Estimated Shipping</span>
                <span>₹59</span>
              </SummaryItem>
              <SummaryItem>
                <span>Shipping Discount</span>
                <span>-₹59</span>
              </SummaryItem>
              <SummaryItem total>
                <span>Total</span>
                <span>₹{cart.total}</span>
              </SummaryItem>
              
              {user ? (
                <StripeCheckout
                  name="Deccan Threads"
                  billingAddress
                  shippingAddress
                  description={`Your total is ₹${cart.total}`}
                  amount={cart.total * 100}
                  token={onToken}
                  stripeKey={KEY}
                  disabled={isProcessing || cart.products.length === 0}
                >
                  <CheckoutButton disabled={isProcessing || cart.products.length === 0}>
                    {isProcessing ? (
                      <>
                        <LoadingSpinner />
                        Processing...
                      </>
                    ) : (
                      "Checkout Now"
                    )}
                  </CheckoutButton>
                </StripeCheckout>
              ) : (
                <CheckoutButton onClick={() => navigate("/login")}>
                  Login to Checkout
                </CheckoutButton>
              )}
            </Summary>
          </Bottom>
        )}
      </Wrapper>
      <Footer />
    </Container>
  );
};

export default Cart;