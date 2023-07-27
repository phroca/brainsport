import React, { useRef, useState, useEffect } from "react";
import { SafeAreaView, ScrollView, StatusBar, Dimensions, Animated } from "react-native";
import styled from 'styled-components/native';
import { MaterialCommunityIcons, Ionicons } from '@expo/vector-icons'; 
import { useChallengeDate, useEventDate } from "../../hooks/useDate";
import { TouchableOpacity } from "react-native";

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;
const widthContent = screenWidth  - 50;

const Container = styled.ImageBackground`
  flex:1;
  width: 100%;
  height: 100%;

`;

const Cover = styled.View`
  height: 375px;
`;

const Image = styled.Image`
  width: 100%;
  height: 100%;
`;

const Title = styled.Text`
  font-size: 24px;
  color: white;
  font-weight: bold;
  width: ${widthContent}px;
  position: absolute;
  bottom: 100px;
  left: 20px;
`;

const Caption = styled.Text`
  color: white;
  font-size: 17px;
  position: absolute;
  bottom: 20px;
  left: 20px;
  width: 300px;
`;

const CloseView = styled.View`
  width: 32px;
  height: 32px;
  background: white;
  border-radius: 16px;
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.15);
  justify-content: center;
  align-items: center;
`;


const Subtitle = styled.Text`
  font-size: 15px;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.8);
  position: absolute;
  bottom: 60px;
  left: 20px;
  text-transform: uppercase;
`;


const Content = styled.View`
  height: 800px;
  padding: 20px;
`;

const ContentLine = styled.View`
    display: flex;
    flex-direction: row;
    height: 100px;
    width: ${widthContent - 50}px;
    align-items: center;
`;

const ContentHeading = styled.View`
    width: ${widthContent}px;
    
`;
const ContentHeadingText = styled.Text`
    font-size: 20px;
    color: #A138F2;
    font-weight: bold;
    font-style:italic ;
    text-transform: uppercase;
`;
const ContentLineIcone = styled.View`
    margin-right: 10px;
    justify-content: center;
    //align-items: center;

`
const ContentLineText = styled.View`
    flex-direction: column;
`
const ContentLineHeadText = styled.Text`
    font-weight: bold;
`
const ContentLineSubText = styled.Text`
    
`
const ContentDetail = styled.View`
    margin-top: 20px;
`
const ContentDetailTitle = styled.Text`
    font-size: 17px;
    font-weight: bold;
    text-transform: uppercase;
`
const ContentDetailDescription = styled.Text`
    margin-top: 10px;
`

const ButtonView = styled.View`
  background: #A138F2;
  width: ${widthContent}px;
  height: 50px;
  justify-content: center;
  align-self: center;
  align-items: center;
  border-radius: 10px;
  margin-top: 20px;
`;

const ButtonText = styled.Text`
  color: #FFFFFF;
  font-size: 14px;
  font-weight: bold;
`;

const monthNames = ["Janv.", "Fevr.", "Mar.", "Avr.", "Mai", "Juin",
  "Juil.", "Aout", "Sept.", "Oct.", "Nov.", "Dec."];

const EventScreen = ({route, navigation}) => {
    const { eventData: eventData } = route.params;
    const handleActivateChallenge = () => {
        console.log("activate");
        
    };

    const buildChallengeString = (tab) => {
        return tab.join(", ");
    }
    const buildPeriodString = (date) => {
        const dateFormatted = new Date(date);

        return dateFormatted.getDate() + " " + monthNames[dateFormatted.getMonth()];
    }

    const isEventOpened = (date) => {
        const dateNow = new Date();
        const dateFormatted = new Date(date);
        return  dateNow < dateFormatted;
    }

    return (
        <ScrollView>
            <Container>
            <StatusBar hidden />
            <Cover>
                <Image source={eventData.image} />
                <Title>{eventData.title}</Title>
                <Subtitle>xx participants</Subtitle>
                <Caption>{useEventDate(eventData?.date)}</Caption>
            </Cover>
            <TouchableOpacity onPress={() => { navigation.goBack(); }} style={{ position: "absolute", top: 20, right: 20 }}>
            <CloseView>
              <Ionicons
                name="ios-close"
                size={32}
                color="#A138F2"
              />
            </CloseView>
            </TouchableOpacity>
            <Content>
            {isEventOpened(eventData?.periode) &&
            <>
            <ContentHeading>
                <ContentHeadingText>Cet evenement vous tente ?</ContentHeadingText>
            </ContentHeading>
            <TouchableOpacity onPress={() => handleActivateChallenge()} >
                <ButtonView>
                <ButtonText>Relever le challenge</ButtonText>
                </ButtonView>
            </TouchableOpacity></>}
            <ContentLine>
                <ContentLineIcone>
                    <MaterialCommunityIcons name="flag-checkered" size={32} color="black" />
                </ContentLineIcone>
                <ContentLineText>
                    <ContentLineHeadText>Objectif</ContentLineHeadText>
                    <ContentLineSubText>{eventData?.objectifLabel}</ContentLineSubText>
                </ContentLineText>
            </ContentLine>
            <ContentLine>
                <ContentLineIcone>
                <Ionicons name="calendar-outline" size={32} color="black" />
                </ContentLineIcone>
                <ContentLineText>
                    <ContentLineHeadText>Date</ContentLineHeadText>
                    <ContentLineSubText>{buildPeriodString(eventData?.date)}</ContentLineSubText>
                </ContentLineText>
            </ContentLine>
            <ContentLine>
                <ContentLineIcone>
                <MaterialCommunityIcons name="lightning-bolt" size={32} color="black" />
                </ContentLineIcone>
                <ContentLineText>
                    <ContentLineHeadText>Type de Challenge</ContentLineHeadText>
                    <ContentLineSubText>{buildChallengeString(eventData?.type)}</ContentLineSubText>
                </ContentLineText>
            </ContentLine>
            <ContentLine>
                <ContentLineIcone>
                <MaterialCommunityIcons name="trophy" size={32} color="black" />
                </ContentLineIcone>
                <ContentLineText>
                    <ContentLineHeadText>Récompenses</ContentLineHeadText>
                    <ContentLineSubText>Pour ce challenge, vous obtenez + xx points si vous le terminez</ContentLineSubText>
                </ContentLineText>
            </ContentLine>
            <ContentDetail>
                <ContentDetailTitle>Détails</ContentDetailTitle>
                <ContentDetailDescription>{eventData?.detail}</ContentDetailDescription>
            </ContentDetail>
            </Content>
            </Container>
        </ScrollView>
        )
        
}

export default EventScreen;