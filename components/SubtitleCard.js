import React from "react";
import { Dimensions, Text, TouchableOpacity } from "react-native";
import styled from 'styled-components/native';
import { Ionicons } from '@expo/vector-icons'; 

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;
const widthContent = screenWidth  - 50;

const CardContainer = styled.View`
    z-index: 0;
    width: ${widthContent}px;
    background: #FFFFFF3d;
    align-items: center;
    flex-direction: row;
    display: flex;
    border-radius: 15px;
`;

const CardLeft = styled.View`
    justify-content: center;
    align-items: center;
`;

const CardBg = styled.View`
    background: #000000;
    width: 70px;
    height: 70px;
    border-radius: 15px;
    margin-bottom: 5px;
    margin-top: 5px;
    margin-left: 5px;
    margin-right: 5px;
    justify-content: center;
    align-items: center;
`;

const CardImage = styled.Image`
    width: 40px;
    height: 40px;
    z-index: 1;
`;
const CardRight = styled.View`
    justify-content: center;
    align-items: center;
    padding-top:5px;
    padding-bottom:5px;
    width: ${widthContent - 70}px;
`;

const CardTitleTopic = styled.Text`
    color: #bdbdbd;
    font-size: 16px;
    font-weight: 200;
`;


const SubtitleCard = ({text, sourceImg}) => {


    return (
    <CardContainer>
        <CardLeft>
            <CardBg>
            <CardImage source={sourceImg}/>
            </CardBg>
        </CardLeft>
        <CardRight>
            <CardTitleTopic>
                {text}
            </CardTitleTopic>
        </CardRight>
    </CardContainer>
    
    )


}

export default SubtitleCard;