import React, { useEffect, useRef, useState } from "react";
import { StatusBar } from "expo-status-bar";
import styled from 'styled-components/native';
import { ActivityIndicator, SafeAreaView, Animated, Dimensions, TouchableOpacity, TouchableWithoutFeedback, KeyboardAvoidingView, ScrollView, View, Platform } from "react-native";
import { MaterialCommunityIcons, Ionicons } from '@expo/vector-icons'; 
import { useSelector } from "react-redux";
import { useFocusEffect } from "@react-navigation/native";
import UserService from "../services/User.service";
import { useInitials } from "../hooks/useInitials";

const {width, height} = Dimensions.get("screen");
const widthContent = width - 50;

const USER_DEFAULT = {
  "userId": "", 
  "email": "", 
  "firstName": "", 
  "lastName": "", 
  "birthDate": 0, 
  "phoneNumber": "", 
  "bio": "", 
  "profilPic": "", 
  "colorProfil": "",
  "profilBg": "", 
  "rewardPoints": 0, 
  "address": "", 
  "zipCode": "", 
  "city": "", 
  "region": ""
}

const Container = styled.View`
  flex:1;
  width: 100%;
  height: 100%;
  background-color:#0c0c0c ;
`;

const BgContainer = styled.Image`
  position: absolute;
  width: 100%;
  height: 200px;
  top: 0;
  left: 0;
`;

const TitleBar = styled.View`
  justify-content: center;
  align-items: center;
  margin-top: 50px;
  margin-bottom: 10px;
`;

const CloseButton = styled.View`
  width: ${widthContent}px;
  justify-content: flex-start;
`;
  const AvatarContainer = styled.View`
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 160px;
  left: ${width/2 - 40}px;
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

const UserInfoContainer = styled.View`
  margin-top: 10px;
  align-items: center;
  justify-content: center;
`;

const UserName = styled.Text`
    font-size: 20px;
    font-weight: bold;
    color: white;
`;

const Separator = styled.View`
    height: .5px;
    width: ${widthContent}px;
    align-self: center;
    border: .2px solid gray;
    margin: 20px;
`
const UserContainer = styled.View`
  width: ${widthContent}px;
  padding-right: 20px;
  padding-left: 20px;
  justify-content: center;
  margin-top: 20px;
  margin-bottom: 20px;

`
const UserTitle = styled.Text`
    font-size: 16px;
    font-weight: bold;
    color: white;
`
const UserContent = styled.Text`
    font-size: 14px;
    font-weight: 300;
    color: white;
`
const UserEditContainer = styled.View`
  width: auto;
  align-self: flex-end;
  padding: 5px;
  border-radius: 5px;
  justify-content: center;
  flex-direction:row; ;
  margin-top: 150px;
  margin-bottom: 5px;
  margin-right: 20px;
  margin-left: 20px;
  background-color: rgba(255,255,255,0.5);

`
const UserEditIcon = styled.View`
    align-self: center;
  justify-content: center;
`
const UserEditContent = styled.Text`
    font-size: 10px;
    font-weight: 300;
    color: white;
`
const RewardCard = styled.View`
width: 80px;
height: 80px;
background: #0000003d;
margin: 10px 20px;
justify-content: center;
  align-items: center;
  border-radius: 10px;
  border: .2px solid #FFFFFF;
`;
const RewardNumber = styled.Text`
color: #FFFFFF;
  font-size: 25px;
  font-weight: bold;
`;

const RewardLabel = styled.Text`
color: #FFFFFF;
  font-size: 14px;
`;

const AvatarProfilScreen = (props) => {

  const user = useSelector(state => state.user.value);
  const [currentUser, setCurrentUser] = useState(USER_DEFAULT);
  const [initials, setInitials] = useState("");
  useEffect(() => {
    UserService.getUserByUserId(user).then((value) => {
      if(value?.data){
        setCurrentUser(value.data[0]);
      }
    });
  }, [user]);

    return (
        <Container>
            <BgContainer source={require("../assets/default/default-bg.jpg")}/>
            <TitleBar>
                <CloseButton>
                  <TouchableOpacity onPress={() => props.navigation.goBack()}>
                    <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
                  </TouchableOpacity>
                </CloseButton>
            </TitleBar>
            <AvatarContainer>
              <AvatarCircle colortheme={currentUser.colorProfil}>
                  <AvatarText>{useInitials(currentUser.firstName)}</AvatarText>
              </AvatarCircle>
            </AvatarContainer>
            <UserEditContainer>
              <UserEditIcon>
              <MaterialCommunityIcons name="pencil" size={10} color="#FFFFFF" />
              </UserEditIcon>
              <UserEditContent>Modifier les détails</UserEditContent>
            </UserEditContainer>
            <UserInfoContainer>
              <UserName>{currentUser.lastName} {currentUser.firstName}</UserName>
              <RewardCard>
                  <RewardNumber>
                      {currentUser.rewardPoints}
                  </RewardNumber>
                  <RewardLabel>
                    Points
                  </RewardLabel>
                </RewardCard>
            </UserInfoContainer>
            <Separator />
            
            <UserContainer>
              <UserTitle>Bio</UserTitle>
              <UserContent>{currentUser.bio === "" ? "Pas encore de bio..." : currentUser.bio}</UserContent>
            </UserContainer>
            <UserContainer>
              <UserTitle>Région</UserTitle>
              <UserContent>{currentUser.region === "" ? "Région pas sélectionné..." : currentUser.region }</UserContent>
            </UserContainer>

        </Container>);
}

export default AvatarProfilScreen;