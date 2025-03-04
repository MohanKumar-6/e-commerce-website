import styled from "styled-components"

const Container = styled.div`
height: 30px;
background-color: #dadbf5;
color: #6169ff;
display: flex;
align-items: center;
justify-content: center;
font-size: 14px;
font-weight: bold;
`

const Announcement = () => {

    return(
        <Container>
            Super Deal! Free Shipping on Orders Over ₹999
        </Container>
    )
}

export default Announcement;