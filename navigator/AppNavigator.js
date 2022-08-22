import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TabNavigator from './TabNavigator';
import SignInScreen from '../screens/SignInScreen';
import BeforeSigninScreen from '../screens/BeforeSigninScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';

const Stack = createNativeStackNavigator();


const AppNavigator = () => {
        const [isAppFirstLaunched, setIsAppFirstLaunched] = useState(null);
        useEffect(()=> {
            const appData = AsyncStorage.getItem('isAppFirstLaunched');
            if(appData == null){
                setIsAppFirstLaunched(true);
                AsyncStorage.setItem('isAppFirstLaunched', false);
            } else {
                setIsAppFirstLaunched(false);
            }
        }, []);
        return (
            
            <Stack.Navigator initialRouteName="BeforeSignin" screenOptions={{ headerShown: false }}>
                <Stack.Screen name="Main" component={TabNavigator} />
                <Stack.Screen name="Signin" component={SignInScreen} />
                <Stack.Screen name="BeforeSignin" component={BeforeSigninScreen} />
                
            </Stack.Navigator>
        );
}

export default AppNavigator