import styled from "styled-components";
import { useSelector } from "react-redux";
import { FaUserCircle } from "react-icons/fa";

const Container = styled.div`
  min-height: 100vh;
  width: 100vw;
  background: linear-gradient(
      rgba(255, 240, 250, 0.5),
      rgba(255, 255, 255, 0.4)
    ),
    url("/images/profilebg.jpg") center;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: 'Poppins', sans-serif;
`;

const ProfileCard = styled.div`
  width: 100%;
  max-width: 420px;
  background: rgba(255, 255, 255, 0.35);
  backdrop-filter: blur(16px) saturate(180%);
  -webkit-backdrop-filter: blur(16px) saturate(180%);
  border-radius: 24px;
  box-shadow: 0 8px 32px rgba(0,0,0,0.13);
  padding: 40px 32px;
  display: flex;
  flex-direction: column;
  align-items: center;

  @media (max-width: 600px) {
    padding: 18px 6vw;
    border-radius: 14px;
  }
`;

const Avatar = styled.div`
  width: 90px;
  height: 90px;
  border-radius: 50%;
  background: linear-gradient(135deg, #ffc0cb 60%, #ff7fa3 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 18px;
  font-size: 64px;
  color: #fff;
  box-shadow: 0 4px 18px rgba(255, 192, 203, 0.18);

  @media (max-width: 600px) {
    width: 64px;
    height: 64px;
    font-size: 40px;
    margin-bottom: 12px;
  }
`;

const Title = styled.h2`
  margin-bottom: 18px;
  font-weight: 700;
  text-align: center;
  color: #ff7fa3;
  font-size: 2rem;

  @media (max-width: 600px) {
    font-size: 1.2rem;
    margin-bottom: 10px;
  }
`;

const InfoList = styled.ul`
  list-style: none;
  padding: 0;
  width: 100%;
  margin: 0;
`;

const InfoItem = styled.li`
  margin: 16px 0;
  font-size: 1.1rem;
  color: #b3005e;
  display: flex;
  flex-direction: column;

  span {
    color: #333;
    font-weight: 500;
    font-size: 1.05rem;
    margin-top: 2px;
    word-break: break-all;
  }

  @media (max-width: 600px) {
    font-size: 0.98rem;
    margin: 10px 0;
    span {
      font-size: 0.95rem;
    }
  }
`;

const EditButton = styled.button`
  margin-top: 28px;
  padding: 10px 28px;
  border: none;
  border-radius: 20px;
  background: linear-gradient(135deg, #f9a8d4, #f472b6);
  color: white;
  font-weight: 600;
  font-size: 1rem;
  cursor: pointer;
  transition: background 0.3s;

  &:hover {
    background: linear-gradient(135deg, #f472b6, #ec4899);
  }

  @media (max-width: 600px) {
    width: 100%;
    font-size: 0.95rem;
    padding: 9px 0;
    margin-top: 18px;
  }
`;

const UserProfile = () => {
  // Get user data from Redux
  const user = useSelector((state) => state.user.currentUser);

  // Fallbacks if user is not logged in
  if (!user) {
    return (
      <Container>
        <ProfileCard>
          <Avatar>
            <FaUserCircle />
          </Avatar>
          <Title>User Profile</Title>
          <InfoList>
            <InfoItem>
              <strong>Name</strong>
              <span>Guest</span>
            </InfoItem>
            <InfoItem>
              <strong>Email</strong>
              <span>Not logged in</span>
            </InfoItem>
          </InfoList>
        </ProfileCard>
      </Container>
    );
  }

  return (
    <Container>
      <ProfileCard>
        <Avatar>
          <FaUserCircle />
        </Avatar>
        <Title>{user.username ? user.username : "User Profile"}</Title>
        <InfoList>
          <InfoItem>
            <strong>Name</strong>
            <span>
              {user.firstName || ""} {user.lastName || ""}
            </span>
          </InfoItem>
          <InfoItem>
            <strong>Email</strong>
            <span>{user.email}</span>
          </InfoItem>
          {user.address && (
            <InfoItem>
              <strong>Address</strong>
              <span>{user.address}</span>
            </InfoItem>
          )}
        </InfoList>
        <EditButton>Edit Profile</EditButton>
      </ProfileCard>
    </Container>
  );
};

export default UserProfile;