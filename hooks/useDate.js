export const useChallengeDate = (dateDebut, dateFin) => {
    const dateNow = new Date();
    const dateDepart = new Date(dateDebut)
    const dateArrivee = new Date(dateFin)
    if(dateNow > dateArrivee) return "challenge terminé";
    if(dateNow < dateDepart) {
        const diffTime = dateDepart.getTime() - dateNow.getTime();
        const diffInDays = Math.trunc(diffTime / (1000 * 3600 * 24));
        return "commence dans " + diffInDays + "jours"
    }
    if(dateNow > dateDepart && dateNow < dateArrivee) {
        const diffTime = dateArrivee.getTime() - dateNow.getTime();
        const diffInDays = Math.trunc(diffTime / (1000 * 3600 * 24));
        return "termine dans " + diffInDays + " jours"
    }
};

export const useEventDate = (dateEvent) =>{
    const dateNow = new Date();
    const date = new Date(dateEvent);
    if(dateNow > date) return "évènement terminé";
    if(dateNow < date) {
        const diffTime = date.getTime() - dateNow.getTime();
        const diffInDays = Math.trunc(diffTime / (1000 * 3600 * 24));
        return "commence dans " + diffInDays + "jours"
    }
};