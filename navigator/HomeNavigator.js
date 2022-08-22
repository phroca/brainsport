import { createNativeStackNavigator } from '@react-navigation/native-stack';
import RulesScreen from '../screens/RulesScreen';
import CardAssociationScreen from '../screens/CardAssociationScreen';
import HomeScreen from '../screens/HomeScreen';

const Stack = createNativeStackNavigator();


const HomeNavigator = () => {

        return (
            
            <Stack.Navigator initialRouteName="Accueil" screenOptions={{ headerShown: false }}>
                <Stack.Screen name="Accueil" component={HomeScreen} />
                <Stack.Screen name="Rules" component={RulesScreen} />
                <Stack.Screen name="Card Association" component={CardAssociationScreen} />                
            </Stack.Navigator>
        );
}

export default HomeNavigator