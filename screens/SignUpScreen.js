import React, { useRef, useState } from "react";
import Toast from 'react-native-toast-message';
import { Ionicons } from "@expo/vector-icons";
import { Dimensions, KeyboardAvoidingView, SafeAreaView, TouchableOpacity, TouchableWithoutFeedback } from "react-native";
import styled from "styled-components/native";
import { Auth } from 'aws-amplify';
import { Platform } from "react-native";

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;
const widthContent = screenWidth  - 80;


const Container = styled.ImageBackground`
  width: 100%;
  height: 100%;
  align-items: center;
`;

const TextInput = styled.TextInput`
  border: ${props => props.isError === true ? "2px solid #e74c3c" : "1px solid #53565f"};
  width: ${widthContent}px;
  height: 44px;
  border-radius: 10px;
  font-size: 17px;
  color: #FFFFFF;
  padding-left: 120px;
  margin-top: 20px;
  background: #3c4560;
  z-index: 1;
`;

const SignupForm = styled.View`
  align-items: center;
  padding-top: 10px;
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
  color: white;
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
  background: #3c4560;
  width: ${widthContent}px;
  height: 50px;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  margin-top: 20px;
  //box-shadow: 0 10px 20px #c2cbff;
`;

const ButtonText = styled.Text`
  color: black;
  font-weight: bold;
  font-size: 14px;
`;

const CloseButton = styled.View`
  width: ${widthContent}px;
  justify-content: flex-start;
`

const PreText = styled.Text`
color: #FFFFFF;
  width: 100px;
  height: 24px;
  font-weight:bold;
  font-size: 14px;
  position: absolute;
  top: 30px;
  left: 10px;
  z-index: 2;
`;

const InputContainer = styled.View`
    position: relative;
`
const HintContainer = styled.View`
  width: ${widthContent}px;
`;

const TextHint = styled.Text`
  margin-left: 5px;
  margin-top: 5px;
  color: #FFFFFF;
  font-size: 8px;
`;

const PostIcon = styled.View`
  width: 20px;
  height: 20px;
  position: absolute;
  top: 35px;
  right: 10px;
  z-index: 2;
`;

const SignUpScreen = ({navigation}) => {

    /* STATE */
    const [username, setUsername] = useState("");
    const [firstname, setFirstname] = useState("");
    const [firstnameError, setFirstnameError] = useState(false);
    const [lastname, setLastname] = useState("");
    const [lastnameError, setLastnameError] = useState(false);
    const [email, setEmail] = useState("");
    const [emailError, setEmailError] = useState(false);
    const [password, setPassword] = useState("");
    const [passwordError, setPasswordError] = useState(false);
    const [confirmPassword, setConfirmPassword] = useState("");
    const [confirmPasswordError, setConfirmPasswordError] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isSuccessful, setIsSuccessful] = useState(false);
    const [showPass, setShowPass] = useState(false);
    const [showConfirmPass, setShowConfirmPass] = useState(false);

    /* REFS */
    const refLastname = useRef(null);
    const refFirstname = useRef(null); 
    const refEmail = useRef(null); 
    const refPassword = useRef(null); 
    const refConfirmPassword = useRef(null);

    const handleFocusText = (reference) => {
      reference.current.focus();
    }
    const validateEmail = (text) =>{
      const mailFormat = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
      return text.match(mailFormat);
    }

    const validatePassword = (text) =>{
      const passFormat = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&_#-])[A-Za-z\d@$!%*?&_#-]{8,}$/g;
      return text.match(passFormat);
    }

    const validateConfirmPassword = (pass, confirm) =>{
      console.log("PASS : " + pass + "CONFIRM : " + confirm);
      return (pass !== "" && pass === confirm);
    }
    const reinitErrorAttributes = () =>{
      setFirstnameError(false);
      setLastnameError(false);
      setEmailError(false);
      setPasswordError(false);
      setConfirmPasswordError(false);
    }

    const confirmAllConditionPassed = () => {
      return firstname && lastname && validateEmail(email) && validatePassword(password) && validateConfirmPassword(password, confirmPassword);
    }

    async function handleSignUp() {
      reinitErrorAttributes();
      if(firstname === "") {
        setFirstnameError(true);
      }
      if(lastname === ""){
        setLastnameError(true);
      }
      if(!validateEmail(email)){
        setEmailError(true);
      }
      if(!validatePassword(password)) {
        setPasswordError(true);
      }
      if(!validateConfirmPassword(password, confirmPassword)) {
        setConfirmPasswordError(true);
      }
      if(confirmAllConditionPassed()){
        setUsername(firstname + " " + lastname);
        try {
          const { user } = await Auth.signUp({
              username: email,
              password,
              attributes: {
                  email,
                  given_name: firstname,
                  family_name: lastname
              }
          });
          Toast.show({
            type: 'success',
            text1: 'Inscription validée',
            text2:  "Un mail vous est parvenue pour entrer votre code."
          });
          navigation.navigate("Confirmation Code", {
            email
          });
        } catch (error) {
            console.log('error signing up:', error);
            Toast.show({
              type: 'error',
              text1: "Erreur à l'inscription" ,
              text2: "veuillez réessayer ultérieurement."
            });
        }
      } else {
        Toast.show({
          type: 'error',
          text1: "Erreur à l'inscription" ,
          text2: "Problème à l'inscription. Veuillez corriger les points en rouge."
        });
      }
    }  
return (
    <Container source={require("../assets/brainsport-bg.png")}>
    <SafeAreaView>
      <KeyboardAvoidingView behavior="position">
        <SignupForm>
          <TitleBar>
            <CloseButton>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
                </TouchableOpacity>
            </CloseButton>
            <Title>Inscrivez-vous</Title>
            <SubTitle>Remplissez le formulaire afin de vous inscrire</SubTitle>
          </TitleBar>
          <TouchableWithoutFeedback onPress={()=> handleFocusText(refLastname)}>
            <InputContainer>
                  <PreText>Nom</PreText>
                  <TextInput ref={refLastname} isError={lastnameError} onChangeText={(e)=> setLastname(e)}/>
            </InputContainer>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback onPress={()=> handleFocusText(refFirstname)}>
            <InputContainer>
                  <PreText>Prenom</PreText>
                  <TextInput ref={refFirstname} isError={firstnameError} onChangeText={(e)=> setFirstname(e)}/>
            </InputContainer>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback onPress={()=> handleFocusText(refEmail)}>
            <InputContainer>
                  <PreText>Email</PreText>
                  <TextInput ref={refEmail}  isError={emailError} keyboardType="email-address" onChangeText={(e)=> setEmail(e)}/>
            </InputContainer>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback onPress={()=> handleFocusText(refPassword)}>
            <InputContainer>
                  <PreText>Mot de passe</PreText>
                  <TextInput ref={refPassword}  isError={passwordError} secureTextEntry={!showPass} onChangeText={(p)=> setPassword(p)}/>
                  <PostIcon>
                    <TouchableOpacity onPress={()=> setShowPass(pass => !pass)}>
                      {!showPass && <Ionicons name="eye-off-outline" size={16} color="#FFFFFF" />}
                      {showPass && <Ionicons name="eye-outline" size={16} color="#FFFFFF" />}
                    </TouchableOpacity>
                  </PostIcon>
            </InputContainer>
          </TouchableWithoutFeedback>
          <HintContainer>
            <TextHint>Minimum 8 caractères, 1 majuscule, 1 chiffre et 1 caractère spécial (@$!%*?&_#-)</TextHint>
          </HintContainer>
          <TouchableWithoutFeedback onPress={()=> handleFocusText(refConfirmPassword)}>
            <InputContainer>
                  <PreText>Confirmation</PreText>
                  <TextInput ref={refConfirmPassword} isError={confirmPasswordError} secureTextEntry={!showConfirmPass} onChangeText={(p)=> setConfirmPassword(p)} />
                  <PostIcon>
                    <TouchableOpacity onPress={()=> setShowConfirmPass(confirmPass => !confirmPass)}>
                      {!showConfirmPass && <Ionicons name="eye-off-outline" size={16} color="#FFFFFF" />}
                      {showConfirmPass && <Ionicons name="eye-outline" size={16} color="#FFFFFF" />}
                    </TouchableOpacity>
                  </PostIcon>
            </InputContainer>
          </TouchableWithoutFeedback>
          <TouchableOpacity onPress={()=> handleSignUp()}>
              <ButtonView>
                <ButtonText>S'inscrire</ButtonText>
              </ButtonView>
          </TouchableOpacity>
        </SignupForm>
      </KeyboardAvoidingView>
    </SafeAreaView>
  </Container>
)
}

export default SignUpScreen;