import React, { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { Dimensions, TouchableOpacity } from "react-native";
import styled from "styled-components/native";
import { Auth } from 'aws-amplify';
import Toast from 'react-native-toast-message';


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

const CloseButton = styled.View`
  width: ${widthContent}px;
  justify-content: flex-start;
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

const TitleBar = styled.View`
  justify-content: center;
  align-items: center;
  margin-top: 50px;
  margin-bottom: 30px;
`;

const Title = styled.Text`
  margin-top: 20px;
  font-size: 22px;
  font-weight: bold;
  width: 275px;
  color: white;
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
  background: white;
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
  color: #000000;
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
  color: white;
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



const ConfirmationSignUpScreen = ({route, navigation}) => {
    const { email } = route.params;
    const [code, setCode] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [isSuccessful, setIsSuccessful] = useState(false);

    async function handleConfirmSignUp() {
        try {
          await Auth.confirmSignUp(email, code);
          Toast.show({
            type: 'success',
            text1: 'Inscription Réussie',
            text2:  "L'inscription est confirmée. Veuillez vous connecter."
          });
          navigation.navigate("Signin");
        } catch (error) {
          Toast.show({
            type: 'error',
            text1: "Erreur de validation" ,
            text2: "veuillez réessayer ultérieurement."
          });
          console.log('error confirming sign up', error);
        }
    }
    const handleResendConfirmCode = async () =>{
      try {
        await Auth.resendSignUp(email);
        Toast.show({
          type: 'success',
          text1: 'Code Renvoyé',
          text2:  "Le code est renvoyé à l'adresse : "+ email
        });
        console.log('code renvoyé');
      } catch (err) {
          Toast.show({
            type: 'error',
            text1: "Erreur à l'envoi du code" ,
            text2: "veuillez réessayer ultérieurement."
          });
          console.log('erreur de renvoi du code: ', err);
      }
    }
return (
    <Container>
    <ImageBG source={require("../assets/brainsport-bg.png")} />
    <ConfirmationForm>
      <TitleBar>
        <CloseButton>
          <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
          </TouchableOpacity>
        </CloseButton>
        <Title>Code de confirmation</Title>
      </TitleBar>
      <InputContainer>
            <PreText>Code</PreText>
            <TextInput onChangeText={(e)=> setCode(e)}/>
        </InputContainer>
        <TouchableOpacity onPress={()=> handleResendConfirmCode()}>
            <ButtonView>
              <ButtonText>Envoyer un nouveau code</ButtonText>
            </ButtonView>
        </TouchableOpacity>
      <TouchableOpacity onPress={()=> handleConfirmSignUp()}>
            <ButtonView>
              <ButtonText>Confirmer</ButtonText>
            </ButtonView>
        </TouchableOpacity>
    </ConfirmationForm>
  </Container>
)
}

export default ConfirmationSignUpScreen;