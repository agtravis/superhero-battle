import axios from "axios";

export default {
  getSessionUser() {
    return axios.get(`/api/user`);
  },
  getUserDetails(id) {
    return axios.get(`/api/user/${id}`);
  },
  logIn(userCredentials) {
    return axios.post(`/api/user/login`, userCredentials);
  },
  logOut() {
    return axios.post(`/api/user/logout`);
  },
  newUser(signUpDetails) {
    return axios.post(`/api/user`, signUpDetails);
  },
  addCharacterToRoster(id, characterId) {
    return axios.put(`/api/user/roster/add/${id}`, characterId);
  },
  removeCharacterFromRoster(id, characterId) {
    return axios.put(`/api/user/roster/remove/${id}`, characterId);
  },
  addManyCharactersToRoster(id, characterIds) {
    return axios.put(`/api/user/roster/addmany/${id}`, { ids: characterIds });
  },
  removeManyCharactersFromRoster(id, characterIds) {
    return axios.put(`/api/user/roster/removemany/${id}`, {
      ids: characterIds,
    });
  },
  lose(id) {
    return axios.put(`/api/user/lose/${id}`);
  },
  win(id) {
    return axios.put(`/api/user/win/${id}`);
  },
  prestige(id) {
    return axios.put(`/api/user/prestige/${id}`);
  },
  logBattle(id, battle) {
    return axios.put(`api/user/logbattle/${id}`, { battle: battle });
  },
};
