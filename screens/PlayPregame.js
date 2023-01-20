import { StatusBar } from "expo-status-bar";
import { Ionicons } from "@expo/vector-icons";
import React, { useEffect, useRef, useState } from "react";
import { SafeAreaView, Animated, Dimensions, TouchableOpacity, TouchableWithoutFeedback, KeyboardAvoidingView, Pressable } from "react-native";
import Toast from 'react-native-toast-message';
import styled from 'styled-components/native';
import Card from "../components/Card";

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

const PlayPregame = ({navigation, route}) => {
    const [personnage, setPersonnage] = useState("");
    const [verbe, setVerbe] = useState("");
    const [objet, setObjet] = useState("");
    const [lieu, setLieu] = useState("");
    const [currentItemIndex, setCurrentItemIndex] = useState(0);
    const [cardFold, setCardFold] = useState(false);
    const [toggleCardValuesVisibility, setToggleCardValuesVisibility] = useState(true);
    const { userCards } = route.params;
    const ref = useRef(null);

    useEffect(()=> {
        setPropertiesFromIndex(0);
    },[]);

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
    const handleToggleVisibilityGame = () =>{
        if(cardFold== false) {
            setToggleCardValuesVisibility(false);
            setCardFold(true);
        } else {
            setToggleCardValuesVisibility(true);
            setCardFold(false);
        }
        
    }
    const handleEndGame = () => {
        navigation.goBack();
    }

    return (
        <Container source={require("../assets/brainsport-bg.png")}>
            <StatusBar hidden />
            <SafeAreaView>
                <KeyboardAvoidingView behavior="position">
                <TitleBar>
                    <CloseButton>
                        <TouchableOpacity onPress={() => navigation.goBack()}>
                            <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
                        </TouchableOpacity>
                    </CloseButton>
                </TitleBar>
                <PlayContent>
                    <CardVisual>
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
                        renderItem={({item}) => {
                            return (<FlatView>
                                <Pressable onPress={handleToggleVisibilityGame}>
                                <Card
                                key={"card-"+item.couleur+"-"+item.valeur}
                                couleur={item.couleur}
                                valeur={item.valeur}
                                isFold={cardFold}
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
                    {toggleCardValuesVisibility && <><InputContainer >
                            <PreText>Personnage</PreText>
                            <TextInput editable={false} value={personnage} onChangeText={(e)=> setPersonnage(e)} />
                        </InputContainer>
                        <InputContainer>
                            <PreText>Verbe</PreText>
                            <TextInput editable={false} value={verbe} onChangeText={(e)=> setVerbe(e)} />
                        </InputContainer>
                        <InputContainer >
                            <PreText>Objet</PreText>
                            <TextInput editable={false} value={objet} onChangeText={(e)=> setObjet(e)} />
                        </InputContainer>
                        <InputContainer>
                            <PreText>Lieu</PreText>
                            <TextInput editable={false} value={lieu} onChangeText={(e)=> setLieu(e)} />
                        </InputContainer>
                        <EndGameButton>
                        <TouchableOpacity onPress={()=> handleEndGame()}>
                            <ButtonGameView>
                                <ButtonGameText>Terminer le jeu</ButtonGameText>
                            </ButtonGameView>
                        </TouchableOpacity>
                    </EndGameButton></>}
                    </CardForm>
                </PlayContent>
                </KeyboardAvoidingView>
            </SafeAreaView>
        </Container>);
}

export default PlayPregame;