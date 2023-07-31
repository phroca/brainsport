import cardStructure from "../card-structure.json"
import AsyncStorage from '@react-native-async-storage/async-storage';

/**
 * 
 */
 const initCitation = async() => {
    try{
        const data = await getCitation();
        if(data === null || data === false){
            const jsonValue = JSON.stringify(true);
            AsyncStorage.setItem('isAppFirstLaunched', jsonValue)
        }
        return true;
    } catch(e){
        console.log(e);
    }
}

/**
 * 
 * @returns 
 */
const getCitation = async() => {
    try{
        const jsonValue = await AsyncStorage.getItem('isAppFirstLaunched')
        return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch(e){
        console.log(e);
    }
}

const terminateCitation = async() => {
    try{
        const data = await getCitation();
        if(data !== null){
            const jsonValue = JSON.stringify(false);
            AsyncStorage.setItem('isAppFirstLaunched', jsonValue)
        }
        return false;
    } catch(e){
        console.log(e);
    }
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
 */
const initPrePlayData = async() => {
    try{
        const data = await getPrePlayData();
        if(data === null || data === false){
            const jsonValue = JSON.stringify(true);
            AsyncStorage.setItem('@user_PrePlayData', jsonValue)
        }
        return true;
    } catch(e){
        console.log(e);
    }
}

/**
 * 
 * @returns 
 */
const getPrePlayData = async() => {
    try{
        const jsonValue = await AsyncStorage.getItem('@user_PrePlayData')
        return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch(e){
        console.log(e);
    }
}

const terminatePreplayData = async() => {
    try{
        const data = await getPrePlayData();
        if(data !== null){
            const jsonValue = JSON.stringify(false);
            AsyncStorage.setItem('@user_PrePlayData', jsonValue)
        }
        return false;
    } catch(e){
        console.log(e);
    }
}

/**
 * 
 */
const initPrePlayHintData = async() => {
    try{
        const data = await getPrePlayData();
        if(data === null || data === false){
            const jsonValue = JSON.stringify(false);
            AsyncStorage.setItem('@user_PrePlayHintData', jsonValue)
        }
        return false;
    } catch(e){
        console.log(e);
    }
}
/**
 * 
 */
const activatePrePlayHintData = async() => {
    try{
        const data = await getPrePlayData();
        if(data !== null){
            const jsonValue = JSON.stringify(true);
            AsyncStorage.setItem('@user_PrePlayHintData', jsonValue)
        }
        return true;
    } catch(e){
        console.log(e);
    }
}


const updatePrePlayHintData = async(value) => {
    try{
        const data = await getStepperBeforePlay();
        if(data !== null){
            const jsonValue = JSON.stringify(value);
            await AsyncStorage.setItem('@user_PrePlayHintData', jsonValue)
            return data;
        }
    } catch(e){
        console.log(e);
    }
}

/**
 * 
 * @returns 
 */
const getPrePlayHintData = async() => {
    try{
        const jsonValue = await AsyncStorage.getItem('@user_PrePlayHintData')
        return jsonValue != null ? JSON.parse(jsonValue) : false;
    } catch(e){
        console.log(e);
    }
}

const terminatePreplayHintData = async() => {
    try{
        const data = await getPrePlayData();
        if(data !== null){
            const jsonValue = JSON.stringify(false);
            AsyncStorage.setItem('@user_PrePlayHintData', jsonValue)
        }
        return false;
    } catch(e){
        console.log(e);
    }
}

const initStepperBeforePlay = async() => {
    try{
        const dataInit = {
            "initHomeScreen": true,
            "initCardAssociation": true,
            "initPrePlay": true,
            "initPlayGame": true
        }

        const jsonValue = JSON.stringify(dataInit);
        await AsyncStorage.setItem('@user_StepperData', jsonValue)
        return dataInit;
    } catch(e){
        console.log(e);
    }
}


const updateStepperBeforePlay = async(step, value) => {
    try{
        let data = await getStepperBeforePlay();
        if(data !== null){
            data[step] = value;
            const jsonValue = JSON.stringify(data);
            await AsyncStorage.setItem('@user_StepperData', jsonValue)
            return data;
        }
    } catch(e){
        console.log(e);
    }
}

/**
 * 
 * @returns 
 */
const getStepperBeforePlay = async() => {
    try{
        const jsonValue = await AsyncStorage.getItem('@user_StepperData')
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


const saveCardFromFamilly = async(userCardFammily, currentCardIndexIn, personnage, verbe, objet, lieu) => {
    try{
        let userCards = await getUserCardsMock();
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
                "coeur": {
                    "eightFirstCardFilled": false,
                    "allCardFilled": false
                },
                "carreau": {
                    "eightFirstCardFilled": undefined,
                    "allCardFilled": undefined
                },
                "trefle": {
                    "eightFirstCardFilled": undefined,
                    "allCardFilled": undefined
                },          
                "pique": {
                    "eightFirstCardFilled": undefined,
                    "allCardFilled": undefined
                },
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
const updateFamillyProgress = async(famillyProgressIn, famillyCard, stringTypeCardFilled, flagFamillyRemplie) => {
    try{
        let famillyProgress = {...famillyProgressIn};
        if(famillyCard === "carreau") {
            famillyProgress.carreau[stringTypeCardFilled] = flagFamillyRemplie;
        }
        if(famillyCard === "coeur") {
            famillyProgress.coeur[stringTypeCardFilled] = flagFamillyRemplie;
        }
        if(famillyCard === "trefle") {
            famillyProgress.trefle[stringTypeCardFilled] = flagFamillyRemplie;
        }
        if(famillyCard === "pique") {
            famillyProgress.pique[stringTypeCardFilled] = flagFamillyRemplie;
        }
        const jsonValue = JSON.stringify(famillyProgress);
        await AsyncStorage.setItem('@user_Familyprogress', jsonValue);
        return famillyProgress;
    } catch(e){
        console.log(e);
    }
}

// TODO 
// Enlever famillyplayed : deprecated
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

const saveProgressionHistoryTime = async({timeInSec, userCards}) => {
    const progress = {
        "time": timeInSec,
        userCards
    }
    try {
        const jsonValue = await AsyncStorage.getItem('@user_HistoryTimeprogress');
        let listTimeProgress = []
        if(jsonValue != null) {
            listTimeProgress = JSON.parse(jsonValue);
            listTimeProgress.push(progress);
        } else {
            listTimeProgress.push(progress);
        }
        const newJsonValue = JSON.stringify(listTimeProgress);
        await AsyncStorage.setItem('@user_HistoryTimeprogress', newJsonValue);
    } catch(error) {
        console.log(error);
    }
}

const getProgressionHistoryTime = async() => {
    try{
        const jsonValue = await AsyncStorage.getItem('@user_HistoryTimeprogress');
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

const clearPregameData = async() => {
    try {
        await AsyncStorage.removeItem("@user_PrePlayData");
    } catch (error) {
        
    }

    console.log('Clear Done.')
}


const saveCardsToLocalStorage = async(userCards) => {
    try{
        const jsonValue = JSON.stringify(userCards);
        AsyncStorage.setItem('@user_Cards', jsonValue);
    } catch(e){
        console.log(e);
    }
    
}
const saveFamillyProgressToLocalStorage = async(famillyProgress) => {
    try{
        const jsonValue = JSON.stringify(famillyProgress);
        await AsyncStorage.setItem('@user_Familyprogress', jsonValue);
    } catch(e){
        console.log(e);
    }
    
}
const saveStepperDataToLocalStorage = async(stepperData) => {
    try{
        const jsonValue = JSON.stringify(stepperData);
        await AsyncStorage.setItem('@user_StepperData', jsonValue)
    } catch(e){
        console.log(e);
    }
    
}

const CardService ={
    initCitation,
    getCitation,
    terminateCitation,
    initCardCreationMock,
    getUserCardsMock,
    getPrePlayData,
    initPrePlayData,
    terminatePreplayData,
    initPrePlayHintData,
    activatePrePlayHintData,
    updatePrePlayHintData,
    getPrePlayHintData,
    terminatePreplayHintData,
    initStepperBeforePlay,
    getStepperBeforePlay,
    updateStepperBeforePlay,
    saveCard,
    saveCardFromFamilly,
    initFamillyProgress,
    getFamillyProgress,
    updateFamillyProgress,
    getProgressionTime,
    saveProgressionTime,
    saveProgressionHistoryTime,
    getProgressionHistoryTime,
    saveCardsToLocalStorage,
    saveFamillyProgressToLocalStorage,
    saveStepperDataToLocalStorage,
    clearPregameData,
    clearAll
};

export default CardService;