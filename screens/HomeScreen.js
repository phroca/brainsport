import { StatusBar } from 'expo-status-bar';
import { Dimensions, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';
// import Card from '../components/Card';
// import Menu from '../components/menu/Menu';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useEffect, useState } from 'react';
// import AsyncStorage from '@react-native-async-storage/async-storage';
import Auth from "@aws-amplify/auth";
import CardService from '../services/Card.service';
const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;
const widthContent = screenWidth  - 50;
const widthFamillyCard = screenWidth - 16;

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

const ButtonFooter = styled.View`
  justify-content: center;
  align-items: center;
  margin-bottom: 10px;
`;

const ListPlayCard = styled.View`
  justify-content: center;
  align-items: center;
  margin-top: 20px;
`
const PlayCard = styled.View`
  position: relative;
  width: ${widthContent}px;
  flex-direction: row;
  margin: 5px 0px;
  //padding: 0 15px;
  background-color: #FFFFFF;
  height: 70px;
  border-radius: 15px;
  justify-content: center;
  align-items: center;
`;

const ContentLabel = styled.View`
  padding-left: 20px;
  flex-direction: row;
  justify-content: flex-start;
  position: absolute;
  left: 30px;
`;

const Label = styled.Text`
  color: #131516;
  font-size: 16px ;
  font-weight: bold;
  
`;

const LogoCard= styled.View`
    flex-direction: row;
  width: 140px;
  height: 32px;
  justify-content: flex-end;
  align-items: center;
  position: absolute;
  right: 30px;
`

export default function HomeScreen({navigation}) {
    const [username, setUsername] = useState("");
    const [currentUSerDataCard, setCurrentUserDataCard] = useState({"userId": "", "cards": []})
    const [currentFamillyProgress, setCurrentFamillyProgress] = useState({});

    useEffect(()=> {
      (async() => {
        const user = await Auth.currentAuthenticatedUser();
        setUsername(user?.attributes?.given_name);
      })();
      CardService.getUserCardsMock().then((userCardsData)=> {
        setCurrentUserDataCard(userCardsData);
      });
      CardService.getFamillyProgress().then((famillyProgressData) => {
        setCurrentFamillyProgress(famillyProgressData);
      })

    },[currentUSerDataCard]);
    
    const handleSelectFamilly = (couleur) => {
      const famillyFiltered = currentUSerDataCard.cards.filter(elt=> elt.couleur === couleur);
      navigation.navigate("PlayFamilly", {famillyToPlay: famillyFiltered});
    }

  return !currentUSerDataCard ?( 
          <Container source={require("../assets/brainsport-bg.png")}>   
            <StatusBar style="auto" />
              <SafeAreaView>
                <ScrollView style={{height: "100%"}} showsVerticalScrollIndicator={false}>
                  <TitleBar>
                      <Title>Bonjour {username} !</Title>
                  </TitleBar>
                  <Subtitle >
                      Bienvenue chez Brainsport ! 
                      Commencez votre aventure par créer votre jeu !
                  </Subtitle>
                
                  <ButtonFooter>
                    <TouchableOpacity onPress={()=> navigation.navigate("Rules")}>
                      <ButtonView>
                        <ButtonText>Commencer</ButtonText>
                      </ButtonView>
                    </TouchableOpacity>
                  </ButtonFooter>
              </ScrollView>
            </SafeAreaView>
          </Container>

  ) : ( 
    <Container source={require("../assets/brainsport-bg.png")}>   
      <StatusBar style="auto" />
        <SafeAreaView>
          <ScrollView style={{height: "100%"}} showsVerticalScrollIndicator={false}>
            <TitleBar>
                <Title>Bonjour {username} !</Title>
            </TitleBar>
            {!(currentFamillyProgress?.carreau && currentFamillyProgress?.coeur && currentFamillyProgress?.trefle && currentFamillyProgress?.pique) &&<>
            <Subtitle >
                Votre tableau n'est pas encore terminé ! Souhaitez-vous le continuer ?
            </Subtitle>
          
            <ButtonFooter>
              <TouchableOpacity onPress={()=> navigation.navigate("Card Association", { userCards: currentUSerDataCard, famillyProgress: currentFamillyProgress })}>
                <ButtonView>
                  <ButtonText>Continuer</ButtonText>
                </ButtonView>
              </TouchableOpacity>
            </ButtonFooter></>}
            <Subtitle >
                Tu as la possibilité de jouer parmi les familles déja enregistrées
            </Subtitle>
            <ListPlayCard>
            {currentFamillyProgress?.carreau &&<TouchableOpacity onPress={() => handleSelectFamilly("carreau")}>
              <PlayCard >
                  <ContentLabel>
                      <Label>Carreau</Label>
                  </ContentLabel>
                  <LogoCard>
                  <MaterialCommunityIcons name="cards-diamond" size={20} color="red" />
                  </LogoCard>
              </PlayCard>
            </TouchableOpacity> }
            {currentFamillyProgress?.coeur && <TouchableOpacity onPress={() => handleSelectFamilly("coeur")}>
              <PlayCard >
                  <ContentLabel>
                      <Label>Coeur</Label>
                  </ContentLabel>
                  <LogoCard>
                    <MaterialCommunityIcons name="cards-heart" size={20} color="red" />
                  </LogoCard>
              </PlayCard>
            </TouchableOpacity> }
            {currentFamillyProgress?.trefle && <TouchableOpacity onPress={() => handleSelectFamilly("trefle")}>
              <PlayCard >
                  <ContentLabel>
                      <Label>Trèfle</Label>
                  </ContentLabel>
                  <LogoCard>
                    <MaterialCommunityIcons name="cards-club" size={20} color="black" />
                  </LogoCard>
              </PlayCard>
            </TouchableOpacity>}
            {currentFamillyProgress?.pique && <TouchableOpacity onPress={() => handleSelectFamilly("pique")}>
              <PlayCard >
                  <ContentLabel>
                      <Label>Pique</Label>
                  </ContentLabel>
                  <LogoCard>
                    <MaterialCommunityIcons name="cards-spade" size={20} color="black" />
                  </LogoCard>
              </PlayCard>
            </TouchableOpacity>}
            </ListPlayCard>
            </ScrollView>
        </SafeAreaView>      
    </Container>

);
}

