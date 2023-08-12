import { StatusBar } from "expo-status-bar";
import { Auth } from "aws-amplify";
import React, { useRef, useState } from "react";
import { Animated, Dimensions } from "react-native";
import styled from "styled-components/native";
import { Ionicons } from "@expo/vector-icons";
import UserService from "../services/User.service";
import { updateUser } from "../slices/userSlice";
import { useDispatch } from "react-redux";

const { width, height } = Dimensions.get("screen");
const widthContent = width - 50;

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
  bottom: 150px;
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
        "text": "En mémorisant ce jeu de 52 cartes en moins de 10mn, vous renforcez votre mémoire, et votrecapacité à gérer vos émotions : Passer des émotions au Cognitif.\n\nVous pensez que vous en êtes incapables ?\n\nPas à pas, jour après jour, vous allez y arriver.\n\nLaissez-vous guider.\n\nMais avant de commencer…\n\n",
    },
    {
        "key": "002",
        "text": "Remplissez votre Profil. Dernier Bouton en bas de l’écran.\n\nCochez l’ensemble des aides. Vous pourrez les déconnecter ensuite.\n\n",
    },
    {
        "key": "003",
        "text": "Dans un premier temps, nous vous permettons de mémoriser 8 cartes, en créant deux histoires.\n\nChaque couleur de Cartes (Cœur, carreau, Trèfle, Pique) donne le thème d’un groupe.\n\nVous choisissez le thème lié à cette couleur.",
    },
    {
        "key": "004",
        "text": "Pour débuter, nous vous proposons un choix , en ce qui concerne la couleur cœur :\n\n-Soit vous choisissez parmi nos propositions des noms de personnages de la famille Disney.\n-Soit vous vous choisissiez des personnes de votre famille ou de vos amis.\n\nPuis pour chaque carte, vous associez au personnage choisi :\n- un Verbe d’action facilement visualisable\n- un objet\n- un lieu.",
    },
    {
        "key": "005",
        "text": "Pour aider à la mémorisation, nous vous recommandons de choisir des personnages, des verbes d’actions, des objets, et des lieux en y associant les images les plus marquantes possibles, et qui font appel le plus possible à vos sens (Émotions, sons, odeurs, goûts, etc…).\n\nJouer sur les tailles, les couleurs, les sons, les registres (ridicules, sexuels, dangereux, etc…)",
    },
    {
        "key": "006",
        "text": "Pour mémoriser les cartes, vous allez passer par la création d’histoires :\n\nUne histoire est créée par la composition les éléments de 4 cartes\n\nUne histoire de 4 cartes (1,2,3 et 4) :\n1 : Un personnage fait\n2 : une action avec\n3 : un objet dans\n4 : un lieu",
    },
    {
        "key": "007",
        "text": "Ces 4 premières cartes vont vous permettre de créer votre première histoire.\nVous créez votre seconde histoire avec les 4 cartes suivantes.\n\n\Compris ?",
    },
    {
        "key": "008",
        "text": "Allez, on vous lâche la main, on enlève les petites roues :\nIl n’y a plus qu’à remplir votre tableau.\n\n«  Mon tableau ? »\n\nOui, définir une famille par couleur de cartes, et remplir pour chaque carte ses caractéristiques (Personnage, Verbe, Objet, Lieu).\nPuis apprendre les 4 éléments de chaque carte de chacune de vos 4 familles, soit de vos 52 cartes.\n\nC’est ce que l’on nomme connaître son Tableau.",
    },
    {
        "key": "009",
        "text": "\nQuand vous pourrez réciter les 4 éléments pour chaque carte en moins de 10 mn, vous pourrez dire :\n« Je connais mon tableau. »\n\nPuis vous pourrez créer 6 histoires, puis 10 histoires, puis 13 histoires.\nQuand vous réciterez vos 13 histoires, en passant les 52 cartes, en moins de 10mn, vous accéderez au Club très fermé de ceux qui peuvent participer au GAME.\n\nMais Chut ! Ça c’est pour après.\nVotre Coach- accompagnant vous en parlera.",
    },
]

const Indicator = ({ scrollX }) => {
    return (
        <ContainerIndicator>
            {DATA.map((_, i) => {
                const inputRange = [(i - 1) * width, i * width, (i + 1) * width];
                const scale = scrollX.interpolate({
                    inputRange,
                    outputRange: [0.5, 1.4, 0.5],
                    extrapolate: 'clamp'
                });
                const opacity = scrollX.interpolate({
                    inputRange,
                    outputRange: [0.5, 1, 0.5],
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

const RulePrecreationScreen = ({ navigation }) => {
    //Changement de la valeur lors du scroll pour les éléments de la liste
    const scrollX = useRef(new Animated.Value(0)).current;
    const ref = useRef(null);
    const [currentItemIndex, setCurrentItemIndex] = useState(0);
    const dispatch = useDispatch();

    const updateCurrentItemIndex = element => {
        const contentOffsetX = element.nativeEvent.contentOffset.x;
        const currentIndex = Math.round(contentOffsetX / width);
        setCurrentItemIndex(currentIndex);
    };
    const goNextItem = () => {
        const nextItemIndex = currentItemIndex + 1;
        const offset = nextItemIndex * width;
        ref?.current?.scrollToOffset({ offset });
        setCurrentItemIndex(nextItemIndex);
    };
    const skip = () => {
        const lastItemIndex = DATA.length - 1;
        const offset = lastItemIndex * width;
        ref?.current?.scrollToOffset({ offset });
        setCurrentItemIndex(lastItemIndex);
    }

    const handleGotoHomePrecreation = async () => {
        const user = await Auth.currentAuthenticatedUser();
        const userId = user?.attributes?.sub;
        dispatch(updateUser({ userId: user?.attributes?.sub }));
        UserService.saveUserStepperData({ userId }).then((result) => {
            if (result?.data) {
                UserService.getUserStepperData(userId).then((result) => {
                    if (result?.data) {
                        const stepperData = result?.data[0];
                        console.log(stepperData);
                        if (!stepperData.prePlayHint) {
                            UserService.saveDataCard(userId).then((result) => {
                                if (result?.data) {
                                    UserService.saveUserFamillyProgressData(userId).then((result) => {
                                        if (result?.data) navigation.push("Accueil Preliminaire");
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
            <BrainsportIcon source={require("../assets/brainsport-logo.png")} />
            <StatusBar hidden />
            <Title>« Vous êtes prêt à transformer votre cerveau maintenant. »</Title>
            <Animated.FlatList
                data={DATA}
                ref={ref}
                keyExtractor={item => item.key}
                horizontal
                scrollEventThrottle={32}
                onScroll={Animated.event(
                    [{ nativeEvent: { contentOffset: { x: scrollX } } }],
                    { useNativeDriver: false }
                )}
                onMomentumScrollEnd={updateCurrentItemIndex}
                contentContainerStyle={{ paddingBottom: 100 }}
                showsHorizontalScrollIndicator={false}
                pagingEnabled
                renderItem={({ item }) => {
                    return (<FlatView>
                        <FlatText>{item.text}</FlatText>
                    </FlatView>

                    );
                }}
            />
            <SigninButton>
                {
                    currentItemIndex === DATA.length - 1 ?
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
            <Indicator scrollX={scrollX} />
        </Container>
    )
}


export default RulePrecreationScreen;