import React, { useEffect, useRef, useState, useCallback } from "react";
import { StatusBar } from "expo-status-bar";
import styled from 'styled-components/native';
import { ActivityIndicator, SafeAreaView, Animated, Dimensions, TouchableOpacity, TouchableWithoutFeedback, KeyboardAvoidingView, ScrollView, View, Platform } from "react-native";
import { MaterialCommunityIcons, Ionicons } from '@expo/vector-icons'; 
import { useSelector } from "react-redux";
import { useFocusEffect } from "@react-navigation/native";
import UserService from "../services/User.service";
import { useInitials } from "../hooks/useInitials";
import UserCard from "../components/UserCard";
import GroupCard from "../components/GroupCard";


const {width, height} = Dimensions.get("screen");
const widthContent = width - 50;


const Container = styled.View`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: #0c0c0c;
  align-items: center;
`;

const TextInput = styled.TextInput`
  border: 1px solid #53565f;
  width: ${widthContent}px;
  height: 44px;
  border-radius: 10px;
  font-size: 17px;
  color: #FFFFFF;
  padding-left: 40px;
  margin-top: 20px;
  background: #3c4560;
  z-index: 1;
`;

const Header = styled.View`
  align-items: center;
  margin-top: 50px;
`;
const NotifContainer = styled.View`
  align-items: center;
`;

const TitleBar = styled.View`
  justify-content: center;
  align-items: center;

  margin-bottom: 30px;
`;

const CloseButton = styled.View`
  width: ${widthContent}px;
  justify-content: flex-start;
`;

const Title = styled.Text`
  margin-top: 20px;
  font-size: 22px;
  font-weight: bold;
  width: 275px;
  color: #FFFFFF;
  text-align: left;
`;

const SubTitle = styled.Text`
  margin-top: 20px;
  font-size: 14px;
  width: 275px;
  color: #62666A;
  text-align: left;
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

const ButtonViewSecondary = styled.View`
  background: #131516;
  width: ${widthContent}px;
  height: 50px;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  margin-top: 20px;
  box-shadow: 0 10px 20px #c2cbff;
`;

const ButtonText = styled.Text`
  color: #000000;
  font-weight: bold;
  font-size: 14px;
`;

const ButtonViewLink = styled.View`
  background: transparent;
  width: ${widthContent}px;
  justify-content: center;
  align-items: center;
  margin-top: 10px;
`;

const ButtonTextLink = styled.Text`
  color: #5263ff;
  text-decoration: underline;
  font-size: 16px;
`;

const PreText = styled.View`
  width: 24px;
  height: 24px;
  position: absolute;
  top: 30px;
  left: 10px;
  z-index: 2;
`;

const InputContainer = styled.View`
    position: relative;
`
const NotificationContainer = styled.View`
    width: ${widthContent}px;
    margin-left: 20px;
    justify-content: center;
    margin-top: 20px;
    margin-bottom: 20px;
`
const NotificationHeader = styled.View`
    position: relative;
`
const NotificationTitle = styled.Text`
    font-size: 16px;
    font-weight: bold;
    color: white;
`
const NotificationList = styled.View`
    position: relative;
`

const Separator = styled.View`
    height: .5px;
    width: ${widthContent}px;
    align-self: center;
    border: .2px solid gray;
    margin: 20px;
`
const NotificationEmptyList = styled.View`
margin-top: 20px;
    width: 100%;
    justify-content: center;
    align-items: center;
`
const NotificationEmptyListText = styled.Text`
    font-size: 14px;
    color: #FFFFFF;
    font-weight: normal;
`
const FriendsToAddList = styled.View`
    position: relative;
`

const FriendsToAddCardContainer = styled.View`
    margin-top: 20px;
    margin-bottom: 5px;
`
const PrivateGroupToAddList = styled.View`
    position: relative;
`

const PrivateGroupToAddCardContainer = styled.View`
    margin-top: 5px;
    margin-bottom: 5px;
`


const NotificationsScreen = ({navigation}) => {
    const [search, setSearch] =useState("");
    const user = useSelector(state => state.user.value);
    const [friendToAddList, setFriendToAddList] = useState([]);
    const [privateGroupToAddList, setPrivateGroupToAddList] = useState([]);

    useEffect(() => {
        UserService.getFriendsWhoAddedCurrentUser(user, "WAITING").then((result) => {
          if(result?.data){
            setFriendToAddList(result?.data);
          }
        });
    }, [search]);


    return(
    <Container>
      <Header>
        <TitleBar>
          <CloseButton>
              <TouchableOpacity onPress={() => navigation.goBack()}>
              <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
              </TouchableOpacity>
          </CloseButton>
          <Title>Notifications</Title>
        </TitleBar>
      </Header>
      <NotifContainer>
        <NotificationContainer>
          <NotificationHeader>
            <NotificationTitle>Mes demandes d'amis</NotificationTitle>
          </NotificationHeader>
          <NotificationList>
          {friendToAddList.length > 0 ?
            (
                <FriendsToAddList>
                {friendToAddList.map((item, index) => (
                    <TouchableOpacity onPress={() => navigation.navigate("AmisProfil", {currentUser: item})}>
                        <FriendsToAddCardContainer>
                            <UserCard
                            key={"classement"+index+"" + item._id}
                            rewardPoints={item.rewardPoints}
                            firstName={item.firstName}
                            color={item.colorProfil}
                            />
                        </FriendsToAddCardContainer>
                    </TouchableOpacity>
                    ))}
                </FriendsToAddList>
            ) : 
            (
                <NotificationEmptyList>
                <NotificationEmptyListText>
                    Aucune demande d'amis
                </NotificationEmptyListText>
                </NotificationEmptyList>
            )

        }
          </NotificationList>
        </NotificationContainer>
        <Separator />
        <NotificationContainer>
          <NotificationHeader>
            <NotificationTitle>Mes demandes de groupes</NotificationTitle>
          </NotificationHeader>
          <NotificationList>
          {privateGroupToAddList.length > 0 ?
            (
                <PrivateGroupToAddList>
                {privateGroupToAddList.map((item, index) => (
                    <TouchableOpacity onPress={() => navigation.navigate("AmisProfil", {groupData: item})}>
                        <PrivateGroupToAddCardContainer>
                            <GroupCard
                            key={"classement"+index+"" + item._id}
                            rewardPoints={item.rewardPoints}
                            firstName={item.firstName}
                            color={item.colorProfil}
                            />
                        </PrivateGroupToAddCardContainer>
                    </TouchableOpacity>
                    ))}
                </PrivateGroupToAddList>
            ) : 
            (
                <NotificationEmptyList>
                <NotificationEmptyListText>
                    Aucune demande de groupe
                </NotificationEmptyListText>
                </NotificationEmptyList>
            )

        }
          </NotificationList>
        </NotificationContainer>
      </NotifContainer>
    </Container>)
}

export default NotificationsScreen;