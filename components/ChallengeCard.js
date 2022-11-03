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

`;
const CardTitle = styled.Text`
    color: #FFFFFF;
    font-size: 20px;
    font-weight: bold;
`;


const ChallengeCard = ({challengeObject}) => {
    const calculateDate = (dateDebut, dateFin) =>{
        const dateNow = new Date();
        const dateDepart = new Date(dateDebut)
        const dateArrivee = new Date(dateFin)
        if(dateNow > dateArrivee) return "challenge terminé";
        if(dateNow < dateDepart) {
            const diffTime = dateDepart.getTime() - dateNow.getTime();
            const diffInDays = Math.trunc(diffTime / (1000 * 3600 * 24));
            return "commence dans " + diffInDays + "jours"
        }
        if(dateNow > dateDepart && dateNow < dateArrivee) {
            const diffTime = dateArrivee.getTime() - dateNow.getTime();
            const diffInDays = Math.trunc(diffTime / (1000 * 3600 * 24));
            return "termine dans " + diffInDays + " jours"
        }
    }
return(
    <CardContainer>
        <CardHeader>
            <CardPin>
                <PinText>
                    {calculateDate(challengeObject?.periode.debut, challengeObject?.periode.fin)}
                </PinText>
            </CardPin>
            <CardImage source={challengeObject.image}/>
        </CardHeader>

        <CardFooter>
            <CardTitle>
                {challengeObject.title}
            </CardTitle>
        </CardFooter>
    </CardContainer>
)

}

export default ChallengeCard;