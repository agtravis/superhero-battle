import axios from "axios";

export default {
  addCharacterToRoster(id, characterId) {
    return axios.put(`/api/user/roster/add/${id}`, characterId);
  },
  addManyCharactersToRoster(id, characterIds) {
    return axios.put(`/api/user/roster/addmany/${id}`, {
      ids: characterIds,
    });
  },
  addManyCharactersToTeam(id, members) {
    return axios.put(`/api/user/team/addmany/${id}`, {
      characters: members,
    });
  },
  addToTeam(id, characterId) {
    return axios.put(`/api/user/team/add/${id}`, { characterId: characterId });
  },
  changePassword(user) {
    return axios.post(`/api/user/changepassword`, {
      id: user.id,
      password: user.newPassword,
    });
  },
  checkPassword(user) {
    return axios.post(`/api/user/checkpassword`, user);
  },
  emptyTeam(id) {
    return axios.put(`/api/user/team/empty/${id}`);
  },
  findOneUserByName(username) {
    return axios.post(`/api/user/findone`, username);
  },
  getAllUsers() {
    return axios.get(`/api/user/all`);
  },
  getSessionUser() {
    return axios.get(`/api/user`);
  },
  getTopScorers() {
    return axios.get(`/api/user/topscorers`);
  },
  getTopScorersByPropertyName(property) {
    return axios.post(`/api/user/topscorersbypropertyname`, property);
  },
  getUserDetails(id) {
    return axios.get(`/api/user/${id}`);
  },
  logBattle(id, battle) {
    return axios.put(`api/user/logbattle/${id}`, { battle: battle });
  },
  logIn(userCredentials) {
    return axios.post(`/api/user/login`, userCredentials);
  },
  logOut() {
    return axios.post(`/api/user/logout`);
  },
  lose(id) {
    return axios.put(`/api/user/lose/${id}`);
  },
  makeCaptain(userId, characterId) {
    return axios.put(`/api/user/makecaptain/${userId}`, {
      characterId: characterId,
    });
  },
  newUser(signUpDetails) {
    return axios.post(`/api/user`, signUpDetails);
  },
  prestige(id) {
    return axios.put(`/api/user/prestige/${id}`);
  },
  removeCharacterFromRoster(id, characterId) {
    return axios.put(`/api/user/roster/remove/${id}`, characterId);
  },
  removeFromTeam(id, characterId) {
    return axios.put(`/api/user/team/remove/${id}`, {
      characterId: characterId,
    });
  },
  removeManyCharactersFromRoster(id, characterIds) {
    return axios.put(`/api/user/roster/removemany/${id}`, {
      ids: characterIds,
    });
  },
  win(id) {
    return axios.put(`/api/user/win/${id}`);
  },
};
