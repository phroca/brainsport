import React, { useEffect, useState } from "react";
import { Keyboard, TouchableOpacity, TouchableWithoutFeedback } from "react-native";
import styled from "styled-components/native";
import { BlurView } from "expo-blur";
import { Dimensions } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import { closeHistory } from "../slices/historySlice";

const screenHeight = Dimensions.get("window").height;

const Container = styled.View`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.2);
  justify-content: center;
  align-items: center;
`;

const Modal = styled.View`
  width: 335px;
  height: 250px;
  border-radius: 20px;
  background: #3c4560;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
  align-items: center;
`;

const TitleBar = styled.View`
  justify-content: center;
  align-items: center;
  margin-top: 15px;
  margin-bottom: 10px;
`;

const Title = styled.Text`
  margin-top: 20px;
  font-size: 22px;
  width: 275px;
  color: white;
  text-align: center;
`;


const Text = styled.Text`
  margin-top: 20px;
  font-size: 13px;
  font-weight: 600;
  width: 250px;
  color: #b8bece;
  text-align: center;
`;

const ButtonFamily = styled.View`
  display: flex;
  flex-direction: row;
`;

const ButtonViewSquared = styled.View`
  background: transparent;
  width: 120px;
  height: 40px;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  margin-top: 20px;
  margin-right: 10px;
  margin-left: 10px;
  border: 1px solid #A138F2;  
`;

const ButtonText = styled.Text`
  color: white;
  font-weight: 600;
  font-size: 14px;
`;

const ButtonViewLink = styled.View`
  background: transparent;
  width: 295px;
  justify-content: center;
  align-items: center;
  margin-top: 10px;
`;

const ButtonTextLink = styled.Text`
  color: #A138F2;
  text-decoration: underline;
  font-size: 16px;
`;

const ContainerText = styled.View`
    justify-content: center;
    align-items: center;
    align-self: center;
    justify-self: center;
    width: 80px;
    height: 80px;
    border-radius: 80px;
    background-color: #A138F2;
`

const HistoryModal = (props) => {
    const [opacityLoading, setOpacityLoading] = useState(0);
    const [topLoading, setTopLoading] = useState(screenHeight);
    const history = useSelector(state => state.history.value)
    const dispatch = useDispatch();
    useEffect(() => {
        if( history === "openHistory" ) {
            setOpacityLoading(1);
            setTopLoading(0);
          } 
        if(history === "closeHistory") {
            setOpacityLoading(0);
            setTopLoading(screenHeight);
          }
    });

    useEffect(()=> {
    })

    const tapBackground = () => {
        dispatch(closeHistory());
    }


    return (
        <Container style={{ opacity: opacityLoading, top: topLoading}}>
        <TouchableWithoutFeedback onPress={() => tapBackground()}>
            <BlurView tint="dark" intensity={100} style={{position: "absolute", width: "100%", height: "100%"}}/>
        </TouchableWithoutFeedback>
        <Modal>
            <TitleBar>
                <Title>Changer de mode</Title>
            </TitleBar>         
            <Text>Voulez-vous changer le mode ? Cela va réinitialiser le chronomètre.</Text>
            <ButtonFamily>
            <TouchableOpacity onPress={props.onContinuePressed}>
                <ButtonViewSquared>
                  <ButtonText>Annuler</ButtonText>
                </ButtonViewSquared>
            </TouchableOpacity>
            <TouchableOpacity onPress={props.onValidateChange}>
                <ButtonViewSquared>
                  <ButtonText>Confirmer</ButtonText>
                </ButtonViewSquared>
            </TouchableOpacity>
            </ButtonFamily>
        </Modal>
      </Container>
    )
}

export default HistoryModal;