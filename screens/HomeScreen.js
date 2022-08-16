import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, ScrollView, TouchableOpacity, Animated, Easing } from 'react-native';
import styled from 'styled-components/native';
// import Card from '../components/Card';
// import Menu from '../components/menu/Menu';
import { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
 import { NotificationIcon } from '../components/NotificationIcon';
import Avatar from '../components/Avatar';
// import AsyncStorage from '@react-native-async-storage/async-storage';

const RootView = styled.View`
    background: black;
    flex: 1;
`;

const Container = styled.ImageBackground`
  width: 100%;
  height: 100%;
`;

const TitleBar = styled.View`
  width: 100%;
  margin-top: 100px;
  margin-bottom: 30px;
  padding-left: 40px;
  padding-right: 40px;
`;

const Title = styled.Text`

  color: #FFFFFF;
  font-size: 40px;
  font-weight: bold;
`;

const Subtitle = styled.Text`
color: #FFFFFF;
//font-family:'NunitoSans_700Bold';
  font-size: 14px;
  margin-left: 40px;
  margin-top: 10px;
  margin-right: 40px;
`;

const Name = styled.Text`
color: #FFFFFF;
  font-size: 14px;
  //font-family: 'NunitoSans_400Regular';
`;

const AnimatedContainer = Animated.createAnimatedComponent(Container);


export default function HomeScreen() {
    const [username, setUsername] = useState("Test");
    const navigation = useNavigation();

  return (
        <RootView>
            <Container source={require("../assets/brainsport-bg.png")}>     
            <StatusBar style="auto" />
            <SafeAreaView>
                <ScrollView style={{height: "100%"}}>
                  <TitleBar>

                      <TouchableOpacity style={{ position: "absolute", top: 0, left: 20 }} >
                          {/* <Avatar /> */}
                      </TouchableOpacity>
                      <Title>Bonjour {username} !</Title>
                      {/* <Name>{username}</Name> */}
                      {/* <NotificationIcon style={{ position: "absolute", right: 20, top: 5 }} /> */}
                  </TitleBar>
                  <Subtitle >
                      Bienvenue chez Brainsport ! 
                      Commencez votre aventure par créer votre jeu !
                  </Subtitle>

                  <ScrollView horizontal={true} style={{ paddingBottom: 30 }} showsHorizontalScrollIndicator={false}>
                
                  </ScrollView>
                
                </ScrollView>
            </SafeAreaView>
          </Container>
        </RootView>
  );
}

