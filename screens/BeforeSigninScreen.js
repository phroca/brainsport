import { StatusBar } from "expo-status-bar";
import React, { useRef } from "react";
import { Animated, View, Dimensions } from "react-native";
import styled from "styled-components/native";
import { TouchableOpacity } from 'react-native';
import { Ionicons } from "@expo/vector-icons";

const {width, height} = Dimensions.get("screen");

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
`;
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
                      outputRange:[0.8,1.4,0.8],
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
                            height: 10,
                            width: 10,
                            borderRadius: 5,
                            backgroundColor: '#FFFFFF',
                            margin: 10,
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
    return (
            
        <Container source={require("../assets/brainsport-bg.png")}> 
            <BrainsportIcon source={require("../assets/brainsport-logo.png")}/>
            <StatusBar hidden />
            <Animated.FlatList 
                data={DATA}
                keyExtractor={item => item.key}
                horizontal
                scrollEventThrottle={32}
                onScroll={Animated.event(
                    [{nativeEvent: {contentOffset: {x: scrollX}}}],
                    {useNativeDriver: false}
                )}
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
                <TouchableOpacity onPress={()=> navigation.navigate('Signin')}>
                    <Ionicons name="arrow-forward" size={36} color="#FFFFFF" />
                </TouchableOpacity>
            </SigninButton>
            <Indicator scrollX={scrollX}/>
        </Container>
    )
}

export default BeforeSigninScreen;