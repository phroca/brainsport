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
import CardService from '../services/Card.service';

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
                <Stack.Screen name="BeforeSignin" component={BeforeSigninScreen} />
                <Stack.Screen name="Signin" component={SignInScreen} />
                <Stack.Screen name="Main" component={TabNavigator} />
                <Stack.Screen name="Signup" component={SignUpScreen} />
                <Stack.Screen name="Confirmation Code" component={ConfirmationSignUpScreen} />
                <Stack.Screen name="Mdp Oublié" component={ForgotPasswordScreen} />
                <Stack.Screen name="Changement Mdp" component={ForgotPasswordEmailSubmitScreen} />
            </Stack.Navigator>
        );
}

export default AppNavigator