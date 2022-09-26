import { StatusBar } from "expo-status-bar";
import React from "react";
import { Dimensions, SafeAreaView, ScrollView, TouchableOpacity } from "react-native";
import styled from 'styled-components/native';
import FormationCard from "../components/FormationCard";

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;
const widthContent = screenWidth  - 50;

const Container = styled.ImageBackground`
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

const OtherContainer = styled.View`
  margin-left: 25px;
`
const Subtitle = styled.Text`
  color: #FFFFFF;
  font-size: 20px;
  font-weight: bold;
`
const ButtonView = styled.View`
  background: #8d6791;
  width: ${widthContent}px;
  height: 50px;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  margin-top: 20px;
  margin-bottom: 40px;
`;


const ButtonText = styled.Text`
  color: white;
  font-size: 14px;
`;

const FormationScreen = () => {
    return (
        <Container source={require("../assets/brainsport-bg.png")}>
            <StatusBar style="auto" />
            <SafeAreaView>
              <ScrollView style={{height: "100%"}} showsVerticalScrollIndicator={false}>
                <TitleBar>
                  <Title>Formations</Title>
                  
                </TitleBar>
                <TouchableOpacity >
                    <FormationCard isFree={true} titleCard="Gérer mieux son temps" sourceImg={require("../assets/formation/gestion-temps.jpg")}/>
                </TouchableOpacity>
                <TouchableOpacity >
                    <FormationCard isFree={true} titleCard="Mieux dormir" sourceImg={require("../assets/formation/mieux-dormir.jpg")}/>
                </TouchableOpacity>
                <TouchableOpacity >
                    <FormationCard isFree={true} titleCard="Se nourrir sans grossir" sourceImg={require("../assets/formation/nien-manger.jpg")}/>
                </TouchableOpacity>
                <TouchableOpacity >
                    <FormationCard isFree={true} titleCard="Bouger sans se faire mal" sourceImg={require("../assets/formation/bouger.jpg")}/>
                </TouchableOpacity>
                <TouchableOpacity >
                    <FormationCard isFree={true} titleCard="Gérer son stress" sourceImg={require("../assets/formation/stress.jpg")}/>
                </TouchableOpacity>
                <TouchableOpacity >
                    <FormationCard isFree={false} titleCard="Les 4 AS" sourceImg={require("../assets/formation/les-4-as.jpg")}/>
                </TouchableOpacity>
                <OtherContainer>
                <Subtitle>Les formations des formateurs</Subtitle>

                <Subtitle>Le mentorat</Subtitle>
                <ButtonView>
                  <ButtonText>
                    En savoir plus
                  </ButtonText>
                </ButtonView>
                <Subtitle>Le chapelet des succès</Subtitle>
                <ButtonView>
                  <ButtonText>
                    En savoir plus
                  </ButtonText>
                </ButtonView>
                </OtherContainer>
              </ScrollView>
            </SafeAreaView>
        </Container>);
}

export default FormationScreen;