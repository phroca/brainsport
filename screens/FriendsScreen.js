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

const FriendsForm = styled.View`
  align-items: center;
  margin-top: 50px;
`;
const FriendsContainer = styled.View`
  align-items: center;
  margin-top: 50px;
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
const FriendsList = styled.View`
    position: relative;
`
const FriendsCardContainer = styled.View`
    margin-top: 5px;
    margin-bottom: 5px;
`

const FriendsListEmpty = styled.View`
    width: 100%;
    justify-content: center;
    align-items: center;
`
const FriendsListEmptyText = styled.Text`
    font-size: 20px;
    color: #FFFFFF;
    font-weight: bold;
`



const FriendsScreen = ({navigation}) => {
    const [search, setSearch] = useState("");
    const [listFriends, setListFriends] = useState([]);
    const user = useSelector(state => state.user.value);
    useEffect(() => {
        UserService.getUserFriends(user).then((result) => {
            if(result?.data){
                setListFriends(result?.data);
            }
        })
    }, []);

    const filterListFriends = (event) => {
        if(event !== "") {
            const datafiltered = listFriends.filter(item => {
                return item.firstName.toLowerCase().indexOf(event.toLowerCase()) > -1;
            })
            setListFriends(datafiltered);
        } else {
            UserService.getUserFriends(user).then((result) => {
                if(result?.data){
                    setListFriends(result?.data);
                }
            });
        }
        setSearch(event);
        
    }

    return(
    <Container>
    <FriendsForm>
    <TitleBar>
        <CloseButton>
            <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
            </TouchableOpacity>
        </CloseButton>
        <Title>Amis</Title>
      </TitleBar>
      <InputContainer>
            <PreText>
            <Ionicons name="search" size={24} color="#FFFFFF" />
            </PreText>
            <TextInput placeholder="Rechercher" value={search} placeholderTextColor="#FFFFFF" onChangeText={(e)=> filterListFriends(e)}/>
        </InputContainer>
    </FriendsForm>
    <FriendsContainer>
        {listFriends.length > 0 ?
            (
                <FriendsList>
                {listFriends.map((item, index) => (
                    <TouchableOpacity onPress={() => navigation.navigate("AmisProfil", {currentUser: item})}>
                        <FriendsCardContainer>
                            <UserCard
                            key={"classement"+index+"" + item._id}
                            rewardPoints={item.rewardPoints}
                            firstName={item.firstName}
                            color={item.colorProfil}
                            />
                        </FriendsCardContainer>
                    </TouchableOpacity>
                    ))}
                </FriendsList>
            ) : 
            (
                <FriendsListEmpty>
                <FriendsListEmptyText>
                    Aucun ami trouvé !
                </FriendsListEmptyText>
                </FriendsListEmpty>
            )

        }
        
    </FriendsContainer>
    </Container>)
}

export default FriendsScreen;