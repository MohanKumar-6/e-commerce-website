import styled from "styled-components";
import { categories } from "../data";
import CategoryItem from "./CategoryItem";

const Container = styled.div`
    display: flex;
    padding: 20px;
    justify-content: space-between;
    gap: 20px;
    flex-wrap: wrap;

    /* Tablet */
    @media (max-width: 900px) {
        gap: 15px;
        padding: 15px;
        justify-content: center;
    }

    /* Mobile */
    @media (max-width: 600px) {
        gap: 20px;
        padding: 20px 15px;
        justify-content: center;
        align-items: center;
    }

    /* Small mobile - only stack on very small screens */
    @media (max-width: 400px) {
        flex-direction: column;
        gap: 15px;
        padding: 20px 10px;
        align-items: stretch;
    }
`;

const Categories = () => {
    return(
        <Container>
            {categories.map((item) => (
                <CategoryItem item={item} key={item.id} />
            ))}
        </Container>
    )
}

export default Categories;