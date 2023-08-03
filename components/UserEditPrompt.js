import React, { forwardRef, useEffect, useRef, useState } from "react";
import { Animated, Dimensions, Modal, TouchableOpacity } from "react-native";
import styled from "styled-components/native";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useInitials } from "../hooks/useInitials";
import { ScrollView } from "react-native";
import { TouchableWithoutFeedback } from "react-native";
import UserService from "../services/User.service";
import { current } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import SelectDropdown from "react-native-select-dropdown";
import { StyleSheet } from "react-native";

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;
const widthContent = screenWidth  - 50;

const PromptContainer = styled.View`
    flex: 1;
`;

const Header = styled.View`
    justify-content: space-between;
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

const AvatarContainer = styled.View`
justify-content: center;
align-items: center;
align-self: flex-start;
`;

const AvatarCircle = styled.View`
  border-radius: 80px;
  padding: 5px;
  min-height: 80px;
  min-width: 80px;
  background-color: ${props=> props.colortheme};
  align-items: center;
  justify-content: center;
  border: 1px solid #0c0c0c;
`;
const AvatarText = styled.Text`
  font-size: 30px;
  font-weight: bold;
  color: white;
`;

const PromptContentContainer = styled.View`
    position: absolute;
    bottom: 0;
    width: ${screenWidth}px;
    height: ${screenHeight -100}px;
    background-color: #1b1b1b;
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

const PromptContentButtonValidateContainer = styled.View`
    
`;
const PromptContentButtonValidate = styled.View`
    background: rgba(255,255,255,0.5);
  width: auto;
  padding: 5px;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
  margin-top: 20px;
  margin-bottom: 20px;
`;
const PromptContentButtonValidateText = styled.Text`
    font-size: 14px;
    font-weight: 300;
    color: white;
`;

const UserNamesContainer = styled.View`
    
`;
const UserLocationContainer = styled.View`
    
`;
const UserDescriptionContainer = styled.View`
    
`;

const InputContainer = styled.View`
    position: relative;
    margin: 10px 0;
`
const PreText = styled.Text`
color: #FFFFFF;
  width: 100px;
  height: 24px;
  font-weight:bold;
  font-size: 14px;
  position: absolute;
  left: 10px;
  z-index: 2;
`;

const TextInput = styled.TextInput`
  border: ${props => props.isError === true ? "2px solid #e74c3c" : "1px solid #53565f"};
  width: ${widthContent}px;
  height: 44px;
  border-radius: 10px;
  font-size: 17px;
  color: #FFFFFF;
  padding-left: 10px;
  margin-top: 20px;
  background: #4d4d4d;
  z-index: 1;
`;
const TextInputBio = styled.TextInput`
  border: 1px solid #53565f;
  width: ${widthContent}px;
  border-radius: 10px;
  font-size: 17px;
  color: #FFFFFF;
  padding-left: 10px;
  padding-top: 10px;
  margin-top: 20px;
  background: #4d4d4d;
  z-index: 1;
`;

//LIST REGIONS
const regionList = ["Auvergne-Rhône-Alpes", "Bourgogne-Franche-Comté", "Bretagne", "Centre-Val de Loire", "Corse", "Grand-Est", "Guadeloupe", "Guyane", "Hauts-de-France", "Île-de-France", "La Réunion", "Martinique", "Mayotte", "Normandie", "Nouvelle-Aquitaine", "Occitanie", "Pays de la Loire", "Provence-Alpes-Côte d'Azur"];
const styles = StyleSheet.create({
    dropdownBtnStyle: {
      width: widthContent,
      height: 44,
      backgroundColor: '#4d4d4d',
      borderRadius: 10,
      borderWidth: 1,
      borderColor: '#53565f',
      marginTop: 20
    },
    dropdownTxtStyle: {
        fontSize: 17,
        textAlign: 'left',
        color: '#FFFFFF'
    }
  })

// Animations
const Animatedbackdrop = Animated.createAnimatedComponent(Backdrop);
const AnimatedPromptContentContainer = Animated.createAnimatedComponent(PromptContentContainer);

const UserEditPrompt = (props, ref) => {

    const [_visible, _setVisible] = useState(false);
    const [visible, setVisible] = useState(false);
    const [firstName, setFirstName] = useState("");
    const [firstnameError, setFirstnameError] = useState(false);
    const [lastName, setLastName] = useState("");
    const [lastnameError, setLastnameError] = useState(false);
    const [address, setAddress] = useState("");
    const [addressError, setAddressError] = useState(false);
    const [zipCode, setZipCode] = useState("");
    const [zipCodeError, setZipCodeError] = useState(false);
    const [city, setCity] = useState("");
    const [cityError, setCityError] = useState(false);
    const [region, setRegion] = useState("");
    const [regionError, setRegionError] = useState(false);
    const [bio, setBio] = useState("");

    /* REFS */
    const refLastname = useRef(null);
    const refFirstname = useRef(null);
    const refAddress = useRef(null);
    const refZipCode = useRef(null);
    const refCity = useRef(null);
    const refRegion = useRef(null);
    const refBio = useRef(null);
    
    const user = useSelector(state => state.user.value);
    const currentUser = props?.currentUser;
    const animValue = useRef(new Animated.Value(0)).current;

    const handleFocusText = (reference) => {
        reference.current.focus();
      }

    useEffect(() => {
        setFirstName(currentUser.firstName);
        setLastName(currentUser.lastName);
        setAddress(currentUser.address);
        setZipCode(currentUser.zipCode);
        setCity(currentUser.city);
        setRegion(currentUser.region);
        setBio(currentUser.bio);
    },[currentUser]);

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

    const handleSaveUser = () => {
        UserService.updateUser({userId: user, email: currentUser.email, firstName, lastName, birthDate: currentUser.birthDate, phoneNumber: currentUser.phoneNumber, bio, colorProfil: currentUser.colorProfil, address, zipCode, city, region}).then((value) =>{
            if(value.data) {
                handleCloseModal();
                props.navigation.pop();
                props.navigation.push("Avatar");
            }
        })
    }

    return (
        <Modal visible={visible} transparent={true}>
            <PromptContainer>
                <Animatedbackdrop style={{opacity: animValue}}/>
                <AnimatedPromptContentContainer style={[interpolateTranslation]}>
                    <Header>
                        <CloseButton>
                            <TouchableOpacity onPress={() => handleCloseModal()}>
                                <MaterialCommunityIcons name="close-circle-outline" size={24} color="#FFFFFF" />
                            </TouchableOpacity>
                        </CloseButton>
                        <PromptContentButtonValidateContainer>
                            <TouchableOpacity onPress={() => handleSaveUser()}>
                                <PromptContentButtonValidate>
                                    <PromptContentButtonValidateText>
                                            Sauvegarder
                                    </PromptContentButtonValidateText>
                                </PromptContentButtonValidate>
                            </TouchableOpacity>
                        </PromptContentButtonValidateContainer>
                    </Header>
                    <ScrollView style={{height: "100%"}} showsVerticalScrollIndicator={false}>
                        <AvatarContainer>
                            <AvatarCircle colortheme={currentUser.colorProfil}>
                                <AvatarText>{useInitials(currentUser.firstName)}</AvatarText>
                            </AvatarCircle>
                        </AvatarContainer>
                        <UserNamesContainer>
                        <TouchableWithoutFeedback onPress={()=> handleFocusText(refLastname)}>
                            <InputContainer>
                                <PreText>Nom</PreText>
                                <TextInput value={lastName} ref={refLastname} isError={lastnameError} onChangeText={(e)=> setLastName(e)}/>
                            </InputContainer>
                        </TouchableWithoutFeedback>
                        <TouchableWithoutFeedback onPress={()=> handleFocusText(refFirstname)}>
                            <InputContainer>
                                <PreText>Prenom</PreText>
                                <TextInput value={firstName} ref={refFirstname} isError={firstnameError} onChangeText={(e)=> setFirstName(e)}/>
                            </InputContainer>
                        </TouchableWithoutFeedback>
                        </UserNamesContainer>
                        <UserLocationContainer>
                        <TouchableWithoutFeedback onPress={()=> handleFocusText(refAddress)}>
                            <InputContainer>
                                <PreText>Adresse</PreText>
                                <TextInput value={address} ref={refAddress} isError={addressError} onChangeText={(e)=> setAddress(e)}/>
                            </InputContainer>
                        </TouchableWithoutFeedback>
                        <TouchableWithoutFeedback onPress={()=> handleFocusText(refZipCode)}>
                            <InputContainer>
                                <PreText>Code Postale</PreText>
                                <TextInput value={zipCode} ref={refZipCode} isError={zipCodeError} onChangeText={(e)=> setZipCode(e)}/>
                            </InputContainer>
                        </TouchableWithoutFeedback>
                        <TouchableWithoutFeedback onPress={()=> handleFocusText(refRegion)}>
                            <InputContainer>
                                <PreText>Région</PreText>
                                <SelectDropdown
                                    data={regionList}
                                    defaultValue={region}
                                    defaultButtonText=" "
                                    onSelect={(selectedItem, index) => {
                                        setRegion(selectedItem);
                                    }}
                                    buttonTextAfterSelection={(selectedItem, index) => {
                                        // text represented after item is selected
                                        // if data array is an array of objects then return selectedItem.property to render after item is selected
                                        return selectedItem
                                    }}
                                    rowTextForSelection={(item, index) => {
                                        // text represented for each item in dropdown
                                        // if data array is an array of objects then return item.property to represent item in dropdown
                                        return item
                                    }}
                                    buttonStyle={styles.dropdownBtnStyle}
                                    buttonTextStyle={styles.dropdownTxtStyle}
                                />
                            </InputContainer>
                        </TouchableWithoutFeedback>
                        <TouchableWithoutFeedback onPress={()=> handleFocusText(refCity)}>
                            <InputContainer>
                                <PreText>Ville</PreText>
                                <TextInput value={city} ref={refCity} isError={cityError} onChangeText={(e)=> setCity(e)}/>
                            </InputContainer>
                        </TouchableWithoutFeedback>
                        </UserLocationContainer>
                        <UserDescriptionContainer>
                        <TouchableWithoutFeedback onPress={()=> handleFocusText(refBio)}>
                            <InputContainer>
                                <PreText>Ma bio</PreText>
                                <TextInputBio value={bio} style={{textAlignVertical: 'top'}} ref={refBio} multiline numberOfLines={6} onChangeText={(e)=> setBio(e)}/>
                            </InputContainer>
                        </TouchableWithoutFeedback>
                        </UserDescriptionContainer>
                    </ScrollView>
                </AnimatedPromptContentContainer>
            </PromptContainer>
        </Modal>
    )
}

export default forwardRef(UserEditPrompt);