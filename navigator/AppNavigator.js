import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TabNavigator from './TabNavigator';
import SignInScreen from '../screens/SignInScreen';
import BeforeSigninScreen from '../screens/BeforeSigninScreen';
const Stack = createNativeStackNavigator();


const AppNavigator = () => {

        return (
            <Stack.Navigator initialRouteName="BeforeSignin" screenOptions={{ headerShown: false, presentation: 'fullScreenModal' }}>
                <Stack.Screen name="Main" component={TabNavigator} />
                <Stack.Screen name="Signin" component={SignInScreen} />
                <Stack.Screen name="BeforeSignin" component={BeforeSigninScreen} />
            </Stack.Navigator>
        );
}

export default AppNavigator