import React, { useState } from "react";
import { TouchableOpacity } from "react-native";
import styled from "styled-components/native";
import { Auth } from 'aws-amplify';

const Container = styled.ImageBackground`
  width: 100%;
  height: 100%;
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
  border: 1px solid #53565f;
  width: 295px;
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
  padding-top: 100px;
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
  width: 295px;
  height: 50px;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  margin-top: 20px;
  box-shadow: 0 10px 20px #c2cbff;
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
  color: black;
  font-weight: bold;
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
  color: #0A3CA0;
  text-decoration: underline;
  font-size: 16px;
`;

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
const SignUpScreen = ({navigation}) => {

    const [username, setUsername] = useState("");
    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [isSuccessful, setIsSuccessful] = useState(false);


    async function handleSignUp() {
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
          navigation.navigate("Confirmation Code", {
            email
          });
        } catch (error) {
            console.log('error signing up:', error);
        }
      }
      
return (
    <Container source={require("../assets/brainsport-bg.png")}>
    <SignupForm>
      <Title>Inscrivez-vous</Title>
      <SubTitle>Remplissez le formulaire afin de vous inscrire</SubTitle>
      <InputContainer>
            <PreText>Nom</PreText>
            <TextInput onChangeText={(e)=> setLastname(e)}/>
      </InputContainer>
      <InputContainer>
            <PreText>Prenom</PreText>
            <TextInput onChangeText={(e)=> setFirstname(e)}/>
      </InputContainer>
      <InputContainer>
            <PreText>Email</PreText>
            <TextInput  keyboardType="email-address" onChangeText={(e)=> setEmail(e)}/>
      </InputContainer>
      <InputContainer>
            <PreText>Mot de passe</PreText>
            <TextInput secureTextEntry={true} onChangeText={(p)=> setPassword(p)}/>
      </InputContainer>
      <InputContainer>
            <PreText>Confirmation</PreText>
            <TextInput secureTextEntry={true} onChangeText={(p)=> setConfirmPassword(p)} />
      </InputContainer>
      <TouchableOpacity onPress={()=> handleSignUp()}>
            <ButtonView>
              <ButtonText>S'inscrire</ButtonText>
            </ButtonView>
        </TouchableOpacity>
    </SignupForm>
  </Container>
)
}

export default SignUpScreen;