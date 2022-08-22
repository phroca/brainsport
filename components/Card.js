import React from "react";
import styled from "styled-components/native";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { View } from "react-native";

const CardContainer = styled.View`
    width: 150px;
    height: 250px;
    background-color: ${props=> props.isFold === true ? "black": "white"};
    border: ${props=> props.isFold === true ? " 1px solid white": "none"};
    border-radius: 15px;
`;

const ValueContainerHeader = styled.View`
    margin: 10px;
    flex: .1;
`;

const TextHeader = styled.Text`
    font-size: 20px;
    color: ${props => (props.couleur === "pique" || props.couleur === "trefle") ? "black" : "red"};
`
const TextFooter = styled.Text`
    font-size: 20px;
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

const Card = ({valeur, couleur, isFold = false}) => {

    const namingColorCard = (couleur) => {
        if(couleur === "pique"){
            return <MaterialCommunityIcons name="cards-spade" size={80} color="black" />;
        } 
        if(couleur === "carreau"){
            return <MaterialCommunityIcons name="cards-diamond" size={80} color="red" />;
        } 
        if(couleur === "coeur"){
            return <MaterialCommunityIcons name="cards-heart" size={80} color="red" />;
        } 
        if(couleur === "trefle"){
            return <MaterialCommunityIcons name="cards-club" size={80} color="black" />;
        } 
    }
    return (
  
                <CardContainer isFold={isFold}>
                      {
                        isFold === true ? 
                        (
                            
                            <FoldColorContainer>
                            <BrainsportIcon source={require("../assets/brainsport-logo.png")}/>
                            </FoldColorContainer>
                            
                        ) 
                    :   (<>
                            <ValueContainerHeader>
                                <TextHeader couleur={couleur}>{valeur}</TextHeader>
                            </ValueContainerHeader>
                            <ColorContainer>{namingColorCard(couleur)}</ColorContainer>
                            <ValueContainerFooter>
                                <TextFooter couleur={couleur}>{valeur}</TextFooter>
                            </ValueContainerFooter>
                        </>)
                     }
                </CardContainer>
         
        
    )
}

export default Card