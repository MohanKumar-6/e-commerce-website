import { ArrowBackIos, ArrowForwardIos } from "@material-ui/icons";
import styled from "styled-components";
import Announcement from "../components/Announcement";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Newsletter from "../components/Newsletter";
import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { publicRequest } from "../requestMethods";
import { addProduct } from "../redux/cartRedux";
import { useDispatch } from "react-redux";

// Styled Components
// ...existing imports...

const Container = styled.div`
  width: 100vw;
  min-height: 100vh;
  background: linear-gradient(
      rgba(255,255,255,0.2),
      rgba(255,255,255,0.3)
    ),
    url("/images/productbg.jpeg") center;
  background-size: cover;
`;

const Wrapper = styled.div`
  padding: 60px;
  display: flex;
  gap: 40px;
  justify-content: center;
  align-items: flex-start;
  flex-wrap: wrap;

  @media (max-width: 900px) {
    padding: 30px 10px;
    gap: 20px;
  }
  @media (max-width: 600px) {
    flex-direction: column;
    align-items: center;
    padding: 12px 2vw;
    gap: 10px;
  }
`;

const ImageSection = styled.div`
  flex: 1;
  max-width: 500px;
  display: flex;
  flex-direction: column;
  gap: 15px;

  @media (max-width: 900px) {
    max-width: 350px;
  }
  @media (max-width: 600px) {
    max-width: 98vw;
    width: 100%;
  }
`;

const ImgContainer = styled.div`
  width: 100%;
  aspect-ratio: 1 / 1;
  position: relative;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 8px 32px rgba(31, 38, 135, 0.1);
  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(8px);

  @media (max-width: 600px) {
    border-radius: 12px;
    min-height: 220px;
  }
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 20px;

  @media (max-width: 600px) {
    border-radius: 12px;
  }
`;

const Arrow = styled.div`
  position: absolute;
  top: 45%;
  ${(props) => props.direction}: 10px;
  z-index: 10;
  background-color: rgba(255, 255, 255, 0.7);
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: 0.3s;

  &:hover {
    background-color: white;
    box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
  }

  @media (max-width: 600px) {
    width: 32px;
    height: 32px;
  }
`;

const ThumbnailContainer = styled.div`
  display: flex;
  gap: 12px;
  justify-content: center;
  flex-wrap: wrap;
  margin-top: 15px;

  @media (max-width: 600px) {
    gap: 6px;
    margin-top: 8px;
  }
`;

const Thumbnail = styled.div`
  width: 80px;
  height: 80px;
  border-radius: 12px;
  overflow: hidden;
  cursor: pointer;
  border: 3px solid ${props => props.isActive ? '#ff69b4' : 'rgba(255, 255, 255, 0.3)'};
  transition: all 0.3s ease;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(5px);

  &:hover {
    border-color: #ff69b4;
    transform: scale(1.05);
    box-shadow: 0 4px 15px rgba(255, 105, 180, 0.3);
  }

  @media (max-width: 600px) {
    width: 48px;
    height: 48px;
    border-radius: 7px;
  }
`;

const ThumbnailImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const InfoContainer = styled.div`
  flex: 1;
  padding: 40px;
  background: rgba(255, 255, 255, 0.4);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
  max-width: 600px;

  @media (max-width: 900px) {
    padding: 24px;
    max-width: 95vw;
  }
  @media (max-width: 600px) {
    padding: 12px;
    border-radius: 12px;
    margin-top: 10px;
  }
`;

const Title = styled.h1`
  font-size: 36px;
  font-weight: 600;
  margin-bottom: 20px;
  color: #222;

  @media (max-width: 600px) {
    font-size: 22px;
    margin-bottom: 10px;
  }
`;

const Desc = styled.p`
  font-size: 16px;
  color: #444;
  margin-bottom: 20px;
  line-height: 1.5;

  @media (max-width: 600px) {
    font-size: 13px;
    margin-bottom: 10px;
  }
`;

const Price = styled.span`
  font-size: 28px;
  font-weight: 500;
  color: #333;
  display: block;
  margin-bottom: 30px;

  @media (max-width: 600px) {
    font-size: 20px;
    margin-bottom: 15px;
  }
`;

const AddContainer = styled.div`
  margin-top: 30px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 15px;

  @media (max-width: 600px) {
    flex-direction: column;
    gap: 8px;
    margin-top: 15px;
  }
`;

const GlassQuantityBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: rgba(255, 255, 255, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.4);
  border-radius: 20px;
  padding: 6px 12px;
  backdrop-filter: blur(12px);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.05);
  min-width: 140px;

  @media (max-width: 600px) {
    min-width: 100px;
    padding: 4px 8px;
    border-radius: 10px;
  }
`;

const QuantityButton = styled.button`
  width: 32px;
  height: 32px;
  border-radius: 10px;
  background: rgba(255, 255, 255, 0.3);
  border: 1px solid rgba(255, 255, 255, 0.5);
  backdrop-filter: blur(10px);
  color: #333;
  font-size: 20px;
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s;

  &:hover {
    background: rgba(255, 255, 255, 0.5);
    transform: scale(1.05);
  }

  @media (max-width: 600px) {
    width: 24px;
    height: 24px;
    font-size: 16px;
    border-radius: 6px;
  }
`;

const Amount = styled.span`
  font-size: 18px;
  font-weight: 600;
  color: #333;
  padding: 0 10px;

  @media (max-width: 600px) {
    font-size: 14px;
    padding: 0 6px;
  }
`;

const Button = styled.button`
  padding: 12px 28px;
  background: rgba(255, 192, 203, 0.3);
  color: #b3005e;
  border: 1px solid rgba(255, 192, 203, 0.4);
  border-radius: 25px;
  backdrop-filter: blur(10px);
  cursor: pointer;
  font-weight: 500;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(255, 192, 203, 0.5);
    transform: scale(1.03);
  }

  @media (max-width: 600px) {
    padding: 8px 16px;
    font-size: 13px;
    border-radius: 14px;
  }
`;

const ProductDescription = styled.div`
  margin-top: 40px;
  font-size: 15px;
  color: #444;

  h3 {
    margin-bottom: 10px;
    color: #222;
  }

  p {
    margin: 5px 0;
  }

  @media (max-width: 600px) {
    margin-top: 18px;
    font-size: 12px;
    h3 {
      font-size: 15px;
    }
  }
`;

// ...rest of your Product component remains unchanged...

// Component
const Product = () => {
  const location = useLocation();
  const id = location.pathname.split("/")[2];
  const [product, setProduct] = useState({});
  const [quantity, setQuantity] = useState(1);
  const [slideIndex, setSlideIndex] = useState(0);
  const dispatch = useDispatch();

  useEffect(() => {
    const getProduct = async () => {
      try {
        const res = await publicRequest.get("/products/find/" + id);
        setProduct(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getProduct();
    window.scrollTo(0, 0);
  }, [id]);

  const handleQuantity = (type) => {
    if (type === "dec" && quantity > 1) {
      setQuantity(quantity - 1);
    } else if (type === "inc") {
      setQuantity(quantity + 1);
    }
  };

  const handleClick = () => {
    dispatch(addProduct({ ...product, quantity }));
  };

  const nextSlide = () => {
    if (product.images?.length > 0) {
      setSlideIndex((prev) => (prev + 1) % product.images.length);
    }
  };

  const prevSlide = () => {
    if (product.images?.length > 0) {
      setSlideIndex((prev) =>
        prev === 0 ? product.images.length - 1 : prev - 1
      );
    }
  };

  const handleThumbnailClick = (index) => {
    setSlideIndex(index);
  };

  return (
    <Container>
      <Navbar />
      <Announcement />
      <Wrapper>
        <ImageSection>
          <ImgContainer>
            <Arrow direction="left" onClick={prevSlide}>
              <ArrowBackIos />
            </Arrow>
            {product.images?.length > 0 && (
              <Image src={product.images[slideIndex]} alt={product.title} />
            )}
            <Arrow direction="right" onClick={nextSlide}>
              <ArrowForwardIos />
            </Arrow>
          </ImgContainer>

          {/* Thumbnail Images */}
          {product.images?.length > 1 && (
            <ThumbnailContainer>
              {product.images.map((image, index) => (
                <Thumbnail
                  key={index}
                  isActive={index === slideIndex}
                  onClick={() => handleThumbnailClick(index)}
                >
                  <ThumbnailImage src={image} alt={`${product.title} ${index + 1}`} />
                </Thumbnail>
              ))}
            </ThumbnailContainer>
          )}
        </ImageSection>

        <InfoContainer>
          <Title>{product.title}</Title>
          <Desc>{product.desc}</Desc>
          <Price>₹{product.price}</Price>

          <AddContainer>
            <GlassQuantityBox>
              <QuantityButton onClick={() => handleQuantity("dec")}>−</QuantityButton>
              <Amount>{quantity}</Amount>
              <QuantityButton onClick={() => handleQuantity("inc")}>+</QuantityButton>
            </GlassQuantityBox>
            <Button onClick={handleClick}>ADD TO CART</Button>
          </AddContainer>

          <ProductDescription>
            <h3>Product Details</h3>
            <p><strong>Type:</strong> {product.categories?.join(", ")}</p>
            <p><strong>Tags:</strong> {product.tags?.length ? product.tags.join(", ") : "N/A"}</p>
            <p><strong>Material & Care:</strong> {product.details?.materialAndCare || "Soft acrylic yarn. Hand wash only."}</p>
            <p><strong>Pattern:</strong> {product.details?.pattern || "Unique handcrafted design"}</p>
            <p><strong>Occasion:</strong> {product.details?.occasion || "Everyday use, gifts, or decor"}</p>
            <p><strong>Handmade:</strong> {product.handmade ? "Yes 🧶" : "No"}</p>
          </ProductDescription>
        </InfoContainer>
      </Wrapper>
      <Newsletter />
      <Footer />
    </Container>
  );
};

export default Product;