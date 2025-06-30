import { ArrowBackIos, ArrowForwardIos } from '@material-ui/icons'
import styled from 'styled-components'
import { useState, useEffect } from 'react';
import { publicRequest } from '../requestMethods';

const Container = styled.div`
    width: 100%;
    height: 100vh;
    display: flex;
    overflow: hidden;
    position: relative;

    @media (max-width: 900px) {
        height: 60vh;
    }
    @media (max-width: 600px) {
        height: 38vh;
    }
`;

const Slide = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  background-color: #${(props) => props.bg};

  @media (max-width: 900px) {
    height: 60vh;
  }
  @media (max-width: 600px) {
    height: 38vh;
    flex-direction: column;
    justify-content: center;
    padding: 0 0 10px 0;
  }
`;

const Wrapper = styled.div`
    height: 100%;
    display: flex;
    transition: all 1.5s ease;
    transform: translateX(${(props) => props.slideIndex * -100}vw);
`;

const Arrow = styled.div`
    width: 50px;
    height: 50px;
    background-color: #fff7f7;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    top: 0;
    bottom: 0;
    margin: auto;
    left: ${(props) => props.direction === "left" && "10px"};
    right: ${(props) => props.direction === "right" && "10px"};
    cursor: pointer;
    opacity: 0.5;
    z-index: 2;

    @media (max-width: 600px) {
        width: 32px;
        height: 32px;
        left: ${(props) => props.direction === "left" && "2px"};
        right: ${(props) => props.direction === "right" && "2px"};
    }
`;

const ImgContainer = styled.div`
  height: 100%;
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;

  @media (max-width: 600px) {
    height: 60%;
  }
`;

const Image = styled.img`
  height: 80%;
  max-width: 100%;
  object-fit: contain;

  @media (max-width: 900px) {
    height: 60%;
  }
  @media (max-width: 600px) {
    height: 100px;
    max-width: 100vw;
  }
`;

const InfoContainer = styled.div`
  flex: 1;
  padding: 50px;

  @media (max-width: 900px) {
    padding: 20px;
  }
  @media (max-width: 600px) {
    padding: 8px 8px 0 8px;
    text-align: center;
  }
`;

const Title = styled.h1`
  font-size: 70px;

  @media (max-width: 900px) {
    font-size: 38px;
  }
  @media (max-width: 600px) {
    font-size: 20px;
    margin-bottom: 4px;
  }
`;

const Desc = styled.p`
  margin: 50px 0px;
  font-size: 20px;
  font-weight: 500;
  letter-spacing: 3px;

  @media (max-width: 900px) {
    margin: 18px 0;
    font-size: 15px;
  }
  @media (max-width: 600px) {
    margin: 8px 0;
    font-size: 11px;
    letter-spacing: 1px;
  }
`;

const Button = styled.button`
  padding: 10px 24px;
  font-size: 20px;
  background-color: transparent;
  cursor: pointer;
  border-radius: 18px;
  border: 2px solid #ff7fa3;
  color: #b3005e;
  font-weight: 600;
  transition: all 0.3s;

  &:hover {
    background: #ff7fa3;
    color: #fff;
    border-color: #ff7fa3;
  }

  @media (max-width: 900px) {
    font-size: 15px;
    padding: 8px 16px;
  }
  @media (max-width: 600px) {
    font-size: 11px;
    padding: 6px 10px;
    border-radius: 10px;
  }
`;

const Slider = () => {
    const [sliderItems, setSliderItems] = useState([]);
    const [slideIndex, setSlideIndex] = useState(0);
    const Navigate = () => {
        window.location.href = "/products/:category";
    }
    useEffect(() => {
        const fetchSliderItems = async () => {
            try {
                const res = await publicRequest.get("/slider")
                setSliderItems(res.data);
            }catch (err) {
                console.error("Error fetching slider Items:", err);
            }
        }
        fetchSliderItems();
    }, [])

    const handleClickShow = () => {
        Navigate()
    }

    const handleClick = (direction) => {
        if (direction === "left") {
            setSlideIndex(slideIndex > 0 ? slideIndex - 1 : sliderItems.length - 1);
        } else {
            setSlideIndex(slideIndex < sliderItems.length - 1 ? slideIndex + 1 : 0);
        }
    };

    return (
        <Container>
            <Arrow direction="left" onClick={() => handleClick("left")}>
                <ArrowBackIos />
            </Arrow>
            <Wrapper slideIndex={slideIndex}>
                {sliderItems.map((item, idx) => (
                    <Slide key={item._id || idx} bg={item.bg || "fff"}>
                        <ImgContainer>
                            <Image src={item.image} alt={item.title} />
                        </ImgContainer>
                        <InfoContainer>
                            <Title>{item.title}</Title>
                            <Desc>{item.subtitle}</Desc>
                            <Button onClick={handleClickShow}>SHOW NOW</Button>
                        </InfoContainer>
                    </Slide>
                ))}
            </Wrapper>
            <Arrow direction="right" onClick={() => handleClick("right") }>
                <ArrowForwardIos />
            </Arrow>
        </Container>
    );
};

export default Slider;