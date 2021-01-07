import axios from "axios";

export default {
  getSessionUser() {
    return axios.get(`/api/user`);
  },
  getUserDetails(id) {
    return axios.get(`/api/user/${id}`);
  },
  checkPassword(password) {
    return axios.post(`/api/user/checkpassword`, { password: password });
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
  getAllUsers() {
    return axios.get(`/api/user/all`);
  },
  findOneUserByName(username) {
    return axios.post(`/api/user/findone`, username);
  },
  getTopScorers() {
    return axios.get(`/api/user/topscorers`);
  },
  getTopScorersByPropertyName(property) {
    return axios.post(`/api/user/topscorersbypropertyname`, property);
  },
  addCharacterToRoster(id, characterId) {
    return axios.put(`/api/user/roster/add/${id}`, characterId);
  },
  removeCharacterFromRoster(id, characterId) {
    return axios.put(`/api/user/roster/remove/${id}`, characterId);
  },
  addManyCharactersToRoster(id, characterObjects) {
    return axios.put(`/api/user/roster/addmany/${id}`, {
      ids: characterObjects,
    });
  },
  removeManyCharactersFromRoster(id, characterIds) {
    return axios.put(`/api/user/roster/removemany/${id}`, {
      ids: characterIds,
    });
  },
  addToTeam(id, characterId) {
    return axios.put(`/api/user/team/add/${id}`, { characterId: characterId });
  },
  removeFromTeam(id, characterId) {
    return axios.put(`/api/user/team/remove/${id}`, {
      characterId: characterId,
    });
  },
  emptyTeam(id) {
    return axios.put(`/api/user/team/empty/${id}`);
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
