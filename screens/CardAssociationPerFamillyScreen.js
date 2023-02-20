import { StatusBar } from "expo-status-bar";
import React, { useEffect, useRef, useState } from "react";
import { ActivityIndicator, SafeAreaView, Animated, Dimensions, TouchableOpacity, TouchableWithoutFeedback, KeyboardAvoidingView, ScrollView, View } from "react-native";
import { MaterialCommunityIcons, Ionicons } from '@expo/vector-icons'; 
import Toast from 'react-native-toast-message';
import styled from 'styled-components/native';
import Card from "../components/Card";
import CardService from "../services/Card.service";
import Voice from '@react-native-voice/voice';
import AudioRecordModal from "../components/AudioRecordModal";
import { useDispatch, useSelector } from "react-redux";
import { closeAudio, openAudio } from "../slices/audioSlice";
import { copilot, walkthroughable, CopilotStep } from "react-native-copilot";
import StepNumberComponent from '../components/stepper/StepNumberComponent';
import TooltipComponent from '../components/stepper/TooltipComponent';

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
    margin-top: 30px;
    padding-right: 30px;
    margin-bottom: 30px;
    padding-left: 30px;
`;

const CardForm = styled.View`
  align-items: center;
  margin-bottom: 60px;
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

const ConditionTextContainer = styled.View`
    position: relative;
    margin-top: 10px;
    margin-bottom: 10px;

`
const ConditionText = styled.Text`
    color: #FFFFFF;
    font-size: 14px;
    font-weight: bold;
`

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

const InputView = styled.View`
    position :absolute;
    top: 0;
    right: 0;
    width: 100%;
    height: 100%;
`;

const CardAssociationPerFamillyScreen = (props) => {
    const [recordPersonnageStarted, setRecordPersonnageStarted] = useState(false);
    const [recordVerbeStarted, setRecordVerbeStarted] = useState(false);
    const [recordLieuStarted, setRecordLieuStarted] = useState(false);
    const [recordObjetStarted, setRecordObjetStarted] = useState(false);
    const [results, setResults] = useState([]);
    const [personnage, setPersonnage] = useState("");
    const [verbe, setVerbe] = useState("");
    const [objet, setObjet] = useState("");
    const [lieu, setLieu] = useState("");
    const [conditionalText, setConditionalText] = useState("");
    const [loadingSaveCard, setloadingSaveCard] = useState(false);
    const { userCardsFull, famillyProgress, color } = props.route.params;
    const userCards = userCardsFull?.cards?.filter(elt => elt.couleur === color);
    const [flagUserDataCard, setFlagUserDataCard] = useState(false);
    const ref = useRef(null);
    const audio = useSelector(state => state.audio.value)
    const dispatch = useDispatch();
    const [resultAudio, setResultAudio] = useState("");

    useEffect(()=> {
            setPropertiesFromIndex(0);
    },[]);

    useEffect(()=> {
        CardService.getStepperBeforePlay().then((stepData) => {
            if(stepData?.initCardAssociation) props.start();
        });

        props.copilotEvents.on("stop", () => {
            CardService.updateStepperBeforePlay("initCardAssociation", false);
        });

        return () => {
            props.copilotEvents.off("stop");
        }
    },[]);

    const WalkthroughableInputView = walkthroughable(InputView);
    const WalkthroughableConditionTextContainer = walkthroughable(ConditionTextContainer);
    const WalkthroughableInputContainer = walkthroughable(InputContainer);
    const WalkthroughableSaveButton = walkthroughable(SaveButton);
    const WalkthroughableSigninButton = walkthroughable(SigninButton);

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
    });

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
        
        const currentCard = userCards[itemIndex];
        console.log(currentCard);
        setPersonnage(currentCard?.personnage);
        setVerbe(currentCard?.verbe);
        setObjet(currentCard?.objet);
        setLieu(currentCard?.lieu);
        setConditionalText(gerenateConditions(currentCard?.conditions));
    }

    const gerenateConditions = (conditionElement) => {
        if(conditionElement?.length > 0) {
            const conditionEndText = conditionElement.join(", ");
            return "Le personnage doit commencer par ces lettres : " + conditionEndText;
            
        } else {
            return "Le personnage doit former un couple avec la carte " + conditionElement?.couple;
        }
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

    const handleSaveCurrentCard = () =>{
        setloadingSaveCard(true);
        const currentCard = userCards[currentItemIndex];
        if(checkConditionsCard(personnage, currentCard?.conditions)){
            CardService.saveCard(userCardsFull, calculateIndexToCardsFull(color, currentItemIndex), personnage, verbe, objet, lieu).then(()=> {
                setloadingSaveCard(false);
                Toast.show({
                type: 'success',
                text1: 'Enregistrement réussi',
                text2:  "La carte a bien été enregistrée"
                });
                checkFamillyCardDone(color);
            }).catch((e) => {
                setloadingSaveCard(false);
                console.warn(e);
                Toast.show({
                    type: 'error',
                    text1: "Erreur à l'enregistrement" ,
                    text2: "veuillez réessayer ultérieurement."
                });
            });
        } else {
            setloadingSaveCard(false);
            const conditionEndText = currentCard?.conditions.join(", ");
            Toast.show({
                type: 'error',
                text1: "Erreur à l'enregistrement" ,
                text2: "le personnage doit commencer par ces lettres : " + conditionEndText
            });
        }
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

    const calculateNextColor = (colorIn) => {
        if(colorIn === "coeur") return "carreau";
        if(colorIn === "carreau") return "trefle";
        if(colorIn === "trefle" ||colorIn === "pique") return "pique";
    }

    const checkConditionsCard = (personnage, conditionElement) => {
        if(personnage === "") return true;
        const personnageLowCase = personnage.toLowerCase();
        if(conditionElement?.length > 0) {
            return conditionElement.filter(elt => {
                const eltLowCase = elt.toLowerCase();
                return personnageLowCase.indexOf(eltLowCase) === 0;
            }).length > 0 ? true : false;

        } else {
            return true;
        }
    }
    const checkFamillyCardDone = (colorIn) => {
        const elementCarteRemplie = (element) => element.personnage !== "" && element.verbe !== "" && element.objet !== "" && element.lieu !== "";
        const isListCardFamillyRemplie = userCards.filter(element => element.couleur === colorIn).every(elementCarteRemplie);
        const isListCardFamillyRemplieEightFirst = userCards.filter(element => element.couleur === colorIn && elementCarteRemplie(element)).length === 8;
        const famillyProgressEightFirstParsed = famillyProgress[colorIn].eightFirstCardFilled;
        const famillyProgressAllParsed = famillyProgress[colorIn].allCardFilled;
        console.log("famillyProgressEightFirstParsed : " + famillyProgressEightFirstParsed + " famillyProgressAllParsed " + famillyProgressAllParsed);
        if(isListCardFamillyRemplieEightFirst && !famillyProgressEightFirstParsed) {
            CardService.updateFamillyProgress(famillyProgress, colorIn, "eightFirstCardFilled", true).then((data)=> {
                if(data) props.navigation.navigate("FamillyModal", {texteContent : "Vous avez suffisament créé de cartes pour commencer à jouer et à créer des histoires !"});
            });
        }
        if(isListCardFamillyRemplie && !famillyProgressAllParsed){
            CardService.updateFamillyProgress(famillyProgress, colorIn, "allCardFilled", true).then((data)=> {
                if(data) {
                    const nextColor = calculateNextColor(colorIn);
                    console.log("NEXTCOLOR =>", nextColor);
                    console.log("COLORIN =>", colorIn);
                    if(nextColor === colorIn){
                        CardService.updateFamillyProgress(famillyProgress, nextColor, "eightFirstCardFilled", true).then((data)=> {
                            CardService.updateFamillyProgress(famillyProgress, nextColor, "allCardFilled", true).then((data) => {
                                props.navigation.navigate("FamillyModal", {texteContent : "Félicitations ! Vous avez rempli toutes les familles de cartes ! Vous pouvez désormais aprendre le tableau !"});
                            });
                        }); 
                    } else {                    
                        CardService.updateFamillyProgress(famillyProgress, nextColor, "eightFirstCardFilled", false).then((data)=> {
                            CardService.updateFamillyProgress(famillyProgress, nextColor, "allCardFilled", false).then((data) => {
                                props.navigation.navigate("FamillyModal", {texteContent : "Vous avez rempli toute une famille de carte ! Vous pouvez remplir la famille suivante !"});
                            });
                        }); 
                    }
                }
            });
        } 
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



    return (
        <Container source={require("../assets/brainsport-bg.png")}>
            <StatusBar hidden />
            <SafeAreaView>
            <TitleBar>
                    <CloseButton>
                    <TouchableOpacity onPress={() => props.navigation.push("Accueil Preliminaire")}>
                    <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
                    </TouchableOpacity>
                    </CloseButton>
                </TitleBar>
            <ScrollView style={{height: "100%"}} showsVerticalScrollIndicator={false}>
                <KeyboardAvoidingView behavior="position">
                    <Animated.FlatList
                    data={userCards}
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
                        return (
                        <FlatView>
                            <Card
                            key={"card-"+item.couleur+"-"+item.valeur}
                            couleur={item.couleur}
                            valeur={item.valeur}
                            />
                        </FlatView>
                        );
                    }}
                    />
                    
                    <CardForm>
                        <CopilotStep 
                        text="Chaque personnage de chaque carte doit répondre à une règle en ce qui concerne l’initiale de son nom."
                        order={1}
                        name="second-step">
                        <WalkthroughableConditionTextContainer>
                            <ConditionText>
                                {conditionalText}
                            </ConditionText>
                        </WalkthroughableConditionTextContainer>
                        </CopilotStep>
                        <TouchableWithoutFeedback onPress={() => handleFocusPersonnage()}>
                        
                        <InputContainer>
                            <CopilotStep 
                            text="Choisissez bien des personnages que vous visionnez facilement."
                            order={2}
                            name="third-step">
                                <WalkthroughableInputView />
                            </CopilotStep>
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
                            <CopilotStep 
                            text="Choisissez bien des verbes qui amènent un mouvement physique. Les activités sexuelles peuvent en faire partie."
                            order={3}
                            name="fourth-step">
                                <WalkthroughableInputView />
                            </CopilotStep>
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
                        
                        <InputContainer>
                        <CopilotStep 
                        text="Choisissez bien des objets qui peuvent être grossis, en couleur, qui peuvent faire du bruit."
                        order={4}
                        name="fifth-step">
                            <WalkthroughableInputView />
                        </CopilotStep>
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
                            <CopilotStep 
                            text="Choisissez bien des lieux faciles à visualiser, avec des environnements riches en détails et, si possible, en bruits caractéristiques, ou en odeurs."
                            order={5}
                            name="sixth-step">
                                <WalkthroughableInputView />
                            </CopilotStep>
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
                        <CopilotStep 
                        text="Enregistrez les information de la carte lorsque vous avez correctement rempli."
                        order={6}
                        name="seventh-step">
                        <WalkthroughableSaveButton>
                            <TouchableOpacity onPress={()=> handleSaveCurrentCard()}>
                                <ButtonSaveView>
                                    {!loadingSaveCard && <ButtonSaveText>Enregistrer</ButtonSaveText>}
                                    {loadingSaveCard && <ActivityIndicator size="large" color="#FFFFFF" />}
                                </ButtonSaveView>
                            </TouchableOpacity>
                        </WalkthroughableSaveButton>
                        </CopilotStep>
                        <CopilotStep 
                        text="Une fois enregistré, vous pourrez passer à la carte suivante. Bon jeu !"
                        order={7}
                        name="eighth-step">
                        <WalkthroughableSigninButton>
                            {/* <TouchableOpacity onPress={()=> handlePrevCard()}>
                                <ButtonView>
                                <ButtonText>Carte Précédente</ButtonText>
                                </ButtonView>
                            </TouchableOpacity>
                            <ViewSpace /> */}
                            <TouchableOpacity onPress={()=> handleNextCard()}>
                                <ButtonView>
                                <ButtonText>Carte Suivante</ButtonText>
                                </ButtonView>
                            </TouchableOpacity>
                        </WalkthroughableSigninButton>
                        </CopilotStep>
                    </CardForm>
                </KeyboardAvoidingView>
                </ScrollView>
            </SafeAreaView>
            <AudioRecordModal resultAudio={resultAudio} restartSpeech={handleStartSpeech}/>
        </Container>);
}

export default copilot({overlay: "svg", animated: true, verticalOffset: 30, labels: {
    previous: "Précédent",
    next: "Suivant",
    skip: "Passer",
    finish: "Terminer"
  }, stepNumberComponent: StepNumberComponent, tooltipComponent: TooltipComponent})(CardAssociationPerFamillyScreen);