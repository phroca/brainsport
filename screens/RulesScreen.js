import Auth from "@aws-amplify/auth";
import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { Dimensions, ScrollView, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import styled from 'styled-components/native';
import Card from "../components/Card";
import CardService from "../services/Card.service";
const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;
const widthContent = screenWidth  - 80;

const Container = styled.ImageBackground`
  flex:1;
  width: 100%;
  height: 100%;
`;

const TitleBar = styled.View`
  width: 100%;
  margin-top: 30px;
  margin-bottom: 30px;
`;

const Title = styled.Text`
  color: #FFFFFF;
  font-size: 40px;
  font-weight: bold;
  text-align: center;
`;

const Paragraph = styled.Text`
color: #FFFFFF;
  font-size: 14px;
  margin-left: 40px;
  margin-top: 10px;
  margin-right: 40px;
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

const ButtonFooter = styled.View`
    left: 40px;
    margin-bottom: 150px;
`;

const CardContainer = styled.View`
   justify-content: center;
   align-items: center;
   margin-top: 50px;
   margin-bottom: 50px;
`

const RulesScreen = ({navigation}) => {

  const handleInitCreationCard = async() => {
      const user = await Auth.currentAuthenticatedUser();
      CardService.initCardCreationMock(user?.pool?.userPoolId).then((userCardsData)=> {
        if(userCardsData){
          CardService.initFamillyProgress().then((famillyProgressData)=> {
            if(famillyProgressData){
              navigation.navigate("Card Association", { userCards: userCardsData, famillyProgress: famillyProgressData });
            }
            
          })
        }
      });  
  }
    return (
        <Container source={require("../assets/brainsport-bg.png")}>
            <StatusBar style="auto" />
            <SafeAreaView>
            <ScrollView style={{height: "100%"}}>
            <TitleBar>
                <Title>Règles du jeu</Title>
            </TitleBar>
            <Paragraph >
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
            Duis nunc justo, eleifend id porta id, congue ullamcorper arcu.
            Donec bibendum rutrum elementum. Morbi metus est, 
            ornare tincidunt te eu, luctus mollis est. 
            Maecenas congue tincidunt elit sit amet hendrerit. 
            Etiam tristique, nunc sit amet consequat ullamcorper, justo justo auctor massa, ac volutpat erat quam ac orci. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Suspendisse volutpat urna id magna mollis convallis. Vestibulum volutpat faucibus lacus eu hendrerit. In convallis, sapien id bibendum aliquam, tortor odio varius velit, vel ornare nulla arcu at risus.
            </Paragraph>
            <CardContainer>
                <Card isFold={true}/>
            </CardContainer>
            <Paragraph >
            Integer ut volutpat nibh. 
            Donec vestibulum augue sit amet odio aliquam, 
            ut cursus orci vulputate. Ut consectetur purus nec risus laoreet, 
            sit amet pretium dui efficitur.
            </Paragraph>
            <ButtonFooter>
                {/* <TouchableOpacity onPress={()=> navigation.navigate("Card Association")}> */}
                <TouchableOpacity onPress={()=> handleInitCreationCard()}>
                    <ButtonView>
                    <ButtonText>Commencer</ButtonText>
                    </ButtonView>
                </TouchableOpacity>
            </ButtonFooter>
            </ScrollView>
            </SafeAreaView>
        </Container>
        
        );
}

export default RulesScreen;