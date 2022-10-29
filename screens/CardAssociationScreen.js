import { StatusBar } from "expo-status-bar";
import React, { useEffect, useRef, useState } from "react";
import { ActivityIndicator, Animated, Dimensions, TouchableOpacity, TouchableWithoutFeedback } from "react-native";
import { MaterialCommunityIcons } from '@expo/vector-icons'; 
import Toast from 'react-native-toast-message';
import styled from 'styled-components/native';
import Card from "../components/Card";
import CardService from "../services/Card.service";
//import Voice from '@react-native-voice/voice';

const {width, height} = Dimensions.get("screen");
const widthContent = width - 50;

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

const ButtonView = styled.View`
  background: #FFFFFF;
  width: ${widthContent/2 -10}px;;
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

const ButtonSaveText = styled.Text`
color: #FFFFFF;
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

const SigninButton = styled.View`
    flex-direction: row;
`;

const SaveButton = styled.View`
    position: relative;
    justify-content: center;
    align-items: center;
`;

const ButtonSaveView = styled.View`
  background: #A138F2;
  width: ${widthContent}px;
  height: 50px;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  margin-top: 20px;
`;

const ViewSpace = styled.View`
    width: 20px;
`;

const CardAssociationScreen = ({route, navigation}) => {
    const [recordStarted, setRecordStarted] = useState(false);
    const [results, setResults] = useState([]);
    const [personnage, setPersonnage] = useState("");
    const [verbe, setVerbe] = useState("");
    const [objet, setObjet] = useState("");
    const [lieu, setLieu] = useState("");
    const [loadingSaveCard, setloadingSaveCard] = useState(false);
    const { userCards, famillyProgress } = route.params;
    const ref = useRef(null);
    useEffect(()=> {
        setPropertiesFromIndex(0);
    },[]);

    /*useEffect(()=> {
        const onSpeechResults = (result) => {
            console.log("result =>",result.value);
            setResults(result.value ?? []);
        };
        const onSpeechStart = (data) => {
            console.log("start =>", data);
        };
        
        const onSpeechError = (error) => {
        console.log(error);
        };
        
        Voice.onSpeechStart = onSpeechStart;
        Voice.onSpeechError = onSpeechError;
        Voice.onSpeechResults = onSpeechResults;
        return () => {
            Voice.destroy().then(Voice.removeAllListeners);
        }
    },[]);*/

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
        setPersonnage(currentCard?.personnage);
        setVerbe(currentCard?.verbe);
        setObjet(currentCard?.objet);
        setLieu(currentCard?.lieu);
    }

    const handleSaveCurrentCard = () =>{
        setloadingSaveCard(true);
        CardService.saveCard(userCards, currentItemIndex, personnage, verbe, objet, lieu).then(()=> {
            setloadingSaveCard(false);
            Toast.show({
              type: 'success',
              text1: 'Enregistrement réussi',
              text2:  "La carte a bien été enregistrée"
            });
            checkFamillyCardDone();
        }).catch((e) => {
            setloadingSaveCard(false);
            Toast.show({
                type: 'error',
                text1: "Erreur à l'enregistrement" ,
                text2: "veuillez réessayer ultérieurement."
              });
        });
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
        setPropertiesFromIndex(nextItemIndex);
        setCurrentItemIndex(nextItemIndex);
    }

    const checkFamillyCardDone = () => {
        const elementCarteRemplie = (element) => element.personnage !== "" && element.verbe !== "" && element.objet !== "" && element.lieu != "";
        const isListCardCoeurFamillyRemplie = userCards.cards.filter(element => element.couleur === "coeur").every(elementCarteRemplie);
        const isListCardCarreauFamillyRemplie = userCards.cards.filter(element => element.couleur === "carreau").every(elementCarteRemplie);
        const isListCardTrefleFamillyRemplie = userCards.cards.filter(element => element.couleur === "trefle").every(elementCarteRemplie);
        const isListCardPiqueFamillyRemplie = userCards.cards.filter(element => element.couleur === "pique").every(elementCarteRemplie);
        
        if(isListCardCoeurFamillyRemplie && !famillyProgress.coeur){
            CardService.updateFamillyProgress(famillyProgress, "coeur", true).then((data)=> {
                if(data) navigation.navigate("FamillyModal")
            });
        } 
        if(isListCardCarreauFamillyRemplie && !famillyProgress.carreau){
            CardService.updateFamillyProgress(famillyProgress, "carreau", true).then((data)=> {
                if(data) navigation.navigate("FamillyModal")
            });
        } 
        if(isListCardTrefleFamillyRemplie && !famillyProgress.trefle){
            CardService.updateFamillyProgress(famillyProgress, "trefle", true).then((data)=> {
                if(data) navigation.navigate("FamillyModal")
            });
        } 
        if(isListCardPiqueFamillyRemplie && !famillyProgress.pique){
            CardService.updateFamillyProgress(famillyProgress, "pique", true).then((data)=> {
                if(data) navigation.navigate("FamillyModal")
            });
        } 
/*
        const isUneFamilleRemplie = isListCardCoeurFamillyRemplie || isListCardCarreauFamillyRemplie || isListCardTrefleFamillyRemplie || isListCardPiqueFamillyRemplie;
        const isDeuxFamillesRemplies = (isListCardCoeurFamillyRemplie && isListCardCarreauFamillyRemplie) || (isListCardCoeurFamillyRemplie && isListCardTrefleFamillyRemplie) 
        || (isListCardCoeurFamillyRemplie && isListCardPiqueFamillyRemplie) || (isListCardCarreauFamillyRemplie && isListCardTrefleFamillyRemplie) 
        || (isListCardCarreauFamillyRemplie && isListCardPiqueFamillyRemplie) || (isListCardPiqueFamillyRemplie && isListCardTrefleFamillyRemplie)
        const isTroisFamillesRemplies = (isListCardCoeurFamillyRemplie && isListCardCarreauFamillyRemplie && isListCardTrefleFamillyRemplie) || 
        (isListCardCarreauFamillyRemplie && isListCardTrefleFamillyRemplie && isListCardPiqueFamillyRemplie) 
        || (isListCardCoeurFamillyRemplie && isListCardCarreauFamillyRemplie  && isListCardPiqueFamillyRemplie) 
        || (isListCardCoeurFamillyRemplie && isListCardTrefleFamillyRemplie && isListCardPiqueFamillyRemplie) 
        const isToutesFamillesRemplies = isListCardCoeurFamillyRemplie && isListCardCarreauFamillyRemplie && isListCardTrefleFamillyRemplie && isListCardPiqueFamillyRemplie
        */
    }

    const handleStartSpeechForPersonnage = async () => {
        /*try {
            await Voice.start("fr-FR");
            setRecordStarted(true);
        } catch (e){
            console.error(e);
        }  */
    }

    const handleStopSpeechForPersonnage = async () => {
        /*await Voice.stop();
        setPersonnage(results.join(" "));
        setRecordStarted(false);*/
    }


    return (
        <Container source={require("../assets/brainsport-bg.png")}>
            <StatusBar hidden />
            <Animated.FlatList
            data={userCards.cards}
            ref={ref}
            style={{flex: 0.1, marginBottom: -130}}
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
                    <PostText>
                    {!recordStarted &&<TouchableOpacity onPress={()=> handleStartSpeechForPersonnage()}>
                            <MaterialCommunityIcons name="text-to-speech" size={20} color="white" />
                        </TouchableOpacity> }
                    {recordStarted && <TouchableOpacity onPress={()=> handleStopSpeechForPersonnage()}>
                        <MaterialCommunityIcons name="record" size={20} color="red" />
                        </TouchableOpacity> }

                    </PostText>
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
                <SaveButton>
                    <TouchableOpacity onPress={()=> handleSaveCurrentCard()}>
                        <ButtonSaveView>
                            {!loadingSaveCard && <ButtonSaveText>Enregistrer</ButtonSaveText>}
                            {loadingSaveCard && <ActivityIndicator size="large" color="#FFFFFF" />}
                        </ButtonSaveView>
                    </TouchableOpacity>
                </SaveButton>
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