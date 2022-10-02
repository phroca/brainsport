import React from "react";
import { Dimensions, TouchableOpacity, SafeAreaView, ScrollView, StatusBar } from "react-native";
import styled from 'styled-components/native';
import CardService from '../services/Card.service';
import Toast from 'react-native-toast-message';
import { Auth } from 'aws-amplify';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;
const widthContent = screenWidth  - 50;

const Container = styled.ImageBackground`
  flex:1;
  width: 100%;
  height: 100%;
`;
const TitleBar = styled.View`
  width: 100%;
  margin-top: 100px;
  margin-bottom: 30px;
`;

const Title = styled.Text`
  color: #FFFFFF;
  font-size: 40px;
  font-weight: bold;
  text-align: center;
`;

const Subtitle = styled.Text`
color: #FFFFFF;
  font-size: 14px;
  margin-left: 40px;
  margin-top: 10px;
  margin-right: 40px;
`;

const ButtonAction = styled.View`
  justify-content: center;
  align-items: center;
  margin-top: 100px;
`;

const ButtonView = styled.View`
  background: #FFFFFF;
  width: ${widthContent}px;
  height: 50px;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  margin-top: 20px;
`;

const ButtonText = styled.Text`
  color: #000000;
  font-size: 14px;
  font-weight: bold;
`;

const ProfilScreen = ({navigation}) => {

  const handleReinit = () => {
    CardService.clearAll().then(()=> {
      Toast.show({
        type: 'success',
        text1: 'Réinitalisation réussie',
        text2:  "Les données utilisateurs sont bien réinitialisées."
      });
    })
  };

  const disconnect = async() => {
    Auth.signOut().then(()=> {
      navigation.navigate("Signin");
    })
  }
    return (
        <Container source={require("../assets/brainsport-bg.png")}>
        <SafeAreaView>
          <ScrollView style={{height: "100%"}} showsVerticalScrollIndicator={false}>
            <TitleBar>
                <Title>Profil</Title>
            </TitleBar>
            <Subtitle >
                Functionnalities Coming soon
            </Subtitle>        
          <ButtonAction>
            <TouchableOpacity onPress={()=> handleReinit()}>
              <ButtonView>
                <ButtonText>Reinitialiser</ButtonText>
              </ButtonView>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=> disconnect()}>
              <ButtonView>
                <ButtonText>Se déconnecter</ButtonText>
              </ButtonView>
            </TouchableOpacity>
          </ButtonAction>
          </ScrollView>
          </SafeAreaView>
        </Container>);
}

export default ProfilScreen;