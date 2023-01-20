import React, { useEffect, useState } from "react";
import { Dimensions, TouchableOpacity, SafeAreaView, ScrollView, StatusBar } from "react-native";
import styled from 'styled-components/native';
import CardService from '../services/Card.service';
import Toast from 'react-native-toast-message';
import { Auth } from 'aws-amplify';
import { Ionicons } from '@expo/vector-icons';
import CheckBox from "../components/CheckBox";

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;
const widthContent = screenWidth  - 50;

const Container = styled.ImageBackground`
  flex:1;
  width: 100%;
  height: 100%;
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

const Subtitle = styled.Text`
color: #FFFFFF;
  font-size: 14px;
  margin-left: 40px;
  margin-top: 10px;
  margin-right: 40px;
`;

const ButtonAction = styled.View`
  justify-content: center;
  align-items: center;
  margin-top: 100px;
  margin-bottom: 100px;
`;

const ButtonView = styled.View`
  background: #FFFFFF;
  width: ${widthContent}px;
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

const ProfilActions = styled.View`

justify-content: center;
  align-items: center;
`;

const ProfilAction = styled.View`
width: ${widthContent}px;
height: 50px;
background: #0000003d;
border-radius: 10px;
margin-top: 20px;
z-index: 1;
justify-content: center;
position: relative;
`;

const ActionTitle = styled.Text`
color: #FFFFFF;
  font-size: 18px;
  z-index: 2;
  margin: 0 20px;
`;

const ActionButton = styled.View`
position: absolute;
right: 20px;
`;

const ProgresSection = styled.View`

justify-content: center;
  align-items: center;
`;
const ProgresHeader = styled.View`
width: ${widthContent}px;
height: 50px;
justify-content: center;
align-items: center;
position: relative;
`;

const ProgresTitle = styled.Text`
color: #FFFFFF;
  font-size: 18px;
  z-index: 2;
  margin: 0 20px;
`;

const ProgresCards = styled.View`
justify-content: center;
  align-items: center;
  flex-direction: row;
`;

const ProgresCard = styled.View`
width: 80px;
height: 80px;
background: #0000003d;
margin: 0 20px;
justify-content: center;
  align-items: center;
  border-radius: 10px;
`;
const ProgresNumber = styled.Text`
color: #FFFFFF;
  font-size: 25px;
  font-weight: bold;
`;
const ProgresNumberLittle = styled.Text`
color: #FFFFFF;
  font-size: 14px;
  font-weight: bold;
`;
const ProgresLabel = styled.Text`
color: #FFFFFF;
  font-size: 14px;
`;
const ProgresLabelCenter = styled.Text`
color: #FFFFFF;
  font-size: 14px;
  text-align: center;
`;

const PrePlaySection = styled.View`
  flex-direction: column;
  margin-top: 20px;
  margin-bottom: 10px;
`

const ProfilScreen = ({navigation}) => {
  const [listProgress, setListProgress] = useState([]);
  const [prePlayDataIn, setPrePlayDataIn] = useState(null);
  let padToTwo = (number) => (number <= 9 ? `0${number}`: number);
  const [currentUserDataCard, setCurrentUserDataCard] = useState({"userId": "", "cards": []})
  useEffect(() => {
    CardService.getProgressionTime().then((result) => {
      if(result) {
        setListProgress(result);
      }
    })
    CardService.getUserCardsMock().then((userCardsData)=> {
      setCurrentUserDataCard(userCardsData);
    });
  }, [])
  const handleReinit = () => {
    CardService.clearAll().then(()=> {
      Toast.show({
        type: 'success',
        text1: 'Réinitalisation réussie',
        text2:  "Les données utilisateurs sont bien réinitialisées."
      });
    });
  };


  useEffect(() => {
    CardService.getPrePlayData().then((preplayData) => {
      setPrePlayDataIn(preplayData);
    })
  }, [prePlayDataIn]);

  const disconnect = async() => {
    Auth.signOut().then(()=> {
      navigation.navigate("Signin");
    })
  }

  const getBestTime = (listProgress) => {
    const array = [];
    listProgress.forEach(item => array.push(item.time))
    const arraySorted = array.sort((a, b) => {return b - a});
    return arraySorted[arraySorted.length -1];
  }
  const handleAvatar = () => {
    navigation.navigate("Avatar");
  }
  const handleLibrary = () => {
    const currentUserDataCardElementInProgressFiltered = currentUserDataCard.cards.filter(element => element.personnage !== "" && element.verbe !== "" && element.objet !== "" && element.lieu !== "");
    const currentLibraryCard = {
      "userId": currentUserDataCard.userId,
       "cards": currentUserDataCardElementInProgressFiltered
    }
    navigation.navigate("Bibliothèque", {userCards: currentLibraryCard});
  }

  const handleTogglePregame = async() => {
    console.log("PREPLAY DATA => ", prePlayDataIn);
    if(prePlayDataIn == true){
      CardService.terminatePreplayData().then(() => {
        setPrePlayDataIn(false);
        disconnect();
      });
    } else {
      CardService.initPrePlayData().then(() => {
        setPrePlayDataIn(true);
        disconnect();
      });
    }
  }

  const handleReinitPregame = () => {
    CardService.clearPregameData().then(()=> {
      Toast.show({
        type: 'success',
        text1: 'Réinitalisation réussie',
        text2:  "Les données utilisateurs sont bien réinitialisées."
      });
    });
  }
    return (
        <Container source={require("../assets/brainsport-bg.png")}>
        <SafeAreaView>
          <ScrollView style={{height: "100%"}} showsVerticalScrollIndicator={false}>
            <TitleBar>
                <Title>Profil</Title>
            </TitleBar>
            <TouchableOpacity onPress={()=>navigation.navigate("Progres")}>
              <ProgresSection>
                <ProgresHeader>
                <ProgresTitle>
                  Mon Progrès
                </ProgresTitle>
                </ProgresHeader>
                <ProgresCards>
                <ProgresCard>
                  <ProgresNumber>
                      0
                  </ProgresNumber>
                  <ProgresLabel>
                    jours
                  </ProgresLabel>
                </ProgresCard>
                <ProgresCard>
                  <ProgresNumberLittle>
                  {padToTwo(Math.trunc(getBestTime(listProgress)/60))}: {padToTwo(getBestTime(listProgress)%60)}
                  </ProgresNumberLittle>
                  <ProgresLabelCenter>
                    meilleur temps
                  </ProgresLabelCenter>
                </ProgresCard>
                <ProgresCard>
                  <ProgresNumber>
                      {listProgress.length}
                  </ProgresNumber>
                  <ProgresLabel>
                    exos
                  </ProgresLabel>
                </ProgresCard>
                </ProgresCards>
              </ProgresSection>
            </TouchableOpacity>
            <ProfilActions>
              <TouchableOpacity onPress={()=> handleAvatar()}>
                <ProfilAction>
                  <ActionTitle>
                    Mon avatar
                  </ActionTitle>
                  <ActionButton>
                    <Ionicons name="arrow-forward" size={20} color="#FFFFFF" />
                  </ActionButton>
                </ProfilAction>
              </TouchableOpacity>
              <TouchableOpacity  onPress={()=> handleLibrary()}>
                <ProfilAction>
                  <ActionTitle>
                    Ma bibliothèque
                  </ActionTitle>
                  <ActionButton>
                    <Ionicons name="arrow-forward" size={20} color="#FFFFFF" />
                  </ActionButton>
                </ProfilAction>
              </TouchableOpacity>
              <TouchableOpacity onPress={()=> navigation.navigate("Statistiques")}>
                <ProfilAction>
                  <ActionTitle>
                    Statistiques
                  </ActionTitle>
                  <ActionButton>
                    <Ionicons name="arrow-forward" size={20} color="#FFFFFF" />
                  </ActionButton>
                </ProfilAction>
              </TouchableOpacity>
              <TouchableOpacity onPress={()=> navigation.navigate("Amis")}>
                <ProfilAction>
                  <ActionTitle>
                    Amis
                  </ActionTitle>
                  <ActionButton>
                    <Ionicons name="arrow-forward" size={20} color="#FFFFFF" />
                  </ActionButton>
                </ProfilAction>
              </TouchableOpacity>
              <TouchableOpacity onPress={()=> navigation.navigate("Support")}>
                <ProfilAction>
                  <ActionTitle>
                    Support
                  </ActionTitle>
                  <ActionButton>
                    <Ionicons name="arrow-forward" size={20} color="#FFFFFF" />
                  </ActionButton>
                </ProfilAction>
              </TouchableOpacity>
            </ProfilActions>       
          <ButtonAction>
            <PrePlaySection>
              <CheckBox value={prePlayDataIn} label="Activer le préGame (nécessite un déconnexion)" onPress={() => handleTogglePregame()} />
            </PrePlaySection>
            <TouchableOpacity onPress={()=> handleReinitPregame()}>
              <ButtonView>
                <ButtonText>Réinitialiser les données Pregame</ButtonText>
              </ButtonView>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=> handleReinit()}>
              <ButtonView>
                <ButtonText>Tout Reinitialiser</ButtonText>
              </ButtonView>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=> disconnect()}>
              <ButtonView>
                <ButtonText>Se déconnecter</ButtonText>
              </ButtonView>
            </TouchableOpacity>
          </ButtonAction>
          </ScrollView>
          </SafeAreaView>
        </Container>);
}

export default ProfilScreen;