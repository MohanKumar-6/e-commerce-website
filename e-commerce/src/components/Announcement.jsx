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
  letter-spacing: 1px;
  width: 100%;
  text-align: center;
  overflow-x: hidden;

  @media (max-width: 600px) {
    font-size: 12px;
    height: 24px;
    padding: 0 6px;
  }
`;

const Announcement = () => {
  return (
    <Container>
      Super Deal! Free Shipping on Orders Over ₹999
    </Container>
  );
};

export default Announcement;