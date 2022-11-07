import cardStructure from "../card-structure.json"
import { DataStore } from '@aws-amplify/datastore';
import { Card } from '../src/models';
import { PackCard } from '../src/models';
import AsyncStorage from '@react-native-async-storage/async-storage';

/**
 * 
 * @param {*} userId 
 */
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

/**
 * 
 * @param {*} userId 
 */
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
            if(!data){
                const jsonValue = JSON.stringify(userCards);
                AsyncStorage.setItem('@user_Cards', jsonValue);
            }
        })
        return userCards;
    } catch(e){
        console.log(e);
    }
    
}
/**
 * 
 * @returns 
 */
const getUserCardsMock = async() => {
    try{
        const jsonValue = await AsyncStorage.getItem('@user_Cards')
        return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch(e){
        console.log(e);
    }
}

/**
 * 
 * @param {*} userCardsIn 
 * @param {*} currentCardIndexIn 
 * @param {*} personnage 
 * @param {*} verbe 
 * @param {*} objet 
 * @param {*} lieu 
 */
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

/**
 * 
 */
const initFamillyProgress = async() => {
    try{
        const famillyProgress = 
            {   
                "carreau": false,
                "coeur": false,
                "trefle": false,          
                "pique": false,
            };
        
        const jsonValue = JSON.stringify(famillyProgress);
        await AsyncStorage.setItem('@user_Familyprogress', jsonValue);
        return famillyProgress;
    } catch(e){
        console.log(e);
    }
}

/**
 * 
 * @returns 
 */
const getFamillyProgress = async() => {
    try{
        const jsonValue = await AsyncStorage.getItem('@user_Familyprogress')
        return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch(e){
        console.log(e);
    }
}
/**
 * 
 * @param {*} famillyProgressIn 
 * @param {*} famillyCard 
 * @param {*} flagFamillyRemplie 
 */
const updateFamillyProgress = async(famillyProgressIn, famillyCard, flagFamillyRemplie) => {
    try{
        let famillyProgress = {...famillyProgressIn};
        if(famillyCard === "carreau") {
            famillyProgress.carreau = flagFamillyRemplie;
        }
        if(famillyCard === "coeur") {
            famillyProgress.coeur = flagFamillyRemplie;
        }
        if(famillyCard === "trefle") {
            famillyProgress.trefle = flagFamillyRemplie;
        }
        if(famillyCard === "pique") {
            famillyProgress.pique = flagFamillyRemplie;
        }
        const jsonValue = JSON.stringify(famillyProgress);
        await AsyncStorage.setItem('@user_Familyprogress', jsonValue);
        return famillyProgress;
    } catch(e){
        console.log(e);
    }
}

const saveProgressionTime = async({timeInSec, famillyPlayed}) => {
    const progress = {
        "time": timeInSec,
        famillyPlayed
    }
    try {
        const jsonValue = await AsyncStorage.getItem('@user_Timeprogress');
        let listTimeProgress = []
        if(jsonValue != null) {
            listTimeProgress = JSON.parse(jsonValue);
            listTimeProgress.push(progress);
        } else {
            listTimeProgress.push(progress);
        }
        const newJsonValue = JSON.stringify(listTimeProgress);
        await AsyncStorage.setItem('@user_Timeprogress', newJsonValue);
    } catch(error) {
        console.log(error);
    }
}

const getProgressionTime = async() => {
    try{
        const jsonValue = await AsyncStorage.getItem('@user_Timeprogress');
        return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch(e){
        console.log(e);
    }
}

const clearAll = async () => {
    try {
      await AsyncStorage.clear()
    } catch(e) {
      // clear error
    }
    console.log('Clear Done.')
  }
const CardService ={
    initCardCreation,
    initCardCreationMock,
    getUserCardsMock,
    saveCard,
    initFamillyProgress,
    getFamillyProgress,
    updateFamillyProgress,
    getProgressionTime,
    saveProgressionTime,
    clearAll
};

export default CardService;