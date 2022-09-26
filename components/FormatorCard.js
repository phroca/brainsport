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

    align-items: center;
    margin-top: 40px;
    margin-bottom: 40px;
    flex-direction: row;
    display: flex;

`;

const CardLeft = styled.View`
    justify-content: center;
    align-items: center;
`;

const CardImage = styled.Image`
    width: 80px;
    height: 80px;
    border-radius: 5px;
    margin-bottom: 5px;
    margin-right: 10px;
    z-index: 1;
`;
const CardRight = styled.View`
    justify-content: center;

`;

const CardTitleTopic = styled.Text`
    color: #bdbdbd;
    font-size: 16px;
    font-weight: 200;
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

const FormatorCard = ({topic, title, notation="0", sourceImg}) => {


    return (
    <CardContainer>
        <CardLeft>
            <CardImage source={sourceImg}/>
        </CardLeft>
        <CardRight>
            <CardTitleTopic>
                {topic}
            </CardTitleTopic>
            <CardTitle>
                {title}
            </CardTitle>
            <CardNotation>
                {notation} <Ionicons name="ios-star" size={16} color="#bdbdbd" />
            </CardNotation>
        </CardRight>
    </CardContainer>
    
    )


}

export default FormatorCard;