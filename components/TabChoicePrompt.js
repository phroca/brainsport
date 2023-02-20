import React, { forwardRef, useEffect, useRef, useState } from "react";
import { Animated, Dimensions, Modal, TouchableOpacity } from "react-native";
import styled from "styled-components/native";
import { MaterialCommunityIcons } from '@expo/vector-icons';

const screenWidth = Dimensions.get('window').width;
const widthContent = screenWidth  - 50;


const PromptContainer = styled.View`
    flex: 1;
`;

const Header = styled.View`
    justify-content: flex-end;
    width: ${widthContent}px;
    align-items: center;
    margin-top: 10px;
    margin-bottom: 10px;
    flex-direction: row;
`;

const CloseButton = styled.View`
  width: 40px;
`;

const Backdrop = styled.View`
    background-color:#00000097;
    position: absolute;
    left: 0;
    top: 0;
    height: 100%;
    width: 100%;
`;

const PromptContentContainer = styled.View`
    position: absolute;
    bottom: 0;
    left: 20px;
    width: ${screenWidth - 2 * 20}px;
    background-color: #FFFFFF; 
    border-radius: 8px;
    align-items: center;
    justify-content: center;
`;

const PromptContentTitle = styled.Text`
    color: #000000;
    font-size: 20px;
  font-weight: bold;
  margin-bottom: 20px;
`;
const PromptContentButtonChoicesContainer = styled.View`
    
`;
const PromptContentButton = styled.View`
    background: #A138F2;
  width: ${widthContent -30}px;
  height: 50px;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  margin-bottom: 20px;
`;
const PromptContentButtonText = styled.Text`
    color: #FFFFFF;
`;


const Animatedbackdrop = Animated.createAnimatedComponent(Backdrop);
const AnimatedPromptContentContainer = Animated.createAnimatedComponent(PromptContentContainer);

const TabChoicePrompt = (props, ref) => {
    const [_visible, _setVisible] = useState(false);
    const [visible, setVisible] = useState(false);
    const animValue = useRef(new Animated.Value(0)).current;
    const userDataCard = props?.currentUSerDataCard;
    useEffect(() => {
        if(ref) {
            ref.current = {
                setVisible: _setVisible
            }
        }
    }, [ref]);

    useEffect(() => {
        if(_visible) {
            setVisible(true);
            Animated.timing(
                animValue,
                {
                    duration: 300,
                    toValue: 1,
                    useNativeDriver: true
                }
            ).start()
        } else {
            Animated.timing(
                animValue,
                {
                    duration: 300,
                    toValue: 0,
                    useNativeDriver: true
                }
            ).start(() => {
                setVisible(false);
            })
        }
    }, [_visible, animValue]);
    const interpolateTranslation = {
        transform: [{
            translateY: animValue.interpolate({
                inputRange: [0, 1],
                outputRange: [500, 0]
            })
            }   
        ]
    }

    const handlePlayFillGame = () => {
        const cardCopyToShuffle = JSON.parse(JSON.stringify(userDataCard));
        const shuffledArrayforPlayGame = cardCopyToShuffle.cards.sort(() => 0.5 - Math.random());
        _setVisible(false);
        props.navigation.push("PlayPregame", {userCards: shuffledArrayforPlayGame});
    }

    const handlePlayRealGame = () => {
        _setVisible(false);
        props.navigation.push("PlayFamilly", {famillyToPlay: userDataCard.cards, isRandom: true});
    }
    return (
        <Modal visible={visible} transparent={true}>
            <PromptContainer>
                <Animatedbackdrop style={{opacity: animValue}}/>
                <AnimatedPromptContentContainer style={[interpolateTranslation]}>
                    <Header>
                        <CloseButton>
                            <TouchableOpacity onPress={() => _setVisible(false)}>
                                <MaterialCommunityIcons name="close-circle-outline" size={24} color="#000000" />
                            </TouchableOpacity>
                        </CloseButton>
                    </Header>
                    <PromptContentTitle>
                        Sélectionnez le type d'aprentissage
                    </PromptContentTitle>
                    <PromptContentButtonChoicesContainer>
                        <TouchableOpacity onPress={() => handlePlayFillGame()}>
                            <PromptContentButton>
                                <PromptContentButtonText>
                                    Défiler les cartes simplement
                                </PromptContentButtonText>
                            </PromptContentButton>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => handlePlayRealGame()}>
                            <PromptContentButton >
                                <PromptContentButtonText >
                                    Tester sur les éléments
                                </PromptContentButtonText>
                            </PromptContentButton>
                        </TouchableOpacity>
                    </PromptContentButtonChoicesContainer>
                </AnimatedPromptContentContainer>
            </PromptContainer>
        </Modal>
    )

};

export default forwardRef(TabChoicePrompt);