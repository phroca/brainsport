import { StatusBar } from "expo-status-bar";
import { Ionicons } from "@expo/vector-icons";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { ActivityIndicator, Animated, Dimensions, KeyboardAvoidingView, SafeAreaView, ScrollView, TouchableOpacity, TouchableWithoutFeedback } from "react-native";
import { MaterialCommunityIcons } from '@expo/vector-icons'; 
import Toast from 'react-native-toast-message';
import styled from 'styled-components/native';
import Card from "../components/Card";
import AudioRecordModal from "../components/AudioRecordModal";
import { useDispatch, useSelector } from "react-redux";
import Voice from '@react-native-voice/voice';
import { useFocusEffect } from "@react-navigation/core";
import UserService from "../services/User.service";

const {width, height} = Dimensions.get("screen");
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
  margin-top: 10px;
  margin-bottom: 10px;
`;

const CloseButton = styled.View`
  width: ${widthContent}px;
  justify-content: flex-start;
`;

const FlatView = styled.View`
    width: ${width}px;    
    align-items: center;
    margin-top: 20px;
    margin-bottom: 10px;
    padding-right: 30px;
    padding-left: 30px;
`;

const CardForm = styled.View`
  align-items: center;
  //margin-bottom: 60px;
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

const PostText = styled.View`
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

const ColorContainer = styled.View`
    position: absolute;
    right: 20px;
    top:  ${widthContent/10}px;
`;
const FamillyContainer = styled.View`
    background-color: #FFFFFF;
    border-width: 1px;
    width: 30px;
    height: 30px;
    border-radius: 5px;
    align-items: center;
    justify-content: center;
    margin-top: 10px;
    margin-bottom: 10px;
`;


const LibraryCardScreen = ({route, navigation}) => {
    const [recordPersonnageStarted, setRecordPersonnageStarted] = useState(false);
    const [recordVerbeStarted, setRecordVerbeStarted] = useState(false);
    const [recordLieuStarted, setRecordLieuStarted] = useState(false);
    const [recordObjetStarted, setRecordObjetStarted] = useState(false);
    const [results, setResults] = useState([]);
    const [personnage, setPersonnage] = useState("");
    const [verbe, setVerbe] = useState("");
    const [objet, setObjet] = useState("");
    const [lieu, setLieu] = useState("");
    const [loadingSaveCard, setloadingSaveCard] = useState(false);
    const [userCardLength, setUserCardLength] = useState(0);
    const { userCards } = route.params;
    const ref = useRef(null);
    const audio = useSelector(state => state.audio.value)
    const dispatch = useDispatch();
    const [resultAudio, setResultAudio] = useState("");
    const [flagUserCardProgressFiltered, setFlagUserCardProgressFiltered] = useState(false)
    useEffect(()=> {
        setPropertiesFromIndex(0);
    },[]);

    useFocusEffect(
        useCallback(() => {
            const currentUserDataCardElementInProgressFiltered = userCards.cards.filter(element => element.personnage !== "" && element.verbe !== "" && element.objet !== "" && element.lieu !== "");
            setUserCardLength(currentUserDataCardElementInProgressFiltered.length);
        }, [userCards])
      );

    useEffect(()=> {
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
            setResults([]);
        }
    },[]);

    useEffect(()=> {
        if(audio === "retryRecordAudio") {
            handleStartSpeech();
        }
        if(audio === "closeAudio"){
            Voice.stop();
            reinitRecords();
        }
    }, [audio]);

    useEffect(()=> {
        if(results.length > 0) {
            setResultAudio(results[results.length -1]);
            if(recordPersonnageStarted) setPersonnage(results[results.length -1]);
            if(recordVerbeStarted) setVerbe(results[results.length -1]);
            if(recordObjetStarted) setObjet(results[results.length -1]);
            if(recordLieuStarted) setLieu(results[results.length -1]);
            reinitRecords();
        }
    }, [results]);

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
        UserService.saveOneCard(userCards, currentItemIndex, personnage, verbe, objet, lieu).then(()=> {
            setloadingSaveCard(false);
            Toast.show({
              type: 'success',
              text1: 'Enregistrement réussi',
              text2:  "La carte a bien été enregistrée"
            });
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
        if( currentItemIndex < userCardLength - 1) {
            if(checkElementNotEmpty() && checkCurrentElementNotEmpty()) {
                const nextItemIndex = currentItemIndex < userCards.cards.length - 1 ? currentItemIndex + 1 : userCards.cards.length - 1;
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
    }

    const checkElementNotEmpty = () => {
        return personnage !== "" && verbe !== "" && objet !== "" && lieu !== "";
    }

    const checkCurrentElementNotEmpty = () => {
        return userCards.cards[currentItemIndex].personnage !== "" && userCards.cards[currentItemIndex].verbe !== "" && userCards.cards[currentItemIndex].objet !== "" && userCards.cards[currentItemIndex].lieu !== "";
    }
    const openStartSpeech = (input) => {
        dispatch(openAudio());
        switch (input) {
            case "personnage":
                setRecordPersonnageStarted(true);
                break;
            case "verbe":
                setRecordVerbeStarted(true);
                break;
            case "objet":
                setRecordObjetStarted(true);
            break;         
            case "lieu":
                setRecordLieuStarted(true);
                break;
            default:
                break;
        }
    }

    const handleStartSpeech = async (input) => {
        try {
            setResultAudio("");
            await Voice.start("fr-FR");
            if(input){
                openStartSpeech(input);
            }
        } catch (e){
            console.error(e);
        }
    }

    const reinitRecords = () =>{
        setRecordPersonnageStarted(false);
        setRecordVerbeStarted(false);
        setRecordObjetStarted(false);
        setRecordLieuStarted(false);
    }
    const handleStartSpeechForPersonnage = async () => {
        handleStartSpeech("personnage");
    }

    const handleStopSpeechForPersonnage = async () => {
        await Voice.stop();
        setPersonnage(results[results.length -1]);
        setRecordPersonnageStarted(false);
    }

    const handleStartSpeechForVerbe = async () => {
        handleStartSpeech("verbe");
    }

    const handleStopSpeechForVerbe = async () => {
        await Voice.stop();
        setVerbe(results[results.length -1]);
        setRecordVerbeStarted(false);
    }

    const handleStartSpeechForObjet = async () => {
        handleStartSpeech("objet");
    }

    const handleStopSpeechForObjet = async () => {
        await Voice.stop();
        setObjet(results[results.length -1]);
        setRecordObjetStarted(false);
    }

    const handleStartSpeechForLieu = async () => {
        handleStartSpeech("lieu");
    }

    const handleStopSpeechForLieu = async () => {
        await Voice.stop();
        setLieu(results[results.length -1]);
        setRecordLieuStarted(false);
    }


    const calculateIndexToCardsFull = (color, itemindex) => {
        const numbercardPerFamilly = 13;
        const colorAssociation = {
            "coeur": 0,
            "carreau": 1,
            "trefle": 2, 
            "pique": 3,
        };
        return (colorAssociation[color] * numbercardPerFamilly) + itemindex;
    }

    const handleGotoIndex = (index) => {
        const nextItemIndex = index;
        const offset = nextItemIndex * width;
        ref?.current?.scrollToOffset({offset});      
        setPropertiesFromIndex(nextItemIndex);
        setCurrentItemIndex(nextItemIndex);
    }

    return (
        <Container source={require("../assets/brainsport-bg.png")}>
            <StatusBar hidden />
            <SafeAreaView>
                <TitleBar>
                    <CloseButton>
                        <TouchableOpacity onPress={() => navigation.push("Profil Home")}>
                            <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
                        </TouchableOpacity>
                    </CloseButton>
                </TitleBar>
                    <KeyboardAvoidingView behavior="position">
                        <Animated.FlatList
                        data={userCards.cards}
                        ref={ref}
                        style={{}}
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
                        <ColorContainer>
                            {userCardLength > 13 && 
                            
                            <TouchableOpacity style={{flexDirection:"row", justifyContent:"center", alignItems: "center"}} onPress={()=> handleGotoIndex(0)}>
                            {currentItemIndex < 13 && <MaterialCommunityIcons name="arrow-right" size={20} color="#FFFFFF" />}
                                <FamillyContainer style={{borderColor: currentItemIndex < 13 ? "#A138F2" : "#FFFFFF", }}>
                                    <MaterialCommunityIcons name="cards-heart" size={20} color="red" />
                                </FamillyContainer>
                            </TouchableOpacity>}
                            {userCardLength > 13 && <TouchableOpacity style={{flexDirection:"row", justifyContent:"center", alignItems: "center"}} onPress={()=> handleGotoIndex(13)}>
                            {currentItemIndex >= 13 && currentItemIndex < 26 && <MaterialCommunityIcons name="arrow-right" size={20} color="#FFFFFF" />}
                                <FamillyContainer style={{borderColor: currentItemIndex >= 13 && currentItemIndex < 26 ? "#A138F2" : "#FFFFFF"}}>
                                    <MaterialCommunityIcons name="cards-diamond" size={20} color="red" />
                                </FamillyContainer>
                            </TouchableOpacity>}
                            {userCardLength > 26 && <TouchableOpacity style={{flexDirection:"row", justifyContent:"center", alignItems: "center"}} onPress={()=> handleGotoIndex(26)}>
                            {currentItemIndex >= 26 && currentItemIndex < 39 && <MaterialCommunityIcons name="arrow-right" size={20} color="#FFFFFF" />}
                                <FamillyContainer style={{borderColor: currentItemIndex >= 26 && currentItemIndex < 39 ? "#A138F2" : "#FFFFFF"}}>
                                    <MaterialCommunityIcons name="cards-club" size={20} color="black" />
                                </FamillyContainer>
                            </TouchableOpacity>}
                            {userCardLength > 39 && <TouchableOpacity style={{flexDirection:"row", justifyContent:"center", alignItems: "center"}} onPress={()=> handleGotoIndex(39)}>
                            {currentItemIndex >= 39 && currentItemIndex < 52 && <MaterialCommunityIcons name="arrow-right" size={20} color="#FFFFFF" />}
                                <FamillyContainer style={{borderColor: currentItemIndex >= 39 && currentItemIndex < 52 ? "#A138F2" : "#FFFFFF"}}>
                                    <MaterialCommunityIcons name="cards-spade" size={20} color="black" />
                                </FamillyContainer>
                            </TouchableOpacity>}
                        </ColorContainer>
                        <CardForm>
                            <TouchableWithoutFeedback onPress={() => handleFocusPersonnage()}>
                            <InputContainer >
                                <PreText>Personnage</PreText>
                                <TextInput ref={refPersonnage} value={personnage} onChangeText={(e)=> setPersonnage(e)} />
                                <PostText>
                                {!recordPersonnageStarted &&<TouchableOpacity onPress={()=> handleStartSpeechForPersonnage()}>
                                        <MaterialCommunityIcons name="text-to-speech" size={20} color="white" />
                                    </TouchableOpacity> }
                                {recordPersonnageStarted && <TouchableOpacity onPress={()=> handleStopSpeechForPersonnage()}>
                                    <MaterialCommunityIcons name="record" size={20} color="red" />
                                    </TouchableOpacity> }

                                </PostText>
                            </InputContainer>
                            </TouchableWithoutFeedback>
                            <TouchableWithoutFeedback onPress={() => handleFocusVerbe()}>
                            <InputContainer>
                                <PreText>Verbe</PreText>
                                <TextInput ref={refVerbe} value={verbe} onChangeText={(e)=> setVerbe(e)} />
                                <PostText>
                                {!recordVerbeStarted &&<TouchableOpacity onPress={()=> handleStartSpeechForVerbe()}>
                                        <MaterialCommunityIcons name="text-to-speech" size={20} color="white" />
                                    </TouchableOpacity> }
                                {recordVerbeStarted && <TouchableOpacity onPress={()=> handleStopSpeechForVerbe()}>
                                    <MaterialCommunityIcons name="record" size={20} color="red" />
                                    </TouchableOpacity> }

                                </PostText>
                            </InputContainer>
                            </TouchableWithoutFeedback>
                            <TouchableWithoutFeedback onPress={() => handleFocusObjet()}>
                            <InputContainer >
                                <PreText>Objet</PreText>
                                <TextInput ref={refObjet} value={objet} onChangeText={(e)=> setObjet(e)} />
                                <PostText>
                                {!recordObjetStarted &&<TouchableOpacity onPress={()=> handleStartSpeechForObjet()}>
                                        <MaterialCommunityIcons name="text-to-speech" size={20} color="white" />
                                    </TouchableOpacity> }
                                {recordObjetStarted && <TouchableOpacity onPress={()=> handleStopSpeechForObjet()}>
                                    <MaterialCommunityIcons name="record" size={20} color="red" />
                                    </TouchableOpacity> }

                                </PostText>
                            </InputContainer>
                            </TouchableWithoutFeedback>
                            <TouchableWithoutFeedback onPress={() => handleFocusLieu()}>
                            <InputContainer>
                                <PreText>Lieu</PreText>
                                <TextInput ref={refLieu} value={lieu} onChangeText={(e)=> setLieu(e)} />
                                <PostText>
                                {!recordLieuStarted &&<TouchableOpacity onPress={()=> handleStartSpeechForLieu()}>
                                        <MaterialCommunityIcons name="text-to-speech" size={20} color="white" />
                                    </TouchableOpacity> }
                                {recordLieuStarted && <TouchableOpacity onPress={()=> handleStopSpeechForLieu()}>
                                    <MaterialCommunityIcons name="record" size={20} color="red" />
                                    </TouchableOpacity> }

                                </PostText>
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
                    </KeyboardAvoidingView>
            </SafeAreaView>
            <AudioRecordModal resultAudio={resultAudio} restartSpeech={handleStartSpeech}/>
        </Container>);
}

export default LibraryCardScreen;