import cardStructure from "../card-structure.json"
import axios from 'axios';
import CommunityService from "./Community.service";

const API = "http://13.38.100.228:3000";
//const API = "http://192.168.1.19:3000";
const headers = { headers: { 'Content-Type': 'application/json' } };


const showAPIURL = () => {
    return API;
}

const getUsersByChar = async (char) => {
    try {
        return axios.get(API + "/users/byChar/" + char);
    } catch (error) {
        console.error("ERREUR", error)
    }
}
const saveUser = async ({ userId = "", email = "", firstName = "", lastName = "", birthDate = new Date().getTime(), phoneNumber = "", bio = "", colorProfil = "#000000", rewardPoints = 0, address = "", zipCode = "", city = "", region = "" }) => {
    try {
        return axios.put(API + "/users", { userId, email, firstName, lastName, birthDate, phoneNumber, bio, colorProfil, rewardPoints, address, zipCode, city, region });
    } catch (error) {
        console.error("ERREUR", error)
    }
}
const updateUser = async ({ userId, email, firstName, lastName, birthDate, phoneNumber, bio, colorProfil, rewardPoints, address, zipCode, city, region }) => {
    try {
        return axios.post(API + "/users/" + userId, { email, firstName, lastName, birthDate, phoneNumber, bio, colorProfil, rewardPoints, address, zipCode, city, region });
    } catch (error) {
        console.error("ERREUR", error)
    }
}

const getRewardPointsForUser = async (userId) => {
    try {
        return axios.get(API + "/users/" + userId + "/rewardPoints");
    } catch (error) {
        console.error("ERREUR", error);
    }

}
const incrementRewardPointsForUser = async (userId, rewardPoints) => {
    try {
        const currentAwardPoints = await getRewardPointsForUser(userId);
        const newCurrentAwardPoints = currentAwardPoints.data[0].rewardPoints + rewardPoints;
        return axios.post(API + "/users/" + userId + "/rewardPoints", { rewardPoints: newCurrentAwardPoints });
    } catch (error) {
        console.error("ERREUR", error);
    }

}


const updateRewardPointsForUser = async (userId, rewardPoints) => {
    try {
        return axios.post(API + "/users/" + userId + "/rewardPoints", { rewardPoints });
    } catch (error) {
        console.error("ERREUR", error);
    }

}

const getUserByUserId = async (userId) => {
    try {
        return axios.get(API + "/users/" + userId, headers);
    } catch (error) {
        console.error("ERREUR", error)
    }
}

const fetchGetUserByUserID = async (userId) => {
    const options = {
        method: 'GET',
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        }
    }
    try {
        return fetch(API + "/users/" + userId, options);
    } catch (error) {
        console.error("ERREUR", error)
    }
}


const getDataCard = async (userId) => {
    try {
        return axios.get(API + "/userdatacard/" + userId);
    } catch (error) {
        console.error("ERREUR", error);
    }

}

const saveOneCard = async (userCardsIn, currentCardIndexIn, personnage, verbe, objet, lieu) => {
    try {
        let userCards = { ...userCardsIn };
        userCards.cards[currentCardIndexIn].personnage = personnage;
        userCards.cards[currentCardIndexIn].verbe = verbe;
        userCards.cards[currentCardIndexIn].objet = objet;
        userCards.cards[currentCardIndexIn].lieu = lieu;
        const jsonValue = JSON.stringify(userCards.cards);
        return axios.post(API + "/userdatacard/" + userCards.userId, { cards: jsonValue });
    } catch (error) {
        console.error("ERREUR", error);
    }

}
const saveDataCard = async (userId) => {
    try {
        const userCards = { userId: userId, cards: [] };
        cardStructure.couleurs.forEach((couleur) => {
            cardStructure.valeurs.forEach((valeur) => {
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
        const dataCardForUser = await getDataCard(userId);
        if (dataCardForUser?.data.length === 0) {
            const userDatacard = JSON.stringify(userCards.cards);
            return axios.put(API + "/userdatacard", { userId, cards: userDatacard });
        }

    } catch (error) {
        console.error("ERREUR", error);
    }

}
const saveDataCardFromLocal = async ({ userId, userDatacard }) => {
    try {
        return axios.put(API + "/userdatacard", { userId, cards: userDatacard });
    } catch (error) {
        console.error("ERREUR", error);
    }

}

const getUserStepperData = async (userId) => {
    try {
        return axios.get(API + "/userstepperdata/" + userId);
    } catch (error) {
        console.error("ERREUR", error);
    }

}
const saveUserStepperData = async ({ userId, initHomeScreen = true, initCardAssociation = true, initPrePlay = true, initPlayGame = true, prePlayHint = false, prePlayData = true }) => {
    try {
        return axios.put(API + "/userstepperdata", { userId, initHomeScreen, initCardAssociation, initPrePlay, initPlayGame, prePlayHint, prePlayData })
    } catch (error) {
        console.error("ERREUR", error);
    }

}
/**
 * UPDATE STEPPER DATAS
 * 
 */


const updateInitCardAssociation = async ({ userId, initCardAssociation }) => {
    try {
        return axios.post(`${API}/userstepperdata/${userId}/initCardAssociation`, { initCardAssociation })
    } catch (error) {
        console.error("ERREUR", error);
    }

}
const updateInitHomeScreen = async ({ userId, initHomeScreen }) => {
    try {
        return axios.post(`${API}/userstepperdata/${userId}/initHomeScreen`, { initHomeScreen })
    } catch (error) {
        console.error("ERREUR", error);
    }

}
const updateInitPrePlay = async ({ userId, initPrePlay }) => {
    try {
        return axios.post(`${API}/userstepperdata/${userId}/initPrePlay`, { userId, initPrePlay })
    } catch (error) {
        console.error("ERREUR", error);
    }

}

const updateInitPlayGame = async ({ userId, initPlayGame }) => {
    try {
        return axios.post(`${API}/userstepperdata/${userId}/initPlayGame`, { initPlayGame })
    } catch (error) {
        console.error("ERREUR", error);
    }

}

const updatePrePlayHint = async ({ userId, prePlayHint }) => {
    try {
        return axios.post(`${API}/userstepperdata/${userId}/prePlayHint`, { prePlayHint })
    } catch (error) {
        console.error("ERREUR", error);
    }

}
const updatePrePlayData = async ({ userId, prePlayData }) => {
    try {
        return axios.post(`${API}/userstepperdata/${userId}/prePlayData`, { prePlayData })
    } catch (error) {
        console.error("ERREUR", error);
    }

}

const getUserFamillyProgressData = async (userId) => {
    try {
        return axios.get(API + "/userfamillyprogress/" + userId);
    } catch (error) {
        console.error("ERREUR", error);
    }

}
const saveUserFamillyProgressData = async (userId) => {
    try {
        const famillyProgressObj =
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
        const famillyProgress = JSON.stringify(famillyProgressObj);
        console.log({ userId, famillyProgress });
        return axios.put(API + "/userfamillyprogress", { userId, famillyProgress })
    } catch (error) {
        console.error("ERREUR", error);
    }

}
const saveUserFamillyProgressDataFromLocal = async ({ userId, famillyProgress }) => {
    try {
        return axios.put(API + "/userfamillyprogress", { userId, famillyProgress })
    } catch (error) {
        console.error("ERREUR", error);
    }

}

const updateUserFamillyProgress = async (userId, famillyProgressIn, famillyCard, stringTypeCardFilled, flagFamillyRemplie) => {
    try {
        let famillyProgress = { ...famillyProgressIn };
        if (famillyCard === "carreau") {
            famillyProgress.carreau[stringTypeCardFilled] = flagFamillyRemplie;
        }
        if (famillyCard === "coeur") {
            famillyProgress.coeur[stringTypeCardFilled] = flagFamillyRemplie;
        }
        if (famillyCard === "trefle") {
            famillyProgress.trefle[stringTypeCardFilled] = flagFamillyRemplie;
        }
        if (famillyCard === "pique") {
            famillyProgress.pique[stringTypeCardFilled] = flagFamillyRemplie;
        }
        const jsonValue = JSON.stringify(famillyProgress);
        return axios.post(`${API}/userfamillyprogress/${userId}`, { famillyProgress: jsonValue })

    } catch (e) {
        console.log(e);
    }
}

const getUserRankAndNumberUsers = async (userId) => {
    try {
        return axios.get(`${API}/users/${userId}/rank`);
    } catch (error) {
        console.error("Erreur à la récupération du rank de l'user " + userId);
    }
}

const saveProgressionTime = async ({ userId, typePlay, time, datePlayed, errorNumber = 0 }) => {
    try {
        return axios.put(`${API}/userplayhistory/`, { userId, typePlay, time, datePlayed, errorNumber });
    } catch (error) {
        console.error("Erreur à la sauvegarde du temps de l'user" + userId);
    }
}

const getProgressionTime = async (userId) => {
    try {
        return axios.get(`${API}/userplayhistory/${userId}`);
    } catch (error) {
        console.error("Erreur à la récupération des temps de l'user " + userId);
    }
}


const getListOfRewards = async () => {
    try {
        return axios.get(`${API}/progresspointdata`);
    } catch (error) {
        console.error("Erreur à la récupération des temps de l'user " + userId);
    }
}
const getRewardsData = async () => {
    try {
        return axios.get(`${API}/rewardsdata`);
    } catch (error) {
        console.error("Erreur à la récupération des temps de l'user " + userId);
    }
}

const getUserFriends = async (userId, state = "VALIDATED") => {
    try {
        return axios.get(`${API}/userfriends/${userId}/state/${state}`);
    } catch (error) {
        console.error("Erreur à la récupération de la liste des amis de l'user " + userId);
    }
}

const getNbNotifs = async (userId) => {
    let nbNotif = 0;
    const friendsNotifs = await getFriendsWhoAddedCurrentUser(userId, "WAITING");
    const groupNotifs = await CommunityService.getWaitingGroupsFromCurrentUser(userId);
    nbNotif = friendsNotifs?.data.length + groupNotifs?.data.length;
    return nbNotif;
}

const getFriendsWhoAddedCurrentUser = async (userId, state = "VALIDATED") => {
    try {
        return axios.get(`${API}/userfriends/addedUser/${userId}/state/${state}`);
    } catch (error) {
        console.error("Erreur à la récupération de la liste d'attente d'amis de l'user " + userId);
    }
}

const verifyFriend = async (userId, userFriendId) => {
    try {
        return axios.get(`${API}/userfriends/${userId}/verify/${userFriendId}`);
    } catch (error) {
        console.error("Erreur à la récupération de l'ami " + userFriendId + " de l'user " + userId);
    }
}
const verifyFriendWhoWantToBeAdded = async (userId, userFriendId) => {
    try {
        return axios.get(`${API}/userfriends/addedUser/${userId}/verify/${userFriendId}`);
    } catch (error) {
        console.error("Erreur à la récupération de la vérification de l'ajout de l'ami " + userFriendId + " pour l'user " + userId);
    }
}
const addFriendRequest = async (userId, userFriendId) => {
    try {
        return axios.put(`${API}/userfriends/${userId}/add/${userFriendId}`);
    } catch (error) {
        console.error("Erreur à l'ajout d'amis de l'user " + userId);
    }
}

const validateFriendRequest = async (userId, userFriendId) => {
    try {
        return axios.post(`${API}/userfriends/${userId}/update/${userFriendId}`);
    } catch (error) {
        console.error("Erreur à la validation d'ajout d'amis de l'user " + userId);
    }
}
const rejectOrDeleteFriend = async (userId, userFriendId) => {
    try {
        return axios.delete(`${API}/userfriends/${userId}/delete/${userFriendId}`);
    } catch (error) {
        console.error("Erreur à la suppression d'un ami de l'user " + userId);
    }
}
const rejectOrDeleteFriendById = async (friendLineId) => {
    try {
        return axios.delete(`${API}/userfriends/byId/${friendLineId}`);
    } catch (error) {
        console.error("Erreur à la suppression d'un ami de l'user à la ligne" + friendLineId);
    }
}

const clearAll = async (userId) => {
    try {

    } catch (error) {
        console.error("Erreur à la réinitialisation complète des données de l'user" + userId);
    }
}

const UserService = {
    getUsersByChar,
    saveUser,
    updateUser,
    getRewardPointsForUser,
    incrementRewardPointsForUser,
    updateRewardPointsForUser,
    getUserByUserId,
    getDataCard,
    saveDataCard,
    saveDataCardFromLocal,
    saveOneCard,
    getUserStepperData,
    updateInitCardAssociation,
    updateInitHomeScreen,
    updateInitPlayGame,
    updateInitPrePlay,
    updatePrePlayHint,
    updatePrePlayData,
    saveUserStepperData,
    updateUserFamillyProgress,
    getUserFamillyProgressData,
    saveUserFamillyProgressData,
    saveUserFamillyProgressDataFromLocal,
    getUserRankAndNumberUsers,
    saveProgressionTime,
    getProgressionTime,
    getListOfRewards,
    getRewardsData,
    getUserFriends,
    getNbNotifs,
    getFriendsWhoAddedCurrentUser,
    verifyFriend,
    verifyFriendWhoWantToBeAdded,
    addFriendRequest,
    validateFriendRequest,
    rejectOrDeleteFriend,
    rejectOrDeleteFriendById,
    clearAll,
    showAPIURL,
    fetchGetUserByUserID
}

export default UserService
