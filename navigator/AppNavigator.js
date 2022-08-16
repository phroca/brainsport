import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TabNavigator from './TabNavigator';
import SignInScreen from '../screens/SignInScreen';
const Stack = createNativeStackNavigator();


const AppNavigator = () => {

        return (
            <Stack.Navigator initialRouteName="Signin" screenOptions={{ headerShown: false, presentation: 'fullScreenModal' }}>
                <Stack.Screen name="Main" component={TabNavigator} />
                <Stack.Screen name="Signin" component={SignInScreen} />
            </Stack.Navigator>
        );
}

export default AppNavigator