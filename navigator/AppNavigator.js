import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TabNavigator from './TabNavigator';
import SignInScreen from '../screens/SignInScreen';
import BeforeSigninScreen from '../screens/BeforeSigninScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';
import SignUpScreen from '../screens/SignUpScreen';
import ConfirmationSignUpScreen from '../screens/ConfirmationSignUpScreen';
import ForgotPasswordScreen from '../screens/ForgotPasswordScreen';
import ForgotPasswordEmailSubmitScreen from '../screens/ForgotPasswordEmailSubmitScreen';
import ChallengeScreen from '../screens/communaute/ChallengeScreen';
import EventScreen from '../screens/communaute/EventScreen';
import CreateGroupSreen from '../screens/CreateGroupScreen';
import GroupScreen from '../screens/communaute/GroupScreen';
import AvatarProfilScreen from '../screens/AvatarProfilScreen';
import GroupInvitationPrompt from '../components/GroupInvitationPrompt';
import FriendsScreen from '../screens/FriendsScreen';
import FriendProfilScreen from '../screens/FriendProfilScreen';
import NotificationsScreen from '../screens/NotificationsScreen';

const Stack = createNativeStackNavigator();


const AppNavigator = () => {
    const [isCitation, setIsCitation] = useState(true);

    useEffect(()=> {
        AsyncStorage.getItem('isAppFirstLaunched').then((result) => {
            if(result === null){
                AsyncStorage.setItem('isAppFirstLaunched', JSON.stringify(true))
                setIsCitation(true);
            }else {
                setIsCitation(false);
            } 
        })
    }, []);
        return (
            
            <Stack.Navigator initialRouteName="Signin" screenOptions={{ headerShown: false }}>
                <Stack.Group>
                    <Stack.Screen name="BeforeSignin" component={BeforeSigninScreen} />
                    <Stack.Screen name="Signin" component={SignInScreen} />
                    <Stack.Screen name="Main" component={TabNavigator} />
                    <Stack.Screen name="Signup" component={SignUpScreen} />
                    <Stack.Screen name="Confirmation Code" component={ConfirmationSignUpScreen} />
                    <Stack.Screen name="Mdp Oublié" component={ForgotPasswordScreen} />
                    <Stack.Screen name="Changement Mdp" component={ForgotPasswordEmailSubmitScreen} />
                    <Stack.Screen name="Challenge" component={ChallengeScreen} />
                    <Stack.Screen name="Event" component={EventScreen} />
                    <Stack.Screen name="CreerGroupe" component={CreateGroupSreen} />
                    <Stack.Screen name="Group" component={GroupScreen} />
                    <Stack.Screen name="Avatar" component={AvatarProfilScreen} />
                    <Stack.Screen name="Amis" component={FriendsScreen} />
                    <Stack.Screen name="AmisProfil" component={FriendProfilScreen} />
                    <Stack.Screen name="Notifications" component={NotificationsScreen} />
                </Stack.Group>
                <Stack.Group screenOptions={{ presentation: 'modal' }}>
                    <Stack.Screen name="GroupInvitation" component={GroupInvitationPrompt} />
                </Stack.Group> 
            </Stack.Navigator>
        );
}

export default AppNavigator