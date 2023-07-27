import axios from 'axios';

const API = "http://192.168.1.19:3000";

const createGroup = async({title, colortheme, description, image="", userOwner, visibility}) => {
    try {
        return axios.put(`${API}/communitygroup`, {title, colortheme, description, image, userOwner, visibility})
    } catch (error) {
        console.error("Erreur à la création du groupe");
    }
}

const getGroupsFromCurrentUser = async(userId) => {
    try {
        return axios.get(`${API}/users/${userId}/groups`)
    } catch (error) {
        console.error("Erreur à la récupération des groupe de l'user " + userId);
    }
}
const getGroupsByIdFromCurrentUser = async(userId, groupId) => {
    try {
        return axios.get(`${API}/users/${userId}/groups/${groupId}`)
    } catch (error) {
        console.error("Erreur à la récupération du groupe "+ groupId + " de l'user " + userId);
    }
}

const getNbMemberOfGroup = async(groupId) => {
    try {
        return axios.get(`${API}/communitygroup/${groupId}/nbMembers`)
    } catch (error) {
        console.error("Erreur à la récupération du nombre d'utilisateur du groupe "+ groupId);
    }
}

const getGroupUsersByGroupId = async(groupId) => {
    try {
        return axios.get(`${API}/communitygroup/${groupId}/users`)
    } catch (error) {
        console.error("Erreur à la récupération des utilisateurs du groupe "+ groupId);
    }
}

const getGroupsById = async(groupId) => {
    try {
        return axios.get(`${API}/communitygroup/${groupId}`)
    } catch (error) {
        console.error("Erreur à la récupération du groupe de l'user " + userId);
    }
}

const getGroupDiscussion = async(groupId) => {
    try {
        return axios.get(`${API}/communitygroup/${groupId}/discussion`);
    } catch (error) {
        console.error("Erreur à la récupération de la discussion du groupe " + groupId);
    }
}
const sendMessageToGroupDiscussion = async({groupId, userId, message, dateEnvoi}) => {
    try {
        return axios.put(`${API}/communitygroup/${groupId}/discussion`, {idUser: userId, message, dateEnvoi})
    } catch (error) {
        console.error("Erreur à l'envoi du message de la discussion du groupe " + groupId);
    }
}

const CommunityService = {
    createGroup,
    getGroupsFromCurrentUser,
    getGroupsByIdFromCurrentUser,
    getNbMemberOfGroup,
    getGroupUsersByGroupId,
    getGroupsById,
    getGroupDiscussion,
    sendMessageToGroupDiscussion
}

export default CommunityService
