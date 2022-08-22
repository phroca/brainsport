import React from "react";
import styled from 'styled-components/native';

const Container = styled.ImageBackground`
  flex:1;
  width: 100%;
  height: 100%;
`;


const ProgresScreen = () => {
    return (
        <Container source={require("../assets/brainsport-bg.png")}>
            
        </Container>);
}

export default ProgresScreen;