import React from "react";
import { Dimensions, TouchableOpacity, SafeAreaView, ScrollView, StatusBar } from "react-native";
import styled from 'styled-components/native';
import CardService from '../services/Card.service';
import Toast from 'react-native-toast-message';
import { Auth } from 'aws-amplify';
import { Ionicons } from '@expo/vector-icons';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;
const widthContent = screenWidth  - 50;


const PROFIL_ACTIONS = [
  {
    "id": "pa1",
    "title": "Mon avatar",
    "routeName": "Avater"
  },
  {
    "id": "pa2",
    "title": "Ma bibliothèque",
    "routeName": "Bibliothèque"
  },
  {
    "id": "pa3",
    "title": "Statistiques",
    "routeName": "Statistiques"
  },
  {
    "id": "pa4",
    "title": "Amis",
    "routeName": "Amis"
  },
  {
    "id": "pa5",
    "title": "Support",
    "routeName": "Support"
  },
];

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
const ProgresLabel = styled.Text`
color: #FFFFFF;
  font-size: 14px;
`;

const ProfilScreen = ({navigation}) => {

  const handleReinit = () => {
    CardService.clearAll().then(()=> {
      Toast.show({
        type: 'success',
        text1: 'Réinitalisation réussie',
        text2:  "Les données utilisateurs sont bien réinitialisées."
      });
    })
  };

  const disconnect = async() => {
    Auth.signOut().then(()=> {
      navigation.navigate("Signin");
    })
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
                  <ProgresNumber>
                      0
                  </ProgresNumber>
                  <ProgresLabel>
                    exos
                  </ProgresLabel>
                </ProgresCard>
                </ProgresCards>
              </ProgresSection>
            </TouchableOpacity>
            <ProfilActions>
              {
                PROFIL_ACTIONS.map((elt, index) => (
                <TouchableOpacity key={elt.id} onPress={()=> navigation.navigate(elt.routeName)}>
                  <ProfilAction>
                    <ActionTitle>
                      {elt.title}
                    </ActionTitle>
                    <ActionButton>
                      <Ionicons name="arrow-forward" size={20} color="#FFFFFF" />
                    </ActionButton>
                  </ProfilAction>
                </TouchableOpacity>
                ))
              } 
            </ProfilActions>       
          <ButtonAction>
            <TouchableOpacity onPress={()=> handleReinit()}>
              <ButtonView>
                <ButtonText>Reinitialiser</ButtonText>
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