
import React, { useEffect, useRef, useState } from "react";
import styled from 'styled-components/native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Dimensions, TouchableOpacity } from "react-native";

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;
const widthContent = screenWidth  - 50;

const Container = styled.View`
    background: #000000;
    height: 100%;
    //justify-content: center;
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
    font-size: 14px;
`;
const PlayButtons = styled.View`
    position: relative;
    width: ${widthContent}px;
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

const NotificationFamillyModal = ({navigation}) => {

    const handleStartGame = () => {
        navigation.navigate("Accueil");
    }

    return (
        <Container>
            <Header>
                <CloseButton>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <MaterialCommunityIcons name="close-circle-outline" size={24} color="#FFFFFF7b" />
                    </TouchableOpacity>
                </CloseButton>
            </Header>
            <ContentSection>
                <MaterialCommunityIcons name="progress-check" size={50} color="#FFFFFF" />
                <Title>Bonne Progression !</Title>
                <Content>
                    Vous avez suffisament créé de cartes pour commencer à jouer et à tester votre mémoire !
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