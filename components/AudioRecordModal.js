import React, { useEffect, useState } from "react";
import { Keyboard, TouchableOpacity, TouchableWithoutFeedback } from "react-native";
import styled from "styled-components/native";
import { BlurView } from "expo-blur";
import { Dimensions } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import { openAudio, closeAudio, retryRecordAudio } from '../slices/audioSlice';

const screenHeight = Dimensions.get("window").height;

const Container = styled.View`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.75);
  justify-content: center;
  align-items: center;
`;

const Modal = styled.View`
  width: 335px;
  height: 370px;
  border-radius: 20px;
  background: #3c4560;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
  align-items: center;
`;

const Logo = styled.Image`
  width: 180px;
  height: 60px;
  margin-top: 50px;
  margin-bottom: 40px;
`;

const Text = styled.Text`
  margin-top: 20px;
  font-size: 13px;
  font-weight: 600;
  text-transform: uppercase;
  width: 160px;
  color: #b8bece;
  text-align: center;
`;

const ButtonViewSquared = styled.View`
  background: transparent;
  width: 150px;
  height: 40px;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  margin-top: 20px;
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

const ContainerVoice = styled.View`
    justify-content: center;
    align-items: center;
    align-self: center;
    justify-self: center;
    width: 80px;
    height: 80px;
    border-radius: 80px;
    background-color: #A138F2;
`

const AudioRecordModal = (props) => {
    const [opacityLoading, setOpacityLoading] = useState(0);
    const [topLoading, setTopLoading] = useState(screenHeight);
    const audio = useSelector(state => state.audio.value)
    const dispatch = useDispatch();
    const [contenuAudio, setContenuAudio] = useState("");
    useEffect(() => {
        if( audio === "openAudio" ) {
            setOpacityLoading(1);
            setTopLoading(0);
          } 
        if(audio === "closeAudio") {
            setOpacityLoading(0);
            setTopLoading(screenHeight);
          }
    });

    useEffect(()=> {
        if(props?.resultAudio){
            setContenuAudio(props?.resultAudio);
            setTimeout(() => {
                dispatch(closeAudio());
            }, 1000);
        } else {
            setContenuAudio("Dites quelque chose");
        }
    })
    const tapBackground = () => {
        dispatch(closeAudio());
    }

    const handleRetrySpeech = () => {
        dispatch(retryRecordAudio());
    }

    return (
        <Container style={{ opacity: opacityLoading, top: topLoading}}>
        <TouchableWithoutFeedback onPress={() => tapBackground()}>
            <BlurView tint="dark" intensity={100} style={{position: "absolute", width: "100%", height: "100%"}}/>
        </TouchableWithoutFeedback>
        <Modal>
            <Logo source={require("../assets/logo-brainsport.png")} />
            <ContainerVoice>
                <Ionicons name="mic" size={24} color="#FFFFFF" /> 
            </ContainerVoice>
            
            <Text>{contenuAudio}</Text>
            {props?.resultAudio &&<TouchableOpacity onPress={handleRetrySpeech}>
                <ButtonViewSquared>
                  <ButtonText>Réessayer</ButtonText>
                </ButtonViewSquared>
            </TouchableOpacity>}
        </Modal>
      </Container>
    )
}

export default AudioRecordModal;