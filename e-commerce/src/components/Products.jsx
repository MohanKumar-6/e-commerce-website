import styled from "styled-components"
import { publicRequest } from "../requestMethods";
import Product from "./Product"
import axios from "axios"
import { useEffect, useState } from "react";

const Container = styled.div`
    Padding:20px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
`;

const Products = ({ cat, filters, sort }) => {
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([])

    useEffect(() => {
        const getProducts = async () => {
            try {
                const res = await publicRequest.get(cat ? `/products?category=${cat}`
                    : "/products"
                );
                console.log(res.data)
                setProducts(res.data)
            } catch (err) {
                console.log(err)
            }
        }
        getProducts()
    }, [cat])

    useEffect(() => {
        cat && setFilteredProducts(
            products.filter((item) => Object.entries(filters).every(([key, value]) =>
                item[key].includes(value)))
        )
    }, [cat, filters, products]) 

    return (
        <Container>
            { cat ? filteredProducts.map((item) => 
                <Product item={item} key={item.id} />)
                : products.slice(0,8).map((item) =>  
                <Product item={item} key={item.id} />)
            }
        </Container>
    )
}

export default Products;
