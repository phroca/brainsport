import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons  } from "@expo/vector-icons";
import { BlurView } from 'expo-blur';
import HomeScreen from "../screens/HomeScreen";
import FormationScreen from '../screens/FormationScreen';
import CommunauteScreen from '../screens/CommunauteScreen';
import ProfilScreen from '../screens/ProfilScreen';
import ProgresScreen from '../screens/ProgresScreen';
import { Button, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import HomeNavigator from './HomeNavigator';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ProfilNavigator from './ProfilNavigator';

const activeColor = "#A138F2";
const inactiveColor = "#FFFFFF";

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
    return(  
            <Tab.Navigator 
            screenOptions={({route})=> ({
                tabBarShowLabel: false,
                tabBarStyle: {
                    position: 'absolute',
                    borderTopLeftRadius: 15,
                    borderTopRightRadius: 15,
                },
                tabBarBackground: () => (
            <BlurView tint="dark" intensity={80} style={{
                ...StyleSheet.absoluteFill,
                borderTopLeftRadius: 15,
                borderTopRightRadius: 15
            }} />
            ),
                tabBarIcon: ({focused, color, size}) => {
                let iconName;
                if (route.name === "Formation") {
                    iconName = focused ? 'certificate' : 'certificate-outline';
                } else if (route.name === "Communauté") {
                    iconName = focused ? 'account-group' : 'account-group-outline';
                } else if(route.name === "Profil") {
                    iconName = focused ? 'account-circle' : 'account-circle-outline';
                } else if(route.name === "Progres") {
                    iconName = focused ? 'bullseye-arrow' : 'bullseye-arrow';
                } else if(route.name === "Home") {
                    iconName = focused ? 'cards-playing' : 'cards-outline';
                }

                return <MaterialCommunityIcons name={iconName} size={size} color={color} />;
                },
                    tabBarActiveTintColor: activeColor,
                    tabBarInactiveTintColor: inactiveColor,
                    headerShown: false,
                })} initialRouteName="Home">
                
                <Tab.Screen name="Formation" component={FormationScreen} />
                <Tab.Screen name="Communauté" component={CommunauteScreen} />
                <Tab.Screen name="Home" component={HomeNavigator} />
                <Tab.Screen name="Profil" component={ProfilNavigator} /> 
            </Tab.Navigator> 
    );
}

export default TabNavigator;