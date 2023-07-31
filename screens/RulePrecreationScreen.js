import { StatusBar } from "expo-status-bar";
import {Auth} from "aws-amplify";
import React, { useRef, useState } from "react";
import { Animated, Dimensions } from "react-native";
import styled from "styled-components/native";
import { Ionicons } from "@expo/vector-icons";
import UserService from "../services/User.service";

const {width, height} = Dimensions.get("screen");
const widthContent = width  - 50;

const Container = styled.ImageBackground`
    flex: 1;
    align-items: center;
    justify-content: center;
    width: ${width}px;
    height: ${height}px;
`;

const Title = styled.Text`
    width: ${widthContent}px;
    font-size: 25px;
    justify-content: space-between;
    align-items: center;

`;
const BrainsportIcon = styled.Image`
    position: absolute;
    top: 100px;
    width: 80px;
    height: 80px;
`;

const FlatView = styled.View`
    width: ${width}px;
    justify-content: center; 
    align-items: center;
    padding-right: 30px;
    padding-left: 30px;
`;

const FlatText = styled.Text`
    font-weight: bold;
    font-size: 14px;
    color: #FFFFFF;
`;

const ContainerIndicator = styled.View`
    position: absolute;
    bottom: 100px;
    flex-direction: row;
`;

const SigninButton = styled.View`
  position: absolute;
  bottom: 200px;
  flex-direction: row;
`;

const TouchableBtn = styled.TouchableOpacity`
    flex-direction: row;
    width: 150px;
    height: 50px;
    background-color: transparent;
    border: 1px solid #FFFFFF;
    justify-content: center;
    align-items: center;
    border-radius: 10px;
`
const TouchableBtnPlein = styled.TouchableOpacity`
    flex-direction: row;
    width: 150px;
    height: 50px;
    background-color: #FFFFFF;
    justify-content: center;
    align-items: center;
    border-radius: 10px;
`

const TextPasser = styled.Text`
    text-transform: uppercase;
    color: #FFFFFF;
`
const TextSuivant = styled.Text`
    text-transform: uppercase;
    color: #000000;
    font-weight: bold;
`

const ViewSpace = styled.View`
    width: 15px;
`

const TouchableBtnSignin = styled.TouchableOpacity`
width: 250px;
height: 50px;
background-color: #FFFFFF;
justify-content: center;
align-items: center;
border-radius: 10px;
`

const TextSignin = styled.Text`
    text-transform: uppercase;
    color: #000000;
    font-weight: bold;
`

const DATA = [
    {
      "key": "001",
      "text": "Vous êtes capable de mémoriser un jeu de 52 cartes en moins de 10 minutes.\n\nPas convaincu ?\n\nOn vous aide à relever le challenge.\n\nVous allez définir pour chaque carte :\nUn Personnage, un Verbe d’action, un Objet et un lieu.",
    },
    {
      "key": "002",
      "text": "Vous allez avoir des listes de familles à remplir, selon les couleurs des cartes.\n\nPour les mémoriser nous vous conseillons de créer une histoire, en y associant les images les plus marquantes possibles.\n\nJouer sur les tailles, les couleurs, les sons, les registres (Ridicules, sexuels, dangereux).",
    },
    {
      "key": "003",
      "text": "Les règles pour débuter : \n\nLa première carte : prenez le personnage dans sa carte d’identité. \nLa seconde carte : Prenez le lieu dans sa carte d’identité \nLa troisième carte : prenez l’objet dans sa carte d’identité. \nLa quatrième carte : faite faire à votre personnage l’action du verbe.",
    },
    {
      "key": "004",
      "text": "Lorsque vous aurez réussi, vous serez pret à passer à l’étape suivante : Créer votre propre tableau.",
    },
  ]

const Indicator = ({scrollX}) => {
    return (
        <ContainerIndicator>
            {DATA.map((_, i) => {
                const inputRange = [(i - 1)* width, i * width, (i + 1) * width];
                const scale = scrollX.interpolate({
                    inputRange,
                    outputRange:[0.5,1.4,0.5],
                    extrapolate: 'clamp'
                });
                const opacity = scrollX.interpolate({
                    inputRange,
                    outputRange: [0.5,1,0.5],
                    extrapolate: 'clamp'
                })
                return (
                    <Animated.View key={`indicator-${i}`} 
                        style={{
                          height: 2,
                          width: 10,
                          borderRadius: 2,
                          backgroundColor: '#FFFFFF',
                          marginHorizontal: 3,
                          opacity,
                          transform: [
                              {
                                  scale,
                                  
                              }
                          ]
                        }}
                    />
                    
                )
            })}
        </ContainerIndicator>
    )
}

const RulePrecreationScreen = ({navigation}) => {
//Changement de la valeur lors du scroll pour les éléments de la liste
const scrollX  = useRef(new Animated.Value(0)).current;
const ref = useRef(null);
const [currentItemIndex, setCurrentItemIndex] = useState(0);


const updateCurrentItemIndex = element => {
    const contentOffsetX = element.nativeEvent.contentOffset.x;
    const currentIndex = Math.round(contentOffsetX / width);
    setCurrentItemIndex(currentIndex);
};
const goNextItem = () => {
    const nextItemIndex = currentItemIndex + 1;
    const offset = nextItemIndex * width;
    ref?.current?.scrollToOffset({offset});
    setCurrentItemIndex(nextItemIndex);
};
const skip = () => {
    const lastItemIndex = DATA.length - 1;
    const offset = lastItemIndex * width;
    ref?.current?.scrollToOffset({offset});
    setCurrentItemIndex(lastItemIndex);
}

const handleGotoHomePrecreation = async() => {
    const user = await Auth.currentAuthenticatedUser();
    const userId = user?.attributes?.sub;
    UserService.saveUserStepperData({userId}).then((result)=> {
        if(result?.data){
            UserService.getUserStepperData(userId).then((result) => {
                if(result?.data){
                    const stepperData = JSON.parse(result?.data[0]);
                    if(stepperData.prePlayHint === false) {
                        UserService.saveDataCard(userId).then((result) => {
                            if(result?.data){
                                UserService.saveUserFamillyProgressData(userId).then((result) => {
                                    if(result?.data) navigation.push("Accueil Preliminaire");
                                });
                            }
                        });
                    }
                }
            });
        }
    });
}

return (
        
    <Container source={require("../assets/brainsport-bg.png")}> 
        <BrainsportIcon source={require("../assets/brainsport-logo.png")}/>
        <StatusBar hidden />
        <Title>« Vous êtes prêt à transformer votre cerveau maintenant. »</Title>
        <Animated.FlatList 
            data={DATA}
            ref={ref}
            keyExtractor={item => item.key}
            horizontal
            scrollEventThrottle={32}
            onScroll={Animated.event(
                [{nativeEvent: {contentOffset: {x: scrollX}}}],
                {useNativeDriver: false}
            )}
            onMomentumScrollEnd={updateCurrentItemIndex}
            contentContainerStyle={{paddingBottom: 100}}
            showsHorizontalScrollIndicator={false}
            pagingEnabled
            renderItem={({item}) => {
                return (<FlatView>
                    <FlatText>{item.text}</FlatText>
                </FlatView>

                );
            }}
        />
        <SigninButton>
        {
            currentItemIndex === DATA.length -1 ? 
            (<TouchableBtnSignin onPress={handleGotoHomePrecreation}>
                <TextSignin>Commencer</TextSignin>
            </TouchableBtnSignin>) : 
            (<><TouchableBtn onPress={() => skip()}>
                    <TextPasser>Passer</TextPasser>
                </TouchableBtn>
                <ViewSpace />
                <TouchableBtnPlein onPress={() => goNextItem()}>
                    <TextSuivant>Suivant</TextSuivant><Ionicons name="arrow-forward" size={20} color="#000000" />
                </TouchableBtnPlein></>)
                
        }    
        </SigninButton>
        <Indicator scrollX={scrollX}/>
    </Container>
)
}


export default RulePrecreationScreen;