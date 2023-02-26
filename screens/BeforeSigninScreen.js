import { StatusBar } from "expo-status-bar";
import React, { useRef, useState } from "react";
import { Animated, View, Dimensions } from "react-native";
import styled from "styled-components/native";
import { TouchableOpacity } from 'react-native';
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";

const {width, height} = Dimensions.get("screen");
const widthContent = width  - 50;

const Container = styled.ImageBackground`
    flex: 1;
    align-items: center;
    justify-content: center;
    width: ${width}px;
    height: ${height}px;
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
    font-size: 24px;
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

const HideCitationContainer = styled.View`

    background-color: transparent;
    justify-content: center;
    align-items: center;
`
const TextHideCitation = styled.Text`

    color: #FFFFFF;
    font-weight: bold;
`

const DATA = [
    {
      "key": "001",
      "text": "Ne plus ressentir le sentiment d'être débordé",
    },
    {
      "key": "002",
      "text": "Augmenter votre capacité creative",
    },
    {
      "key": "003",
      "text": "Remplacer le besoin de contrôler par le plaisir de suivre son chemin",
    },
    {
      "key": "004",
      "text": "Remplacer, le contrôler et predire par le ressentir et s'ajuster",
    },
    {
      "key": "005",
      "text": "Le contrôle tue le mouvement. Le mouvement est une succession d'ajustements",
    },
    {
      "key": "006",
      "text": "Augmenter votre capacité de concentration",
    },
    {
      "key": "007",
      "text": "Avoir une réponse physiologique rapide à la montée de Stress",
    },
    {
      "key": "008",
      "text": "Capacité à faire face à des tâches ou des situations désagréables",
    },
    {
      "key": "009",
      "text": "Augmenter la confiance en soi",
    },
    {
      "key": "010",
      "text": "Adapter sa stratégie de mise en mouvement à l'acceptation de son rythme",
    },
    {
      "key": "011",
      "text": "S'accepter en diminuant l'autoflagellation",
    },
    {
      "key": "012",
      "text": "Créer sa stratégie pour augmenter sa persévérance",
    }
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
const BeforeSigninScreen = ({navigation}) => {
    //Changement de la valeur lors du scroll pour les éléments de la liste
    const scrollX  = useRef(new Animated.Value(0)).current;
    const ref = useRef(null);
    const [currentItemIndex, setCurrentItemIndex] = useState(0);

    useState(() => {
        
    }, [])
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

    const handleHideCitation = async() => {
        try{
            const jsonValue = JSON.stringify(false);
            await AsyncStorage.setItem('isAppFirstLaunched', jsonValue);
            navigation.replace('Signin');
        }catch(e){
            console.log(e);
        }
    }

    return (
            
        <Container source={require("../assets/brainsport-bg.png")}> 
            <BrainsportIcon source={require("../assets/brainsport-logo.png")}/>
            <StatusBar hidden />
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
                (<TouchableBtnSignin onPress={()=> navigation.navigate('Signin')}>
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
            <HideCitationContainer>
                <TouchableOpacity onPress={() => handleHideCitation()}>
                    <TextHideCitation>
                        Cacher les citations
                    </TextHideCitation>
                </TouchableOpacity>
            </HideCitationContainer>
        </Container>
    )
}

//
export default BeforeSigninScreen;