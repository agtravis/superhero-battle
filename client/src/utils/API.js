import axios from "axios";

export default {
  getSessionUser() {
    return axios.get(`/api/user`);
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
};
