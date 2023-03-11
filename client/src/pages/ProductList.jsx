import styled from "styled-components"
import Announcement from "../components/Announcement";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Newsletter from "../components/Newsletter";
import Products from "../components/Products";

const Container = styled.div`
`;

const Title = styled.h1`
  margin: 20px;
`;

const FilterContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Filter = styled.div`
  margin: 20px;
`;

const FilterText = styled.span`
  font-size: 20px;
  font-weight: 600;
  margin-right: 20px;
`;

const Select = styled.select`
  padding: 10px;
  margin-right: 20px;
`;

const Option = styled.option``;


const ProductList = () => {
  return (
    <Container>
        <Announcement/>
        <Navbar/>

        <Title>Products</Title>
      <FilterContainer>
        <Filter>
          <FilterText>Filter :</FilterText>
          <Select>
            <Option disabled selected>
              Categories
            </Option>
            <Option>Electronics</Option>
            <Option>Clothes</Option>
            <Option>Sports</Option>
            <Option>Grooming</Option>
            <Option>Beauty</Option>
            <Option>Home & Living</Option>
            <Option>Education</Option>
            <Option>Others</Option>
          </Select>
          <Select>
            <Option disabled selected>
              Location
            </Option>
            <Option>Dhaka</Option>
            <Option>Rajshahi</Option>
            <Option>Chattogram</Option>
            <Option>Khulna</Option>
            <Option>Barishal</Option>
            <Option>Sylhet</Option>
            <Option>Mymensingh</Option>
            <Option>Rangpur</Option>
          </Select>
        </Filter>
        <Filter>
          <FilterText>Sort Products:</FilterText>
          <Select>
            <Option selected>Newest</Option>
            <Option>Oldest</Option>
            <Option>Price (asc)</Option>
            <Option>Price (desc)</Option>
          </Select>
        </Filter>
      </FilterContainer>
        
        <Products/>
        <Newsletter/>
        <Footer/>
    </Container>
  )
}

export default ProductList