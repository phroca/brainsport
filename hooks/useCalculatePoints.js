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
            const pointTotalForLine = pointsForType + pointsForNumberCardsPlayed;
            pointForPlayHistory += pointTotalForLine;

        })

        /*CALCUL FINAL */
        points = pointForNbCards + pointForFamillyProgressAchieved + pointForPlayHistory;
        return points;

    
}