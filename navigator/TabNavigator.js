import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons, AntDesign, MaterialCommunityIcons  } from "@expo/vector-icons";
import HomeScreen from "../screens/HomeScreen";
import FormationScreen from '../screens/FormationScreen';
import CommunauteScreen from '../screens/CommunauteScreen';
import ProfilScreen from '../screens/ProfilScreen';
import ProgresScreen from '../screens/ProgresScreen';

const activeColor = "#0A3CA0";
const inactiveColor = "#5D92E3";

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
    return(
    <Tab.Navigator screenOptions={({route})=> ({
        tabBarIcon: ({focused, color, size}) => {
            let iconName;
            let isIonicon = true;
            if(route.name === "Home") {
                iconName = focused ? 'cards-playing' : 'cards-outline';
                isIonicon = false;
            } else if (route.name === "Formation") {
                iconName = focused ? 'ios-card' : 'ios-card-outline';
                isIonicon = true;
            } else if (route.name === "Communauté") {
                iconName = focused ? 'account-group' : 'account-group-outline';
                isIonicon = false;
            } else if(route.name === "Profil") {
                iconName = focused ? 'account-circle' : 'account-circle-outline';
                isIonicon = false;
            } else if(route.name === "Progres") {
                iconName = focused ? 'bullseye-arrow' : 'bullseye-arrow';
                isIonicon = false;
            }
            return isIonicon ? <Ionicons name={iconName} size={size} color={color}/> : <MaterialCommunityIcons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: activeColor,
            tabBarInactiveTintColor: inactiveColor,
            headerShown: false,
        })} initialRouteName="Home">
        
        <Tab.Screen name="Formation" component={FormationScreen} />
        <Tab.Screen name="Communauté" component={CommunauteScreen} />
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Profil" component={ProfilScreen} />
        <Tab.Screen name="Progres" component={ProgresScreen} />
    </Tab.Navigator> 
    );
}

export default TabNavigator;