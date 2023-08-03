import React, { useRef, useState, useEffect, useCallback } from "react";
import { SafeAreaView, ScrollView, StatusBar, Dimensions, Animated, FlatList } from "react-native";
import styled from 'styled-components/native';
import {challengeList} from "../challenge-list";
import {eventList} from "../event-list";
import ChallengeCard from "../components/ChallengeCard";
import EventCard from "../components/EventCard";
import { MaterialCommunityIcons } from '@expo/vector-icons'; 
import { TouchableOpacity } from "react-native";
import UserService from "../services/User.service";
import { Auth } from "aws-amplify";
import { Text } from "react-native";
import GroupChoicePrompt from "../components/GroupChoicePrompt";
import { useFocusEffect } from "@react-navigation/native";
import CommunityService from "../services/Community.service";
import GroupCard from "../components/GroupCard";
import GroupInvitationPrompt from "../components/GroupInvitationPrompt";

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;
const widthContent = screenWidth  - 50;

const Container = styled.ImageBackground`
  flex:1;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
`;

const TitleBar = styled.View`
  width: 100%;
  margin-top: 30px;
  margin-bottom: 30px;
`;

const Title = styled.Text`
  color: #FFFFFF;
  font-size: 40px;
  font-weight: bold;
  text-align: center;
`;

const Subtitle = styled.Text`
color: #FFFFFF;
  font-size: 14px;
  margin-left: 40px;
  margin-top: 10px;
  margin-right: 40px;
`;

const ConnecterSection = styled.View`
  justify-content: center;
  align-items: center;
  margin-bottom: 30px;
`;

const Mappemonde = styled.Image`
  width: ${widthContent}px;
  height: 200px;
`;

const LinkText = styled.Text`
  color: #FFFFFF;
  text-transform: uppercase;
  font-size: 12px;
`;

const CommuSection = styled.View`
  justify-content: center;
  align-items: center;
  margin-left: 10px;
  margin-top: 10px;
  margin-bottom: 10px;

`;

const SectionTitle = styled.View`
  width: ${screenWidth}px;
  margin-left: 10px;
  text-align: left;
`;

const SectionTitleGroup = styled.View`
  width: ${screenWidth}px;
  margin-left: 10px;
  margin-bottom: 10px;
  flex-direction: row;
  align-items: center;
`;

const SectionTitleText = styled.Text`
  width: ${screenWidth}px;
  color: #FFFFFF;
  font-size: 20px;
  text-transform: capitalize;
  font-weight: bold;
`;

const SectionTitleTextGroup = styled.Text`
  color: #FFFFFF;
  font-size: 20px;
  text-transform: capitalize;
  font-weight: bold;
`;

const SectionContent = styled.View`
  width: ${screenWidth}px;
  margin-top: 10px;
  margin-left: 10px;
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const SectionIcon = styled.View`
  width: 80px;
`;

const SectionContentText = styled.Text`
  width: ${screenWidth}px;
  color: #FFFFFF;
  font-size: 16px;
`;

const SectionPastilleButton = styled.View`
  background-color: #A138F2;
  width: 100px;
  padding: 5px;
  border-radius: 5px;
  margin-left: 10px;
  justify-items: center;
  align-items: center;
`;

const SectionButtonText = styled.Text`
  color: #FFFFFF;
  font-size: 10px;
`;


const EvenementSection = styled.View`
  justify-content: center;
  align-items: center;
`;

const ClassementSection = styled.View`
  justify-content: center;
  align-items: center;
`;

const GroupesSection = styled.View`
  justify-content: center;
  align-items: center;
`;

const CardContainer = styled.View`
  margin-right: 10px;
  margin-left: 10px;
`;

const CardGroupContainer = styled.View`
  margin-right: 10px;
  margin-left: 10px;
  padding: 5px;
`;

const CommunauteScreen = ({navigation}) => {
    const challengeRef = useRef(null);
    const eventRef = useRef(null);
    const groupRef = useRef(null);
    const promptGroupRef = useRef();
    const [userId, setUserId] = useState("");
    const [userRankInfo, setUserRankInfo] = useState({"totalUsers": 0, "userRank": 0});
    const [currentUser, setCurrentUSer] = useState({});
    const [groupList, setGroupList] = useState([]);
    const [publicGroupList, setPublicGroupList] = useState([]);
    const [flagFetchGroup, setFlagFetchGroup] = useState(false);
    useEffect(()=> {
      (async() => {
      const user = await Auth.currentUserInfo();
      const userId = user?.attributes?.sub;
      setUserId(user?.attributes?.sub);
      UserService.getUserRankAndNumberUsers(userId).then((value) => {
        if(value?.data){
          setUserRankInfo(value.data);
        }
      }).catch((error) => {
        console.error(error);
      })
      UserService.getUserByUserId(userId).then((value) => {
        if(value?.data.length > 0) {
          setCurrentUSer(value?.data[0]);
        }
      }).catch((error) => {
        console.error(error);
      })
      })();
    },[])

    useFocusEffect(
      useCallback(()=> {
        if(!flagFetchGroup){
          if(userId !== "") {

            CommunityService.getGroupsFromCurrentUser(userId).then((value) => {
              if(value?.data) {
                setGroupList(value?.data);
              }
            }).catch((error) => {
              console.error(error);
            });
            CommunityService.getPublicGroupNotRegistered(userId).then((value) => {
              if(value?.data) {
                setPublicGroupList(value?.data);
              }
            }).catch((error) => {
              console.error(error);
            });

          }
        }
        
        return () => setFlagFetchGroup(true)
      },[userId])
      );
    const activateAddGroup = () => {
      promptGroupRef.current.setVisible(true);
    }
    const handleVerifyGroup = (item, userId) => {
      CommunityService.getGroupsByIdFromCurrentUser(userId, item.id).then((result) => {
        if(result.data.length > 0) {
          navigation.navigate("Group", { groupData: item, currentUserId: userId })
        } else {
          navigation.navigate("GroupInvitation", { groupData: item, currentUserId: userId })
        }
      })
    }

    return (
        <Container source={require("../assets/brainsport-bg.png")}>
          <SafeAreaView>
          <ScrollView style={{height: "100%"}} showsVerticalScrollIndicator={false}>
            <TitleBar>
                <Title>Communauté</Title>
            </TitleBar>
            <ConnecterSection>
                <Mappemonde source={require("../assets/mappemonde.png")}/>
                <LinkText>{userRankInfo.totalUsers} membres connectés</LinkText>
            </ConnecterSection>
            <CommuSection>
              <SectionTitle>
                <SectionTitleText>
                  Challenge
                </SectionTitleText>
                
              </SectionTitle>
            <Animated.FlatList
            data={challengeList}
            ref={challengeRef}
            style={{flex: 1}}
            keyExtractor={item => "card-"+item.id}
            horizontal
            scrollEventThrottle={32}
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            renderItem={({item, index}) => {
                return (<>
                  <TouchableOpacity onPress={() => { navigation.navigate("Challenge", { challengeData: item }); }} >
                    <CardContainer>
                      <ChallengeCard
                      key={"card-"+item.id}
                      challengeObject={item}
                      />
                    </CardContainer>
                  </TouchableOpacity>
                </>);
            }}
            />
            </CommuSection>
            <CommuSection>
              <SectionTitle>
                <SectionTitleText>
                  Evenements
                </SectionTitleText>
                
              </SectionTitle>
            <Animated.FlatList
            data={eventList}
            ref={eventRef}
            style={{flex: 1}}
            keyExtractor={item => "card-"+item.id}
            horizontal
            scrollEventThrottle={32}
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            renderItem={({item, index}) => {
                return (<>
                 <TouchableOpacity onPress={() => { navigation.navigate("Event", { eventData: item }); }} >
                    <CardContainer>
                      <EventCard
                      key={"card-"+item.id}
                      eventObject={item}
                      />
                    </CardContainer>
                  </TouchableOpacity>
                </>);
            }}
            />
            </CommuSection>
            <CommuSection>
              <SectionTitle>
                <SectionTitleText>
                  Classement
                </SectionTitleText>
              </SectionTitle>
              <SectionContent>
                <SectionIcon>
                  <MaterialCommunityIcons name="trophy" size={32} color="#FFFFFF" />
                </SectionIcon>
                <SectionContentText>
                  Vous êtes <Text style={{color: "#A138F2"}}>{userRankInfo.userRank}{userRankInfo.userRank === 1 ? "er" : "ème"}</Text> sur {userRankInfo.totalUsers} inscrits au total.
                </SectionContentText>
              </SectionContent>
            </CommuSection>
            <CommuSection>
              <SectionTitleGroup>
                <SectionTitleTextGroup>
                  Les Groupes Publics
                </SectionTitleTextGroup>
              </SectionTitleGroup>
              {publicGroupList.map((item, index) => {
                    return (
                    <TouchableOpacity key={"card-"+item.id} style={{backgroundColor: "rgba(255,255,225,0.3)", borderRadius: 5, marginTop: 5, marginBottom: 5}} onPress={() => handleVerifyGroup(item, userId) } >
                        <CardGroupContainer>
                          <GroupCard
                          key={"card-"+item.id}
                          nbMembres={item.nbMember}
                          title={item.title}
                          colortheme={item.colortheme}
                          />
                        </CardGroupContainer>
                      </TouchableOpacity>
                    );
              })}
            </CommuSection>
            <CommuSection style={{marginBottom: 100}}>
              <SectionTitleGroup>
                <SectionTitleTextGroup>
                  Mes Groupes
                </SectionTitleTextGroup>
                <TouchableOpacity onPress={() => activateAddGroup()} >
                  <SectionPastilleButton>
                    <SectionButtonText>
                      + Ajouter un groupe
                    </SectionButtonText>
                  </SectionPastilleButton>
                </TouchableOpacity>
              </SectionTitleGroup>
              {groupList.map((item, index) => {
                    return (
                    <TouchableOpacity key={"card-"+item.id} style={{backgroundColor: "rgba(255,255,225,0.3)", borderRadius: 5, marginTop: 5, marginBottom: 5}}onPress={() => { navigation.navigate("Group", { groupData: item, currentUserId: userId }); }} >
                        <CardGroupContainer>
                          <GroupCard
                          key={"card-"+item.id}
                          nbMembres={item.nbMember}
                          title={item.title}
                          colortheme={item.colortheme}
                          />
                        </CardGroupContainer>
                      </TouchableOpacity>
                    );
              })}
            </CommuSection>
            </ScrollView>
            <GroupChoicePrompt ref={promptGroupRef} userData={currentUser} navigation={navigation}/>        
          </SafeAreaView>
        </Container>);
}

export default CommunauteScreen;