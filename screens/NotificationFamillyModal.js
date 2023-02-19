
import React, { useEffect, useRef, useState } from "react";
import styled from 'styled-components/native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Dimensions, TouchableOpacity } from "react-native";
import Glitter from "../components/Glitter";

const screenDimension = Dimensions.get('window');
const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;
const widthContent = screenWidth  - 50;

const Container = styled.ImageBackground`
    height: 100%;
    width: 100%;
    justify-content: center;
    align-items: center;
`;

const Header = styled.View`
    justify-content: flex-end;
    width: ${widthContent}px;
    align-items: center;
    margin-top: 50px;
    margin-bottom: 30px;
    flex-direction: row;
`;
const CloseButton = styled.View`
  width: 50px;
`;

const ContentSection = styled.View`
    position: relative;
    width: ${widthContent}px;
    justify-content: center;
    align-items: center;
`;

const Title = styled.Text`
color: #FFFFFF;
font-size: 40px;
font-weight: bold;
text-align: center;
margin-bottom: 50px;
`;

const Content = styled.Text`
    color: #FFFFFF;
    font-size: 16px;
`;
const PlayButtons = styled.View`
    position: relative;
    width: ${widthContent}px;
    margin-top: 50px;
`;
const ButtonView = styled.View`
  background: #FFFFFF;
  height: 50px;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  margin-top: 20px;
`;

const ButtonText = styled.Text`
  color: #000000;
  font-size: 14px;
  font-weight: bold;
`;

const GlitterContainer = styled.View`
    position: absolute;
    width: ${screenWidth}px;
    height: ${screenHeight}px;
`;
const NotificationFamillyModal = ({navigation}) => {

    const handleStartGame = () => {
        navigation.navigate("Accueil Preliminaire");
    }

    return (
        <Container source={require("../assets/brainsport-bg-victory.png")}>
            <GlitterContainer>
            {new Array (50).fill(true).map((_, i) => (
                <Glitter key={i} scene={screenDimension}/>

            ))}
            </GlitterContainer>
            <ContentSection>
                <MaterialCommunityIcons name="party-popper" size={50} color="#FFFFFF" />
                <Title>Bravo !</Title>
                <Content>
                    Vous avez suffisament créé de cartes pour commencer à jouer et à créer des histoires !
                </Content>
            </ContentSection>
            <PlayButtons>
                <TouchableOpacity onPress={()=> handleStartGame()}>
                        <ButtonView>
                            <ButtonText>Commencer à jouer !</ButtonText>
                        </ButtonView>
                </TouchableOpacity>
            </PlayButtons>
        </Container>
    )
}

export default NotificationFamillyModal;