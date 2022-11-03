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
    left: -10px;
    padding-left: 5px;
    padding-right: 5px;
    height: 20px;
    justify-content: center;
    align-items: center;
    text-align: center;
    border-radius: 2px;
    z-index: 2;
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
    border-radius: 5px;
    height: 50px;
    background: #000000AF;
    position: absolute;
    bottom: 5px;
    padding: 10px;
    z-index: 3;
`;
const CardTitle = styled.Text`
    color: #FFFFFF;
    font-size: 20px;
    font-weight: bold;
`;


const EventCard = ({eventObject}) => {
    const calculateDate = (dateEvent) =>{
        const dateNow = new Date();
        const date = new Date(dateEvent);
        if(dateNow > date) return "évènement terminé";
        if(dateNow < date) {
            const diffTime = date.getTime() - dateNow.getTime();
            const diffInDays = Math.trunc(diffTime / (1000 * 3600 * 24));
            return "commence dans " + diffInDays + "jours"
        }
    }
return(
    <CardContainer>
        <CardHeader>
            <CardPin>
                <PinText>
                    {calculateDate(eventObject?.date)}
                </PinText>
            </CardPin>
            <CardImage source={eventObject.image}/>
            <CardFooter>
                <CardTitle>
                    {eventObject.title}
                </CardTitle>
            </CardFooter>
        </CardHeader>

        
    </CardContainer>
)

}

export default EventCard;