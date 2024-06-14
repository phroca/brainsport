import React, { forwardRef, useEffect, useRef, useState } from "react";
import { Animated, Dimensions, Modal, TouchableOpacity } from "react-native";
import styled from "styled-components/native";
import { MaterialCommunityIcons } from '@expo/vector-icons';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;
const widthContent = screenWidth - 50;

const PromptModal = styled.Modal`
    
`;

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

const PromptContentHeaderContainer = styled.View`
    justify-content: center;
    width: ${widthContent - 40}px;
    align-items: center;
    margin-top: 10px;
    margin-bottom: 10px;
`;

const PromptContentTitle = styled.Text`
    color: #000000;
    font-size: 16px;
  font-weight: bold;
`;
const PromptContentButtonChoicesContainer = styled.View`
    
`;
const PromptContentButton = styled.View`
    background: ${props => props.color ? "#A138F2" : "#DADADA"};
  width: ${widthContent - 30}px;
  height: 50px;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  margin-top: 20px;
`;
const PromptContentButtonText = styled.Text`
    color: ${props => props.color ? "#FFFFFF" : "#000000"};
`;

const PromptContentButtonValidateContainer = styled.View`
    
`;
const PromptContentButtonValidate = styled.View`
    background: ${props => props.color ? "#A138F2" : "#DADADA"};
  width: ${widthContent - 30}px;
  height: 50px;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  margin-top: 20px;
  margin-bottom: 20px;
`;
const PromptContentButtonValidateText = styled.Text`
    color: ${props => props.color ? "#FFFFFF" : "#000000"};
    font-size: 14px;
  font-weight: bold;
  text-transform: uppercase;
`;

const Animatedbackdrop = Animated.createAnimatedComponent(Backdrop);
const AnimatedPromptContentContainer = Animated.createAnimatedComponent(PromptContentContainer);

const GameChoicePrompt = (props, ref) => {
    const [_visible, _setVisible] = useState(false);
    const [visible, setVisible] = useState(false);

    const animValue = useRef(new Animated.Value(0)).current;
    const [selectCoeur, setSelectCoeur] = useState(false);
    const [selectCarreau, setSelectCarreau] = useState(false);
    const [selectTrefle, setSelectTrefle] = useState(false);
    const [selectPique, setSelectPique] = useState(false);

    const userCardSaved = props?.userCardSaved;
    const informationDataCard = props?.informationDataCard;

    useEffect(() => {
        if (ref) {
            ref.current = {
                setVisible: _setVisible
            }
        }
    }, [ref]);

    useEffect(() => {
        if (_visible) {
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

    const reinitSelections = () => {
        setSelectCoeur(false);
        setSelectCarreau(false);
        setSelectTrefle(false);
        setSelectPique(false);
    }
    const toggleColorCarreau = () => {
        reinitSelections();
        setSelectCarreau(true);
    }
    const toggleColorCoeur = () => {
        reinitSelections();
        setSelectCoeur(true);
    }
    const toggleColorTrefle = () => {
        reinitSelections();
        setSelectTrefle(true);
    }
    const toggleColorPique = () => {
        reinitSelections();
        setSelectPique(true);
    }

    const validateOneSelection = () => {
        return selectTrefle || selectCarreau || selectCoeur || selectPique;
    }
    const handleCloseModal = () => {
        reinitSelections();
        _setVisible(false);
    }

    const handlePlayGame = () => {
        let colorChosen = "";
        let shuffledArrayforPlayGame = [];
        const cardCopyToShuffle = JSON.parse(JSON.stringify(userCardSaved));
        shuffledArrayforPlayGame = cardCopyToShuffle.sort((a, b) => 0.5 - Math.random()).slice(0, informationDataCard.numberCardToPlayForHistory);
        handleCloseModal();
        props.navigation.push("PlayPregame", { userCards: shuffledArrayforPlayGame });
    }
    return (
        <Modal visible={visible} transparent={true}>
            <PromptContainer>
                <Animatedbackdrop style={{ opacity: animValue }} />
                <AnimatedPromptContentContainer style={[interpolateTranslation]}>
                    <Header>
                        <CloseButton>
                            <TouchableOpacity onPress={() => handleCloseModal()}>
                                <MaterialCommunityIcons name="close-circle-outline" size={24} color="#000000" />
                            </TouchableOpacity>
                        </CloseButton>
                    </Header>
                    <PromptContentHeaderContainer>
                        <PromptContentTitle>
                            Vous avez enregistré {informationDataCard.cardDoneLength} cartes. Vous pouvez commencer à vous entrainer.
                        </PromptContentTitle>
                    </PromptContentHeaderContainer>

                    <PromptContentButtonValidateContainer>
                        <TouchableOpacity onPress={() => handlePlayGame()}>
                            <PromptContentButtonValidate color={true}>
                                <PromptContentButtonValidateText color={true}>
                                    Créer vos histoires avec {informationDataCard.cardDoneLength} cartes
                                </PromptContentButtonValidateText>
                            </PromptContentButtonValidate>
                        </TouchableOpacity>
                    </PromptContentButtonValidateContainer>
                </AnimatedPromptContentContainer>
            </PromptContainer>
        </Modal>
    )

};

export default forwardRef(GameChoicePrompt);