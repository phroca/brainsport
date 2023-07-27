import React, { forwardRef, useEffect, useRef, useState } from "react";
import { Animated, Dimensions, Modal, TouchableOpacity } from "react-native";
import styled from "styled-components/native";
import { MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';

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

const PromptContentHeaderContainer = styled.View`
    justify-content: center;
    width: ${widthContent - 40}px;
    //align-items: center;

    margin-bottom: 10px;
`;

const PromptContentTitle = styled.Text`
    color: #000000;
    font-size: 20px;
  font-weight: bold;
`;

const PromptContentButtonValidateContainer = styled.View`
    
`;
const PromptContentButtonValidate = styled.View`
  width: ${widthContent - 30}px;
  height: 50px;
  align-items: center;
  margin-top: 5px;
  margin-bottom: 5px;
  flex-direction:row ;
`;
const PromptContentButtonValidateText = styled.View`
    

`;
const PromptContentButtonIcon = styled.View`
    height: 50px;
    width: 50px;
    border-radius: 50px;
    margin-right: 5px;
    background-color: #CCCCCC;
    justify-content: center;
    align-items: center;
`;
const PromptContentButtonValidateTitle = styled.Text`
    color: #000000;
    font-size: 14px;
    font-weight: bold;
`;
const PromptContentButtonValidateLabel = styled.Text`
    color: #2b2b2b;
    font-size: 14px;
`;

const Animatedbackdrop = Animated.createAnimatedComponent(Backdrop);
const AnimatedPromptContentContainer = Animated.createAnimatedComponent(PromptContentContainer);

const GroupChoicePrompt = (props, ref) => {
    const [_visible, _setVisible] = useState(false);
    const [visible, setVisible] = useState(false);

    const animValue = useRef(new Animated.Value(0)).current;


    const currentUser = props?.userData;

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



    const handleCloseModal = () => {
        _setVisible(false);
    }

    const handleCreatePublicGroup = () => {
        handleCloseModal();
        props.navigation.push("CreerGroupe", {user: currentUser, isPublic: true});
    }

    const handleCreatePrivateGroup = () => {
        handleCloseModal();
        props.navigation.push("CreerGroupe", {user: currentUser, isPublic: false});
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
                    <PromptContentHeaderContainer>
                    <PromptContentTitle>
                            Créer un groupe
                    </PromptContentTitle>
                    </PromptContentHeaderContainer>
                    
                    <PromptContentButtonValidateContainer>
                    <TouchableOpacity onPress={() =>handleCreatePublicGroup()}>
                        <PromptContentButtonValidate>
                            <PromptContentButtonIcon>
                            <Ionicons name="people" size={24} color="black" />
                            </PromptContentButtonIcon>

                            <PromptContentButtonValidateText>
                                <PromptContentButtonValidateTitle>
                                    Public
                                </PromptContentButtonValidateTitle>
                                <PromptContentButtonValidateLabel>
                                    Tout le monde peut rejoindre votre groupe
                                </PromptContentButtonValidateLabel>    
                            </PromptContentButtonValidateText>
                        </PromptContentButtonValidate>
                    </TouchableOpacity>
                    </PromptContentButtonValidateContainer>
                    <PromptContentButtonValidateContainer>
                    <TouchableOpacity onPress={() =>handleCreatePrivateGroup()}>
                    <PromptContentButtonValidate>
                            <PromptContentButtonIcon>
                            <Ionicons name="lock-closed" size={24} color="black" />
                            </PromptContentButtonIcon>

                            <PromptContentButtonValidateText>
                                <PromptContentButtonValidateTitle>
                                    Privé
                                </PromptContentButtonValidateTitle>
                                <PromptContentButtonValidateLabel>
                                    Choisissez qui rejoint votre groupe
                                </PromptContentButtonValidateLabel>    
                            </PromptContentButtonValidateText>
                        </PromptContentButtonValidate>
                    </TouchableOpacity>
                    </PromptContentButtonValidateContainer>
                </AnimatedPromptContentContainer>
            </PromptContainer>
        </Modal>
    )

};

export default forwardRef(GroupChoicePrompt);