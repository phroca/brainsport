import { StatusBar } from "expo-status-bar";
import React, { useEffect, useRef, useState } from "react";
import { Animated, Dimensions, TouchableOpacity, TouchableWithoutFeedback } from "react-native";
import styled from 'styled-components/native';
import Card from "../components/Card";
import CardService from "../services/Card.service";
import tab from "../tabCard.json"
const {width, height} = Dimensions.get("screen");

const Container = styled.ImageBackground`
  flex:1;
  width: 100%;
  height: 100%;
`;

const FlatView = styled.View`
    width: ${width}px;    
    align-items: center;
    margin-top: 50px;
    padding-right: 30px;
    padding-left: 30px;
`;

const CardForm = styled.View`
  align-items: center;
  flex: .9;
`;

const TextInput = styled.TextInput`
  border: 1px solid #53565f;
  width: 295px;
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

const ButtonView = styled.View`
  background: #FFFFFF;
  width: 140px;
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

const InputContainer = styled.View`
    position: relative;
`;

const SigninButton = styled.View`
    flex-direction: row;
`;

const ViewSpace = styled.View`
    width: 15px;
`;
const CardAssociationScreen = ({route}) => {
    const [personnage, setPersonnage] = useState("");
    const [verbe, setVerbe] = useState("");
    const [objet, setObjet] = useState("");
    const [lieu, setLieu] = useState("");
    const { userCards } = route.params;
    //const [userCards, setUserCards] = useState({"userId": "", "cards": []});
    const ref = useRef(null);
    useEffect(()=> {
        setPropertiesFromIndex(0);
        // CardService.getUserCardsMock().then((userCardsData)=> {
        //     setUserCards(userCardsData);
        //     console.log("USERDATA CARD =>>", userCardsData);
            
        // });
    },[]);

    const [currentItemIndex, setCurrentItemIndex] = useState(0);
    const updateCurrentItemIndex = element => {
        const contentOffsetX = element.nativeEvent.contentOffset.x;
        const currentIndex = Math.round(contentOffsetX / width);
        setCurrentItemIndex(currentIndex);
    };

    const refPersonnage = useRef(null);
    const handleFocusPersonnage = () => {
        refPersonnage.current.focus();
    }
    const refVerbe = useRef(null);
    const handleFocusVerbe = () => {
        refVerbe.current.focus();
    }
    const refObjet = useRef(null);
    const handleFocusObjet = () => {
        refObjet.current.focus();
    }
    const refLieu = useRef(null);
    const handleFocusLieu = () => {
        refLieu.current.focus();
    }
    const setPropertiesFromIndex = (itemIndex)=> {
        const currentCard = userCards.cards[itemIndex];
        setPersonnage(currentCard.personnage);
        setVerbe(currentCard.verbe);
        setObjet(currentCard.objet);
        setLieu(currentCard.lieu);
    }

    const handlePrevCard = () => {
        const prevItemIndex = currentItemIndex > 0 ? currentItemIndex - 1 : 0;
        const offset = prevItemIndex * width;
        ref?.current?.scrollToOffset({offset});
        setCurrentItemIndex(prevItemIndex);
        setPropertiesFromIndex(prevItemIndex);
    }
    const handleNextCard = () => {
        const nextItemIndex = currentItemIndex < userCards.cards.length - 1 ? currentItemIndex + 1 : userCards.cards.length - 1;
        const offset = nextItemIndex * width;
        ref?.current?.scrollToOffset({offset});
        CardService.saveCard(userCards, currentItemIndex, personnage, verbe, objet, lieu);
        setPropertiesFromIndex(nextItemIndex);
        setCurrentItemIndex(nextItemIndex);
    }
    return (
        <Container source={require("../assets/brainsport-bg.png")}>
            <StatusBar hidden />
            <Animated.FlatList
            data={userCards.cards}
            ref={ref}
            style={{flex: 0.1}}
            keyExtractor={item => "card-"+item.couleur+"-"+item.valeur}
            horizontal
            scrollEventThrottle={32}
            onMomentumScrollEnd={updateCurrentItemIndex}
            pagingEnabled={false}
            scrollEnabled={false}
            showsHorizontalScrollIndicator={false}
            renderItem={({item, index}) => {
                return (<FlatView>
                    <Card
                    key={"card-"+item.couleur+"-"+item.valeur}
                    couleur={item.couleur}
                    valeur={item.valeur}
                    />
                </FlatView>);
            }}
            />

            <CardForm>
                <TouchableWithoutFeedback onPress={() => handleFocusPersonnage()}>
                <InputContainer >
                    <PreText>Personnage</PreText>
                    <TextInput ref={refPersonnage} value={personnage} onChangeText={(e)=> setPersonnage(e)} />
                </InputContainer>
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback onPress={() => handleFocusVerbe()}>
                <InputContainer>
                    <PreText>Verbe</PreText>
                    <TextInput ref={refVerbe} value={verbe} onChangeText={(e)=> setVerbe(e)} />
                </InputContainer>
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback onPress={() => handleFocusObjet()}>
                <InputContainer >
                    <PreText>Objet</PreText>
                    <TextInput ref={refObjet} value={objet} onChangeText={(e)=> setObjet(e)} />
                </InputContainer>
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback onPress={() => handleFocusLieu()}>
                <InputContainer>
                    <PreText>Lieu</PreText>
                    <TextInput ref={refLieu} value={lieu} onChangeText={(e)=> setLieu(e)} />
                </InputContainer>
                </TouchableWithoutFeedback>
                <SigninButton>
                    <TouchableOpacity onPress={()=> handlePrevCard()}>
                        <ButtonView>
                        <ButtonText>Carte Précédente</ButtonText>
                        </ButtonView>
                    </TouchableOpacity>
                    <ViewSpace />
                    <TouchableOpacity onPress={()=> handleNextCard()}>
                        <ButtonView>
                        <ButtonText>Carte Suivante</ButtonText>
                        </ButtonView>
                    </TouchableOpacity>
                </SigninButton>
            </CardForm>
        </Container>);
}

export default CardAssociationScreen;