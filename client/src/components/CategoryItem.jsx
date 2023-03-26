
import { Link } from "react-router-dom";
import styled from "styled-components"
import { categories } from "../data"


const Container = styled.div`
  flex: 1;
  margin: 3px;
  height: 70vh;
  position: relative;
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const Info = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Title = styled.h1`
    color:white;
    margin-bottom: 20px;
`;

const Button = styled.button`
    border:none;
    padding: 10px;
    background-color: white;
    color:gray;
    cursor: pointer;
    font-weight: 600;
    width: 150%;
    justify-content: center;
`;

const Circle = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: black;
  opacity: 20%;
`;

const CategoryItem = ({item}) => {
  return (
    <Container>
      
      <Image src={item.img} />
      <Info>
          <Title>{item.title} </Title>
          <Link to={`/products/${item.cat}`}>
          
          <Button>GO</Button>
          
          
          </Link>
      </Info>
      
    </Container>
  )
}

export default CategoryItem