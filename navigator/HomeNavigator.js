import { createNativeStackNavigator } from '@react-navigation/native-stack';

import NotificationFamillyModal from '../screens/NotificationFamillyModal';
import PlayCardFamilly from '../screens/PlayCardFamilly';
import RulePrecreationScreen from '../screens/RulePrecreationScreen';
import HomeScreenPreplay from '../screens/HomeScreenPreplay';
import CardAssociationReadOnlyScreen from '../screens/CardAssociationReadOnlyScreen';
import PlayPregame from '../screens/PlayPregame';
import CardAssociationPerFamillyScreen from '../screens/CardAssociationPerFamillyScreen';

const Stack = createNativeStackNavigator();


const HomeNavigator = () => {
        return (    
            <Stack.Navigator screenOptions={{ headerShown: false }}>
                <Stack.Group>
                    <Stack.Screen name="Accueil Preliminaire" component={HomeScreenPreplay} />
                    <Stack.Screen name="Card Association Read Only" component={CardAssociationReadOnlyScreen} />
                    <Stack.Screen name="Card Association Par Famille" component={CardAssociationPerFamillyScreen} />
                    <Stack.Screen name="PlayPregame" component={PlayPregame} />
                    <Stack.Screen name="PlayFamilly" component={PlayCardFamilly} />
                    <Stack.Screen name="Regle Precreation" component={RulePrecreationScreen} />
                </Stack.Group>
                <Stack.Group screenOptions={{ presentation: 'modal' }}>
                    <Stack.Screen name="FamillyModal" component={NotificationFamillyModal} />
                </Stack.Group> 
            </Stack.Navigator>
        )
}

export default HomeNavigator