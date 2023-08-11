import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons, FontAwesome5 } from "@expo/vector-icons";
import { BlurView } from 'expo-blur';
import FormationScreen from '../screens/FormationScreen';
import CommunauteScreen from '../screens/CommunauteScreen';
import { StyleSheet, View } from 'react-native';
import HomeNavigator from './HomeNavigator';
import ProfilNavigator from './ProfilNavigator';

const activeColor = "#A138F2";
const inactiveColor = "#000000";

const Tab = createBottomTabNavigator();

const TabNavigator = (navigation, route) => {

    return (
        <Tab.Navigator
            screenOptions={({ navigation, route }) => {
                const onPress = () => {
                    // The `merge: true` option makes sure that the params inside the tab screen are preserved
                    navigation.navigate(route.name, { merge: true });
                };

                return ({
                    tabBarShowLabel: true,
                    tabBarStyle: {
                        borderTopWidth: 0,
                        backgroundColor: '#FFFFFF',
                        borderColor: "#000000",
                        elevation: 0,
                        shadowOffset: {
                            width: 0,
                            height: 0
                        }
                    },
                    tabBarBackground: () => (
                        <View style={{


                            borderTopLeftRadius: 15,
                            borderTopRightRadius: 15
                        }} />
                    ),
                    tabBarIcon: ({ focused, color, size }) => {
                        let iconName;
                        if (route.name === "Formations") {
                            iconName = focused ? 'user-graduate' : 'user-graduate';
                        } else if (route.name === "Communauté") {
                            iconName = focused ? 'account-group' : 'account-group';
                        } else if (route.name === "Profil") {
                            iconName = focused ? 'account-settings' : 'account-settings';
                        } else if (route.name === "Progres") {
                            iconName = focused ? 'bullseye-arrow' : 'bullseye-arrow';
                        } else if (route.name === "Accueil") {
                            iconName = focused ? 'cards-playing' : 'cards-playing';
                        }

                        return route.name === "Formations" ? <FontAwesome5 onPress={onPress} name={iconName} size={20} color={color} /> : <MaterialCommunityIcons onPress={onPress} name={iconName} size={size} color={color} />;
                    },
                    tabBarActiveTintColor: activeColor,
                    tabBarInactiveTintColor: inactiveColor,
                    headerShown: false,
                })
            }} initialRouteName="Accueil">

            <Tab.Screen name="Accueil" component={HomeNavigator} />
            <Tab.Screen name="Communauté" component={CommunauteScreen} options={{ unmountOnBlur: true }} />
            <Tab.Screen name="Formations" component={FormationScreen} />
            <Tab.Screen name="Profil" component={ProfilNavigator} />
        </Tab.Navigator>
    );
}

export default TabNavigator;