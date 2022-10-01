import cardStructure from "../card-structure.json"
import { DataStore } from '@aws-amplify/datastore';
import { Card } from '../src/models';
import { PackCard } from '../src/models';
import AsyncStorage from '@react-native-async-storage/async-storage';

const initCardCreation = async(userId)=> {
    cardStructure.couleurs.forEach((couleur)=> {
        cardStructure.valeurs.forEach((valeur)=>{
            DataStore.save(
                new Card({
                    "valeur": valeur.valeur,
                    "couleur": couleur,
                    "personnage": "",
                    "verbe": "",
                    "objet": "",
                    "lieu": "",
                    "conditions": valeur.conditions,
                    "packcardID": "a3f4095e-39de-43d2-baf4-f8c16f0f6f4d"
                })
            );
        });
    });
    DataStore.save(
        new PackCard({
            "userId": userId,
            "Cards": []
        })
    );
}


const initCardCreationMock = async(userId) => {
    const userCards = {userId: userId, cards: []};
    cardStructure.couleurs.forEach((couleur)=> {
        cardStructure.valeurs.forEach((valeur)=>{
                const card = {
                    "valeur": valeur.valeur,
                    "couleur": couleur,
                    "personnage": "",
                    "verbe": "",
                    "objet": "",
                    "lieu": "",
                    "conditions": valeur.conditions
                }
                userCards.cards.push(card);
        });
    });
    try{
        getUserCardsMock().then((data) => {
            console.log("DATA => ", data);
            if(!data){
                const jsonValue = JSON.stringify(userCards);
                AsyncStorage.setItem('@user_Cards', jsonValue);
            }
        })
    } catch(e){
        console.log(e);
    }
    
}

const getUserCardsMock = async() => {
    try{
        const jsonValue = await AsyncStorage.getItem('@user_Cards')
        return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch(e){
        console.log(e);
    }
}

const saveCard = async(userCardsIn, currentCardIndexIn, personnage, verbe, objet, lieu) => {
    try{
        let userCards = {...userCardsIn};
        userCards.cards[currentCardIndexIn].personnage = personnage;
        userCards.cards[currentCardIndexIn].verbe = verbe;
        userCards.cards[currentCardIndexIn].objet = objet;
        userCards.cards[currentCardIndexIn].lieu = lieu;
        const jsonValue = JSON.stringify(userCards);
        await AsyncStorage.setItem('@user_Cards', jsonValue);
    } catch(e){
        console.log(e);
    }
}

const CardService ={
    initCardCreation,
    initCardCreationMock,
    getUserCardsMock,
    saveCard
};

export default CardService;