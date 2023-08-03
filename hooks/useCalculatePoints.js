import UserService from "../services/User.service"

export const useCalculatePoints = async(userId)=> {

        let points = 0;
        const rewardsData = await UserService.getRewardsData();
        let rewardDataObj = {
            "REAL": 0,
            "TRAINING": 0
        }

        const rewardsDataResponse = rewardsData.data;
        rewardsDataResponse.forEach(elt => {
            if(elt.type === "REAL") rewardDataObj.REAL = elt.points;
            if(elt.type === "TRAINING") rewardDataObj.TRAINING = elt.points;

        })
        /*CALCUL DU NOMBRE DE CARTES ENREGISTRES */
        const userDataCard = await UserService.getDataCard(userId);
        const userDataCardResponseParsed = JSON.parse(userDataCard.data[0].cards);
        const pointForNbCards = userDataCardResponseParsed.length * 5;

        /* CALCUL DES ETAPES DE FAMILLES DE PROGESSION TERMINEES */
        const userFamillyProgress = await UserService.getUserFamillyProgressData(userId);
        const userFamillyProgressResponseParsed = JSON.parse(userFamillyProgress.data[0].famillyProgress);
        let pointForFamillyProgressAchieved = 0;
        if(userFamillyProgressResponseParsed.carreau.eightFirstCardFilled === true) {
            pointForFamillyProgressAchieved +=  5;
        }
        if(userFamillyProgressResponseParsed.carreau.allCardFilled === true) {
            pointForFamillyProgressAchieved +=  5;
        }
        if(userFamillyProgressResponseParsed.coeur.eightFirstCardFilled === true) {
            pointForFamillyProgressAchieved +=  5;
        }
        if(userFamillyProgressResponseParsed.coeur.allCardFilled === true) {
            pointForFamillyProgressAchieved +=  5;
        }
        if(userFamillyProgressResponseParsed.trefle.eightFirstCardFilled === true) {
            pointForFamillyProgressAchieved +=  5;
        }
        if(userFamillyProgressResponseParsed.trefle.allCardFilled === true) {
            pointForFamillyProgressAchieved +=  5;
        }
        if(userFamillyProgressResponseParsed.pique.eightFirstCardFilled === true) {
            pointForFamillyProgressAchieved +=  5;
        }
        if(userFamillyProgressResponseParsed.pique.allCardFilled === true) {
            pointForFamillyProgressAchieved +=  5;
        }
        /* CALCUL DES ENTRAINEMENTS ET DES JEUX */
        const userPlayHistory = await UserService.getProgressionTime(userId);
        const userListPlayHistoryResponse = userPlayHistory.data;
        let pointForPlayHistory = 0;
        userListPlayHistoryResponse.forEach(element => {
            const userPlayHistoryResponseParsed = JSON.parse(element.typePlay);
            const pointsForType = rewardDataObj[userPlayHistoryResponseParsed.type];
            const pointsForNumberCardsPlayed = userPlayHistoryResponseParsed.nbCards * 5;
            const pointsForTime = typeplay.type === "TRAINING" ? calculatePointByTimeinTraining(time) : calculatePointByTimeinReal(time);
            const pointTotalForLine = pointsForType + pointsForNumberCardsPlayed + pointsForTime;
            pointForPlayHistory += pointTotalForLine;

        })

        /*CALCUL FINAL */
        points = pointForNbCards + pointForFamillyProgressAchieved + pointForPlayHistory;
        return points;  
};

export const useCalculatePlayPoints = async(typeplay, time) =>  {
    let points = 0;
    const rewardsData = await UserService.getRewardsData();
    let rewardDataObj = {
        "REAL": 0,
        "TRAINING": 0
    }

    const rewardsDataResponse = rewardsData.data;
    rewardsDataResponse.forEach(elt => {
        if(elt.type === "REAL") rewardDataObj.REAL = elt.points;
        if(elt.type === "TRAINING") rewardDataObj.TRAINING = elt.points;
    })


     const pointsForType = rewardDataObj[typeplay.type];
     const pointsForNumberCardsPlayed = typeplay.nbCards * 5;
     const pointsForTime = typeplay.type === "TRAINING" ? calculatePointByTimeinTraining(time) : calculatePointByTimeinReal(time);
     points = pointsForType + pointsForNumberCardsPlayed + pointsForTime;
     return points;
} 


const calculatePointByTimeinTraining = (timeInSecond) => {
    if(timeInSecond >= 1200) return 50
    if(timeInSecond < 1200 && timeInSecond > 1020)return 100
    if(timeInSecond < 1020 && timeInSecond > 900)return 200
    if(timeInSecond < 900 && timeInSecond > 780)return 300
    if(timeInSecond < 780 && timeInSecond > 660)return 400
    if(timeInSecond < 660 && timeInSecond > 600)return 500
    if(timeInSecond < 600 && timeInSecond > 480)return 600
    if(timeInSecond < 480 && timeInSecond > 420)return 700
    if(timeInSecond < 420 && timeInSecond > 360 )return 800
    if(timeInSecond < 360 && timeInSecond > 300 )return 900
    if(timeInSecond <= 300) return 1000
}
const calculatePointByTimeinReal = (timeInSecond) => {
    if(timeInSecond >= 1200) return 100
    if(timeInSecond < 1200 && timeInSecond > 1020)return 200
    if(timeInSecond < 1020 && timeInSecond > 900)return 300
    if(timeInSecond < 900 && timeInSecond > 780)return 400
    if(timeInSecond < 780 && timeInSecond > 660)return 500
    if(timeInSecond < 660 && timeInSecond > 600)return 700
    if(timeInSecond < 600 && timeInSecond > 480)return 900
    if(timeInSecond < 480 && timeInSecond > 420)return 1200
    if(timeInSecond < 420 && timeInSecond > 360 )return 1500
    if(timeInSecond < 360 && timeInSecond > 300 )return 2000
    if(timeInSecond <= 300) return 3000
}