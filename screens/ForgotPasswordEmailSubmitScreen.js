import React, { useState, useRef } from "react";
import { Dimensions,TouchableOpacity, TouchableWithoutFeedback } from "react-native";
import styled from "styled-components/native";
import { Auth } from 'aws-amplify';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;
const widthContent = screenWidth  - 80;

const Container = styled.View`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: #FCFCFC;
  align-items: center;
`;

const ImageBG = styled.Image`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`;

const TextInput = styled.TextInput`
  border: 1px solid #dbdfea;
  width: ${widthContent}px;
  height: 44px;
  border-radius: 10px;
  font-size: 17px;
  color: #3c4560;
  padding-left: 120px;
  margin-top: 20px;
  background: white;
  z-index: 1;
`;

const ConfirmationForm = styled.View`
  align-items: center;
  margin-top: 50px;
`;

const Logo = styled.Image`
  width: 180px;
  height: 44px;
  margin-top: 50px;
`;

const Title = styled.Text`
  margin-top: 20px;
  font-size: 22px;
  font-weight: bold;
  width: 275px;
  color: #131516;
  text-align: left;
`;

const SubTitle = styled.Text`
  margin-top: 20px;
  font-size: 14px;
  width: 275px;
  color: #62666A;
  text-align: left;
`;

const ButtonView = styled.View`
  background: #5263ff;
  width: ${widthContent}px;
  height: 50px;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  margin-top: 20px;
  box-shadow: 0 10px 20px #c2cbff;
`;

const ButtonViewSecondary = styled.View`
  background: #131516;
  width: ${widthContent}px;
  height: 50px;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  margin-top: 20px;
  box-shadow: 0 10px 20px #c2cbff;
`;

const ButtonText = styled.Text`
  color: white;
  font-weight: bold;
  font-size: 14px;
`;

const ButtonViewLink = styled.View`
  background: transparent;
  width: ${widthContent}px;
  justify-content: center;
  align-items: center;
  margin-top: 10px;
`;

const ButtonTextLink = styled.Text`
  color: #5263ff;
  text-decoration: underline;
  font-size: 16px;
`;

const PreText = styled.Text`
  width: 100px;
  height: 24px;
  font-weight: bold;
  font-size: 14px;
  position: absolute;
  top: 30px;
  left: 10px;
  z-index: 2;
`;

const InputContainer = styled.View`
    position: relative;
`



const ForgotPasswordEmailSubmitScreen = ({navigation}) => {

    const [email, setEmail] = useState("");
    const [code, setCode] = useState("");
    const [newPassword, setNewPassword] = useState("");

    const refEmail = useRef(null);
    const handleFocusEmail = () => {
      refEmail.current.focus();
    }

    const refPassword = useRef(null);
    const handleFocusPassword = () => {
      refPassword.current.focus();
    }

    async function handleConfirmNewPassword() {
        try {
          await Auth.forgotPasswordSubmit(email, code, newPassword);
          navigation.navigate("Signin");
        } catch (error) {
            console.log('error confirming sign up', error);
        }
    }

return (
    <Container>
    <ImageBG source={require("../assets/brainsport-bg.png")} />
    <ConfirmationForm>
        <Title>Changement du mot de passe</Title>
        <TouchableWithoutFeedback onPress={()=> handleFocusEmail()}>
            <InputContainer>
                <PreText>Adresse Email</PreText>
                <TextInput ref={refEmail} keyboardType="email-address" onChangeText={(e)=> setEmail(e)}/>
            </InputContainer>
        </TouchableWithoutFeedback>
        <InputContainer>
            <PreText>Code</PreText>
            <TextInput onChangeText={(e)=> setCode(e)}/>
        </InputContainer>
        <TouchableWithoutFeedback onPress={()=> handleFocusPassword()}>
            <InputContainer>
                <PreText>Nouveau mdp</PreText>
                <TextInput  ref={refPassword} secureTextEntry={true} onChangeText={(e)=> setNewPassword(e)}/>
            </InputContainer>
        </TouchableWithoutFeedback>
      <TouchableOpacity onPress={()=> handleConfirmNewPassword()}>
            <ButtonView>
              <ButtonText>Confirmer</ButtonText>
            </ButtonView>
        </TouchableOpacity>
    </ConfirmationForm>
  </Container>
)
}

export default ForgotPasswordEmailSubmitScreen;