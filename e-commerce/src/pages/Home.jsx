import Announcement from "../components/Announcement";
import Navbar from "../components/Navbar";
import Slider from "../components/Slider";
import Categories from "../components/Categories";
import Products from "../components/Products";
import Newsletter from "../components/Newsletter"
import Footer from "../components/Footer"
import styled from "styled-components";


const Container = styled.div`
    width: 100vw;
    min-height: 100vh;
    overflow-x: hidden;
`

const Home = () => {
    return <>
    <Container>
        <Announcement />
        <Navbar />
        <Slider />
        <Categories />
        <Products />
        <Newsletter />
        <Footer />
    </Container>
    </>
}

export default Home;