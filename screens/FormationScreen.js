import { StatusBar } from "expo-status-bar";
import React from "react";
import { Dimensions, SafeAreaView, ScrollView, TouchableOpacity } from "react-native";
import styled from 'styled-components/native';
import FormationCard from "../components/FormationCard";
import FormatorCard from "../components/FormatorCard";

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;
const widthContent = screenWidth  - 50;

const Container = styled.ImageBackground`
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
`;

const TitleBar = styled.View`
  width: 100%;
  margin-top: 30px;
  margin-bottom: 30px;
`;

const Title = styled.Text`
  color: #FFFFFF;
  font-size: 40px;
  font-weight: bold;
  text-align: center;
`;
const FormationsSection = styled.View`
margin-top: 30px;
margin-bottom: 30px;
`

const OtherSection = styled.View`
  margin-top: 30px;
  margin-bottom: 30px;
`
const Separator = styled.View`
  background-color: #bdbdbd;
  height: 1px;
  opacity: 0.5;

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
                <FormationsSection>
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
                </FormationsSection>
                <OtherSection>
                  <Subtitle>Le mentorat</Subtitle>
                  <ButtonView>
                    <ButtonText>
                      En savoir plus
                    </ButtonText>
                  </ButtonView>
                </OtherSection>
                <OtherSection>
                  <Subtitle>Le chapelet des succès</Subtitle>
                  <ButtonView>
                    <ButtonText>
                      En savoir plus
                    </ButtonText>
                  </ButtonView>
                </OtherSection>
                <OtherSection>
                  <Subtitle>Les formations des formateurs</Subtitle>
                    <FormatorCard topic="Julien Test" title="Formation Laurem ipsum" notation="4.2" sourceImg={require("../assets/formation/formator.jpg")}/>
                </OtherSection>
              </ScrollView>
            </SafeAreaView>
        </Container>);
}

export default FormationScreen;