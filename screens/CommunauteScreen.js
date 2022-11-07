import React, { useRef, useState } from "react";
import { SafeAreaView, ScrollView, StatusBar, Dimensions, Animated } from "react-native";
import styled from 'styled-components/native';
import {challengeList} from "../challenge-list";
import {eventList} from "../event-list";
import ChallengeCard from "../components/ChallengeCard";
import EventCard from "../components/EventCard";

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
  margin-bottom: 30px;
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

const CommuSection = styled.View`
  justify-content: center;
  align-items: center;
  margin-left: 10px;
  margin-top: 10px;
  margin-bottom: 10px;

`;

const SectionTitle = styled.View`
  width: ${screenWidth}px;
  margin-left: 10px;
  text-align: left;
`;

const SectionTitleText = styled.Text`
  width: ${screenWidth}px;
  color: #FFFFFF;
  font-size: 20px;
  text-transform: capitalize;
  font-weight: bold;
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

const CardContainer = styled.View`
  margin-right: 10px;
  margin-left: 10px;
`;

const CommunauteScreen = () => {
    const challengeRef = useRef(null);
    const eventRef = useRef(null);
    const [currentItemIndex, setCurrentItemIndex] = useState(0);

    const updateCurrentItemIndex = element => {
      const contentOffsetX = element.nativeEvent.contentOffset.x;
      const currentIndex = Math.round(contentOffsetX / screenWidth);
      setCurrentItemIndex(currentIndex);
  };
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
            <CommuSection>
              <SectionTitle>
                <SectionTitleText>
                  Challenge
                </SectionTitleText>
                
              </SectionTitle>
            <Animated.FlatList
            data={challengeList}
            ref={challengeRef}
            style={{flex: 1}}
            keyExtractor={item => "card-"+item.id}
            horizontal
            scrollEventThrottle={32}
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            renderItem={({item, index}) => {
                return (<>
                    <CardContainer>
                      <ChallengeCard
                      key={"card-"+item.id}
                      challengeObject={item}
                      />
                    </CardContainer>
                </>);
            }}
            />
            </CommuSection>
            <CommuSection>
              <SectionTitle>
                <SectionTitleText>
                  Evenements
                </SectionTitleText>
                
              </SectionTitle>
            <Animated.FlatList
            data={eventList}
            ref={eventRef}
            style={{flex: 1}}
            keyExtractor={item => "card-"+item.id}
            horizontal
            scrollEventThrottle={32}
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            renderItem={({item, index}) => {
                return (<>
                    <CardContainer>
                      <EventCard
                      key={"card-"+item.id}
                      eventObject={item}
                      />
                    </CardContainer>
                </>);
            }}
            />
            </CommuSection>
            <CommuSection>
              <SectionTitle>
                <SectionTitleText>
                  Classement
                </SectionTitleText>
              </SectionTitle>
            </CommuSection>
            <CommuSection>
              <SectionTitle>
                <SectionTitleText>
                  Groupes
                </SectionTitleText>
              </SectionTitle>
            </CommuSection>
            </ScrollView>
          </SafeAreaView>
        </Container>);
}

export default CommunauteScreen;