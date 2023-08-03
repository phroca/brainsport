import React, { useEffect, useRef, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { Animated, ScrollView, TouchableOpacity, Dimensions, Text } from "react-native";
import { MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';
import styled from 'styled-components/native';
import Card from "../components/Card";
import Voice from '@react-native-voice/voice';
import UserService from "../services/User.service";
import { useSelector } from "react-redux";
import { useCalculatePlayPoints } from "../hooks/useCalculatePoints";

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;
const widthContent = screenWidth  - 50;

const listChoose =[
    "Personnage", "Verbe", "Objet", "Lieu"
];

const Container = styled.ImageBackground`
    align-items: center;
    justify-content: center;
  width: 100%;
  height: 100%;
`;

const Header = styled.View`
    width: ${widthContent}px;
    height: 50px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 30px;
    margin-top: 20px;
    flex-direction: row;
`;

const CloseButton = styled.View`
  width: ${widthContent/8}px;
  align-items: flex-end;
`;

const ChronoContainer = styled.View`
    width: ${widthContent/8}px;
    flex-direction: row;
`;

const ChronoText = styled.Text`
    color: #FFFFFF;
    font-size: 12px;
`;

const FlatView = styled.View`
    width: ${screenWidth}px;    
    align-items: center;
    margin-top: 10px;
    padding-right: 30px;
    padding-left: 30px;
`;

const TitleChooseContainer = styled.View`
    height: 40px;
    align-items: center;
    bottom: ${props=> props.bottom}px;
`;

const TitleChoose = styled.Text`
    color: #FFFFFF;
    font-size: 30px;
    font-weight: bold;
`;

const ResponseCardContainer = styled.View`
    justify-content: center;
    align-items: center;
    bottom: 190px;
`;

const ResponseLabel =styled.Text`
    color: #FFFFFF;
    font-size: 20px;
    font-weight: bold;
`;

const ChronoButton = styled.View`
    bottom: 100px;
    justify-content: center;
    align-items: center;
`;

const ButtonContainer = styled.View`
    justify-content: center;
    align-items: center;
    bottom: 100px;
`;
const ButtonMidContainer = styled.View`
    justify-content: center;
    align-items: center;
    bottom: 100px;
`;

const ContainerNoResult = styled.View`
    justify-content: center;
    align-items: center;
    width: ${widthContent}px;
    flex-direction: row;
`;

const ContainerVoice = styled.View`
    justify-content: center;
    align-items: center;
    width: 30px;
    height: 30px;
    border-radius: 30px;
    background-color: #FFFFFF;
    margin: 0 10px;
`

const TouchableBtnFinish = styled.TouchableOpacity`
    width: ${widthContent}px;
    height: 50px;
    background-color: #FFFFFF;
    justify-content: center;
    align-items: center;
    border-radius: 10px;
`;

const TouchableBtnNext = styled.TouchableOpacity`
    height: 50px;
    width: ${widthContent}px;
    justify-content: center;
    align-items: center;
    background-color: #FFFFFF;
    border-radius: 10px;

`;
const TouchableBtnMid = styled.TouchableOpacity`
    height: 50px;
    width: ${widthContent / 2 - 5}px;
    justify-content: center;
    align-items: center;
    background-color: #FFFFFF;
    border-radius: 10px;
    margin: 0 5px;
`;
const TouchableBtnMidValidate = styled.TouchableOpacity`
    height: 50px;
    width: ${widthContent / 2 - 5}px;
    justify-content: center;
    align-items: center;
    background-color: #A138F2;
    border-radius: 10px;
    margin: 0 5px;
`;

const TextContinue = styled.Text`
    text-transform: uppercase;
    color: #000000;
    font-weight: bold;
`;
const TextValidate = styled.Text`
    text-transform: uppercase;
    color: #FFFFFF;
    font-weight: bold;
`;
const TextFinish = styled.Text`
    text-transform: uppercase;
    color: #000000;
    font-weight: bold;
`;
const TitleReady = styled.Text`
    color: #FFFFFF;
    font-weight: bold;
    font-size: 40px;
    text-align: center;
`;
const Timing = styled.Text`
    text-transform: uppercase;
    color: #FFFFFF;
    font-weight: bold;
    font-size: 190px;
`;

const TextProgress = styled.Text`
    color: #FFFFFF;
    font-weight: bold;
    font-size: 20px;
    text-align: center;
    bottom: 70px;
`;


const TextInput = styled.TextInput`
  border: 1px solid #53565f;
  width: ${widthContent}px;
  height: 60px;
  border-radius: 10px;
  font-size: 17px;
  color: #FFFFFF;
  padding-left: 10px;
  padding-right: 10px;
  margin-top: 20px;
  background: #3c4560;
`;

const InputContainer = styled.View`
    justify-content: center;
    align-items: center;
    bottom: 140px;
`

const HistoryModeContainer = styled.View`
    width: ${widthContent/8}px;
    align-items: center;
`;

const ButtonGroup = styled.View`
    flex-direction: row;
`;
const PlayCardFamilly = ({navigation, route}) => {
    const [preSec, setPreSec] = useState(5);
    const [sec, setSec] = useState(0);
    const [intervalTime, setIntervalTime] = useState(null);
    const { famillyToPlay, isRandom } = route.params;
    const [ cardsPlay, setCardsPlay] = useState([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [currentQuestion, setCurrentQuestion] = useState("");
    const [currentResult, setCurrentResult] = useState("");
    const [isFinished, setFinished] = useState(false);
    const [currentListChoose, setCurrentListChoose] = useState(listChoose);
    const [results, setResults] = useState([]);
    const [resultCurrentfromVoice, setResultCurrentfromVoice] = useState("");
    const [currentItemIndex, setCurrentItemIndex] = useState(0);
    const [progressionPercentage, setProgressionPercentage] = useState(0);
    const [flagReady, setFlagReady] = useState(false);
    const [isVoice, setIsVoice] = useState(true);
    const currentResultRef = useRef(null);
    const user = useSelector(state => state.user.value);

    useEffect(()=> {
        let chrono = null
        if(!flagReady){
            chrono = setInterval(() => {
                setPreSec(sec=> sec - 1); 
            }, 1000);
        } else {
            clearInterval(chrono); 
        }
        return () => clearInterval(chrono);    
    }, [flagReady]);

    useEffect(() => {
        if(preSec === 0) setFlagReady(true);
    },[preSec])

    const ref = useRef(null);
    let padToTwo = (number) => (number <= 9 ? `0${number}`: number);

    useEffect(()=> {
        let int = null;
        if(isFinished === false && flagReady ===true){
            int = setInterval(() => {
                setSec(sec=> sec + 1);
            }, 1000);
        } else {
            clearInterval(int);
        } 
        return () => clearInterval(int);
    },[isFinished, flagReady])

    useEffect(() => {
        if(isRandom) {
            setCurrentListChoose(shuffleList(listChoose));
        }
        setCurrentQuestion(currentListChoose[0]);
        const shuffledArray = famillyToPlay.sort((a, b) => 0.5 - Math.random());
        setCardsPlay(shuffledArray);
        return () => {
            setCardsPlay([]);
            setCurrentQuestion("");
        }
    }, [])

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
        handleStartSpeech();
        };
        
        Voice.onSpeechStart = onSpeechStart;
        Voice.onSpeechError = onSpeechError;
        Voice.onSpeechResults = onSpeechResults;
        handleStartSpeech();
        return () => {
            Voice.destroy().then(Voice.removeAllListeners);
            setResults([]);
        }
    }, [])

    useEffect(() => {
        console.log("RESULTS" + results);
        if(results.length > 0 && cardsPlay !== null) {
            const resultOut = results[results.length -1].toLowerCase();
            const currentItem = cardsPlay[currentItemIndex];
            const currentQuestionLowercase = currentQuestion.toLowerCase();
            setResultCurrentfromVoice(resultOut);
            if(resultOut === currentItem[currentQuestionLowercase].toLowerCase()) {
                handleNextOnList();
                setResults([]);
            }
        }
        return () => {
            setResults([]);
        }
    },[results]);

    const reset = () => {
        clearInterval(this.interval);
    }

    const shuffleList = (array) =>{
        let currentIndex = array.length,  randomIndex;

        // While there remain elements to shuffle.
        while (currentIndex != 0) {
      
          // Pick a remaining element.
          randomIndex = Math.floor(Math.random() * currentIndex);
          currentIndex--;
      
          // And swap it with the current element.
          [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]];
        }
      
        return array;
    }

    const updateCurrentItemIndex = element => {
        const contentOffsetX = element.nativeEvent.contentOffset.x;
        const currentIndex = Math.round(contentOffsetX / screenWidth);
        setCurrentItemIndex(currentIndex);
    };

    const handleNextOnList = () => {
        let id = currentQuestionIndex;
        
        if(id === 3 ) {
            if(currentItemIndex !== cardsPlay.length -1){
                setCurrentQuestionIndex(0);
                if(isRandom) {
                    setCurrentListChoose(shuffleList(listChoose));
                }
                setCurrentQuestion(currentListChoose[0]);
                goNextItem();
            }
        } else {
            id++;
            setCurrentQuestionIndex(id);
            setCurrentQuestion(currentListChoose[id]); 
        }
        setResultCurrentfromVoice("");
        handleStartSpeech();
    }

    const handleValidateCurrentResult = () => {
        const currentItem = cardsPlay[currentItemIndex];
        const currentQuestionLowercase = currentQuestion.toLowerCase();
        if(currentResult.toLowerCase() === currentItem[currentQuestionLowercase].toLowerCase()) {
            handleNextOnList();
            setCurrentResult("");
        } else {
            setCurrentResult("");
            currentResultRef.current.value = "";
        }
    }
    const goNextItem = () => {
        const nextItemIndex = currentItemIndex + 1;
        const offset = nextItemIndex * screenWidth;
        ref?.current?.scrollToOffset({offset});
        setProgressionPercentage(Math.round(nextItemIndex/52*100));
        setCurrentItemIndex(nextItemIndex);
    };

    const stopChrono = () => {
        setFinished(true);
        handleStopSpeech();
        const datePlayed  = new Date().getTime();
        const typePlayObj = { type: "REAL", nbCards: famillyToPlay.length};
        const typePlay = JSON.stringify(typePlayObj);
        UserService.saveProgressionTime({userId: user, typePlay, time: sec, datePlayed}).then((result) =>{
            if(result.data)  {
                useCalculatePlayPoints(typePlayObj, sec).then((value) => {
                    UserService.incrementRewardPointsForUser(user, value).then((result) => {
                        if(result.data){
                            navigation.navigate("FamillyModal", {texteContent : "Vous avez terminé le jeu en " + padToTwo(Math.trunc(sec/60)) + ":" + padToTwo(sec%60) + " ! "});
                        }
                    })
                }) 
            }
        });
    }

    const handleStartSpeech = async () => {
        try {
            await Voice.start("fr-FR");
        } catch (e){
            console.error(e);
        }
    }

    const handleStopSpeech = async () => {
        await Voice.stop();
    }

    const handleToggleModeVoice = async() => {
        if(isVoice === true){
            handleStopSpeech();
            setIsVoice(false);
        } else {
            handleStartSpeech();
            setIsVoice(true);
        }
        
    }

    return(
    <Container source={require("../assets/brainsport-bg.png")}>
        <StatusBar style="auto" />
        {flagReady === false ? <>
            <TitleReady>Le jeu se mélange, êtes-vous prêt ?</TitleReady>
            <Timing>{preSec}</Timing>
        </> : 
        <>
        <Header>
            <ChronoContainer>
                <ChronoText>{padToTwo(Math.trunc(sec/60))}</ChronoText>
                <ChronoText>:</ChronoText>
                <ChronoText>{padToTwo(sec%60)}</ChronoText>
            </ChronoContainer>
            <HistoryModeContainer>
                <TouchableOpacity onPress={() => handleToggleModeVoice()}>
                    <Ionicons name={isVoice ? "mic-circle-outline" : "mic-off-circle-outline"} size={30} color="white" />
                </TouchableOpacity>
            </HistoryModeContainer>
            <CloseButton>
                <TouchableOpacity onPress={() => navigation.push("Accueil Preliminaire")}>
                    <MaterialCommunityIcons name="close-circle-outline" size={24} color="#ffffff7b"  />
                </TouchableOpacity>
            </CloseButton>
        </Header>
            <Animated.FlatList
                data={cardsPlay}
                ref={ref}
                keyExtractor={item => "card-"+item.couleur+"-"+item.valeur}
                horizontal
                scrollEventThrottle={32}
                onMomentumScrollEnd={updateCurrentItemIndex}
                pagingEnabled
                scrollEnabled={false}
                showsHorizontalScrollIndicator={false}
                renderItem={({item, index}) => {
                    return (<><FlatView>
                        <Card
                        key={"card-"+item.couleur+"-"+item.valeur}
                        couleur={item.couleur}
                        valeur={item.valeur}
                        />
                        </FlatView>
                </>);
            }}
            />
            <TitleChooseContainer bottom={isVoice ? 220 : 170}>
                <TitleChoose>{currentQuestion} ?</TitleChoose>
            </TitleChooseContainer>
            {isVoice &&<ResponseCardContainer>
            { resultCurrentfromVoice === "" && 
                <ContainerNoResult>
                    <ContainerVoice>
                        <Ionicons name="mic" size={24} color="#A138F2" /> 
                    </ContainerVoice>
                <ResponseLabel>Je vous écoute...</ResponseLabel>
                </ContainerNoResult>
            }
            { resultCurrentfromVoice !== "" && <ResponseLabel>{resultCurrentfromVoice}</ResponseLabel>}
            </ResponseCardContainer>}
            {!isVoice && <InputContainer>
                <TextInput ref={currentResultRef} value={currentResult} onChangeText={(e)=> setCurrentResult(e)} placeholder={currentQuestion} placeholderTextColor="#FFFFFF"/>
            </InputContainer>}
            { !(currentItemIndex === cardsPlay.length -1 && currentQuestionIndex === 3) &&
                <>{isVoice && 
                <ButtonContainer>
                    <TouchableBtnNext onPress={() => handleNextOnList()}>
                    <TextContinue>passer au suivant</TextContinue>
                        
                    </TouchableBtnNext>
                </ButtonContainer>}
                {!isVoice && 
                <ButtonGroup>
                    <ButtonMidContainer>
                        <TouchableBtnMidValidate onPress={() => handleValidateCurrentResult()}>
                        <TextValidate>Valider</TextValidate>
                            
                    </TouchableBtnMidValidate>
                    </ButtonMidContainer>
                    <ButtonMidContainer>
                        <TouchableBtnMid onPress={() => handleNextOnList()}>
                        <TextContinue>Passer</TextContinue>
                            
                    </TouchableBtnMid>
                    </ButtonMidContainer>
                </ButtonGroup>
                    }
                </>
            }
            <ChronoButton>
            {currentItemIndex === cardsPlay.length -1 && currentQuestionIndex === 3 &&
                <TouchableBtnFinish onPress={()=> stopChrono()}>
                    <TextFinish>Terminer</TextFinish>
                </TouchableBtnFinish>}
            </ChronoButton>
            <TextProgress>Progression : {progressionPercentage}%</TextProgress>
            </>
        }
    </Container>)
}

export default PlayCardFamilly;