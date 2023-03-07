import { StatusBar } from "expo-status-bar";
import { Ionicons } from "@expo/vector-icons";
import React, { useEffect, useRef, useState } from "react";
import { SafeAreaView, Animated, Dimensions, TouchableOpacity, TouchableWithoutFeedback, KeyboardAvoidingView, Pressable, Platform, ScrollView } from "react-native";
import Toast from 'react-native-toast-message';
import styled from 'styled-components/native';
import Card from "../components/Card";
import { copilot, walkthroughable, CopilotStep } from "react-native-copilot";
import StepNumberComponent from '../components/stepper/StepNumberComponent';
import TooltipComponent from '../components/stepper/TooltipComponent';
import CardService from "../services/Card.service";

const {width} = Dimensions.get("screen");
const widthContent = width - 50;

const Container = styled.ImageBackground`
  flex:1;
  width: 100%;
  height: 100%;
  align-items: center;
`;

const TitleBar = styled.View`
  justify-content: center;
  align-items: center;
  margin-top: 20px;
  margin-bottom: 20px;
`;

const CloseButton = styled.View`
  width: ${widthContent}px;
  justify-content: flex-start;
`;

const FlatView = styled.View`
    width: ${width}px;    
    align-items: center;
    margin-top: 30px;
    margin-bottom: 30px;
    padding-right: 30px;
    padding-left: 30px;
`;

const CardForm = styled.View`
  align-items: center;
`;

const TextInput = styled.TextInput`
  border: 1px solid #53565f;
  width: ${widthContent}px;
  height: 40px;
  border-radius: 10px;
  font-size: 17px;
  color: #FFFFFF;
  padding-left: 120px;
  padding-right: 8px;
  margin-top: 10px;
  background: #3c4560;
  z-index: 1;
`;

const PlayContent= styled.View`
    
`;
const ButtonView = styled.View`
  background: #FFFFFF;
  width: ${widthContent/2 -10}px;
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


const PreText = styled.Text`
color: #FFFFFF;
  width: 100px;
  height: 24px;
  font-size: 14px;
  position: absolute;
  top: 20px;
  left: 10px;
  z-index: 2;
`;

PostText = styled.View`
    position: absolute;
    width: 30px;
    top: 20px;
    right: 10px;
    z-index: 2;
`;

const InputContainer = styled.View`
    position: relative;
`;

const CardVisual = styled.View`
    position: relative;
`;

const TouchableArrowLeft = styled.TouchableOpacity`
    position: absolute;
    left: 20px;
    top:  ${widthContent/3}px;
`;

const TouchableArrowRight = styled.TouchableOpacity`
    position: absolute;
    right: 20px;
    top:  ${widthContent/3}px;
`;

const EndGameButton = styled.View`
    position: relative;
    justify-content: center;
    align-items: center;
`;

const ButtonGameView = styled.View`
  background: #A138F2;
  width: ${widthContent}px;
  height: 50px;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  margin-top: 20px;
`;

const ButtonGameText = styled.Text`
color: #FFFFFF;
font-size: 14px;
font-weight: bold;
`;


const StepView = styled.View`
    position :absolute;
    top: 0;
    right: 0;
    width: 100%;
    height: 100%;
`;

const PlayHistoryContainer = styled.View`
    justify-content: center;
    align-items: center;
`;

const PlayHistoryText = styled.Text`
    color: #FFFFFF;
    font-size: 14px;
    font-weight: bold;
`;

const HideTextContainer = styled.View`
    justify-content: center;
    align-items: center;
`;
const HideText = styled.Text`
    color: #FFFFFF;
    font-size: 20px;
    font-weight: bold;
`;
const PlayPregame = (props) => {
    const [personnage, setPersonnage] = useState("");
    const [verbe, setVerbe] = useState("");
    const [objet, setObjet] = useState("");
    const [lieu, setLieu] = useState("");
    const [currentItemIndex, setCurrentItemIndex] = useState(0);
    const [cardFold, setCardFold] = useState(false);
    const [toggleCardValuesVisibility, setToggleCardValuesVisibility] = useState(true);
    const { userCards } = props.route.params;
    const [cardVisibility, setCardVisibility] = useState([]);
    const [isPrePlayHint, setIsPrePlayHint] = useState(false);
    const [showElements, setShowElements] = useState(true);

    const ref = useRef(null);
    const WalkthroughableStepView = walkthroughable(StepView);

    useEffect(() => {
        userCards.forEach(item => {
            const objectVisibility = {key: "card-"+item.couleur+"-"+item.valeur, isVisible: true};
            cardVisibility.push(objectVisibility);
        })
        return () => {
            setCardVisibility([]);
        }
    }, [])
    useEffect(()=> {
        setPropertiesFromIndex(0);
    },[]);

    useEffect(()=> {
        //Copilot reloading properly
        setTimeout(() => {
            CardService.getStepperBeforePlay().then((stepData) => {
                if(stepData?.initPrePlay) props.start();
            });
        }, 500);
        
        props.copilotEvents.on("stop", () => {
            CardService.updateStepperBeforePlay("initPrePlay", false);
        });

        return () => {
            props.copilotEvents.off("stop");
        }
    },[]);

    useEffect(() => {
        CardService.getPrePlayHintData().then((dataHint) => {
            setIsPrePlayHint(dataHint);
        });
    }, [])
    const updateCurrentItemIndex = element => {
        const contentOffsetX = element.nativeEvent.contentOffset.x;
        const currentIndex = Math.round(contentOffsetX / width);
        setCurrentItemIndex(currentIndex);
        setPropertiesFromIndex(currentIndex);
    };

    const setPropertiesFromIndex = (itemIndex)=> {
        const currentCard = userCards[itemIndex];
        setPersonnage(currentCard?.personnage);
        setVerbe(currentCard?.verbe);
        setObjet(currentCard?.objet);
        setLieu(currentCard?.lieu);
    }

    const handlePrevCard = () => {
        const prevItemIndex = currentItemIndex > 0 ? currentItemIndex - 1 : 0;
        const offset = prevItemIndex * width;
        ref?.current?.scrollToOffset({offset});
        setCurrentItemIndex(prevItemIndex);
        setPropertiesFromIndex(prevItemIndex);
    }
    const handleNextCard = () => {
        if(checkElementNotEmpty() && checkCurrentElementNotEmpty()) {
            const nextItemIndex = currentItemIndex < userCards.length - 1 ? currentItemIndex + 1 : userCards.length - 1;
            const offset = nextItemIndex * width;
            ref?.current?.scrollToOffset({offset});      
            setPropertiesFromIndex(nextItemIndex);
            setCurrentItemIndex(nextItemIndex);
        } else {
            Toast.show({
                type: 'error',
                text1: "Erreur à l'enregistrement de la carte" ,
                text2: "veuillez compléter les éléments de la carte."
              });
        }
        
    }
    const checkElementNotEmpty = () => {
        return personnage !== "" && verbe !== "" && objet !== "" && lieu !== "";
    }

    const checkCurrentElementNotEmpty = () => {
        return userCards[currentItemIndex].personnage !== "" && userCards[currentItemIndex].verbe !== "" && userCards[currentItemIndex].objet !== "" && userCards[currentItemIndex].lieu !== "";
    }
    
    const handleToggleVisibilityAllCards = () =>{
        if(cardFold== false) {
            setToggleCardValuesVisibility(false);
            setCardFold(true);
        } else {
            setToggleCardValuesVisibility(true);
            setCardFold(false);
        }
        
    }
    const handleEndGame = () => {
        props.navigation.push("Accueil Preliminaire");
    }

    const isCardVisible = (keyIn) =>{
        const currentCard = cardVisibility.filter(card => card.key === keyIn);
        return currentCard[0]?.isVisible === false;
    }
    const isInputVisible = (index) => {
        const currentCard = userCards[index];
        return !isCardVisible("card-"+currentCard.couleur+"-"+currentCard.valeur);
    }

    const handleHideAllCards = () => {
        const hideAllCardVisibility = cardVisibility.map((card) => {
            card.isVisible=false;
            return card;
        })
        setCardVisibility(hideAllCardVisibility);
    }

    const isAllCardVisible =() => {
        const listCardNotVisible = cardVisibility.filter(elt => elt.isVisible === false);
        return listCardNotVisible.length === 0;
    }

    const handleToggleElements = () => {
        setShowElements((elt) => !elt);
    }
    
    return (
        <Container source={require("../assets/brainsport-bg.png")}>
            <StatusBar hidden />
            <SafeAreaView>
                <KeyboardAvoidingView behavior="position">
                <TitleBar>
                    <CloseButton>
                        <TouchableOpacity onPress={() => props.navigation.push("Accueil Preliminaire")}>
                            <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
                        </TouchableOpacity>
                    </CloseButton>
                </TitleBar>
                <ScrollView style={{height: "100%"}} showsVerticalScrollIndicator={false}>
                <PlayContent>
                    {isPrePlayHint && <PlayHistoryContainer>
                        <PlayHistoryText>
                            Histoire n°{Math.floor(currentItemIndex / 4) + 1}
                        </PlayHistoryText>
                    </PlayHistoryContainer>}
                    <CardVisual>
                    <CopilotStep 
                        text="Mémorisez les cartes en créant une histoire avec 4 cartes."
                        order={1}
                        name="first-step">
                        <WalkthroughableStepView />
                        </CopilotStep>
                        <Animated.FlatList
                        data={userCards}
                        ref={ref}
                        style={{}}
                        keyExtractor={item => "card-"+item.couleur+"-"+item.valeur}
                        horizontal
                        scrollEventThrottle={32}
                        onMomentumScrollEnd={updateCurrentItemIndex}
                        pagingEnabled
                        showsHorizontalScrollIndicator={false}
                        extraData={cardVisibility}
                        renderItem={({item}) => {

                            const handleToggleVisibilityGame = (keyIn) =>{          
                                const nexCurrentCardVisibility = cardVisibility.map((card) => {
                                    if(card.key === "card-"+keyIn.couleur+"-"+keyIn.valeur) {
                                        if(card.isVisible === false) {
                                            card.isVisible = true;
                                        } else {
                                            card.isVisible=false;
                                        }
                                    }
                                    return card;

                                })
                                setCardVisibility(nexCurrentCardVisibility);
                            }
                           
                            return (<FlatView>
                                <Pressable onPress={() => handleToggleVisibilityGame(item)}>
                                <Card
                                key={"card-"+item.couleur+"-"+item.valeur}
                                couleur={item.couleur}
                                valeur={item.valeur}
                                isFold={isCardVisible("card-"+item.couleur+"-"+item.valeur)}
                                />
                                </Pressable>
                            </FlatView>);
                        }}
                        />
                        <TouchableArrowLeft onPress={()=> handlePrevCard()}>
                            <Ionicons name="chevron-back" size={50} color="#FFFFFF" />
                        </TouchableArrowLeft>
 
                        <TouchableArrowRight onPress={()=> handleNextCard()}>
                            <Ionicons name="chevron-forward" size={50} color="#FFFFFF" />
                        </TouchableArrowRight>
                    </CardVisual>
                    <CardForm>
                        <CopilotStep 
                            text="Vous nommez les éléments des cartes dans votre tête et vous les faites défiler par swipe."
                            order={2}
                            name="naming-step">
                            <WalkthroughableStepView />
                        </CopilotStep>
                    {isInputVisible(currentItemIndex) && <>
                        {showElements && <>
                        <InputContainer>
                            <CopilotStep 
                                text="Retenez les éléments en surbrillance pour chaque carte. Par exemple pour cette carte, il vous faudra mémoriser le personnage pour cette histoire."
                                order={3}
                                name="highlight-step">
                                <WalkthroughableStepView />
                            </CopilotStep>
                            <PreText>Personnage</PreText>
                            <TextInput style={{borderColor: currentItemIndex % 4 == 0 ? "#A138F2" : "#53565f"}} editable={false} value={personnage} onChangeText={(e)=> setPersonnage(e)} />
                        </InputContainer>
                        <InputContainer>
                            <PreText>Verbe</PreText>
                            <TextInput style={{borderColor: currentItemIndex % 4 == 1 ? "#A138F2" : "#53565f"}} editable={false} value={verbe} onChangeText={(e)=> setVerbe(e)} />
                        </InputContainer>
                        <InputContainer >
                            <PreText>Objet</PreText>
                            <TextInput style={{borderColor: currentItemIndex % 4 == 2 ? "#A138F2" : "#53565f"}} editable={false} value={objet} onChangeText={(e)=> setObjet(e)} />
                        </InputContainer>
                        <InputContainer>
                            <PreText>Lieu</PreText>
                            <TextInput style={{borderColor: currentItemIndex % 4 == 3 ? "#A138F2" : "#53565f"}} editable={false} value={lieu} onChangeText={(e)=> setLieu(e)} />
                        </InputContainer></>}
                        <EndGameButton>
 
                        <TouchableOpacity onPress={()=> handleToggleElements()}>
                            <ButtonGameView>
                                {showElements && <ButtonGameText>Cacher les éléments</ButtonGameText>}
                                {!showElements && <ButtonGameText>Afficher les éléments</ButtonGameText>}
                            </ButtonGameView>
                        </TouchableOpacity>

                        {isAllCardVisible() && <TouchableOpacity onPress={()=> handleHideAllCards()}>
                            <ButtonGameView style={{marginBottom: currentItemIndex < userCards.length - 1 ? 130 : 0}}>
                            <CopilotStep 
                            text="Pour commencer le jeu, cliquez sur ce bouton qui retournera face cachée toutes les cartes. Pour vous aider, une question vous sera posée. Vous pourrez de nouveau cliquer sur la carte pour la réafficher. Faites-le pour chaque carte."
                            order={4}
                            name="hide-step">
                            <WalkthroughableStepView />
                            </CopilotStep>
                            <CopilotStep 
                            text="Les histoires sont créées pour l'ensemble des cartes déjà renseignées ? Elles sont mémorisées ? Vous pouvez tenter la restitution. Bon jeu!"
                            order={5}
                            name="final-step">
                            <WalkthroughableStepView />
                            </CopilotStep>
                            
                                <ButtonGameText>Retourner toutes les cartes</ButtonGameText>
                            </ButtonGameView>
                        </TouchableOpacity>}
                        {currentItemIndex === userCards.length - 1 && isAllCardVisible() && <TouchableOpacity onPress={()=> handleEndGame()}>
                            <ButtonGameView style={{marginBottom: 130}}>
                                <ButtonGameText>Terminer le jeu</ButtonGameText>
                            </ButtonGameView>
                        </TouchableOpacity>}

                    </EndGameButton></>}
                    {isPrePlayHint && !isInputVisible(currentItemIndex) &&
                        <HideTextContainer>
                            <HideText>
                                {currentItemIndex % 4 == 0 && "Quel est le personnage de cette histoire ?"}
                                {currentItemIndex % 4 == 1 && "Quel est le verbe de cette histoire ?"}
                                {currentItemIndex % 4 == 2 && "Quel est l'objet de cette histoire ?"}
                                {currentItemIndex % 4 == 3 && "Quel est le lieu de cette histoire ?"}
                            </HideText>
                        </HideTextContainer>
                    }
                    </CardForm>
                </PlayContent>
                </ScrollView>
                </KeyboardAvoidingView>
            </SafeAreaView>
        </Container>);
}

export default copilot({overlay: "svg", animated: true, verticalOffset: Platform.OS ==='ios'? 0 : 30, labels: {
    previous: "Précédent",
    next: "Suivant",
    skip: "Passer",
    finish: "Terminer"
  }, stepNumberComponent: StepNumberComponent, tooltipComponent: TooltipComponent})(PlayPregame);