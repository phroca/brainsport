import React, { useEffect, useRef, useState } from "react";
import Toast from 'react-native-toast-message';
import { ActivityIndicator, SafeAreaView, Animated, Dimensions, TouchableOpacity, TouchableWithoutFeedback, KeyboardAvoidingView, ScrollView, View, Platform } from "react-native";
import { MaterialCommunityIcons, Ionicons } from '@expo/vector-icons'; 
import styled from 'styled-components/native';
import { StatusBar } from "expo-status-bar";
import CommunityService from "../services/Community.service";

const {width, height} = Dimensions.get("screen");
const widthContent = width - 50;

const Container = styled.ImageBackground`
  width: 100%;
  height: 100%;
  align-items: center;
`;

const TitleBar = styled.View`
  justify-content: center;
  align-items: center;
  margin-top: 10px;
  margin-bottom: 10px;
`;

const CloseButton = styled.View`
  width: ${widthContent}px;
  justify-content: flex-start;
`;
const Title = styled.Text`
  margin-top: 20px;
  font-size: 22px;
  font-weight: bold;
  width: 100%;
  color: white;
  text-align: center;
`;


const AvatarContainer = styled.View`
  width: ${widthContent}px;
  align-items: center;
  margin-top: 30px;
  margin-bottom: 30px;
`;
const AvatarCircle = styled.View`
    width: 120px;
    height: 120px;
    border-radius: 100px;
    background-color: #${props=> props.randomHexa};
    align-items: center;
    justify-content: center;
`;
const AvatarText = styled.Text`
    font-size: 40px;
    font-weight: bold;
    color: white;
`;
const GroupForm = styled.View`
  align-items: center;
  margin-bottom: 60px;
`;
const InputContainer = styled.View`
    position: relative;
`

const TextInput = styled.TextInput`
  border: ${props => props.isError === true ? "2px solid #e74c3c" : "1px solid #53565f"};
  width: ${widthContent}px;
  height: 50px;
  border-radius: 10px;
  font-size: 17px;
  color: #FFFFFF;
  padding-left: 10px;
  margin-top: 20px;
  background: #3c4560;
  z-index: 1;
`;
const TextInputDesc = styled.TextInput`
  border: ${props => props.isError === true ? "2px solid #e74c3c" : "1px solid #53565f"};
  width: ${widthContent}px;
  border-radius: 10px;
  font-size: 17px;
  color: #FFFFFF;
  padding-left: 10px;
  margin-top: 20px;
  background: #3c4560;
  z-index: 1;
`;


const ButtonView = styled.View`
  background: white;
  width: ${widthContent}px;
  height: 50px;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  margin-top: 20px;
  box-shadow: 0 10px 20px #c2cbff;
`;

const ButtonText = styled.Text`
  color: black;
  font-weight: bold;
  font-size: 14px;
`;

const CreateGroupSreen = (props) => {
    /* STATE */
    const [groupName, setGroupName] = useState("");
    const [description, setDescription] = useState("");
    const [groupNameError, setGroupNameError] = useState("");
    const [descriptionError, setDescriptionError] = useState("");
    const [initials, setInitials] = useState("");
    const [hexagenerated, setHexagenerated] = useState("");
;    const { user, isPublic } = props.route.params;
    /* REFS */
    const refGroupName = useRef(null);
    const refDescription = useRef(null); 

    const genHexString = () => {
        const hex = '0123456789ABCDEF';
        let output = '';
        for (let i = 0; i < 6; ++i) {
            output += hex.charAt(Math.floor(Math.random() * hex.length));
        }
        return output;
    }

    const generateInitials = (string) => {
        var names = string.split(' '),
            initials = names[0].substring(0, 1).toUpperCase();
        
        if (names.length > 1) {
            initials += names[names.length - 1].substring(0, 1).toUpperCase();
        }
        return initials;
    };
    
    useState(() => {
        setHexagenerated(genHexString());
    }, []);

    useState(() => {
        setInitials(generateInitials(groupName));
        console.log(groupName);
    }, [groupName]);


    const handleFocusText = (reference) => {
        reference.current.focus();
    }
    const reinitErrorAttributes = () =>{
        setGroupNameError(false);
        setDescriptionError(false);
    } 
    const confirmAllConditionPassed = () => {
        return groupName && description;
    }
    

    const handleCreate = () => {
        reinitErrorAttributes();
        if(groupName === "") {
            setGroupNameError(true);
          }
          if(description === ""){
            setDescriptionError(true);
          }
          if(confirmAllConditionPassed()){
            try{
                CommunityService.createGroup({title: groupName, colortheme: "#"+hexagenerated, description, userOwner: user.userId, visibility: isPublic}).then((value)=> {
                    if(value?.data) {
                        CommunityService.getGroupsByIdFromCurrentUser(user.userId, value.data.insertId).then((value) => {
                            if(value?.data){
                                props.navigation.navigate("Group", { groupData: value?.data, currentUserId: user.userId });
                                Toast.show({
                                    type: 'success',
                                    text1: 'Le groupe est créé',
                                    text2:  "Vous avez créé un groupe."
                                  });
                            }
                        }).catch((error) => {
                            Toast.show({
                                type: 'error',
                                text1: "Erreur à la création de groupe" ,
                                text2: "veuillez réessayer ultérieurement."
                            });
                        })
                    }
                }).catch((error) => {
                    Toast.show({
                        type: 'error',
                        text1: "Erreur à la création de groupe" ,
                        text2: "veuillez réessayer ultérieurement."
                    });
                })
            } catch(error){
                console.error('error creation groupe:', error);
                Toast.show({
                type: 'error',
                text1: "Erreur à la création de groupe" ,
                text2: "veuillez réessayer ultérieurement."
                });
            }
          }else {
            Toast.show({
              type: 'error',
              text1: "Erreur à la création de groupe" ,
              text2: "Problème à la création de groupe. Veuillez corriger les points en rouge."
            });
          }
    }
    return (
        <Container source={require("../assets/brainsport-bg.png")}>
            <StatusBar hidden />
            <SafeAreaView>
                <TitleBar>
                    <CloseButton>
                    <TouchableOpacity onPress={() => props.navigation.goBack()}>
                        <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
                    </TouchableOpacity>
                    </CloseButton>
                    <Title>Créer un groupe</Title>
                </TitleBar>
                <AvatarContainer>
                    <AvatarCircle randomHexa={hexagenerated}>
                        <AvatarText>{initials}</AvatarText>
                    </AvatarCircle>
                </AvatarContainer>
                <GroupForm>
                <TouchableWithoutFeedback onPress={()=> handleFocusText(refGroupName)}>
                    <InputContainer>
                        <TextInput placeholder="Nom du groupe" ref={refGroupName} isError={groupNameError} onChangeText={(e)=> {setGroupName(e); setInitials(generateInitials(e));}}/>
                    </InputContainer>
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback onPress={()=> handleFocusText(refDescription)}>
                    <InputContainer>
                        <TextInputDesc multiline numberOfLines={6} placeholder="Description" ref={refDescription} isError={descriptionError} onChangeText={(e)=> setDescription(e)}/>
                    </InputContainer>
                </TouchableWithoutFeedback>
                <TouchableOpacity onPress={()=> handleCreate()}>
                    <ButtonView>
                        <ButtonText>Créer le groupe</ButtonText>
                    </ButtonView>
                </TouchableOpacity>
                </GroupForm>
            </SafeAreaView>
        </Container>
    )
}

export default CreateGroupSreen;