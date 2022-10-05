import React, { useEffect, useRef, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { Animated, ScrollView, TouchableOpacity, Dimensions } from "react-native";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import styled from 'styled-components/native';
import Card from "../components/Card";
import CardService from "../services/Card.service";

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;
const widthContent = screenWidth  - 50;

const listChoose =[
    "personage", "verbe", "action", "lieu"
]

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
    bottom: 250px;
`
const TitleChoose = styled.Text`
    color: #FFFFFF;
    font-size: 30px;
    font-weight: bold;
`
const ChronoButton = styled.View`
  bottom: 100px;
  justify-content: center;
    align-items: center;
`;

const TouchableBtnFinish = styled.TouchableOpacity`
width: ${widthContent}px;
height: 50px;
background-color: #FFFFFF;
justify-content: center;
align-items: center;
border-radius: 10px;
`
const TextFinish = styled.Text`
    text-transform: uppercase;
    color: #000000;
    font-weight: bold;
`

const PlayCardFamilly = ({navigation, route}) => {
    const [min, setMin] = useState(0);
    const [sec, setSec] = useState(0);
    const [intervalTime, setIntervalTime] = useState(null);
    const { famillyToPlay } = route.params;
    const [ cardsPlay, setCardsPlay] = useState([]);
    const ref = useRef(null);
    let padToTwo = (number) => (number <= 9 ? `0${number}`: number);
    useEffect(()=> {
        /*const int = setInterval(() => {
                if (sec !== 59) {
                setSec((prev)=> ({...prev, sec: ++sec}));
            } else {
                setSec(0);
                setMin((prev)=> ({...prev, min: ++min}));
            }
        }, 1);
        setIntervalTime(int);*/
        const shuffledArray = famillyToPlay.sort((a, b) => 0.5 - Math.random());
        setCardsPlay(shuffledArray);
    },[])

    const reset = () => {
        clearInterval(this.interval);
    }
    const shuffleList = () =>{
       const indexRandom = Math.round(Math.random()*listChoose.length)
        return listChoose[indexRandom];
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

    const stopChrono = () => {
        navigation.navigate("Accueil");
    }

    return(
    <Container source={require("../assets/brainsport-bg.png")}>
        <StatusBar style="auto" />
        <Header>
            <ChronoContainer>
                <ChronoText>{padToTwo(min)}</ChronoText>
                <ChronoText>:</ChronoText>
                <ChronoText>{padToTwo(sec)}</ChronoText>
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
                <TitleChoose>{shuffleList()} ?</TitleChoose>
                </TitleChooseContainer>
            <ChronoButton>
            {currentItemIndex === cardsPlay.length -1 &&
                <TouchableBtnFinish onPress={()=> stopChrono()}>
                    <TextFinish>Terminer</TextFinish>
                </TouchableBtnFinish>}
            </ChronoButton>
    </Container>)
}

export default PlayCardFamilly;