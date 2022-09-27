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

const activeColor = "#A138F2";
const inactiveColor = "#FFFFFF";

const Tab = createBottomTabNavigator();
const ProfileStack = createNativeStackNavigator();

const ProfilLogo = ()=> {
    return (
        <View>
        </View>
    )
}

const ProfileStackScreen = ({navigation}) => {
    return(
        <ProfileStack.Navigator screenOptions={{
            headerTransparent: true,
        }}>
            <ProfileStack.Screen
            name="Profil Main"
            component={ProfilScreen}
            options={{
                headerTitle: (props) => <ProfilLogo {...props} />,
                headerRight: () => (
                    <TouchableOpacity onPress={()=> navigation.navigate("Rules")}>
                      <MaterialCommunityIcons name="cog-outline" size={24} color="white" />
                    </TouchableOpacity>
                ) 
            }}
            
            />
        </ProfileStack.Navigator>
    )
}
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
                }
                return <MaterialCommunityIcons name={iconName} size={size} color={color} />;
                },
                    tabBarActiveTintColor: activeColor,
                    tabBarInactiveTintColor: inactiveColor,
                    headerShown: false,
                })} initialRouteName="Home">
                
                <Tab.Screen name="Formation" component={FormationScreen} />
                <Tab.Screen name="Communauté" component={CommunauteScreen} />
                <Tab.Screen name="Home" component={HomeNavigator} 
                options={{

                tabBarIcon: ({focused}) => {
                    return  focused ? <MaterialCommunityIcons name="cards-playing" size={30} color="#FFFFFF"/> : <MaterialCommunityIcons name="cards-outline" size={30} color="#FFFFFF"/>;
                },
                tabBarButton: ({children, onPress})=>{
                    return  <TouchableOpacity activeOpacity={1} style={{
                        top: -20,
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                    onPress={onPress}>
                        <View style={{
                            width: 40,
                            height: 40,
                            borderRadius: 15,
                            backgroundColor: '#A138F2'
                        }}>
                            {children}
                        </View>
                        
                    </TouchableOpacity>
                }
                }}


                />
               
                <Tab.Screen name="Profil" component={ProfileStackScreen} /> 
                <Tab.Screen name="Progres" component={ProgresScreen} />
            </Tab.Navigator> 
    );
}

export default TabNavigator;