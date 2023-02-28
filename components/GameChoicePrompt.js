import React, { forwardRef, useEffect, useRef, useState } from "react";
import { Animated, Dimensions, Modal, TouchableOpacity } from "react-native";
import styled from "styled-components/native";
import { MaterialCommunityIcons } from '@expo/vector-icons';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;
const widthContent = screenWidth  - 50;

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

const PromptContentTitle = styled.Text`
    color: #000000;
    font-size: 20px;
  font-weight: bold;
`;
const PromptContentButtonChoicesContainer = styled.View`
    
`;
const PromptContentButton = styled.View`
    background: ${props => props.color ? "#A138F2" : "#DADADA"};
  width: ${widthContent -30}px;
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
    font-size: 20px;
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
    const famillyProgress = props?.famillyProgress;
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
        if(selectCoeur) colorChosen = "coeur";
        if(selectCarreau) colorChosen = "carreau";
        if(selectTrefle) colorChosen = "trefle";
        if(selectPique) colorChosen = "pique";
        const cardCopyToShuffle = JSON.parse(JSON.stringify(userDataCard));
        if(famillyProgress?.[colorChosen]["eightFirstCardFilled"] && !famillyProgress?.[colorChosen]["allCardFilled"]){
            shuffledArrayforPlayGame = cardCopyToShuffle.cards.filter(elt => elt.couleur === colorChosen).slice(0,8).sort((a, b) => 0.5 - Math.random());
        }
        if(famillyProgress?.[colorChosen]["eightFirstCardFilled"] && famillyProgress?.[colorChosen]["allCardFilled"]){
            shuffledArrayforPlayGame = cardCopyToShuffle.cards.filter(elt => elt.couleur === colorChosen).sort((a, b) => 0.5 - Math.random()).slice(0,12);
        }
        handleCloseModal();
        props.navigation.push("PlayPregame", {userCards: shuffledArrayforPlayGame});
    }
    return (
        <Modal visible={visible} transparent={true}>
            <PromptContainer>
                <Animatedbackdrop style={{opacity: animValue}}/>
                <AnimatedPromptContentContainer style={[interpolateTranslation]}>
                    <Header>
                        <CloseButton>
                            <TouchableOpacity onPress={() => handleCloseModal()}>
                                <MaterialCommunityIcons name="close-circle-outline" size={24} color="#000000" />
                            </TouchableOpacity>
                        </CloseButton>
                    </Header>
                    <PromptContentTitle>
                        Sélectionnez la famille à jouer
                    </PromptContentTitle>
                    <PromptContentButtonChoicesContainer>
                        {(famillyProgress?.coeur["eightFirstCardFilled"] || famillyProgress.coeur["allCardFilled"]) && <TouchableOpacity onPress={() => toggleColorCoeur()}>
                            <PromptContentButton color={selectCoeur}>
                                <PromptContentButtonText color={selectCoeur}>
                                    Coeur
                                </PromptContentButtonText>
                            </PromptContentButton>
                        </TouchableOpacity>}
                        {(famillyProgress?.carreau["eightFirstCardFilled"] || famillyProgress.carreau["allCardFilled"]) &&<TouchableOpacity onPress={() => toggleColorCarreau()}>
                            <PromptContentButton color={selectCarreau}>
                                <PromptContentButtonText color={selectCarreau}>
                                    Carreau
                                </PromptContentButtonText>
                            </PromptContentButton>
                        </TouchableOpacity>}
                        {(famillyProgress?.trefle["eightFirstCardFilled"] || famillyProgress.trefle["allCardFilled"]) &&<TouchableOpacity onPress={() => toggleColorTrefle()}>
                            <PromptContentButton color={selectTrefle}>
                                <PromptContentButtonText color={selectTrefle}>
                                    Trèfle
                                </PromptContentButtonText>
                            </PromptContentButton>
                        </TouchableOpacity>}
                        {(famillyProgress?.pique["eightFirstCardFilled"] || famillyProgress.pique["allCardFilled"]) &&<TouchableOpacity onPress={() => toggleColorPique()}>
                            <PromptContentButton color={selectPique}>
                                <PromptContentButtonText color={selectPique}>
                                    Pique
                                </PromptContentButtonText>
                            </PromptContentButton>
                        </TouchableOpacity>}
                    </PromptContentButtonChoicesContainer>
                    <PromptContentButtonValidateContainer>
                    <TouchableOpacity onPress={() => validateOneSelection() &&  handlePlayGame()}>
                        <PromptContentButtonValidate color={validateOneSelection()}>
                            <PromptContentButtonValidateText color={validateOneSelection()}>
                                    Jouer
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