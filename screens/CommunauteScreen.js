import React from "react";
import { SafeAreaView, ScrollView, StatusBar, Dimensions } from "react-native";
import styled from 'styled-components/native';

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

const ConnecterSection = styled.View`
    justify-content: center;
  align-items: center;
`;

const Mappemonde = styled.Image`
  width: ${widthContent}px;
  height: 200px;
`;

const LinkText = styled.Text`
  color: #FFFFFF;
  text-transform: uppercase;
  font-size: 12px;
`;

const ChallengeSection = styled.View`
    justify-content: center;
  align-items: center;
`;
const EvenementSection = styled.View`
    justify-content: center;
  align-items: center;
`;
const ClassementSection = styled.View`
    justify-content: center;
  align-items: center;
`;
const GroupesSection = styled.View`
    justify-content: center;
  align-items: center;
`;
const CommunauteScreen = () => {
    return (
        <Container source={require("../assets/brainsport-bg.png")}>
                    <SafeAreaView>
          <ScrollView style={{height: "100%"}} showsVerticalScrollIndicator={false}>
            <TitleBar>
                <Title>Communauté</Title>
            </TitleBar>
            <ConnecterSection>
                <Mappemonde source={require("../assets/mappemonde.png")}/>
                <LinkText>Se connecter aux membres</LinkText>
            </ConnecterSection>
            <ChallengeSection>

            </ChallengeSection>
            <EvenementSection>

            </EvenementSection>
            <ClassementSection>

            </ClassementSection>
            <GroupesSection>

            </GroupesSection>
            </ScrollView>
          </SafeAreaView>
        </Container>);
}

export default CommunauteScreen;