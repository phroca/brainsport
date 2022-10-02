import { createNativeStackNavigator } from '@react-navigation/native-stack';
import RulesScreen from '../screens/RulesScreen';
import CardAssociationScreen from '../screens/CardAssociationScreen';
import HomeScreen from '../screens/HomeScreen';
import NotificationFamillyModal from '../screens/NotificationFamillyModal';
import PlayCardFamilly from '../screens/PlayCardFamilly';

const Stack = createNativeStackNavigator();


const HomeNavigator = () => {

        return (
            
            <Stack.Navigator initialRouteName="Accueil" screenOptions={{ headerShown: false }}>
                <Stack.Group>
                    <Stack.Screen name="Accueil" component={HomeScreen} />
                    <Stack.Screen name="Rules" component={RulesScreen} />
                    <Stack.Screen name="Card Association" component={CardAssociationScreen} />
                    <Stack.Screen name="PlayFamilly" component={PlayCardFamilly} />
                </Stack.Group>
                <Stack.Group screenOptions={{ presentation: 'modal' }}>
                    <Stack.Screen name="FamillyModal" component={NotificationFamillyModal} />
                </Stack.Group>         
            </Stack.Navigator>
        );
}

export default HomeNavigator