import React, { useEffect, useRef, useState, useCallback } from "react";
import { StatusBar } from "expo-status-bar";
import styled from 'styled-components/native';
import { ActivityIndicator, SafeAreaView, Animated, Dimensions, TouchableOpacity, TouchableWithoutFeedback, KeyboardAvoidingView, ScrollView, View, Platform } from "react-native";
import { MaterialCommunityIcons, Ionicons } from '@expo/vector-icons'; 
import { useSelector } from "react-redux";
import { useFocusEffect } from "@react-navigation/native";
import UserService from "../services/User.service";
import { useInitials } from "../hooks/useInitials";
import UserEditPrompt from "../components/UserEditPrompt";
import { useCalculatePoints } from "../hooks/useCalculatePoints";

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
  background-color:#0c0c0c;
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
  margin-left: 20px;
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

const RewardSection = styled.View`
  justify-content: center;
  align-items: center;
  flex-direction: row;
`;
const RewardAssociation = styled.View`
  justify-content: center;
  align-items: center;
`;
const RewardLevelCardImage = styled.View`
  justify-content: center;
  align-items: center;
`;
const RewardLevelCard = styled.Image`
  width: 80px;
  height: 80px;
  margin: 10px 20px;
  border-radius: 10px;
  border: .2px solid #0000003d;
`;

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

const imgLevel = {
  "Novice": require("../assets/level/novice.png"),
  "Intermédiaire": require("../assets/level/intermediaire.png"),
  "Avancé": require("../assets/level/avan.png"),
  "Expert": require("../assets/level/expert.png"), 
  "Maître": require("../assets/level/maitre.png"), 
  "Génie": require("../assets/level/genie.png")
}

const AvatarProfilScreen = (props) => {

  const user = useSelector(state => state.user.value);
  const [currentUser, setCurrentUser] = useState(USER_DEFAULT);
  const [userLevel, setUserLevel] = useState({});
  const [flagUserLevel, setFlagUserLevel] = useState(false);
  const [flagUser, setFlagUser] = useState(false);

  const userEditRef = useRef();
  useFocusEffect(
    useCallback(() => {
      if(!flagUser){
        UserService.getUserByUserId(user).then((value) => {
          if(value?.data){
            setCurrentUser(value.data[0]);
          }
        });
      }
      return () => setFlagUser(true)
    }, [currentUser, user])
  );

  useFocusEffect(
    useCallback(() => {
      if(!flagUserLevel){
        UserService.getListOfRewards().then((value) => {
          if(value?.data){
            setUserLevel(calculateRankByUserReward(value.data, currentUser.rewardPoints));
          }
        });
      }
      return () => setFlagUserLevel(true)
    }, [currentUser, userLevel])
  );
  
  const calculateRankByUserReward = (listRewards, currentUserRewardPoints) => {
    let currentLevel = {};
    if(currentUserRewardPoints === 0) {
      return listRewards[0];
    } else if(currentUserRewardPoints >= listRewards[listRewards.length - 1]) {
      return listRewards[listRewards.length - 1];
    } else {
      for (let i = 1; i < listRewards.length -1 ; i++) {
      
        if (i > 0 && currentUserRewardPoints >= listRewards[i].rewardPointToReach && currentUserRewardPoints < listRewards[i+1].rewardPointToReach){
          currentLevel = listRewards[i]
          break;
        }
      }
      return currentLevel;
    }
    
  }
  const handleEditUser = () => {
    userEditRef.current.setVisible(true);
  }
    return (
        <Container>
        <StatusBar hidden />
            <SafeAreaView>
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
            <TouchableOpacity onPress={() => handleEditUser()}>
              <UserEditContainer>
                <UserEditIcon>
                <MaterialCommunityIcons name="pencil" size={10} color="#FFFFFF" />
                </UserEditIcon>
                <UserEditContent>Modifier les détails</UserEditContent>
              </UserEditContainer>
            </TouchableOpacity>
            <UserInfoContainer>
              <UserName>{currentUser.lastName} {currentUser.firstName}</UserName>
              <RewardSection>
                <RewardCard>
                  <RewardNumber>
                      {currentUser.rewardPoints}
                  </RewardNumber>
                  <RewardLabel>
                    Points
                  </RewardLabel>
                </RewardCard>
                <RewardAssociation>
                  <MaterialCommunityIcons name="arrow-right-thin" size={24} color="white" />
                </RewardAssociation>
                <RewardLevelCardImage >
                  <RewardLevelCard source={imgLevel[userLevel?.levelName]}/>
                  <RewardLabel>
                    {userLevel?.levelName}
                  </RewardLabel>
                </RewardLevelCardImage>
              </RewardSection>
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
          </SafeAreaView>
          <UserEditPrompt ref={userEditRef} currentUser={currentUser} navigation={props.navigation}/>
        </Container>
        );
}

export default AvatarProfilScreen;