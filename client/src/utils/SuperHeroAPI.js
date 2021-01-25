import axios from "axios";

export default {
  findCharacterByName(name) {
    return axios.post(`/api/character/findbyname`, { name: name });
  },
  getNewOpponent(id) {
    return axios.post(`/api/character/searchcharacter`, { id: id });
  },
  getRandomNewCharacter() {
    return axios.get(`/api/character`);
  },
  loadContender(id) {
    return axios.get(`/api/character/${id}`);
  },
};
