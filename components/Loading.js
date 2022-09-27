import React, { useEffect, useState } from "react";
import styled from "styled-components/native";
import { ActivityIndicator, Dimensions, Text } from "react-native";


let screenHeight = Dimensions.get("window").height;

const Container = styled.View`
  width: 100%;
  height: 100%;
  background: rgba(255, 255, 255, 0.9);
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 999;
`;

const Loading = props => {
  const [opacityLoading, setOpacityLoading] = useState(0);
  const [topLoading, setTopLoading] = useState(screenHeight);

    useEffect(() => {
      if( props.isActive ) {
        setOpacityLoading(1);
        setTopLoading(0);
      } else {
        setOpacityLoading(0);
        setTopLoading(screenHeight);
      }
      
    });
    return (
      <Container style={{ opacity: opacityLoading, top: topLoading}}>
        <ActivityIndicator size="large" color="#A138F2" />
      </Container>
    )
}


export default Loading;

