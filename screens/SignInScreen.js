import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components/native";
import { Alert, Dimensions, Animated } from "react-native";
import { Button, Keyboard, TouchableOpacity, TouchableWithoutFeedback } from "react-native";

const screenHeight = Dimensions.get("window").height;

const Container = styled.ImageBackground`
  width: 100%;
  height: 100%;
  align-items: center;
`;

const BrainsportIcon = styled.Image`
    position: absolute;
    top: 50px;
    width: 80px;
    height: 80px;
`;
const BrainsportIconText = styled.Image`
    position: absolute;
    top: 130px;
    /* width: 120px;
    height: 80px; */
`;


const TextInput = styled.TextInput`
  border: 1px solid #53565f;
  width: 295px;
  height: 60px;
  border-radius: 10px;
  font-size: 17px;
  color: #FFFFFF;
  padding-left: 120px;
  padding-right: 8px;
  margin-top: 20px;
  background: #3c4560;
  z-index: 1;
`;

const SigninForm = styled.View`
  align-items: center;
  height: ${screenHeight}px;
  padding-top: 230px;
`;

const Title = styled.Text`
  margin-top: 20px;
  font-size: 22px;
  width: 275px;
  color: #131516;
  text-align: left;
`;
const SubTitle = styled.Text`
  margin-top: 10px;
  margin-bottom: 20px;
  font-size: 14px;
  width: 275px;
  color: #62666A;
  text-align: left;
`;

const ButtonView = styled.View`
  background: #FFFFFF;
  width: 295px;
  height: 50px;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  margin-top: 20px;
  //box-shadow: 0 10px 20px #c2cbff;
`;
const ButtonViewSecondary = styled.View`
  background: #3c4560;
  width: 295px;
  height: 50px;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  margin-top: 20px;
  //box-shadow: 0 10px 20px #c2cbff;
`;

const ButtonText = styled.Text`
  color: #000000;
  font-size: 14px;
  font-weight: bold;
`;
const ButtonTextSecondary = styled.Text`
  color: #FFFFFF;
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
  color: #FFFFFF;
  text-decoration: underline;
  font-size: 14px;
`;

const PreText = styled.Text`
color: #FFFFFF;
  width: 100px;
  height: 24px;
  font-size: 14px;
  position: absolute;
  top: 40px;
  left: 10px;
  z-index: 2;
`;

const InputContainer = styled.View`
    position: relative;
`
const ButtonFooter = styled.View`
    position: absolute;
    bottom: 150px;
`

const SignInScreen = ({navigation}) => {


    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);


    const refEmail = useRef(null);
    const handleFocusEmail = () => {
      refEmail.current.focus();
    }

    const refPassword = useRef(null);
    const handleFocusPassword = () => {
      refPassword.current.focus();
    }


    async function handleSignIn() {
        setIsLoading(true);   
        try {
          setIsLoading(false);
          navigation.navigate("Main");
        } catch (error) {
            setIsLoading(false);
            console.log('error signing in', error);
        }
    };

    return (
    <Container source={require("../assets/brainsport-bg.png")}>
      <BrainsportIcon source={require("../assets/brainsport-logo.png")}/>
      <BrainsportIconText source={require("../assets/logo-brainsport.png")}/>
      <SigninForm >
        <TouchableWithoutFeedback onPress={()=> handleFocusEmail()}>
          <InputContainer >
              <PreText>Email</PreText>
              <TextInput ref={refEmail} keyboardType="email-address" onChangeText={(e)=> setEmail(e)} />
          </InputContainer>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback onPress={()=> handleFocusPassword()}>
          <InputContainer>
              <PreText>Mot de passe</PreText>
              <TextInput ref={refPassword} secureTextEntry={true} onChangeText={(p)=> setPassword(p)} />
          </InputContainer>
        </TouchableWithoutFeedback>
        <TouchableOpacity onPress={()=> {}}>
            <ButtonViewLink>
              <ButtonTextLink>Mot de passe oublié ?</ButtonTextLink>
            </ButtonViewLink>
        </TouchableOpacity>
        <TouchableOpacity onPress={()=> handleSignIn()}>
            <ButtonView>
            <ButtonText>Se connecter</ButtonText>
            </ButtonView>
        </TouchableOpacity>
        {/* <TouchableOpacity >
        <Button title="Sign in with Google" onPress={() => {promptAsync();}} />
        </TouchableOpacity> */}
        
        <ButtonFooter>
            <TouchableOpacity onPress={()=> navigation.navigate("Signup")}>
                <ButtonViewSecondary>
                <ButtonTextSecondary>Créer un compte</ButtonTextSecondary>
                </ButtonViewSecondary>
            </TouchableOpacity>
        </ButtonFooter>
      </SigninForm>
    </Container>
)
}

export default SignInScreen;