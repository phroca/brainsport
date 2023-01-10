import React, { useEffect, useRef, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { Animated, ScrollView, TouchableOpacity, Dimensions } from "react-native";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import styled from 'styled-components/native';
import Card from "../components/Card";
import CardService from "../services/Card.service";
import Voice from '@react-native-voice/voice';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;
const widthContent = screenWidth  - 50;

const listChoose =[
    "Personnage", "Verbe", "Objet", "Lieu"
];

const Container = styled.ImageBackground`
  flex:1;
  width: 100%;
  height: 100%;
`;

const Header = styled.View`
    justify-content: center;
    align-items: center;
    margin-top: 50px;
    margin-bottom: 30px;
    flex-direction: row;
`;

const CloseButton = styled.View`
  width: ${widthContent/2}px;
  justify-content: flex-end;
  background: red;
`;

const ChronoContainer = styled.View`
    width: ${widthContent/2}px;
    justify-content: flex-start;
    flex-direction: row;
`;

const ChronoText = styled.Text`
    color: #FFFFFF;
    font-size: 12px;
`;

const FlatView = styled.View`
    width: ${screenWidth}px;    
    align-items: center;
    margin-top: 50px;
    padding-right: 30px;
    padding-left: 30px;
`;

const TitleChooseContainer = styled.View`
    justify-content: center;
    align-items: center;
    bottom: 200px;
`;

const TitleChoose = styled.Text`
    color: #FFFFFF;
    font-size: 30px;
    font-weight: bold;
`;

const ResponseCardContainer = styled.View`
    justify-content: center;
    align-items: center;
    bottom: 200px;
`;

const ResponseLabel =styled.Text`
    color: #FFFFFF;
    font-size: 30px;
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
    bottom: 150px;
`;

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
    justify-content: center;
    align-items: center;

`;

const TextFinish = styled.Text`
    text-transform: uppercase;
    color: #000000;
    font-weight: bold;
`;

const PlayCardFamilly = ({navigation, route}) => {
    const [min, setMin] = useState(0);
    const [sec, setSec] = useState(0);
    const [intervalTime, setIntervalTime] = useState(null);
    const { famillyToPlay, isRandom } = route.params;
    const [ cardsPlay, setCardsPlay] = useState([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [currentQuestion, setCurrentQuestion] = useState("");
    const [isFinished, setFinished] = useState(false);
    const [currentListChoose, setCurrentListChoose] = useState(listChoose);
    const [results, setResults] = useState([]);
    const [resultCurrentfromVoice, setResultCurrentfromVoice] = useState("");

    const ref = useRef(null);
    let padToTwo = (number) => (number <= 9 ? `0${number}`: number);
    useEffect(()=> {
        let int = null;
        if(isFinished === false){
            int = setInterval(() => {
                setSec(sec=> sec + 1);
            }, 1000);
        } else {
            clearInterval(int);
        } 
        return () => clearInterval(int);
    },[isFinished])

    useEffect(() => {
        if(isRandom) {
            setCurrentListChoose(shuffleList(listChoose));
        }
        setCurrentQuestion(currentListChoose[0]);
        const shuffledArray = famillyToPlay.sort((a, b) => 0.5 - Math.random());
        setCardsPlay(shuffledArray);
    }, [])

    useEffect(()=> {
        const onSpeechResults = (result) => {
            console.log("result =>",result.value);
            setResults(result.value ?? []);
            const resultOut = results[results.length -1];
            const currentItem = cardsPlay[currentItemIndex];
            const currentQuestionLowercase = currentQuestion.toLowerCase();
            setResultCurrentfromVoice(resultOut);
            console.log(resultOut);
            if(resultOut === currentItem[currentQuestionLowercase]){
                console.log("REUSSI PASSAGE AU SUIVANT");
                setResults([]);
            }
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
        handleStartSpeech();
        return () => {
            Voice.destroy().then(Voice.removeAllListeners);
            setResults([]);
        }
    }, [])

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
    const [currentItemIndex, setCurrentItemIndex] = useState(0);
    const updateCurrentItemIndex = element => {
        const contentOffsetX = element.nativeEvent.contentOffset.x;
        const currentIndex = Math.round(contentOffsetX / screenWidth);
        setCurrentItemIndex(currentIndex);
    };
    // const handlePrevCard = () => {
    //     const prevItemIndex = currentItemIndex > 0 ? currentItemIndex - 1 : 0;
    //     const offset = prevItemIndex * width;
    //     ref?.current?.scrollToOffset({offset});
    //     setCurrentItemIndex(prevItemIndex);
    // }
    // const handleNextCard = () => {
    //     const nextItemIndex = currentItemIndex < cardsPlay.length - 1 ? currentItemIndex + 1 : cardsPlay.length - 1;
    //     const offset = nextItemIndex * width;
    //     ref?.current?.scrollToOffset({offset});      
    //     setCurrentItemIndex(nextItemIndex);
    // }

    const handleNextOnList = () => {
        let id = currentQuestionIndex;
        //if(id === 0 || currentItemIndex !== 0) goNextItem();
        const currentItem = cardsPlay[currentItemIndex];
        const currentQuestionLowercase = currentQuestion.toLowerCase();
        
        console.log("VALEUR DE " + currentQuestionLowercase + " => " + currentItem[currentQuestionLowercase]);
        
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
        
    }

    const goNextItem = () => {
        const nextItemIndex = currentItemIndex + 1;
        const offset = nextItemIndex * screenWidth;
        ref?.current?.scrollToOffset({offset});
        setCurrentItemIndex(nextItemIndex);
    };

    const stopChrono = () => {
        setFinished(true);
        handleStopSpeech();
        CardService.saveProgressionTime({timeInSec: sec, famillyPlayed: famillyToPlay}).then(() => {
            navigation.navigate("Accueil");
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
    return(
    <Container source={require("../assets/brainsport-bg.png")}>
        <StatusBar style="auto" />
        <Header>
            <ChronoContainer>
                <ChronoText>{padToTwo(Math.trunc(sec/60))}</ChronoText>
                <ChronoText>:</ChronoText>
                <ChronoText>{padToTwo(sec%60)}</ChronoText>
            </ChronoContainer>
            <CloseButton>
                <TouchableOpacity style={{position: "absolute", right:0}} onPress={() => navigation.goBack()}>
                    <MaterialCommunityIcons name="close-circle-outline" size={24} color="#ffffff7b"  />
                </TouchableOpacity>
            </CloseButton>
        </Header>
        <Animated.FlatList
            data={cardsPlay}
            ref={ref}
            style={{flex: 1}}
            keyExtractor={item => "card-"+item.couleur+"-"+item.valeur}
            horizontal
            scrollEventThrottle={32}
            onMomentumScrollEnd={updateCurrentItemIndex}
            pagingEnabled
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
            <TitleChooseContainer>
                <TitleChoose>{currentQuestion} ?</TitleChoose>
            </TitleChooseContainer>
            <ResponseCardContainer>
            <ResponseLabel>{resultCurrentfromVoice}</ResponseLabel>
            </ResponseCardContainer>
            { !(currentItemIndex === cardsPlay.length -1 && currentQuestionIndex === 3) &&
            <ButtonContainer>
                <TouchableBtnNext onPress={() => handleNextOnList()}>
                    <MaterialCommunityIcons name="arrow-right-thin-circle-outline" size={40} color="#FFFFFF" />
                </TouchableBtnNext>
            </ButtonContainer>}
            <ChronoButton>
            {currentItemIndex === cardsPlay.length -1 && currentQuestionIndex === 3 &&
                <TouchableBtnFinish onPress={()=> stopChrono()}>
                    <TextFinish>Terminer</TextFinish>
                </TouchableBtnFinish>}
            </ChronoButton>
    </Container>)
}

export default PlayCardFamilly;