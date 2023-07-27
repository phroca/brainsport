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
    align-items: center;
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
    justify-content: center;
`;


const CardTitle = styled.Text`
    color: #FFFFFF;
    font-size: 20px;
    font-weight: bold;
`;

const CardNotation = styled.Text`
    color: #bdbdbd;
    font-size: 16px;
    font-weight: 200;
`;

const UserCard = ({rewardPoints, firstName, color}) => {
    const initials = useInitials(firstName);
    return (
    <CardContainer>
        <CardLeft>
            <AvatarCircle colortheme={color}>
                <AvatarText>{initials}</AvatarText>
            </AvatarCircle>
        </CardLeft>
        <CardRight>
            <CardTitle>
                {firstName}
            </CardTitle>
            <CardNotation>
                {rewardPoints} point{rewardPoints > 1 ? "s":""} 
            </CardNotation>
        </CardRight>
    </CardContainer>
    
    )


}

export default UserCard;