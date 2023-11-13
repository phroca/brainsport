import React from "react";
import styled from "styled-components/native";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { View } from "react-native";
import { cardIllustration } from "../cardIllustration";

const CardContainer = styled.View`
    width: ${props => props.w ?? "150"}px;
    height: ${props => props.h ?? "250"}px;
    background-color: ${props => props.isFold === true ? "black" : "white"};
    border: ${props => props.isFold === true ? " 1px solid white" : "none"};
    border-radius: 15px;
`;

const ValueContainerHeader = styled.View`
    margin: 10px;
    height: 30px;
    flex: .1; 
`;

const TextHeader = styled.View`
    height: 30px;
    color: ${props => (props.couleur === "pique" || props.couleur === "trefle") ? "black" : "red"};
`
const TextFooter = styled.View`
    height: 30px;
    color: ${props => (props.couleur === "pique" || props.couleur === "trefle") ? "black" : "red"};
`

const ValueContainerFooter = styled.View`
    flex: .1;
    margin: 10px;
    flex-direction: row-reverse;
`;
const ColorContainer = styled.View`
    flex: .8; 
    justify-content: center;
    align-items: center;
`;
const ColorText = styled.Text`
    color: ${props => (props.couleur === "pique" || props.couleur === "trefle") ? "black" : "red"};
    text-align: center;
    font-size: 80px;
`;

const FoldColorContainer = styled.View`
    flex: 1;
    justify-content: center;
    align-items: center;
`

const BrainsportIcon = styled.Image`
position: absolute;
    width: 80px;
    height: 80px;
`;

const ValueContainer = styled.View`
    flex: 1;
    position: relative;
`;
const ImageTexte = styled.Image`
    width: 100%;
    height: 100%;
    z-index: 2;
    border-radius: 15px;
    
`
const ImageIllustration = styled.Image`
    position: absolute;
    width: 100%;
    height: 100%;
    z-index: 3;
    border-radius: 15px; 
`
const ValidValue = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "V", "D", "R"];
const ValidColor = ["carreau", "coeur", "trefle", "pique"];

const Card = ({ valeur, couleur, isFold = false, width = 150, height = 250 }) => {

    const namingColorCard = (couleur) => {
        if (couleur === "pique") {
            return <MaterialCommunityIcons name="cards-spade" size={20} color="black" />;
        }
        if (couleur === "carreau") {
            return <MaterialCommunityIcons name="cards-diamond" size={20} color="red" />;
        }
        if (couleur === "coeur") {
            return <MaterialCommunityIcons name="cards-heart" size={20} color="red" />;
        }
        if (couleur === "trefle") {
            return <MaterialCommunityIcons name="cards-club" size={20} color="black" />;
        }
    }
    return (

        <CardContainer isFold={isFold} w={width} h={height} >
            {
                isFold === true ?
                    (

                        <FoldColorContainer>
                            <BrainsportIcon source={require("../assets/brainsport-logo.png")} />
                        </FoldColorContainer>

                    )
                    : ValidValue.includes(valeur) && ValidColor.includes(couleur) ?
                        (<>
                            <ValueContainer>
                                <ImageTexte source={cardIllustration[valeur][couleur].texte} />
                                <ImageIllustration source={cardIllustration[valeur][couleur].illustration} />
                            </ValueContainer>
                        </>) :
                        (<>
                            <ValueContainerHeader>
                                <TextHeader couleur={couleur}>{namingColorCard(couleur)}</TextHeader>
                            </ValueContainerHeader>
                            <ColorContainer>
                                <ColorText couleur={couleur}>{valeur}</ColorText>
                            </ColorContainer>
                            <ValueContainerFooter>
                                <TextFooter couleur={couleur}>{namingColorCard(couleur)}</TextFooter>
                            </ValueContainerFooter>
                        </>)
            }
        </CardContainer>


    )
}

export default Card