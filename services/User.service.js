import cardStructure from "../card-structure.json"
import axios from 'axios';

const API = "http://192.168.1.19:3000";





const saveUser = async({userId= "", email = "", firstName = "", lastName= "", birthDate = new Date().getTime(), phoneNumber ="", address= "", zipCode = "", city= "", region= ""}) => {
    try{
        return axios.put(API + "/users", {userId, email, firstName, lastName, birthDate, phoneNumber, address, zipCode, city, region});
    } catch (error) {
        console.error("ERREUR", error)
    }
}

const getUserByUserId = async(userId) => {
    try{
        return axios.get(API + "/users/"+ userId);
    } catch (error) {
        console.error("ERREUR", error)
    }
}


const getDataCard = async(userId) => {
    try {
        return axios.get(API + "/userdatacard/" + userId);
    } catch (error) {
        console.error("ERREUR", error);
    }
        
}
const saveDataCard = async({userId, userDatacard}) => {
    try {
        return axios.put(API + "/userdatacard", {userId, cards: userDatacard})
    } catch (error) {
        console.error("ERREUR", error);
    }
        
}

const getUserStepperData = async(userId) => {
    try {
        return axios.get(API + "/userstepperdata/" + userId);
    } catch (error) {
        console.error("ERREUR", error);
    }
        
}
const saveUserStepperData = async({userId, initHomeScreen, initCardAssociation, initPrePlay, initPlayGame}) => {
    try {
        return axios.put(API + "/userstepperdata", {userId, initHomeScreen, initCardAssociation, initPrePlay, initPlayGame})
    } catch (error) {
        console.error("ERREUR", error);
    }
        
}

const getUserFamillyProgressData = async(userId) => {
    try {
        return axios.get(API + "/userfamillyprogress/" + userId);
    } catch (error) {
        console.error("ERREUR", error);
    }
        
}
const saveUserFamillyProgressData = async({userId, famillyProgress}) => {
    try {
        return axios.put(API + "/userfamillyprogress", {userId, famillyProgress})
    } catch (error) {
        console.error("ERREUR", error);
    }
        
}

const getUserRankAndNumberUsers = async(userId) => {
    try{
        return axios.get(`${API}/users/${userId}/rank`);
    } catch (error) {
        console.error("Erreur à la récupération du rank de l'user " + userId);
    }
}

const UserService = {
    saveUser,
    getUserByUserId,
    getDataCard,
    saveDataCard,
    getUserStepperData,
    saveUserStepperData,
    getUserFamillyProgressData,
    saveUserFamillyProgressData,
    getUserRankAndNumberUsers
}

export default UserService
