import React, { useEffect, useRef, useState } from "react";
import Toast from 'react-native-toast-message';
import { ActivityIndicator, SafeAreaView, Animated, Dimensions, TouchableOpacity, TouchableWithoutFeedback, KeyboardAvoidingView, ScrollView, View, Platform } from "react-native";
import { MaterialCommunityIcons, Ionicons } from '@expo/vector-icons'; 
import styled from 'styled-components/native';
import { StatusBar } from "expo-status-bar";
import { useInitials } from "../../hooks/useInitials";
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import { Text } from "react-native";
import CommunityService from "../../services/Community.service";
import UserCard from "../../components/UserCard";
import UserConversation from "../../components/UserConversation";


const {width, height} = Dimensions.get("screen");
const widthContent = width - 50;

const Container = styled.ImageBackground`
  display: flex;
  width: 100%;
  height: 100%;
  align-items: center;
`;

const TitleBar = styled.View`
  justify-content: center;
  align-items: center;
  margin-top: 10px;
  margin-bottom: 30px;
`;

const CloseButton = styled.View`
  width: ${widthContent}px;
  justify-content: flex-start;
`;
const Title = styled.Text`
  margin-top: 10px;
  font-size: 22px;
  font-weight: bold;
  width: 100%;
  color: white;
  text-align: center;
`;


const SubTitleContainer = styled.View`
    margin-top: 5px;
    flex-direction: row;
    justify-content: center;
    align-items: center;
`;

const SubTitle = styled.Text`
  font-size: 12px;
  font-weight: bold;
  color: white;
  text-align: center;
  text-transform: uppercase;
`;

const CircleSeparate = styled.View`
  width: 2px;
  height: 2px;
  border-radius: 2px;
  background-color: white;
`;

const AvatarContainer = styled.View`
  width: ${widthContent}px;
  align-items: center;
  margin-top: 30px;
  margin-bottom: 30px;
`;
const AvatarCircle = styled.View`
    width: 80px;
    height: 80px;
    border-radius: 10px;
    background-color: ${props => props.colortheme};
    align-items: center;
    justify-content: center;
`;
const AvatarText = styled.Text`
    font-size: 40px;
    font-weight: bold;
    color: white;
`;

const AjoutAmisSection = styled.View`
  margin-top: 10px;
`;

const AvatarMiniContainer = styled.View`
justify-content: center;
align-items: center;
flex-direction: row;
`;

const AvatarMiniCircle = styled.View`
  border-radius: 20px;

  height: 30px;
  width: 30px;
  background-color: ${props=> props.colortheme};
  align-items: center;
  justify-content: center;
  border: 1px solid #0c0c0c;
  margin-right: 10px;
`;
const AvatarMiniText = styled.Text`
  font-size: 20px;
  font-weight: bold;
  color: white;
`;
const AvatarMiniAddText = styled.Text`
  font-size: 14px;
  font-weight: bold;
  color: white;
`;
/**
 * ==================
 * CLASSEMENT CSS
 * ==================
 */

const ClassementSection = styled.View`
    padding: 20px;
`;

const ClassementUserCardContainer = styled.View`
    margin-top: 5px;
    margin-bottom: 5px;
`;

const ClassementRoute = ({groupId}) => {
    const [userList, setUserList] = useState([]);
    useEffect(()=> {
        CommunityService.getGroupUsersByGroupId(groupId).then((value) => {
            if(value?.data.length > 0) {
                setUserList(value?.data);
            }
        });
    },[])
    return (
        <View style={{ flex: 1, backgroundColor: '#0f0f0f' }}>
        <ScrollView style={{height: "100%"}} showsVerticalScrollIndicator={false}>
            <ClassementSection>
                    {userList.map((item, index) => (
                        <ClassementUserCardContainer>
                            <UserCard
                            key={"classement"+index+"" + item._id}
                            rewardPoints={item.rewardPoints}
                            firstName={item.firstName}
                            color={item.colorProfil}
                            />
                        </ClassementUserCardContainer>
                    ))}
            </ClassementSection>
        </ScrollView>
        </View>
    )};
  

/**
 * ==================
 * DISCUSSION CSS
 * ==================
 */

const DiscussionActionContainer = styled.View`
    padding-top: 5px;
    padding-bottom: 5px;
    width: 100%;
    position: absolute;
    bottom: 0;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    background-color: #000000;
`;

const DiscussionTextInput = styled.TextInput`
  border: 1px solid #53565f;
  width: ${widthContent-20}px;
  margin-right: 10px;
  height: 40px;
  border-radius: 20px;
  font-size: 17px;
  color: #FFFFFF;
  padding-left: 10px;
  background: #3c4560;

`;

const DiscussionUserContainer = styled.View`
    margin-top: 5px;
    margin-bottom: 5px;
`;

const DiscussionMessages = styled.View`
    width: ${widthContent}px;
    margin-right: 10px;
    padding-bottom: 60px;
`;

const DiscussionRoute = ({groupData, currentUserId}) => {
    const [message, setMessage] = useState("");
    const [messageList, setMessageList] = useState([]);
    useEffect(()=> {
        CommunityService.getGroupDiscussion(groupData.id).then((value) => {
            if(value?.data.length > 0) {
                setMessageList(value?.data);
            }
        });
    },[])
    const handleSendMessage = () => {
        const dateEnvoi = new Date().getTime();
        CommunityService.sendMessageToGroupDiscussion({groupId: groupData.id, userId: currentUserId, message, dateEnvoi}).then((value) => {
            if(value.data) {
                CommunityService.getGroupDiscussion(groupData.id).then((value) => {
                    if(value?.data.length > 0) {
                        setMessageList(value?.data);
                    }
                });
            }
        }).catch((error) => {
            Toast.show({
                type: 'error',
                text1: "Erreur à l'envoi du message" ,
                text2: "Veuillez réessayer ultérieurement."
            });
        })
    }

    return (
    <View style={{ flex: 1, backgroundColor: '#0f0f0f'}}>
    <ScrollView style={{height: "100%"}} showsVerticalScrollIndicator={false}>
        <DiscussionMessages>
            {messageList.map((item, index) => (
                <DiscussionUserContainer>
                    <UserConversation
                        color={item.colorProfil}
                        dateOfCreation={item.dateEnvoi}
                        firstName={item.firstName}
                        message={item.message}
                    />
                </DiscussionUserContainer>
            ))}
        </DiscussionMessages>
    </ScrollView>
    <DiscussionActionContainer>
        <DiscussionTextInput placeholder="Message..." onChangeText={(e) => setMessage(e)}/>
        <TouchableOpacity onPress={()=> handleSendMessage()}>
            <ButtonView>
                <Ionicons name="send" size={24} color="white" />
            </ButtonView>
        </TouchableOpacity>
    </DiscussionActionContainer>
    </View>
    )
};

    /**
 * ==================
 * A PROPOS CSS
 * ==================
 */

const AProposDescriptionSection = styled.View`
    margin: 20px;
`;

const AProposDescriptionTitle = styled.Text`
  font-size: 14px;
  font-weight: bold;
  width: 100%;
  color: white;
  text-transform:uppercase;
`;

const AProposDescriptionCreatorTitle = styled.Text`
  font-size: 18px;
  font-weight: bold;
  width: 100%;
  color: white;
`;

const Separator = styled.View`
    height: .5px;
    border: .2px solid gray;
    margin: 20px;
`

const AProposDescriptionContent = styled.Text`
    margin-top: 10px;
    margin-bottom: 10px;
    font-size: 12px;
    font-weight: bold;
    width: 100%;
    color: rgba(255,255,255,0.5);
`;

const ButtonView = styled.View`
`;

const AProposRoute = ({description, creator}) => (
    <View style={{ flex: 1, backgroundColor: '#0f0f0f' }}>
    <AProposDescriptionSection>
        <AProposDescriptionTitle>Description</AProposDescriptionTitle>
        <AProposDescriptionContent>{description}</AProposDescriptionContent>
    </AProposDescriptionSection>
    <Separator />
    <AProposDescriptionSection>
        <AProposDescriptionCreatorTitle>Créateur</AProposDescriptionCreatorTitle>
        <AProposDescriptionContent>{creator}</AProposDescriptionContent>
    </AProposDescriptionSection>
    </View>
);

const renderTabBar = props => (
    <TabBar
        {...props}
        indicatorStyle={{ backgroundColor: 'white' }}
        style={{ backgroundColor: '#0f0f0f' }}
        renderLabel={({ route, focused, color }) => (
        <Text style={{ color, margin: 8 }}>
        {route.title}
        </Text>
    )}
    />
);

const GroupScreen = (props) => {
    const {groupData, currentUserId} = props.route.params;
    const initials = useInitials(groupData?.title);
    const [index, setIndex] = useState(0);
    const [routes] = useState([
        { key: 'first', title: 'Classement' },
        { key: 'second', title: 'Discussion' },
        { key: 'third', title: 'A Propos' },
    ]);
    const[currentNbMembers, setCurrentNbMembers] = useState(groupData?.nbMember);
    useEffect(()=> {
        CommunityService.getNbMemberOfGroup(groupData.id).then((value) => {
            if(value?.data.length > 0) {
                setCurrentNbMembers(value?.data[0].nbMember);
            }
        });
    },[])
    const renderScene = ({ route }) => {
        switch (route.key) {
          case 'first':
            return <ClassementRoute groupId={groupData?.id}/>;
          case 'second':
            return <DiscussionRoute groupData={groupData} currentUserId={currentUserId}/>;
          case 'third':
            return <AProposRoute description={groupData?.description} creator={groupData?.userOwner} />;
          default:
            return null;
        }
      };
    return (
        <Container source={require("../../assets/brainsport-bg.png")}>
            <StatusBar hidden />
            <SafeAreaView>
                <TitleBar>
                    <CloseButton>
                    <TouchableOpacity onPress={() => {props.navigation.navigate("Communauté"); }}>
                        <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
                    </TouchableOpacity>
                    </CloseButton>
                    <AvatarContainer>
                        <AvatarCircle colortheme={groupData?.colortheme}>
                            <AvatarText>{initials}</AvatarText>
                        </AvatarCircle>
                    </AvatarContainer>
                    <Title>{groupData?.title}</Title>
                    <SubTitleContainer>
                        <SubTitle>{groupData?.visibility === 1 ? "Public" : "Privée"} </SubTitle>
                        <CircleSeparate />
                        <SubTitle>{currentNbMembers} membre{currentNbMembers > 1 ? "s":""} </SubTitle>
                    </SubTitleContainer>
                    {groupData.visibility === 0 &&<AjoutAmisSection>
                        <TouchableOpacity onPress={() => { props.navigation.navigate("AjoutAmisAGroup", {groupData}); }} >
                            <AvatarMiniContainer>
                            <AvatarMiniCircle colortheme="#27ae60">
                                <AvatarMiniText>+</AvatarMiniText>
                            </AvatarMiniCircle>
                            <AvatarMiniAddText>Ajouter un ami dans le groupe</AvatarMiniAddText>
                            </AvatarMiniContainer>
                        </TouchableOpacity>
                    </AjoutAmisSection>}
                </TitleBar>
                <TabView style={{width}}
                renderTabBar={renderTabBar}
                navigationState={{ index, routes }}
                renderScene={renderScene}
                onIndexChange={setIndex}
                initialLayout={{ width }}
                />
            </SafeAreaView>
        </Container>
        )
        
}

export default GroupScreen;