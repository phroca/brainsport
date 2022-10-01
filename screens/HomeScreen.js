import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, ScrollView, TouchableOpacity, Animated, Easing } from 'react-native';
import styled from 'styled-components/native';
// import Card from '../components/Card';
// import Menu from '../components/menu/Menu';
import { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
 import { NotificationIcon } from '../components/NotificationIcon';
import Avatar from '../components/Avatar';
import Card from '../components/Card';
// import AsyncStorage from '@react-native-async-storage/async-storage';
import Auth from "@aws-amplify/auth";
import CardService from '../services/Card.service';

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


const ButtonView = styled.View`
  background: #FFFFFF;
  width: 295px;
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
    position: absolute;
    bottom: 150px;
    left: 40px;
`;

export default function HomeScreen({navigation}) {
    const [username, setUsername] = useState("");
    const [currentUSerDataCard, setCurrentUserDataCard] = useState({"userId": "", "cards": []})
    useEffect(()=> {
      (async() => {
        const user = await Auth.currentAuthenticatedUser();
        setUsername(user?.attributes?.given_name);
      })();
      CardService.getUserCardsMock().then((userCardsData)=> {
        setCurrentUserDataCard(userCardsData);
      });
    },[])
    
  return !currentUSerDataCard ?( 
          <Container source={require("../assets/brainsport-bg.png")}>   
            <StatusBar style="auto" />

                  <TitleBar>
                      <Title>Bonjour {username} !</Title>
                  </TitleBar>
                  <Subtitle >
                      Bienvenue chez Brainsport ! 
                      Commencez votre aventure par créer votre jeu !
                  </Subtitle>
                
                  <ButtonFooter>
                    <TouchableOpacity onPress={()=> navigation.navigate("Rules")}>
                      <ButtonView>
                        <ButtonText>Commencer</ButtonText>
                      </ButtonView>
                    </TouchableOpacity>
                  </ButtonFooter>

          </Container>

  ) : ( 
    <Container source={require("../assets/brainsport-bg.png")}>   
      <StatusBar style="auto" />

            <TitleBar>
                <Title>Bonjour {username} !</Title>
            </TitleBar>
            <Subtitle >
                Votre tableau n'est pas encore terminé !
            </Subtitle>
          
            <ButtonFooter>
              <TouchableOpacity onPress={()=> navigation.navigate("Card Association", { userCards: currentUSerDataCard })}>
                <ButtonView>
                  <ButtonText>Continuer</ButtonText>
                </ButtonView>
              </TouchableOpacity>
            </ButtonFooter>

    </Container>

);
}

