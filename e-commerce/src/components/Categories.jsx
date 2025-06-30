import styled from  "styled-components";
import { categories } from "../data";
import CategoryItem from "./CategoryItem";

const Container = styled.div`
    display: flex;
    padding: 20px;
    justify-content: space-between;
    gap: 20px;
    flex-wrap: wrap;

    @media (max-width: 900px) {
        gap: 12px;
        padding: 12px;
    }
    @media (max-width: 600px) {
        flex-direction: column;
        gap: 10px;
        padding: 6px 2vw;
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