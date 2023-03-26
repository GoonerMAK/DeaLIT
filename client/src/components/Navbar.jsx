import { Badge } from "@material-ui/core";
import { Search, ShoppingCartOutlined  } from "@material-ui/icons";
import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { useAuthContext } from '../hooks/useAuthContext'
import { useLogout } from '../hooks/useLogout'



const Container = styled.div`
    height: 65px;
`

const Wrapper = styled.div`
  padding: 10px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`

const Left = styled.div`
    flex: 1;
    display: flex;
    align-items: center;
`

const Language = styled.span`
  font-size: 14px;
  cursor: pointer;
`;

const SearchContainer = styled.div`
  border: 0.5px solid lightgray;
  display: flex;
  align-items: center;
  margin-left: 25px;
  padding: 5px;
`;

const Input = styled.input`
  border: none;
  padding: 5px;
  font-size: 15px;
`;

const Logo = styled.div`
  font-weight: bold;
  position: relative;
`;


const Center = styled.div`
    flex: 1;
    text-align: center;
`
const MenuItem = styled.div`
  font-size: 14px;
  cursor: pointer;
  margin-left: 25px;
`;

const Right = styled.div`
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    padding-right: 50px;
`


const Navbar = () => {
  const { logout } = useLogout()
  const { user } = useAuthContext()

  const handleClick = () => {
    logout()
  }

    return (
        <Container>
            <Wrapper>
                <Left>
                    <Language>EN</Language>   
                    <SearchContainer>
                        <Input placeholder="Search"/>
                        <Search style={{color: "gray", fontSize: 20}}/>
                    </SearchContainer>                 
                </Left>

                <Center>
                    <Logo>
                        <img src="https://i.ibb.co/7XVRBS4/logo-spl.png" alt="logo" />
                    </Logo>
                </Center>

                <Right>
                <MenuItem>

                {user && (
                  <div>
                  <span>{user.email}</span>
                  <button onClick={handleClick}>Log out</button>
                  </div>
                )}
                {!user && (
                <MenuItem>
                <Link to="/login">Login</Link>
                <Link to="/signup">Signup</Link>
                </MenuItem>
                )}
                  {/* <Link to="/signup">Register</Link>
                  <Link to="/login"> LogIN </Link> */}
                    {/* <MenuItem>REGISTER</MenuItem>
                    <MenuItem>SIGN IN</MenuItem> */}
                    </MenuItem>
                    <MenuItem>
                        <Badge badgeContent={0} color="primary">

                        <Link to="./Cart">
                        <ShoppingCartOutlined />
                        </Link>
                        
                        </Badge>
                    </MenuItem>
                </Right>
            </Wrapper>
        </Container>
      
    );
  };
  
  export default Navbar;




// npm audit fix --force