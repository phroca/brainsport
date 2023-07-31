import React, { useEffect, useState } from "react";
import { Dimensions, Text, TouchableOpacity } from "react-native";
import styled from 'styled-components/native';
import { Ionicons } from '@expo/vector-icons'; 
import { useInitials } from "../hooks/useInitials";

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;
const widthContent = screenWidth  - 50;

const CardContainer = styled.View`
    z-index: 0;
    width: ${widthContent}px;
    align-items: flex-start;
    flex-direction: row;
    display: flex;

`;

const CardLeft = styled.View`
    justify-content: center;
    align-items: center;
    margin-right: 10px;
`;

const AvatarCircle = styled.View`
    border-radius: 40px;
    padding: 5px;
    min-height: 40px;
    min-width: 40px;
    background-color: ${props=> props.colortheme};
    align-items: center;
    justify-content: center;
`;
const AvatarText = styled.Text`
    font-size: 20px;
    font-weight: bold;
    color: white;
`;

const CardRight = styled.View`
    justify-content: flex-start;
    align-items: flex-start;
`;

const CardTitleContainer = styled.View`
    flex-direction: row;
    justify-content: center;
    align-items: center;
`;


const CardTitle = styled.Text`
    color: #FFFFFF;
    font-size: 16px;
    font-weight: bold;
    margin-right: 5px;
`;
const CardTitleTime = styled.Text`
    color: #FFFFFF;
    font-size: 14px;
    font-weight: 100;
    font-style: italic;
`;

const CardNotation = styled.Text`
    color: #bdbdbd;
    font-size: 16px;
    font-weight: 200;
`;

const UserConversation = ({message, dateOfCreation, firstName, color}) => {
    const initials = useInitials(firstName);
    const calculateDateCreationString = (dateOfCreation) => {
        var seconds = Math.floor((new Date() - dateOfCreation) / 1000);
        var interval = seconds / 31536000;

        if (interval > 1) {
            return "il y a " + Math.floor(interval) + " années";
        }
        interval = seconds / 2592000;
        if (interval > 1) {
            return "il y a " + Math.floor(interval) + " mois";
        }
        interval = seconds / 86400;
        if (interval > 1) {
            return "il y a " + Math.floor(interval) + " jours";
        }
        interval = seconds / 3600;
        if (interval > 1) {
            return "il y a " + Math.floor(interval) + " heures";
        }
        interval = seconds / 60;
        if (interval > 1) {
            return "il y a " + Math.floor(interval) + " minutes";
        }
        return "il y a " + Math.floor(seconds) + " secondes";
        
    }
    return (
    <CardContainer>
        <CardLeft>
            <AvatarCircle colortheme={color}>
                <AvatarText>{initials}</AvatarText>
            </AvatarCircle>
        </CardLeft>
        <CardRight>
            <CardTitleContainer>
                <CardTitle>
                    {firstName}
                </CardTitle>
                <CardTitleTime>
                    {calculateDateCreationString(dateOfCreation)}
                </CardTitleTime>
            </CardTitleContainer>
            <CardNotation>
                {message} 
            </CardNotation>
        </CardRight>
    </CardContainer>
    
    )


}

export default UserConversation;