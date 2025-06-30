import styled from "styled-components"
import Navbar from "../components/Navbar"
import Announcement from "../components/Announcement"
import Product from "../components/Product"
import Newsletter from "../components/Newsletter"
import Footer from "../components/Footer"
import { useLocation } from "react-router-dom"
import { useState} from "react"
import { useSelector } from "react-redux"

const Container = styled.div`
  width: 100vw;
  min-height: 100vh;
  background: linear-gradient(
      rgba(255,255,255,0.2),
      rgba(255,255,255,0.3)
    ),
    url("/images/productlistbg.jpeg") center;
  background-size: cover;
`;

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 30px;
  max-width: 1200px;
  margin: 20px auto;
  padding: 40px 20px;

  @media (max-width: 900px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 18px;
    padding: 24px 8px;
  }
  @media (max-width: 600px) {
    grid-template-columns: 1fr;
    gap: 10px;
    padding: 10px 2vw;
  }
`;

const Title= styled.h1`
  margin: 20px;
  font-size: 2rem;
  text-align: center;
  color: #b3005e;

  @media (max-width: 600px) {
    font-size: 1.2rem;
    margin: 10px 0;
  }
`;

const FilterContainer = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 10px;
  padding: 0 20px;

  @media (max-width: 600px) {
    flex-direction: column;
    gap: 6px;
    padding: 0 4vw;
  }
`;

const Filter = styled.div`
  margin: 20px 0;
  display: flex;
  align-items: center;
  flex-wrap: wrap;

  @media (max-width: 600px) {
    margin: 8px 0;
    flex-direction: column;
    align-items: flex-start;
    gap: 4px;
  }
`;

const FilterText = styled.span`
  font-size: 20px;
  font-weight: 600;
  margin-right: 20px;

  @media (max-width: 600px) {
    font-size: 15px;
    margin-right: 8px;
  }
`;

const Select = styled.select`
  padding: 10px;
  margin-right: 20px;
  border-radius: 8px;
  border: 1px solid #ffc0cb;
  background: #fff0fa;

  @media (max-width: 600px) {
    padding: 7px;
    margin-right: 8px;
    font-size: 13px;
    border-radius: 6px;
  }
`;

const Option = styled.option``;

const ProductList = () => {
    const location = useLocation()
    const cat = location.pathname.split("/")[2]
    const [filters, setFilters] = useState({})
    const [sort, setSort] = useState({})
    const products = useSelector((state) => state.product.products);

    const handleFilters = (e) => {
        setFilters({
             ...filters,
             [e.target.name]: e.target.value
        })
    }

    return(
        <Container>
            <Navbar />
            <Announcement /> 
            <Title>All Products</Title>
            <FilterContainer>
                <Filter>
                    <FilterText>Filter Products:</FilterText>
                    <Select name="color" onChange={handleFilters}>
                        <Option disabled >
                            Color
                        </Option>
                        <Option>White</Option>
                        <Option>Black</Option>
                        <Option>Red</Option>
                        <Option>Blue</Option>
                        <Option>Yellow</Option>
                        <Option>Green</Option>
                    </Select>
                    <Select name="size" onChange={handleFilters}>
                        <Option disabled >
                            Size
                        </Option>
                        <Option>XS</Option>
                        <Option>S</Option>
                        <Option>M</Option>
                        <Option>L</Option>
                        <Option>XL</Option>
                    </Select>
                </Filter>
                <Filter>
                    <FilterText>Sort Products:</FilterText>
                    <Select onChange={(e) => setSort(e.target.value)}>
                        <Option value="newest">Newest</Option>
                        <Option value="asc" >Price (asc)</Option>
                        <Option value="desc" >Price (desc)</Option>
                    </Select>
                </Filter>
            </FilterContainer>
            <Wrapper>
                {products.map((item) => (
                <Product item={item} key={item._id || item.id} />
                ))}
            </Wrapper>
            <Newsletter />
            <Footer />
        </Container>
    )
}

export default ProductList;