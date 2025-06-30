import { Add, Remove } from "@material-ui/icons";
import styled from "styled-components";
import Announcement from "../components/Announcement";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { useSelector, useDispatch } from "react-redux";
import StripeCheckout from "react-stripe-checkout";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { userRequest } from "../requestMethods";
import { updateQuantity } from "../redux/cartRedux";


const KEY = process.env.REACT_APP_STRIPE;

// Styled components with pastel glass theme
const Container = styled.div`
 
`;
const Wrapper = styled.div`
  padding: 20px;
  max-width: 1200px;
  margin: auto;
`;
const Title = styled.h1`
  font-weight: 300;
  text-align: center;
  color: #333;
`;
const Top = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
`;
const TopButton = styled.button`
  padding: 10px 20px;
  font-weight: 600;
  border: ${(props) => (props.filled ? "none" : "1px solid #333")};
  background-color: ${(props) => (props.filled ? "#ff7fa3" : "transparent")};
  color: ${(props) => (props.filled ? "white" : "#333")};
  cursor: pointer;
  border-radius: 20px;
`;
const TopTexts = styled.div``;
const TopText = styled.span`
  text-decoration: underline;
  cursor: pointer;
  margin: 0 10px;
  color: #555;
`;
const Bottom = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;
const Info = styled.div`
  flex: 3;
`;
const ProductCard = styled.div`
  background: rgba(255, 255, 255, 0.3);
  backdrop-filter: blur(8px);
  border-radius: 15px;
  margin: 20px 30px;
  margin-bottom: 20px;
  display: flex;
  padding: 15px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.05);
`;
const ProductImage = styled.img`
  width: 120px;
  border-radius: 10px;
`;
const Details = styled.div`
  flex: 2;
  padding: 0 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;
const ProductName = styled.span`
  font-size: 18px;
  font-weight: 600;
`;
const ProductId = styled.span`
  font-size: 14px;
  color: #555;
`;
const ProductColor = styled.div`
  margin: 8px 0;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background-color: ${(props) => props.color};
`;
const PriceDetail = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
const ProductQuantity = styled.div`
  display: flex;
  align-items: center;
`;
const ProductQty = styled.span`
  font-size: 18px;
  margin: 0 8px;
`;
const ProductPrice = styled.span`
  font-size: 22px;
  font-weight: bold;
  margin-top: 10px;
`;
const Hr = styled.hr`
  border: none;
  border-top: 1px solid #eee;
  margin: 10px 0;
`;
const Summary = styled.div`
  flex: 1;
  min-width: 300px;
  background: rgba(255, 255, 255, 0.3);
  backdrop-filter: blur(8px);
  border-radius: 15px;
  padding: 20px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.05);
  height: fit-content;
`;
const SummaryTitle = styled.h2`
  font-weight: 200;
  text-align: center;
`;
const SummaryItem = styled.div`
  margin: 20px 0;
  display: flex;
  justify-content: space-between;
  font-size: ${(props) => (props.total ? "20px" : "16px")};
  font-weight: ${(props) => (props.total ? "600" : "400")};
`;
const CheckoutButton = styled.button`
  width: 100%;
  padding: 12px;
  background-color: #ff7fa3;
  color: white;
  font-weight: 600;
  border: none;
  border-radius: 20px;
  cursor: pointer;
  margin-top: 10px;
`;

const Cart = () => {
  const cart = useSelector((state) => state.cart);
  const user = useSelector((state) => state.user.currentUser);
  const navigate = useNavigate();
  const [stripeToken, setStripeToken] = useState(null);
  const dispatch = useDispatch();

  const onToken = (token) => setStripeToken(token);

  useEffect(() => {
    const makeRequest = async () => {
      try {
        const res = await userRequest.post("/checkout/payment", {
          tokenId: stripeToken.id,
          amount: cart.total * 100,
        });
        navigate("/success", { state: res.data });
      } catch (err) {
        console.error(err);
      }
    };
    stripeToken && cart.total > 0 && makeRequest();
  }, [stripeToken, cart.total, navigate]);

  const changeQuantity = (productId, type) => {
    dispatch(updateQuantity({ productId, type }));
  };

  return (
    <Container>
      <Navbar />
      <Announcement />
      <Wrapper>
        <Title>YOUR BAG</Title>
        <Top>
          <TopButton>CONTINUE SHOPPING</TopButton>
          <TopTexts>
            <TopText>Shopping Bag ({cart.quantity})</TopText>
            <TopText>Your Wishlist (0)</TopText>
          </TopTexts>
          <TopButton filled>CHECKOUT NOW</TopButton>
        </Top>
        <Bottom>
          <Info>
            {cart.products.map((prod) => (
              <ProductCard key={prod._id}>
                <ProductImage src={prod.thumbnail} />
                <Details>
                  <ProductName>{prod.title}</ProductName>
                  <ProductId>ID: {prod._id}</ProductId>
                  <ProductColor color={prod.color[0] || "#fff"} />
                </Details>
                <PriceDetail>
                  <ProductQuantity>
                    <Add onClick={() => changeQuantity(prod._id, "inc")} style={{cursor:'pointer'}}/>
                    <ProductQty>{prod.quantity}</ProductQty>
                    <Remove onClick={() => changeQuantity(prod._id, "dec")} style={{cursor:'pointer'}}/>
                  </ProductQuantity>
                  <ProductPrice>₹{prod.price * prod.quantity}</ProductPrice>
                </PriceDetail>
              </ProductCard>
            ))}
            <Hr />
          </Info>
          <Summary>
            <SummaryTitle>ORDER SUMMARY</SummaryTitle>
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
                >
                  <CheckoutButton>CHECKOUT NOW</CheckoutButton>
                </StripeCheckout>
              ) : (
                <CheckoutButton onClick={() => navigate("/login")}>
                  LOGIN TO CHECKOUT
                </CheckoutButton>
              )}

          </Summary>
        </Bottom>
      </Wrapper>
      <Footer />
    </Container>
  );
};
export default Cart;
