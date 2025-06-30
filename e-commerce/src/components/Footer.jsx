import { Facebook, Instagram, MailOutline, Phone, Pinterest, Room, Twitter } from "@material-ui/icons";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  background: linear-gradient(to right, #fff8dc, #ffeef8);
  position: relative;
  padding: 40px 20px;
  overflow: hidden;
  gap: 20px;

  @media (max-width: 900px) {
    flex-direction: column;
    gap: 0;
    padding: 24px 8px;
  }
  @media (max-width: 600px) {
    flex-direction: column;
    padding: 14px 2vw;
    gap: 0;
  }
`;

const Left = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    padding: 20px;
    min-width: 220px;
    position: relative;
    z-index: 1;

    @media (max-width: 900px) {
      padding: 12px 0;
    }
    @media (max-width: 600px) {
      padding: 8px 0;
    }
`;

const YarnBackground = styled.img`
  position: absolute;
  bottom: -20px;
  left: -30px;
  width: 250px;
  opacity: 0.08;
  pointer-events: none;
  z-index: 0;

  @media (max-width: 600px) {
    width: 120px;
    left: -10px;
    bottom: -10px;
  }
`;

const Center = styled.div`
    flex: 1;
    padding: 20px;
    min-width: 180px;
    z-index: 1;

    @media (max-width: 900px) {
      padding: 12px 0;
    }
    @media (max-width: 600px) {
      padding: 8px 0;
    }
`;

const Right = styled.div`
    flex: 1;
    padding: 20px;
    min-width: 180px;
    z-index: 1;

    @media (max-width: 900px) {
      padding: 12px 0;
    }
    @media (max-width: 600px) {
      padding: 8px 0;
    }
`;

const ContactItem = styled.div`
    margin-bottom: 20px;
    display: flex;
    align-items: center;
    font-size: 15px;

    @media (max-width: 600px) {
      font-size: 13px;
      margin-bottom: 12px;
    }
`;

const Logo = styled.h1`
  font-size: 2rem;
  color: #b3005e;
  margin-bottom: 10px;
  font-family: 'Poppins', cursive;

  @media (max-width: 600px) {
    font-size: 1.2rem;
    margin-bottom: 6px;
  }
`;

const Desc = styled.div`
    margin: 20px 0px;
    font-size: 15px;
    color: #444;

    @media (max-width: 600px) {
      font-size: 12px;
      margin: 10px 0;
    }
`;

const SocialContainer = styled.div`
    display: flex;
    margin-top: 8px;
    margin-bottom: 8px;
`;

const SocialIcon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  color: white;
  background-color: #${(props) => props.color};
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 20px;
  font-size: 22px;

  @media (max-width: 600px) {
    width: 28px;
    height: 28px;
    font-size: 15px;
    margin-right: 10px;
  }
`;

const Title = styled.h3`
  margin-bottom: 30px;
  color: #ff69b4;
  text-shadow: 1px 1px 3px rgba(255, 105, 180, 0.3);

  @media (max-width: 600px) {
    margin-bottom: 14px;
    font-size: 1rem;
  }
`;

const List = styled.ul`
    width: 100%;
    margin-bottom: 10px;
    display: flex;
    flex-wrap: wrap;
    padding: 0;
    list-style: none;

    @media (max-width: 600px) {
      flex-direction: column;
      margin-bottom: 0;
    }
`;

const ListItem = styled.li`
  width: 50%;
  margin-bottom: 10px;
  font-size: 15px;
  color: #b3005e;
  cursor: pointer;
  transition: color 0.2s;

  &:hover {
    color: #ff69b4;
    text-decoration: underline;
  }

  @media (max-width: 600px) {
    width: 100%;
    font-size: 13px;
    margin-bottom: 6px;
  }
`;

const Payment = styled.img`
    width: 50%;

    @media (max-width: 600px) {
      width: 80%;
      margin-top: 10px;
    }
`;

const Footer = () => {
    return (
        <Container>
            <Left>
                <Logo>Deccan Threads</Logo>
                <Desc>
                    At Deccan Threads, we turn everyday accessories into little moments of joy.
                    From soft, squishy keychains to cozy crochet bags and charming home bits, everything here is designed to feel cute, comforting, and aesthetic.
                    Think warm, think cozy, think “where did you get that?!”
                    If you can think of something cute, it’s probably already here. 💖
                    Deccan Threads isn’t deep—it’s just delightful.
                </Desc>
                <YarnBackground src="/assets/yarn_swirl.svg" alt="yarn swirl" />
                <SocialContainer>
                    <SocialIcon color="3B5999">
                        <Facebook />
                    </SocialIcon>
                    <SocialIcon color="E4405F">
                        <Instagram />
                    </SocialIcon>
                    <SocialIcon color="55ACEE">
                        <Twitter />
                    </SocialIcon>
                    <SocialIcon color="E60023">
                        <Pinterest />
                    </SocialIcon>
                </SocialContainer>
            </Left>
            <Center>
                <Title>Useful Links</Title>
                <List>
                    <ListItem>Home</ListItem>
                    <ListItem>Cart</ListItem>
                    <ListItem>Accessories</ListItem>
                    <ListItem>My Account</ListItem>
                    <ListItem>Order Tracking</ListItem>
                    <ListItem>Wishlist</ListItem>
                    <ListItem>Terms</ListItem>
                </List>
            </Center>
            <Right>
                <Title>Contact</Title>
                <ContactItem>
                    <Room style={{ marginRight: "10px" }} /> Manikonda, Hyderabad
                </ContactItem>
                <ContactItem>
                    <Phone style={{ marginRight: "10px" }} /> +91 87400 77773
                </ContactItem>
                <ContactItem>
                    <MailOutline style={{ marginRight: "10px" }} /> contact@mohan.dev
                </ContactItem>
                <Payment src="https://i.ibb.co/Qfvn4z6/payment.png" />
            </Right>
        </Container>
    )
}

export default Footer;