import React from "react";
import { Dimensions, Text, TouchableOpacity } from "react-native";
import styled from 'styled-components/native';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;
const widthContent = screenWidth  - 50;

const CardContainer = styled.View`
    z-index: 0;
    justify-content: center;
    align-items: center;
    margin-top: 10px;
    margin-bottom: 40px;
`;
const CardHeader = styled.View`
    position: relative;

`;
const CardPin = styled.View`
    position: absolute;
    background-color: #FFFFFF;
    top : 20px;
    left: 0px;
    width: 60px;
    height: 20px;
    justify-content: center;
    align-items: center;
    text-align: center;
    border-radius: 2px;
    z-index: 2000;
    overflow: visible;
`;
const PinText = styled.Text`
    color: #000000;
    font-size: 10px;
    font-weight: 900;
    text-transform: uppercase;
`;
const CardImage = styled.Image`
    width: ${widthContent}px;
    height: 200px;
    border-radius: 5px;
    margin-bottom: 5px;
    z-index: 1;
`;
const CardFooter = styled.View`
    width: ${widthContent}px;

`;
const CardTitle = styled.Text`
    color: #FFFFFF;
    font-size: 20px;
    font-weight: bold;
`;


const FormationCard = ({isFree, titleCard, sourceImg}) => {
return(
    <CardContainer>
        <CardHeader>
            <CardPin>
                <PinText>
                    {isFree === true && "Gratuit"}
                    {isFree !== true && "Payant"}
                </PinText>
            </CardPin>
            <CardImage source={sourceImg}/>
        </CardHeader>

        <CardFooter>
            <CardTitle>
                {titleCard}
            </CardTitle>
        </CardFooter>
    </CardContainer>
)

}

export default FormationCard;