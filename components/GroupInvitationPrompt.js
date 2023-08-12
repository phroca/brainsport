import React, { useRef, forwardRef, useState, useEffect, useCallback } from "react";
import { Animated, Dimensions, Modal, TouchableOpacity } from "react-native";
import styled from 'styled-components/native';
import { Ionicons } from '@expo/vector-icons';
import { useInitials } from "../hooks/useInitials";
import CommunityService from "../services/Community.service";
import Toast from 'react-native-toast-message';
import { useFocusEffect } from "@react-navigation/native";


const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;
const widthContent = screenWidth - 50;

const Container = styled.View`
  flex:1;
  width: 100%;
  height: 100%;
background-color: #0c0c0c;
`;


const AvatarContainer = styled.View`
justify-content: center;
align-items: center;
position: absolute;
top: 80px;
left: ${screenWidth / 2 - 50}px;
`;

const AvatarCircle = styled.View`
  border-radius: 20px;
  padding: 5px;
  min-height: 100px;
  min-width: 100px;
  background-color: ${props => props.colortheme};
  align-items: center;
  justify-content: center;
  border: 1px solid #0c0c0c;
`;
const AvatarText = styled.Text`
  font-size: 30px;
  font-weight: bold;
  color: white;
`;


const Cover = styled.View`
    height: 300px;
    justify-content: center;
    align-items: center;
`;

const SubTitleContainer = styled.View`
    position: absolute;
    top: 250px;
    width: 100%;
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

const Image = styled.Image`
  width: 100%;
  height: 100%;
`;

const Title = styled.Text`
  font-size: 24px;
  color: white;
  font-weight: bold;
  width: ${widthContent}px;
  position: absolute;
  top: 200px;
  width: 100%;
  text-align: center;
`;

const CloseView = styled.View`
  width: 32px;
  height: 32px;
  background: white;
  border-radius: 16px;
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.15);
  justify-content: center;
  align-items: center;
`;

const Content = styled.View`
  padding: 20px;
`;

const ContentDetail = styled.View`
    margin-top: 20px;
`
const ContentDetailTitle = styled.Text`
    font-size: 17px;
    color: white;
    font-weight: bold;
    text-transform: uppercase;
`
const ContentDetailDescription = styled.Text`
    margin-top: 10px;
    color: white;
`

const ButtonView = styled.View`
  background: #A138F2;
  width: ${widthContent}px;
  height: 50px;
  justify-content: center;
  align-self: center;
  align-items: center;
  border-radius: 10px;
  margin-top: 20px;
`;

const ButtonText = styled.Text`
  color: #FFFFFF;
  font-size: 14px;
  font-weight: bold;
`;

const StateView = styled.View`
  width: ${widthContent}px;
  height: 50px;
  justify-content: center;
  align-self: center;
  align-items: center;
  margin-top: 20px;
`;

const StateText = styled.Text`
  color: #FFFFFF;
  font-size: 16px;
  font-weight: bold;
`;

const GroupInvitationPrompt = (props) => {

    const { groupData, currentUserId } = props?.route.params;
    const [hasCurrentUserJoined, setHasCurrentUserJoined] = useState(false);
    const [flagCurrentUserJoin, setFlagCurrentUserJoin] = useState(false);

    useFocusEffect(
        useCallback(() => {
            if (!flagCurrentUserJoin) {
                CommunityService.getGroupsByIdFromCurrentUser(currentUserId, groupData.id).then((groupResult) => {
                    console.log(groupResult.data);
                    if (groupResult.data.length > 0) {
                        setHasCurrentUserJoined(groupResult?.data[0].state === "VALIDATED")
                    }
                })
            }
            return () => setFlagCurrentUserJoin(true)
        }, [hasCurrentUserJoined])
    );
    const handleCloseModal = () => {
        props.navigation.navigate("Communauté");
    }

    const handleJoinToGroup = () => {
        CommunityService.getGroupsByIdFromCurrentUser(currentUserId, groupData.id).then((groupResult) => {
            if (groupResult.data.length < 1) {
                CommunityService.joinPublicGroup(groupData.id, currentUserId).then((result) => {
                    if (result.data) {
                        Toast.show({
                            type: 'success',
                            text1: 'Groupe rejoint',
                            text2: "Bienvenue sur le groupe !"
                        });
                        props.navigation.getParent()?.goBack();
                        props.navigation.navigate("Group", { groupData: groupData, currentUserId });
                    }
                }).catch((error) => {
                    console.error(error);
                    Toast.show({
                        type: 'error',
                        text1: "Erreur à l'intégration du groupe",
                        text2: "Veuillez réessayer ultérieurement."
                    });
                })
            }
        })

    }
    const handleJoinToPrivateGroup = () => {
        CommunityService.getGroupsByIdFromCurrentUser(currentUserId, groupData.id).then((groupResult) => {
            if (groupResult.data.length > 0 && groupResult?.data[0].state === "WAITING") {
                CommunityService.joinPrivateGroup(groupData.id, currentUserId).then((result) => {
                    if (result.data) {
                        Toast.show({
                            type: 'success',
                            text1: 'Groupe rejoint',
                            text2: "Bienvenue sur le groupe !"
                        });
                        props.navigation.getParent()?.goBack();
                        props.navigation.navigate("Group", { groupData: groupData, currentUserId });
                    }
                }).catch((error) => {
                    console.error(error);
                    Toast.show({
                        type: 'error',
                        text1: "Erreur à l'intégration du groupe",
                        text2: "Veuillez réessayer ultérieurement."
                    });
                })
            }
        })
    }
    const handleDeclineOrDeleteInvitationToPrivateGroup = () => {
        CommunityService.declineOrDeletePrivateGroup(groupData.groupUserId).then((result) => {
            if (result.data) {
                Toast.show({
                    type: 'success',
                    text1: 'Invitation refusée',
                    text2: "vous avez refusé l'invitation du groupe."
                });
                props.navigation.pop(2);
                props.navigation.push("Notifications");
            }
        }).catch((error) => {
            console.error(error);
            Toast.show({
                type: 'error',
                text1: "Erreur au refus du groupe",
                text2: "Veuillez réessayer ultérieurement."
            });
        })
    }
    return (
        <Container>
            <Cover>
                <Image source={require("../assets/default/default-group-add.jpg")} />
                <AvatarContainer>
                    <AvatarCircle colortheme={groupData?.colortheme}>
                        <AvatarText>{useInitials(groupData?.title)}</AvatarText>
                    </AvatarCircle>
                </AvatarContainer>
                <Title>{groupData?.title}</Title>
                <SubTitleContainer>
                    <SubTitle>{groupData?.visibility === 1 ? "Public" : "Privée"} </SubTitle>
                    <CircleSeparate />
                    <SubTitle>{groupData?.nbMember} membre{groupData?.nbMember > 1 ? "s" : ""} </SubTitle>
                </SubTitleContainer>
            </Cover>
            <TouchableOpacity onPress={() => { handleCloseModal() }} style={{ position: "absolute", top: 20, right: 20 }}>
                <CloseView>
                    <Ionicons
                        name="ios-close"
                        size={32}
                        color="#A138F2"
                    />
                </CloseView>
            </TouchableOpacity>
            <Content>
                <ContentDetail>
                    <ContentDetailTitle>Description</ContentDetailTitle>
                    <ContentDetailDescription>{groupData?.description}</ContentDetailDescription>
                </ContentDetail>
                <ContentDetail>
                    <ContentDetailTitle>Créateur</ContentDetailTitle>
                    <ContentDetailDescription>{groupData?.userOwner}</ContentDetailDescription>
                </ContentDetail>
            </Content>
            {groupData?.visibility === 1 && !hasCurrentUserJoined && <TouchableOpacity onPress={() => handleJoinToGroup()}>
                <ButtonView>
                    <ButtonText>Rejoindre le groupe</ButtonText>
                </ButtonView>
            </TouchableOpacity>}
            {groupData?.visibility === 0 && !hasCurrentUserJoined && <>
                <TouchableOpacity onPress={() => handleJoinToPrivateGroup()}>
                    <ButtonView>
                        <ButtonText>Accepter l'invitation</ButtonText>
                    </ButtonView>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleDeclineOrDeleteInvitationToPrivateGroup()}>
                    <ButtonView>
                        <ButtonText>Refuser l'invitation</ButtonText>
                    </ButtonView>
                </TouchableOpacity>

            </>}
            {hasCurrentUserJoined &&
                <StateView>
                    <StateText>L'invitation a expiré. </StateText>
                </StateView>
            }
        </Container>
    )

}

export default GroupInvitationPrompt;