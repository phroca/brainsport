import React from "react";
import { SafeAreaView, ScrollView, StatusBar } from "react-native";
import styled from 'styled-components/native';

const Container = styled.ImageBackground`
  flex:1;
  width: 100%;
  height: 100%;
`;

const TitleBar = styled.View`
  width: 100%;
  margin-top: 100px;
  margin-bottom: 30px;
`;

const Title = styled.Text`
  color: #FFFFFF;
  font-size: 40px;
  font-weight: bold;
  text-align: center;
`;

const Subtitle = styled.Text`
color: #FFFFFF;
  font-size: 14px;
  margin-left: 40px;
  margin-top: 10px;
  margin-right: 40px;
`;
const ProgresScreen = () => {
  return (
    <Container source={require("../assets/brainsport-bg.png")}>
      <StatusBar style="light" backgroundColor='#000000' />
      <SafeAreaView>
        <ScrollView style={{ height: "100%" }} showsVerticalScrollIndicator={false}>
          <TitleBar>
            <Title>Progression</Title>
          </TitleBar>
          <Subtitle >
            Coming soon
          </Subtitle>
        </ScrollView>
      </SafeAreaView>
    </Container>);
}

export default ProgresScreen;