import { createNativeStackNavigator } from '@react-navigation/native-stack';
import RulesScreen from '../screens/RulesScreen';
import CardAssociationScreen from '../screens/CardAssociationScreen';
import HomeScreen from '../screens/HomeScreen';
import NotificationFamillyModal from '../screens/NotificationFamillyModal';
import PlayCardFamilly from '../screens/PlayCardFamilly';
import RulePrecreationScreen from '../screens/RulePrecreationScreen';
import { useEffect, useState } from 'react';
import CardService from '../services/Card.service';
import HomeScreenPreplay from '../screens/HomeScreenPreplay';
import CardAssociationReadOnlyScreen from '../screens/CardAssociationReadOnlyScreen';
import PlayPregame from '../screens/PlayPregame';
import CardAssociationPerFamillyScreen from '../screens/CardAssociationPerFamillyScreen';

const Stack = createNativeStackNavigator();


const HomeNavigator = () => {
    const [prePlayDataOut, setPrePlayDataOut] = useState(null);
    useEffect(() => {
        CardService.getPrePlayData().then((prePlayData) =>{
            console.log("PREPLAY DATA IN HOME NAVIGATOR =>", prePlayData);
            setPrePlayDataOut(prePlayData);
        })
      }, []);
        return (
            
            <Stack.Navigator screenOptions={{ headerShown: false }}>
                {prePlayDataOut === false ? (<Stack.Group>
                    <Stack.Screen name="Accueil" component={HomeScreen} />
                    <Stack.Screen name="Accueil Preliminaire-Alt" component={HomeScreenPreplay} />
                    <Stack.Screen name="Rules" component={RulesScreen} />
                    <Stack.Screen name="Card Association" component={CardAssociationScreen} />
                    <Stack.Screen name="PlayFamilly" component={PlayCardFamilly} />
                </Stack.Group>) :(
                <Stack.Group>
                    <Stack.Screen name="Accueil Preliminaire" component={HomeScreenPreplay} />
                    <Stack.Screen name="Accueil-Alt" component={HomeScreen} />
                    <Stack.Screen name="Card Association Read Only" component={CardAssociationReadOnlyScreen} />
                    <Stack.Screen name="Card Association" component={CardAssociationScreen} />
                    <Stack.Screen name="Card Association Par Famille" component={CardAssociationPerFamillyScreen} />
                    <Stack.Screen name="PlayPregame" component={PlayPregame} />
                    <Stack.Screen name="PlayFamilly" component={PlayCardFamilly} />
                    <Stack.Screen name="Regle Precreation" component={RulePrecreationScreen} />
                </Stack.Group>)}
                <Stack.Group screenOptions={{ presentation: 'modal' }}>
                    <Stack.Screen name="FamillyModal" component={NotificationFamillyModal} />
                </Stack.Group> 
            </Stack.Navigator>
        )
}

export default HomeNavigator