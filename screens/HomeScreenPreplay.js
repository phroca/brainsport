import { StatusBar } from 'expo-status-bar';
import { Dimensions, SafeAreaView, ScrollView, TouchableOpacity, Animated } from 'react-native';
import styled from 'styled-components/native';
import { useFocusEffect } from '@react-navigation/native';
// import Card from '../components/Card';
// import Menu from '../components/menu/Menu';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
// import AsyncStorage from '@react-native-async-storage/async-storage';
import Auth from "@aws-amplify/auth";
import CardService from '../services/Card.service';
import { Ionicons } from '@expo/vector-icons';
import CheckBox from '../components/CheckBox';
import SubtitleCard from '../components/SubtitleCard';
import GameChoicePrompt from '../components/GameChoicePrompt';
import { copilot, walkthroughable, CopilotStep } from "react-native-copilot";

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
  background: ${props => props.color ? "#A138F2" : "#DADADA"};
  width: ${widthContent}px;
  height: 50px;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  margin-top: 20px;
`;

const ButtonTextGame = styled.Text`
  color: ${props => props.color ? "#FFFFFF" : "#000000"};
  font-size: 20px;
  font-weight: bold;
  text-transform: uppercase;
`;

const ButtonTextTab = styled.Text`
  color: ${props => props.color ? "#FFFFFF" : "#000000"};
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

const PlayCardOverLayer = styled.View`
position: absolute;
width: 100%;
height: 100%;
background-color: #0000008f; 
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

const ProgressContainer = styled.View`

  position: absolute;
  bottom: 0px;
  left: 0px;
  width: 100%;
  height: 40px;
  padding-left: 10px;
  justify-content: center;
`;

const ProgressContainerText = styled.Text`
  color: #000000;
  align-text: left;
`

const AnimatedPlayCard = Animated.createAnimatedComponent(PlayCard);
const AnimatedFamillychosen = Animated.createAnimatedComponent(Famillychosen);

const HomeScreenPreplay = (props) => {
    const [flagUserDataCard, setFlagUserDataCard] = useState(false);
    const [flagFamillyProgress, setFlagFamillyProgress] = useState(false);
    const [username, setUsername] = useState("");
    useEffect(()=> {
      (async() => {
        const user = await Auth.currentAuthenticatedUser();
        setUsername(user?.attributes?.given_name);
      })();
    },[])
  
    const [prePlayDataIn, setPrePlayDataIn] = useState(true);
    useEffect(()=> {
      CardService.getPrePlayData().then((preplayData) => {
        setPrePlayDataIn(preplayData);
      })
    },[prePlayDataIn]);
  
    const [currentUSerDataCard, setCurrentUSerDataCard] = useState({"userId": "", "cards": []})
    useFocusEffect(
      useCallback(() => {
        if(!flagUserDataCard){
          CardService.getUserCardsMock().then((userCardsData) => {
            setCurrentUSerDataCard(userCardsData);
          });
        }
        return () => setFlagUserDataCard(true)
      },[currentUSerDataCard])
    );
    
    
    const [currentFamillyProgress, setCurrentFamillyProgress] = useState({   
      "carreau": {
          "eightFirstCardFilled": false,
          "allCardFilled": false
      },
      "coeur": {
          "eightFirstCardFilled": false,
          "allCardFilled": false
      },
      "trefle": {
          "eightFirstCardFilled": false,
          "allCardFilled": false
      },          
      "pique": {
          "eightFirstCardFilled": false,
          "allCardFilled": false
      },
    });
    useFocusEffect(
    useCallback(()=> {
      if(!flagFamillyProgress){
        CardService.getFamillyProgress().then((famillyProgressData) => {
          setCurrentFamillyProgress(famillyProgressData);
        });
      }
      
      return () => setFlagFamillyProgress(true)
    },[currentFamillyProgress])
    );
    
    const WalkthroughablePlayCard = walkthroughable(AnimatedPlayCard);

    const [cardTop] = useState(new Animated.Value(0));
    const [bgAnimation] = useState(new Animated.Value(0));
    useEffect(()=> {
      Animated.timing( cardTop ,{
        toValue: 1,
        delay: 200,
        useNativeDriver: true
      }).start(() => {
        Animated.timing( bgAnimation ,{
          toValue: 1,
          useNativeDriver: true
        }).start(() => {
          CardService.getStepperBeforePlay().then((stepData) => {
            if(stepData) props.start();
          })
        })
      });
    }, []);

    const interpolateTranslation = {
      transform: [{
          translateY: cardTop.interpolate({
              inputRange: [0, 1],
              outputRange: [100, 0]
          })
          }   
      ],
      opacity: cardTop
  }
    const interpolateBgTranslation = {
      transform: [{
          translateY: bgAnimation.interpolate({
              inputRange: [0, 1],
              outputRange: [50, 0]
          })
          }   
      ],
      opacity: bgAnimation
  }
    const WalkthroughableButton = walkthroughable(ButtonViewGame);
    


    useEffect(()=> {
      /*CardService.getStepperBeforePlay().then((stepData) => {
        if(stepData) props.start();
      })*/

      props.copilotEvents.on("stop", () => {
        CardService.terminateStepperBeforePlay();
      });

      return () => {
        props.copilotEvents.off("stop");
      }
    },[])
    
    const promptGameRef = useRef();
    const [randomGame, setRandomGame] = useState(false);
    
    const handleSelectFamilly = (couleur) => {
      const famillyFiltered = currentUSerDataCard.cards.filter(elt=> elt.couleur === couleur);
      props.navigation.navigate("Card Association Read Only", { userCards: famillyFiltered });
    }

   const handlePlayPreplayGame = () => {
     promptGameRef.current.setVisible(true);
    /*const cardCopyToShuffle = JSON.parse(JSON.stringify(currentUSerDataCard));
    const shuffledArrayforPlayGame = cardCopyToShuffle.cards.sort((a, b) => 0.5 - Math.random());
    props.navigation.navigate("PlayPregame", {userCards: shuffledArrayforPlayGame.slice(0,7)});*/
    }

    const handleGoToMainHome = () => {

      navigation.navigate("PlayFamilly", {famillyToPlay: currentUSerDataCard.cards, isRandom: randomGame});
      // CardService.terminatePreplayData().then((value) =>{
      //   if(value !== null) props.navigation.navigate("Accueil-Alt");
      // });
    }


    const handleModifyFamilly = (color) => {
      const cardFamillyFilterToModify = currentUSerDataCard.cards.filter(elt => elt.couleur === color);
      props.navigation.navigate("Card Association Par Famille", { userCardsFull: currentUSerDataCard, famillyProgress: currentFamillyProgress, color: color });
    }
    const checkAbleToTrain = () => {
      return currentFamillyProgress?.carreau["allCardFilled"] || currentFamillyProgress?.carreau["eightFirstCardFilled"] ||
      currentFamillyProgress?.coeur["allCardFilled"] || currentFamillyProgress?.coeur["eightFirstCardFilled"] ||
       currentFamillyProgress?.trefle["allCardFilled"] || currentFamillyProgress?.trefle["eightFirstCardFilled"] ||
        currentFamillyProgress?.pique["allCardFilled"] || currentFamillyProgress?.pique["eightFirstCardFilled"];
    }
    const checkAbleToLearnAll = () => {
      return currentFamillyProgress?.carreau["allCardFilled"] && currentFamillyProgress?.carreau["eightFirstCardFilled"] &&
      currentFamillyProgress?.coeur["allCardFilled"] && currentFamillyProgress?.coeur["eightFirstCardFilled"] &&
       currentFamillyProgress?.trefle["allCardFilled"] && currentFamillyProgress?.trefle["eightFirstCardFilled"] &&
        currentFamillyProgress?.pique["allCardFilled"] && currentFamillyProgress?.pique["eightFirstCardFilled"];
    }
    const calculateProgressionCardByFamilly = (couleurIn) => {
      const cardFamilly = currentUSerDataCard.cards.filter(elt => elt.couleur === couleurIn);
      const elementCarteRemplie = (element) => element.personnage !== "" && element.verbe !== "" && element.objet !== "" && element.lieu !== "";
      const cardFamillyProgress = cardFamilly.filter(element => elementCarteRemplie(element)).length;
      return cardFamillyProgress + " / " + cardFamilly.length;
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
                    <TouchableOpacity onPress={()=> props.navigation.push("Regle Precreation")}>
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
            <TouchableOpacity onPress={() => handleModifyFamilly("coeur")}>
            <CopilotStep 
              text="Nous allons commencer par créer la famille des Coeur. Définissez votre première catégorie en appuyant sur la couleur."
              order={1}
              name="second-familly">
              <WalkthroughablePlayCard style={[interpolateTranslation]}>
                  <ContentLabel>
                      <LogoCard>
                        <MaterialCommunityIcons name="cards-heart" size={20} color="red" />
                      </LogoCard>
                      <Label>Coeur</Label>
                  </ContentLabel>
                  <ProgressContainer>
                    <ProgressContainerText>
                      {calculateProgressionCardByFamilly("coeur")}
                    </ProgressContainerText>
                  </ProgressContainer>
                  <AnimatedFamillychosen style={[interpolateBgTranslation]}>
                    <ActionButton>
                    <MaterialCommunityIcons name="cards-heart" size={180} color="#FF000022" />
                    </ActionButton>
                  </AnimatedFamillychosen>
              </WalkthroughablePlayCard>
              </CopilotStep>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => currentFamillyProgress?.carreau["eightFirstCardFilled"] !== undefined && handleModifyFamilly("carreau")}>
              <CopilotStep 
              text="Les autres familles se débloqueront lorsque vous aurez complété la famille du Coeur."
              order={2}
              name="first-familly">

              
              <WalkthroughablePlayCard style={[interpolateTranslation]}>
              {currentFamillyProgress?.carreau["eightFirstCardFilled"] !== undefined ? 
                <>
                  <ContentLabel>
                      <LogoCard>
                        <MaterialCommunityIcons name="cards-diamond" size={20} color="red" />
                      </LogoCard>
                      <Label>Carreau</Label>
                  </ContentLabel>
                  <ProgressContainer>
                    <ProgressContainerText>
                      {calculateProgressionCardByFamilly("carreau")}
                    </ProgressContainerText>
                  </ProgressContainer>
                  <AnimatedFamillychosen style={[interpolateBgTranslation]}>
                    <ActionButton>
                    <MaterialCommunityIcons name="cards-diamond" size={180} color="#FF000022" />
                    </ActionButton>
                  </AnimatedFamillychosen>
                </> : 
                <>
                <PlayCardOverLayer /> 
                <ContentLabel>
                      <LogoCard>
                        <MaterialCommunityIcons name="lock" size={20} color="#95a5a6" />
                      </LogoCard>
                      <Label>Carreau</Label>
                  </ContentLabel>
                  
                  <AnimatedFamillychosen style={[interpolateBgTranslation]}>
                    <ActionButton>
                    <MaterialCommunityIcons name="lock" size={180} color="#95a5a622" />
                    </ActionButton>
                  </AnimatedFamillychosen>
                </>}

              </WalkthroughablePlayCard>
              </CopilotStep>
            </TouchableOpacity> 
            
            <TouchableOpacity onPress={() => currentFamillyProgress?.trefle["eightFirstCardFilled"] !== undefined && handleModifyFamilly("trefle")}>
              <AnimatedPlayCard style={[interpolateTranslation]}>
              {currentFamillyProgress?.trefle["eightFirstCardFilled"] !== undefined ? 
                <>
                  <ContentLabel>
                    <LogoCard>
                      <MaterialCommunityIcons name="cards-club" size={20} color="black" />
                    </LogoCard>
                    <Label>Trèfle</Label>
                  </ContentLabel>
                  <ProgressContainer>
                    <ProgressContainerText>
                      {calculateProgressionCardByFamilly("trefle")}
                    </ProgressContainerText>
                  </ProgressContainer>
                  <AnimatedFamillychosen style={[interpolateBgTranslation]}>
                    <ActionButton>
                      <MaterialCommunityIcons name="cards-club" size={180} color="#00000022" />
                    </ActionButton>
              </AnimatedFamillychosen>
              </> :
              <>
              <PlayCardOverLayer /> 
                <ContentLabel>
                      <LogoCard>
                        <MaterialCommunityIcons name="lock" size={20} color="#95a5a6" />
                      </LogoCard>
                      <Label>Trèfle</Label>
                  </ContentLabel>
                  
                  <AnimatedFamillychosen style={[interpolateBgTranslation]}>
                    <ActionButton>
                    <MaterialCommunityIcons name="lock" size={180} color="#95a5a622" />
                    </ActionButton>
                  </AnimatedFamillychosen>
              </>
              }
              </AnimatedPlayCard>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => currentFamillyProgress?.pique["eightFirstCardFilled"] !== undefined && handleModifyFamilly("pique")}>
              <AnimatedPlayCard style={[interpolateTranslation]}>
              {currentFamillyProgress?.pique["eightFirstCardFilled"] !== undefined ? 
                <>
                  <ContentLabel>
                      <LogoCard>
                        <MaterialCommunityIcons name="cards-spade" size={20} color="black" />
                      </LogoCard>
                      <Label>Pique</Label>
                  </ContentLabel>
                  <ProgressContainer>
                    <ProgressContainerText>
                      {calculateProgressionCardByFamilly("pique")}
                    </ProgressContainerText>
                  </ProgressContainer>
                  <AnimatedFamillychosen style={[interpolateBgTranslation]}>
                    <ActionButton>
                    <MaterialCommunityIcons name="cards-spade" size={180} color="#00000022" />
                    </ActionButton>
                  </AnimatedFamillychosen>
                </> :
                <>
                <PlayCardOverLayer /> 
                  <ContentLabel>
                      <LogoCard>
                        <MaterialCommunityIcons name="lock" size={20} color="#95a5a6" />
                      </LogoCard>
                      <Label>Pique</Label>
                  </ContentLabel>
                  
                  <AnimatedFamillychosen style={[interpolateBgTranslation]}>
                    <ActionButton>
                    <MaterialCommunityIcons name="lock" size={180} color="#95a5a622" />
                    </ActionButton>
                  </AnimatedFamillychosen>
                </>
              }
              </AnimatedPlayCard>
              
            </TouchableOpacity>
            </ListPlayCard>
            <HomeReplayButton>
              <TouchableOpacity onPress={() => checkAbleToTrain() && handlePlayPreplayGame()}>
              <CopilotStep 
              text="Une fois les cartes définies pour chaque famille vous pourrez commencer à jouer en appuyant ici."
              order={3}
              name="train">
                <WalkthroughableButton color={checkAbleToTrain()}>
                  <ButtonTextGame color={checkAbleToTrain()}>S'entrainer</ButtonTextGame>
                </WalkthroughableButton>
                </CopilotStep>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => checkAbleToLearnAll() && handleGoToMainHome()}>
                <ButtonViewGame color={checkAbleToLearnAll()}>
                  <ButtonTextTab color={checkAbleToLearnAll()}>Apprendre le tableau</ButtonTextTab>
                </ButtonViewGame>
              </TouchableOpacity>
            </HomeReplayButton>
            </ScrollView>
            <GameChoicePrompt ref={promptGameRef} famillyProgress={currentFamillyProgress} currentUSerDataCard={currentUSerDataCard} navigation={props.navigation}/>
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
                    <TouchableOpacity onPress={()=> props.navigation.push("Accueil")}>
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


export default copilot({overlay: "svg", animated: true, verticalOffset: 30, labels: {
  previous: "Précédent",
  next: "Suivant",
  skip: "Passer",
  finish: "Terminer"
}})(HomeScreenPreplay);
