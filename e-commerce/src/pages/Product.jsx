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

// Enhanced Styled Components with better mobile responsiveness

const Container = styled.div`
  width: 100vw;
  min-height: 100vh;
  background: linear-gradient(
      rgba(255,255,255,0.2),
      rgba(255,255,255,0.3)
    ),
    url("/images/productbg.jpeg") center;
  background-size: cover;
  background-attachment: fixed;
  
  @media (max-width: 768px) {
    background-attachment: scroll; /* Better performance on mobile */
  }
`;

const Wrapper = styled.div`
  padding: 60px 40px;
  display: flex;
  gap: 40px;
  justify-content: center;
  align-items: flex-start;
  flex-wrap: wrap;
  max-width: 1400px;
  margin: 0 auto;

  @media (max-width: 1024px) {
    padding: 40px 20px;
    gap: 30px;
  }
  
  @media (max-width: 768px) {
    padding: 20px 15px;
    gap: 20px;
    flex-direction: column;
    align-items: center;
  }
  
  @media (max-width: 480px) {
    padding: 15px 10px;
    gap: 15px;
  }
`;

const ImageSection = styled.div`
  flex: 1;
  max-width: 500px;
  min-width: 300px;
  display: flex;
  flex-direction: column;
  gap: 15px;

  @media (max-width: 1024px) {
    max-width: 450px;
    min-width: 280px;
  }
  
  @media (max-width: 768px) {
    max-width: 100%;
    min-width: unset;
    width: 100%;
  }
  
  @media (max-width: 480px) {
    gap: 10px;
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
  touch-action: pan-x; /* Better touch handling */

  @media (max-width: 768px) {
    border-radius: 15px;
    aspect-ratio: 4 / 3; /* Better aspect ratio for mobile */
  }
  
  @media (max-width: 480px) {
    border-radius: 12px;
    min-height: 250px;
  }
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 20px;
  user-select: none;
  -webkit-user-drag: none;

  @media (max-width: 768px) {
    border-radius: 15px;
  }
  
  @media (max-width: 480px) {
    border-radius: 12px;
  }
`;

const Arrow = styled.div`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  ${(props) => props.direction}: 10px;
  z-index: 10;
  background-color: rgba(255, 255, 255, 0.9);
  border-radius: 50%;
  width: 44px;
  height: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  
  /* Better touch target */
  @media (hover: hover) {
    &:hover {
      background-color: white;
      box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
      transform: translateY(-50%) scale(1.05);
    }
  }

  @media (max-width: 768px) {
    width: 40px;
    height: 40px;
    ${(props) => props.direction}: 8px;
  }
  
  @media (max-width: 480px) {
    width: 36px;
    height: 36px;
    ${(props) => props.direction}: 6px;
    
    svg {
      font-size: 18px;
    }
  }
`;

const ThumbnailContainer = styled.div`
  display: flex;
  gap: 12px;
  justify-content: center;
  flex-wrap: wrap;
  margin-top: 15px;
  padding: 0 10px;

  @media (max-width: 768px) {
    gap: 8px;
    margin-top: 12px;
    padding: 0 5px;
  }
  
  @media (max-width: 480px) {
    gap: 6px;
    margin-top: 10px;
    overflow-x: auto;
    justify-content: flex-start;
    padding: 5px;
    
    /* Hide scrollbar but keep functionality */
    &::-webkit-scrollbar {
      height: 3px;
    }
    
    &::-webkit-scrollbar-track {
      background: rgba(255, 255, 255, 0.1);
      border-radius: 10px;
    }
    
    &::-webkit-scrollbar-thumb {
      background: rgba(255, 105, 180, 0.3);
      border-radius: 10px;
    }
  }
`;

const Thumbnail = styled.div`
  width: 80px;
  height: 80px;
  min-width: 80px; /* Prevent shrinking on mobile */
  border-radius: 12px;
  overflow: hidden;
  cursor: pointer;
  border: 3px solid ${props => props.isActive ? '#ff69b4' : 'rgba(255, 255, 255, 0.3)'};
  transition: all 0.3s ease;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(5px);

  @media (hover: hover) {
    &:hover {
      border-color: #ff69b4;
      transform: scale(1.05);
      box-shadow: 0 4px 15px rgba(255, 105, 180, 0.3);
    }
  }

  /* Touch feedback for mobile */
  &:active {
    transform: scale(0.95);
  }

  @media (max-width: 768px) {
    width: 60px;
    height: 60px;
    min-width: 60px;
    border-radius: 10px;
    border-width: 2px;
  }
  
  @media (max-width: 480px) {
    width: 50px;
    height: 50px;
    min-width: 50px;
    border-radius: 8px;
  }
`;

const ThumbnailImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  user-select: none;
  -webkit-user-drag: none;
`;

const InfoContainer = styled.div`
  flex: 1;
  padding: 40px;
  background: rgba(255, 255, 255, 0.4);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
  max-width: 600px;
  min-width: 300px;

  @media (max-width: 1024px) {
    padding: 30px;
    max-width: 500px;
  }

  @media (max-width: 768px) {
    padding: 25px;
    max-width: 100%;
    min-width: unset;
    width: 100%;
    border-radius: 15px;
  }
  
  @media (max-width: 480px) {
    padding: 20px 15px;
    border-radius: 12px;
  }
`;

const Title = styled.h1`
  font-size: clamp(24px, 5vw, 36px); /* Responsive font size */
  font-weight: 600;
  margin-bottom: 20px;
  color: #222;
  line-height: 1.2;
  word-wrap: break-word;

  @media (max-width: 768px) {
    margin-bottom: 15px;
  }
  
  @media (max-width: 480px) {
    margin-bottom: 12px;
  }
`;

const Desc = styled.p`
  font-size: clamp(14px, 2.5vw, 16px);
  color: #444;
  margin-bottom: 20px;
  line-height: 1.6;
  word-wrap: break-word;

  @media (max-width: 768px) {
    margin-bottom: 15px;
  }
  
  @media (max-width: 480px) {
    margin-bottom: 12px;
  }
`;

const Price = styled.span`
  font-size: clamp(22px, 4vw, 28px);
  font-weight: 600;
  color: #ff69b4;
  display: block;
  margin-bottom: 30px;

  @media (max-width: 768px) {
    margin-bottom: 20px;
  }
  
  @media (max-width: 480px) {
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

  @media (max-width: 768px) {
    margin-top: 20px;
    gap: 12px;
  }
  
  @media (max-width: 600px) {
    flex-direction: column;
    align-items: stretch;
    gap: 15px;
  }
  
  @media (max-width: 480px) {
    margin-top: 15px;
    gap: 12px;
  }
`;

const GlassQuantityBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: rgba(255, 255, 255, 0.3);
  border: 1px solid rgba(255, 255, 255, 0.4);
  border-radius: 25px;
  padding: 8px 16px;
  backdrop-filter: blur(12px);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.05);
  min-width: 140px;
  max-width: 180px;

  @media (max-width: 600px) {
    align-self: center;
    min-width: 120px;
  }
  
  @media (max-width: 480px) {
    padding: 6px 12px;
    border-radius: 20px;
    min-width: 110px;
  }
`;

const QuantityButton = styled.button`
  width: 36px;
  height: 36px;
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.4);
  border: 1px solid rgba(255, 255, 255, 0.5);
  backdrop-filter: blur(10px);
  color: #333;
  font-size: 20px;
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;
  
  /* Better touch targets */
  touch-action: manipulation;
  -webkit-tap-highlight-color: transparent;

  @media (hover: hover) {
    &:hover {
      background: rgba(255, 255, 255, 0.6);
      transform: scale(1.05);
    }
  }
  
  &:active {
    transform: scale(0.95);
    background: rgba(255, 255, 255, 0.6);
  }

  @media (max-width: 480px) {
    width: 32px;
    height: 32px;
    font-size: 18px;
    border-radius: 10px;
  }
`;

const Amount = styled.span`
  font-size: 18px;
  font-weight: 600;
  color: #333;
  padding: 0 15px;
  min-width: 30px;
  text-align: center;

  @media (max-width: 480px) {
    font-size: 16px;
    padding: 0 10px;
  }
`;

const Button = styled.button`
  padding: 14px 32px;
  background: linear-gradient(135deg, rgba(255, 105, 180, 0.8), rgba(255, 192, 203, 0.6));
  color: #fff;
  border: none;
  border-radius: 25px;
  backdrop-filter: blur(10px);
  cursor: pointer;
  font-weight: 600;
  font-size: 16px;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(255, 105, 180, 0.2);
  touch-action: manipulation;
  -webkit-tap-highlight-color: transparent;
  min-width: 140px;

  @media (hover: hover) {
    &:hover {
      background: linear-gradient(135deg, rgba(255, 105, 180, 0.9), rgba(255, 192, 203, 0.7));
      transform: translateY(-2px);
      box-shadow: 0 6px 20px rgba(255, 105, 180, 0.3);
    }
  }
  
  &:active {
    transform: translateY(0);
    box-shadow: 0 2px 10px rgba(255, 105, 180, 0.3);
  }

  @media (max-width: 600px) {
    width: 100%;
    padding: 16px 24px;
  }
  
  @media (max-width: 480px) {
    padding: 14px 20px;
    font-size: 15px;
    border-radius: 20px;
  }
`;

const ProductDescription = styled.div`
  margin-top: 40px;
  font-size: 15px;
  color: #444;
  line-height: 1.6;

  h3 {
    margin-bottom: 15px;
    color: #222;
    font-size: 20px;
    font-weight: 600;
  }

  p {
    margin: 8px 0;
    word-wrap: break-word;
    
    strong {
      color: #333;
      font-weight: 600;
    }
  }

  @media (max-width: 768px) {
    margin-top: 25px;
    font-size: 14px;
    
    h3 {
      font-size: 18px;
      margin-bottom: 12px;
    }
  }
  
  @media (max-width: 480px) {
    margin-top: 20px;
    font-size: 13px;
    
    h3 {
      font-size: 16px;
      margin-bottom: 10px;
    }
    
    p {
      margin: 6px 0;
    }
  }
`;

const LoadingSpinner = styled.div`
  width: 50px;
  height: 50px;
  border: 3px solid rgba(255, 105, 180, 0.3);
  border-top: 3px solid #ff69b4;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin: 50px auto;
  
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

const Product = () => {
  const location = useLocation();
  const id = location.pathname.split("/")[2];
  const [product, setProduct] = useState({});
  const [quantity, setQuantity] = useState(1);
  const [slideIndex, setSlideIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    const getProduct = async () => {
      try {
        setLoading(true);
        setError(false);
        const res = await publicRequest.get("/products/find/" + id);
        setProduct(res.data);
      } catch (err) {
        console.log(err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    getProduct();
    window.scrollTo(0, 0);
  }, [id]);

  const handleQuantity = (type) => {
    if (type === "dec" && quantity > 1) {
      setQuantity(quantity - 1);
    } else if (type === "inc" && quantity < 99) { // Add max limit
      setQuantity(quantity + 1);
    }
  };

  const handleClick = () => {
    if (product && product.title) {
      dispatch(addProduct({ ...product, quantity }));
    }
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

  // Touch/swipe handling
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);

  const handleTouchStart = (e) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe && product.images?.length > 0) {
      nextSlide();
    }
    if (isRightSwipe && product.images?.length > 0) {
      prevSlide();
    }
  };

  if (loading) {
    return (
      <Container>
        <Navbar />
        <Announcement />
        <LoadingSpinner />
        <Newsletter />
        <Footer />
      </Container>
    );
  }

  if (error || !product.title) {
    return (
      <Container>
        <Navbar />
        <Announcement />
        <div style={{ textAlign: 'center', padding: '50px', color: '#666' }}>
          <h2>Product not found</h2>
          <p>Sorry, we couldn't load this product.</p>
        </div>
        <Newsletter />
        <Footer />
      </Container>
    );
  }

  return (
    <Container>
      <Navbar />
      <Announcement />
      <Wrapper>
        <ImageSection>
          <ImgContainer
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            {product.images?.length > 1 && (
              <Arrow direction="left" onClick={prevSlide}>
                <ArrowBackIos />
              </Arrow>
            )}
            {product.images?.length > 0 && (
              <Image 
                src={product.images[slideIndex]} 
                alt={product.title}
                loading="lazy"
              />
            )}
            {product.images?.length > 1 && (
              <Arrow direction="right" onClick={nextSlide}>
                <ArrowForwardIos />
              </Arrow>
            )}
          </ImgContainer>

          {product.images?.length > 1 && (
            <ThumbnailContainer>
              {product.images.map((image, index) => (
                <Thumbnail
                  key={index}
                  isActive={index === slideIndex}
                  onClick={() => handleThumbnailClick(index)}
                >
                  <ThumbnailImage 
                    src={image} 
                    alt={`${product.title} ${index + 1}`}
                    loading="lazy"
                  />
                </Thumbnail>
              ))}
            </ThumbnailContainer>
          )}
        </ImageSection>

        <InfoContainer>
          <Title>{product.title}</Title>
          <Price>₹{product.price?.toLocaleString()}</Price>
          <Desc>{product.desc}</Desc>

          <AddContainer>
            <GlassQuantityBox>
              <QuantityButton 
                onClick={() => handleQuantity("dec")}
                disabled={quantity <= 1}
              >
                −
              </QuantityButton>
              <Amount>{quantity}</Amount>
              <QuantityButton 
                onClick={() => handleQuantity("inc")}
                disabled={quantity >= 99}
              >
                +
              </QuantityButton>
            </GlassQuantityBox>
            <Button onClick={handleClick}>ADD TO CART</Button>
          </AddContainer>

          <ProductDescription>
            <h3>Product Details</h3>
            {product.categories?.length > 0 && (
              <p><strong>Type:</strong> {product.categories.join(", ")}</p>
            )}
            {product.tags?.length > 0 && (
              <p><strong>Tags:</strong> {product.tags.join(", ")}</p>
            )}
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