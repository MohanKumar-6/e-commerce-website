import { Add, Remove } from "@material-ui/icons"
import styled from "styled-components"
import Announcement from "../components/Announcement"
import Footer from "../components/Footer"
import Navbar from "../components/Navbar"
import Newsletter from "../components/Newsletter"
import { useLocation } from "react-router-dom"
import { useState, useEffect } from "react"
import { publicRequest } from "../requestMethods"
import { addProduct } from "../redux/cartRedux"
import { useDispatch } from "react-redux"


const Container = styled.div`

`
const Wrapper = styled.div`
    padding:50px;
    display: flex;

`
const ImgContainer = styled.div`
    flex: 1;
    border-radius: 10px;
    box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
`;

const Image = styled.img`
    width: 100%;
    height: 90vh;
    object-fit: cover;

`
const InfoContainer = styled.div`
    flex:1;
    padding: 0px 50px;
`
const Title = styled.h1`
    font-weight: 700;
`
const Desc = styled.p`
    margin: 20px 0px;
`
const Price = styled.span`
    font-weight: 100;
    font-size: 40px;
`
const ProductDescription = styled.div`
    margin-top: 40px;
    font-weight: 300;
`

const FilterContainer = styled.div`
    width:50%;
    margin: 30px 0px;
    display: flex;
    justify-content: space-between;
`
const Filter = styled.div`
    display: flex;
    align-items: center;
`
const FilterTitle = styled.span`
    font-size: 20px;
    font-weight: 200;
`
const FilterColor = styled.div`
    width: 20px;
    height: 20px;
    border-style: solid;
    border-color: grey;
    border-width: 1px;
    border-radius: 50%;
    background-color: ${(props) => props.color};
    margin: 0px 5px;
    cursor: pointer;
`
const FilterSize = styled.select`
    margin-left: 10px;
    padding: 5px;
`

const FilterSizeOption = styled.option`

`
const AddContainer = styled.div`
    width: 50%;
    display: flex;
    align-items: center;
    justify-content: space-between;
`
const AmountContainer = styled.div`
    display: flex;
    align-items: center;
    font-weight:700;
`
const Amount = styled.span`
    width: 30px;
    height: 30px;
    border-radius: 10px;
    border: 1px solid teal;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0px 5px;
`
const Button = styled.button`
    padding: 15px;
    border: 2px solid teal;
    background-color: white;
    cursor: pointer;
    font-weight: 500;

    &:hover{
        background-color: #f8f4f4;
    }
`



const Product = () => {
    const location = useLocation()
    const id = location.pathname.split("/")[2];
    const [product, setProduct] = useState({})
    const [quantity, setQuantity] = useState(1)
    const [color, setColor] = useState("")
    const [size, setSize] = useState("")
    const dispatch = useDispatch()

    const handleQuantity = (event) => {
        if (event === "dec"){
            quantity > 1 && setQuantity( quantity - 1)
        }else{
            setQuantity(quantity + 1)
        }

    }

    useEffect(() => {
        const getProduct = async () => {
            try{
                const res = await publicRequest.get("/products/find/"+id)
                setProduct(res.data)

            }catch{}
        }
        getProduct()
        window.scrollTo(0, 0);
    }, [id])

    const handleClick = () => {
        dispatch(addProduct({...product, quantity, color, size }))
    }




    return (
        <Container>
            <Navbar />
            <Announcement />
            <Wrapper>
                <ImgContainer>
                    <Image src={product.img}/>
                </ImgContainer>
                <InfoContainer >
                    <Title>{product.title}</Title>
                    <Desc>
                        {product.desc}
                    </Desc>
                    <Price>{`₹${product.price}`}</Price>
                    <FilterContainer>
                        <Filter>
                            <FilterTitle>Color</FilterTitle>
                            {product.color && product.color.length > 0 ? (
                                product.color.map((c) => (
                                    <FilterColor color={c} key={c} onClick={() => setColor(c)}/>
                                ))
                            ) : (
                                <span>No colors available</span>
                            )}
                        </Filter>
                        <Filter>
                            <FilterTitle>Size</FilterTitle>
                            <FilterSize onChange={(e) => setSize(e.target.value)}>
                                {product.size && product.size.length > 0 ? (
                                    product.size.map((s) => <FilterSizeOption>{s}</FilterSizeOption>)
                                ) : <span>No sizes available</span>}
                            </FilterSize>
                        </Filter>
                    </FilterContainer>
                    <AddContainer>
                        <AmountContainer>
                            <Remove onClick={() => handleQuantity("dec")}/>
                            <Amount>{quantity}</Amount>
                            <Add onClick={() => handleQuantity("inc")}/>
                        </AmountContainer>
                        <Button onClick ={handleClick}>ADD TO CART</Button>
                    </AddContainer>
                    <ProductDescription>
                        <h3>Details</h3>
                        <span><p>Fit: {product.details?.fit}</p></span> 
                        <span><p>Material&Care: {product.details?.materialAndCare}</p></span> 
                        <span><p>Sleeve Length: {product.details?.sleeveLength}</p></span> 
                        <span><p>Collar: {product.details?.collar}</p></span> 
                        <span><p>Pattern: {product.details?.pattern}</p></span> 
                        <span><p>Occasion: {product.details?.occasion}</p></span> 
                    </ProductDescription>
                </InfoContainer>
            </Wrapper>
            <Newsletter />
            <Footer />
        </Container>
    );
};

export default Product;