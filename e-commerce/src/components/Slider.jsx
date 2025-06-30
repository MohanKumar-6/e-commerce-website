import { ArrowBackIos, ArrowForwardIos } from '@material-ui/icons'
import styled from 'styled-components'
import { useState, useEffect, useRef} from 'react';
import { useNavigate } from 'react-router-dom';
import { publicRequest } from '../requestMethods';

const Container = styled.div`
    width: 100%;
    height: 100vh;
    display: flex;
    overflow: hidden;
    position: relative;
    touch-action: pan-y;

    @media (max-width: 900px) {
        height: 70vh;
    }
    @media (max-width: 768px) {
        height: 55vh;
        min-height: 450px;
    }
    @media (max-width: 480px) {
        height: 50vh;
        min-height: 400px;
    }
`;

const Slide = styled.div`
    width: 100vw;
    height: 100vh;
    display: flex;
    align-items: center;
    background-color: #${(props) => props.bg};
    flex-shrink: 0;

    @media (max-width: 900px) {
        height: 70vh;
    }
    @media (max-width: 768px) {
        height: 55vh;
        min-height: 450px;
        flex-direction: column;
        justify-content: flex-start;
        padding: 15px 0 60px 0;
    }
    @media (max-width: 480px) {
        height: 50vh;
        min-height: 400px;
        padding: 10px 0 50px 0;
    }
`;

const Wrapper = styled.div`
    height: 100%;
    display: flex;
    transition: transform ${(props) => props.isTransitioning ? '0.5s ease-in-out' : '0s'};
    transform: translateX(${(props) => props.slideIndex * -100}vw);
    will-change: transform;
`;

const Arrow = styled.div`
    width: 50px;
    height: 50px;
    background-color: rgba(255, 255, 255, 0.9);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    left: ${(props) => props.direction === "left" && "15px"};
    right: ${(props) => props.direction === "right" && "15px"};
    cursor: pointer;
    opacity: 0.8;
    z-index: 10;
    transition: all 0.3s ease;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);

    &:hover {
        opacity: 1;
        transform: translateY(-50%) scale(1.1);
        background-color: rgba(255, 255, 255, 1);
    }

    &:active {
        transform: translateY(-50%) scale(0.95);
    }

    @media (max-width: 768px) {
        width: 40px;
        height: 40px;
        left: ${(props) => props.direction === "left" && "10px"};
        right: ${(props) => props.direction === "right" && "10px"};
        opacity: 0.7;
    }

    @media (max-width: 480px) {
        width: 36px;
        height: 36px;
        left: ${(props) => props.direction === "left" && "8px"};
        right: ${(props) => props.direction === "right" && "8px"};
    }
`;

const ArrowIcon = styled.div`
    color: #ff6b9d;
    font-size: 1.2rem;
    
    @media (max-width: 768px) {
        font-size: 1rem;
    }
    
    @media (max-width: 480px) {
        font-size: 0.9rem;
    }
`;

const ImgContainer = styled.div`
    height: 100%;
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 20px;

    @media (max-width: 768px) {
        height: 50%;
        flex: none;
        padding: 10px;
        margin-bottom: 10px;
    }
    
    @media (max-width: 480px) {
        height: 45%;
        padding: 8px;
        margin-bottom: 8px;
    }
`;

const Image = styled.img`
    height: 80%;
    max-width: 100%;
    object-fit: contain;
    border-radius: 8px;

    @media (max-width: 900px) {
        height: 70%;
    }
    @media (max-width: 768px) {
        height: 100%;
        max-height: 200px;
        width: auto;
    }
    @media (max-width: 480px) {
        max-height: 160px;
    }
`;

const InfoContainer = styled.div`
    flex: 1;
    padding: 50px;
    display: flex;
    flex-direction: column;
    justify-content: center;

    @media (max-width: 900px) {
        padding: 30px;
    }
    @media (max-width: 768px) {
        flex: none;
        height: auto;
        padding: 0 20px 20px 20px;
        text-align: center;
        justify-content: flex-start;
    }
    @media (max-width: 480px) {
        padding: 0 15px 15px 15px;
    }
`;

const Title = styled.h1`
    font-size: 70px;
    margin: 0 0 20px 0;
    line-height: 1.1;
    color: #333;
    font-weight: 700;

    @media (max-width: 900px) {
        font-size: 48px;
        margin: 0 0 15px 0;
    }
    @media (max-width: 768px) {
        font-size: 28px;
        margin: 0 0 10px 0;
        line-height: 1.2;
    }
    @media (max-width: 480px) {
        font-size: 24px;
        margin: 0 0 8px 0;
    }
`;

const Desc = styled.p`
    margin: 0 0 30px 0;
    font-size: 20px;
    font-weight: 500;
    letter-spacing: 2px;
    color: #666;
    line-height: 1.4;

    @media (max-width: 900px) {
        margin: 0 0 20px 0;
        font-size: 16px;
        letter-spacing: 1px;
    }
    @media (max-width: 768px) {
        margin: 0 0 15px 0;
        font-size: 14px;
        letter-spacing: 0.5px;
        line-height: 1.3;
    }
    @media (max-width: 480px) {
        font-size: 12px;
        margin: 0 0 12px 0;
    }
`;

const Button = styled.button`
    padding: 12px 28px;
    font-size: 18px;
    background-color: transparent;
    cursor: pointer;
    border-radius: 25px;
    border: 2px solid #ff6b9d;
    color: #ff6b9d;
    font-weight: 600;
    transition: all 0.3s ease;
    text-transform: uppercase;
    letter-spacing: 1px;
    align-self: flex-start;

    &:hover {
        background: #ff6b9d;
        color: #fff;
        transform: translateY(-2px);
        box-shadow: 0 4px 15px rgba(255, 107, 157, 0.3);
    }

    &:active {
        transform: translateY(0);
    }

    @media (max-width: 900px) {
        font-size: 16px;
        padding: 10px 24px;
    }
    @media (max-width: 768px) {
        font-size: 14px;
        padding: 8px 20px;
        border-radius: 20px;
        align-self: center;
    }
    @media (max-width: 480px) {
        font-size: 12px;
        padding: 8px 16px;
        border-radius: 18px;
    }
`;

const DotsContainer = styled.div`
    position: absolute;
    bottom: 15px;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    gap: 8px;
    z-index: 10;
    background: rgba(255, 255, 255, 0.8);
    padding: 8px 12px;
    border-radius: 20px;
    backdrop-filter: blur(8px);

    @media (max-width: 768px) {
        bottom: 10px;
        gap: 6px;
        padding: 6px 10px;
    }
    
    @media (max-width: 480px) {
        bottom: 8px;
        gap: 5px;
        padding: 5px 8px;
    }
`;

const Dot = styled.div`
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background-color: ${(props) => props.active ? '#ff6b9d' : 'rgba(255, 255, 255, 0.5)'};
    cursor: pointer;
    transition: all 0.3s ease;
    border: 2px solid ${(props) => props.active ? '#ff6b9d' : 'rgba(255, 255, 255, 0.8)'};

    &:hover {
        background-color: ${(props) => props.active ? '#ff6b9d' : 'rgba(255, 255, 255, 0.8)'};
        transform: scale(1.2);
    }

    @media (max-width: 768px) {
        width: 10px;
        height: 10px;
    }
    
    @media (max-width: 480px) {
        width: 8px;
        height: 8px;
    }
`;

const TouchArea = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 5;
    touch-action: pan-x;
`;

const Slider = () => {
    const [sliderItems, setSliderItems] = useState([]);
    const [slideIndex, setSlideIndex] = useState(0);
    const [isTransitioning, setIsTransitioning] = useState(true);
    const [touchStart, setTouchStart] = useState(0);
    const [touchEnd, setTouchEnd] = useState(0);
    const autoSlideRef = useRef(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchSliderItems = async () => {
            try {
                const res = await publicRequest.get("/slider")
                setSliderItems(res.data);
            } catch (err) {
                console.error("Error fetching slider Items:", err);
            }
        }
        fetchSliderItems();
    }, [])

    // Auto-slide functionality
    useEffect(() => {
        if (sliderItems.length > 1) {
            autoSlideRef.current = setInterval(() => {
                setSlideIndex(prev => prev < sliderItems.length - 1 ? prev + 1 : 0);
            }, 5000);
        }

        return () => {
            if (autoSlideRef.current) {
                clearInterval(autoSlideRef.current);
            }
        };
    }, [sliderItems.length]);

    const handleClickShow = () => {
        navigate("/products/:category");
    }

    const handleClick = (direction) => {
        if (autoSlideRef.current) {
            clearInterval(autoSlideRef.current);
        }

        setIsTransitioning(true);
        if (direction === "left") {
            setSlideIndex(slideIndex > 0 ? slideIndex - 1 : sliderItems.length - 1);
        } else {
            setSlideIndex(slideIndex < sliderItems.length - 1 ? slideIndex + 1 : 0);
        }

        // Restart auto-slide after manual navigation
        setTimeout(() => {
            if (sliderItems.length > 1) {
                autoSlideRef.current = setInterval(() => {
                    setSlideIndex(prev => prev < sliderItems.length - 1 ? prev + 1 : 0);
                }, 5000);
            }
        }, 5000);
    };

    const goToSlide = (index) => {
        if (autoSlideRef.current) {
            clearInterval(autoSlideRef.current);
        }
        setIsTransitioning(true);
        setSlideIndex(index);
    };

    // Touch handling for mobile swipe
    const handleTouchStart = (e) => {
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

        if (isLeftSwipe) {
            handleClick("right");
        } else if (isRightSwipe) {
            handleClick("left");
        }

        setTouchStart(0);
        setTouchEnd(0);
    };

    if (sliderItems.length === 0) {
        return <Container>Loading...</Container>;
    }

    return (
        <Container>
            <TouchArea
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
            />
            <Arrow direction="left" onClick={() => handleClick("left")}>
                <ArrowIcon>
                    <ArrowBackIos />
                </ArrowIcon>
            </Arrow>
            <Wrapper slideIndex={slideIndex} isTransitioning={isTransitioning}>
                {sliderItems.map((item, idx) => (
                    <Slide key={item._id || idx} bg={item.bg || "fff"}>
                        <ImgContainer>
                            <Image src={item.image} alt={item.title} loading={idx === 0 ? "eager" : "lazy"} />
                        </ImgContainer>
                        <InfoContainer>
                            <Title>{item.title}</Title>
                            <Desc>{item.subtitle}</Desc>
                            <Button onClick={handleClickShow}>SHOP NOW</Button>
                        </InfoContainer>
                    </Slide>
                ))}
            </Wrapper>
            <Arrow direction="right" onClick={() => handleClick("right")}>
                <ArrowIcon>
                    <ArrowForwardIos />
                </ArrowIcon>
            </Arrow>
            <DotsContainer>
                {sliderItems.map((_, idx) => (
                    <Dot
                        key={idx}
                        active={idx === slideIndex}
                        onClick={() => goToSlide(idx)}
                    />
                ))}
            </DotsContainer>
        </Container>
    );
};

export default Slider;