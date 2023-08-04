import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components/native";
import { Dimensions } from "react-native";
import { TouchableOpacity, TouchableWithoutFeedback } from "react-native";
import Toast from 'react-native-toast-message';
import { Auth } from 'aws-amplify';
import Loading from "../components/Loading";
import { Ionicons } from '@expo/vector-icons';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;
const widthContent = screenWidth  - 80;

const Container = styled.ImageBackground`
  width: 100%;
  height: 100%;
  align-items: center;
`;
const VideoContainer = styled.View`
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: center;
  background-color: #000000;
`;
const TextLoading = styled.Text`
  color: #FFFFFF;
  font-size: 17px;

`
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
  width: ${widthContent}px;
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
const TextInputPass = styled.TextInput`
  border: 1px solid #53565f;
  width: ${widthContent}px;
  height: 60px;
  border-radius: 10px;
  font-size: 17px;
  color: #FFFFFF;
  padding-left: 120px;
  padding-right: 40px;
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
  width: ${widthContent}px;
  height: 50px;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  margin-top: 20px;
  //box-shadow: 0 10px 20px #c2cbff;
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
  width: ${widthContent}px;
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
const PostIcon = styled.View`
  width: 20px;
  height: 20px;
  position: absolute;
  top: 40px;
  right: 10px;
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
    const [showPass, setShowPass] = useState(false);
    const [loading, setLoading] = useState(true);

    const refEmail = useRef(null);
    const handleFocusEmail = () => {
      refEmail.current.focus();
    }

    const refPassword = useRef(null);
    const handleFocusPassword = () => {
      refPassword.current.focus();
    }


    useEffect(() => {
      Auth.currentAuthenticatedUser().then((result) => {
        if(result) {
          navigation.navigate("Main");
        }
        setLoading(false);
      }).catch((error) => {
        setLoading(false);
      })
    },[]);

    async function handleSignIn() {
           
        try {
          setIsLoading(true);
          Auth.signIn(email, password).then((user)=>{
            setIsLoading(false);
            Toast.show({
              type: 'success',
              text1: 'Connexion réussie',
              text2:  "Bienvenue sur Brainsport."
            });
            navigation.navigate("Main");
          }).catch((error) => {
            setIsLoading(false);
            Toast.show({
              type: 'error',
              text1: "Erreur de connexion" ,
              text2: "veuillez réessayer ultérieurement."
            });
          });

        } catch (error) {
            setIsLoading(false);
            const causeError = (e) => {
              if(e.includes("AuthError")) return "l'email ne peut pas être vide.";
              if(e.includes("InvalidParameterException")) return " l'email est malformé.";
              if(e.includes("NotAuthorizedException")) return "email ou mot de passe incorrect.";
            }
            Toast.show({
              type: 'error',
              text1: 'Erreur de connexion',
              text2:  causeError(""+error)
            });
            console.log('error signing in', error);
        }
    };

    return loading === true ? (
      <VideoContainer>
        {/* <ActivityIndicator size="large" color="#A138F2" />
        <TextLoading>Chargement en cours...</TextLoading> */}
      </VideoContainer>
    ) :
    (
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
              <TextInputPass ref={refPassword} secureTextEntry={!showPass} onChangeText={(p)=> setPassword(p)} />
              <PostIcon>
              <TouchableOpacity onPress={()=> setShowPass(pass => !pass)}>
                {!showPass && <Ionicons name="eye-off-outline" size={16} color="#FFFFFF" />}
                {showPass && <Ionicons name="eye-outline" size={16} color="#FFFFFF" />}
                </TouchableOpacity>
              </PostIcon>
          </InputContainer>
        </TouchableWithoutFeedback>
        <TouchableOpacity onPress={()=> navigation.navigate("Mdp Oublié")}>
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
      <Loading isActive={isLoading} />
    </Container>
)
}

export default SignInScreen;