import axios from 'axios';

const API = "https://back.brainsport.xyz";
//const API = "http://192.168.1.19:3000";

const createGroup = async ({ title, colortheme, description, image = "", userOwner, visibility }) => {
    try {
        return axios.put(`${API}/communitygroup`, { title, colortheme, description, image, userOwner, visibility })
    } catch (error) {
        console.error("Erreur à la création du groupe");
    }
}

/*Récupère les groupes validé */
const getGroupsFromCurrentUser = async (userId) => {
    try {
        return axios.get(`${API}/users/${userId}/groups`)
    } catch (error) {
        console.error("Erreur à la récupération des groupe de l'user " + userId);
    }
}
/*Récupère les groupes en attente */
const getWaitingGroupsFromCurrentUser = async (userId) => {
    try {
        return axios.get(`${API}/users/${userId}/waitingGroups`)
    } catch (error) {
        console.error("Erreur à la récupération des groupe en attente de l'user " + userId);
    }
}
const getGroupsByIdFromCurrentUser = async (userId, groupId) => {
    try {
        return axios.get(`${API}/users/${userId}/groups/${groupId}`)
    } catch (error) {
        console.error("Erreur à la récupération du groupe " + groupId + " de l'user " + userId);
    }
}

const getNbMemberOfGroup = async (groupId) => {
    try {
        return axios.get(`${API}/communitygroup/${groupId}/nbMembers`)
    } catch (error) {
        console.error("Erreur à la récupération du nombre d'utilisateur du groupe " + groupId);
    }
}

const getGroupUsersByGroupId = async (groupId) => {
    try {
        return axios.get(`${API}/communitygroup/${groupId}/users`)
    } catch (error) {
        console.error("Erreur à la récupération des utilisateurs du groupe " + groupId);
    }
}

const getPublicGroupNotRegistered = async (userId) => {
    try {
        return axios.get(`${API}/communitygroup/user/${userId}/publicGroup`)
    } catch (error) {
        console.error("Erreur à la récupération des groupes publics ");
    }
}

const joinPublicGroup = async (groupId, userId) => {
    try {
        return axios.put(`${API}/communitygroup/${groupId}/users/${userId}`)
    } catch (error) {
        console.error("Erreur à rejoindre le groupe public " + groupId);
    }
}
const joinPrivateGroup = async (groupId, userId) => {
    try {
        return axios.post(`${API}/communitygroup/privateGroup/${groupId}/users/${userId}`)
    } catch (error) {
        console.error("Erreur à rejoindre le groupe privé " + groupId);
    }
}
const declineOrDeletePrivateGroup = async (groupUserId) => {
    try {
        return axios.delete(`${API}/communitygroup/deleteInvitation/${groupUserId}`)
    } catch (error) {
        console.error("Erreur à la suppression de l'invitation du groupe " + groupId);
    }
}

const inviteFriendToPrivateGroup = async (groupId, userId) => {
    try {
        return axios.put(`${API}/communitygroup/${groupId}/add/${userId}`)
    } catch (error) {
        console.error("Erreur à rejoindre le user" + userId + " au groupe privé " + groupId);
    }
}

const getGroupsById = async (groupId) => {
    try {
        return axios.get(`${API}/communitygroup/${groupId}`)
    } catch (error) {
        console.error("Erreur à la récupération du groupe de l'user " + userId);
    }
}

const getGroupDiscussion = async (groupId) => {
    try {
        return axios.get(`${API}/communitygroup/${groupId}/discussion`);
    } catch (error) {
        console.error("Erreur à la récupération de la discussion du groupe " + groupId);
    }
}
const sendMessageToGroupDiscussion = async ({ groupId, userId, message, dateEnvoi }) => {
    try {
        return axios.put(`${API}/communitygroup/${groupId}/discussion`, { idUser: userId, message, dateEnvoi })
    } catch (error) {
        console.error("Erreur à l'envoi du message de la discussion du groupe " + groupId);
    }
}

const CommunityService = {
    createGroup,
    getGroupsFromCurrentUser,
    getWaitingGroupsFromCurrentUser,
    getGroupsByIdFromCurrentUser,
    getNbMemberOfGroup,
    getGroupUsersByGroupId,
    getPublicGroupNotRegistered,
    joinPublicGroup,
    joinPrivateGroup,
    declineOrDeletePrivateGroup,
    inviteFriendToPrivateGroup,
    getGroupsById,
    getGroupDiscussion,
    sendMessageToGroupDiscussion
}

export default CommunityService
