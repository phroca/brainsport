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
import { Ionicons } from '@expo/vector-icons';
import CheckBox from '../components/CheckBox';
import SubtitleCard from '../components/SubtitleCard';
const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;
const widthContent = screenWidth  - 50;
const widthFamillyCard = screenWidth - 16;

const Container = styled.ImageBackground`
  flex:1;
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

const Subtitle = styled.Text`
color: #FFFFFF;
  font-size: 14px;
  margin-left: 40px;
  margin-top: 10px;
  margin-right: 40px;
`;

const SubtitleSection = styled.Text`
width: ${widthContent}px;
justify-content: center;
  align-items: center;
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
const ButtonViewGame = styled.View`
  background: #A138F2;
  width: ${widthContent}px;
  height: 50px;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  margin-top: 20px;
`;

const ButtonTextGame = styled.Text`
  color: #FFFFFF;
  font-size: 20px;
  font-weight: bold;
  text-transform: uppercase;
`;

const ButtonTextTab = styled.Text`
  color: #FFFFFF;
  font-size: 14px;
  font-weight: bold;
  text-transform: uppercase;
  text-align: center;
`;

const ButtonFooter = styled.View`
  justify-content: center;
  align-items: center;
  margin-bottom: 10px;
`;

const ListPlayCard = styled.View`
width: ${widthContent}px;
  justify-content: space-between;
  align-items: center;
  margin-top: 20px;
  flex-direction: row;
  flex-wrap: wrap;
  
`
const PlayCard = styled.View`
  position: relative;
  width: ${widthContent/2-5}px;
  margin: 5px 0px;
  
  //padding: 0 15px;
  background-color: #FFFFFF;
  height: 150px;
  border-radius: 15px;
  justify-content: center;
  overflow: hidden;
`;

const ContentLabel = styled.View`

  flex-direction: row;
  align-self: center;
  justify-content: center;
  margin-top: 10px;
  //top:10px;
  //left: 10px;
`;

const Label = styled.Text`
  color: #131516;
  font-size: 16px ;
  font-weight: bold;
  
`;

const LogoCard= styled.View`

  justify-content: center;
  align-items: center;

`

const Famillychosen = styled.View`

  position: absolute;
  top: 0px;
  right: -50px;
`;

const Famillylabel = styled.Text`
  color: #131516;
  font-size: 16px ;
  font-weight: bold;
  margin-right: 5px;
`;

const ActionButton = styled.View`
overflow: hidden;
`;

const HomeReplayButton = styled.View`
    justify-content: center;
`;



export default function HomeScreenPreplay({navigation}) {
    const [username, setUsername] = useState("");
    const [currentPreplayUserDataCard, setCurrentPreplayUserDataCard] = useState({"userId": "", "cards": []})
    const [prePlayCurrentFamillyProgress, setPrePlayCurrentFamillyProgress] = useState({});
    const [randomGame, setRandomGame] = useState(false);
    const [prePlayDataIn, setPrePlayDataIn] = useState(null);
  
    useEffect(() => {
      CardService.getPrePlayData().then((preplayData) => {
        setPrePlayDataIn(preplayData);
      })
    }, [prePlayDataIn]);

    useEffect(()=> {
      (async() => {
        const user = await Auth.currentAuthenticatedUser();
        setUsername(user?.attributes?.given_name);
      })();
      CardService.getPrePlayData().then((preplayData) => {
        setPrePlayDataIn(preplayData);
      })
      CardService.getPreplayUserDataCard().then((data) => {
        if(data) setCurrentPreplayUserDataCard(data);
      })

      CardService.getPreplayFamillyProgress().then((data) => {
        if(data) setPrePlayCurrentFamillyProgress(data);
      })
    },[prePlayDataIn]);
    
    const handleSelectFamilly = (couleur) => {
      const famillyFiltered = currentPreplayUserDataCard?.cards.filter(elt=> elt.couleur === couleur);
      navigation.navigate("Card Association Read Only", { userCards: famillyFiltered })
    }

   const handlePlayPreplayGame = () => {
    const cardCopyToShuffle = JSON.parse(JSON.stringify(currentPreplayUserDataCard));
    const shuffledArrayforPlayGame = cardCopyToShuffle.cards.sort((a, b) => 0.5 - Math.random());
    navigation.navigate("PlayPregame", {userCards: shuffledArrayforPlayGame.slice(0,7)});
    }

    const handleGoToMainHome = () => {
      CardService.terminatePreplayData().then((value) =>{
        if(value !== null) navigation.navigate("Accueil-Alt");
      });
    }

  return prePlayDataIn === null ?( 
          <Container source={require("../assets/brainsport-bg.png")}>   
            <StatusBar style="auto" />
              <SafeAreaView>
                <ScrollView style={{height: "100%"}} showsVerticalScrollIndicator={false}>
                  <TitleBar>
                      <Title>Bonjour {username} !</Title>
                  </TitleBar>
                  <Subtitle >
                      Bienvenue chez Brainsport ! 
                      Avant de passer à la création de son propre tableau, 
                      nous allons vous expliquer comment bien débuter !
                  </Subtitle>
                
                  <ButtonFooter>
                    <TouchableOpacity onPress={()=> navigation.push("Regle Precreation")}>
                      <ButtonView>
                        <ButtonText>Commencer</ButtonText>
                      </ButtonView>
                    </TouchableOpacity>
                  </ButtonFooter>
              </ScrollView>
            </SafeAreaView>
          </Container>

  ) : prePlayDataIn === true ? ( 
    <Container source={require("../assets/brainsport-bg.png")}>   
      <StatusBar style="auto" />
        <SafeAreaView>
          <ScrollView style={{height: "100%"}} showsVerticalScrollIndicator={false}>
            <TitleBar>
                <Title>Bonjour {username} !</Title>
            </TitleBar>
            <SubtitleSection>
              <SubtitleCard text="Pour débuter, tu joueras avec les familles suivantes. Cliques sur les familles pour voir les différentes cartes" sourceImg={require("../assets/brainsport-logo.png")}/>
           </SubtitleSection>
            <ListPlayCard>
            <TouchableOpacity onPress={() => handleSelectFamilly("carreau")}>
              <PlayCard>
                  
                  <ContentLabel>
                      <LogoCard>
                        <MaterialCommunityIcons name="cards-diamond" size={20} color="red" />
                      </LogoCard>
                      <Label>Carreau</Label>
                  </ContentLabel>
                  
                  <Famillychosen>
                    <ActionButton>
                    <MaterialCommunityIcons name="cards-diamond" size={180} color="#FF000022" />
                    </ActionButton>
                  </Famillychosen>
              </PlayCard>
            </TouchableOpacity> 
            <TouchableOpacity onPress={() => handleSelectFamilly("coeur")}>
              <PlayCard >
                  <ContentLabel>
                      <LogoCard>
                        <MaterialCommunityIcons name="cards-heart" size={20} color="red" />
                      </LogoCard>
                      <Label>Coeur</Label>
                  </ContentLabel>
                  <Famillychosen>
                    <ActionButton>
                    <MaterialCommunityIcons name="cards-heart" size={180} color="#FF000022" />
                    </ActionButton>
                  </Famillychosen>
              </PlayCard>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleSelectFamilly("trefle")}>
              <PlayCard >
                  <ContentLabel>
                    <LogoCard>
                      <MaterialCommunityIcons name="cards-club" size={20} color="black" />
                    </LogoCard>
                    <Label>Trèfle</Label>
                  </ContentLabel>
                  <Famillychosen>
                    <ActionButton>
                      <MaterialCommunityIcons name="cards-club" size={180} color="#00000022" />
                    </ActionButton>
              </Famillychosen>
              </PlayCard>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleSelectFamilly("pique")}>
              <PlayCard >
                  <ContentLabel>
                      <LogoCard>
                        <MaterialCommunityIcons name="cards-spade" size={20} color="black" />
                      </LogoCard>
                      <Label>Pique</Label>
                  </ContentLabel>
                  <Famillychosen>
                    <ActionButton>
                    <MaterialCommunityIcons name="cards-spade" size={180} color="#00000022" />
                    </ActionButton>
                  </Famillychosen>
              </PlayCard>
            </TouchableOpacity>
            </ListPlayCard>
            <HomeReplayButton>
              <TouchableOpacity onPress={() => handlePlayPreplayGame()}>
                <ButtonViewGame>
                  <ButtonTextGame>S'entrainer</ButtonTextGame>
                </ButtonViewGame>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleGoToMainHome()}>
                <ButtonViewGame>
                  <ButtonTextTab>Créer son propre tableau</ButtonTextTab>
                </ButtonViewGame>
              </TouchableOpacity>
            </HomeReplayButton>
            </ScrollView>
        </SafeAreaView>      
    </Container>) : ( 
          <Container source={require("../assets/brainsport-bg.png")}>   
            <StatusBar style="auto" />
              <SafeAreaView>
                <ScrollView style={{height: "100%"}} showsVerticalScrollIndicator={false}>
                  <TitleBar>
                      <Title>Bonjour {username} !</Title>
                  </TitleBar>
                  <Subtitle >
                  Vous avez réussi, Bravo ! Vous êtes prêt(e), à passer à l’étape 
                  suivante : Créer votre propre tableau.
                  </Subtitle>
                
                  <ButtonFooter>
                    <TouchableOpacity onPress={()=> navigation.push("Accueil")}>
                      <ButtonView>
                        <ButtonText>Aller à la création du tableau</ButtonText>
                      </ButtonView>
                    </TouchableOpacity>
                  </ButtonFooter>
              </ScrollView>
            </SafeAreaView>
          </Container>

  );
}

