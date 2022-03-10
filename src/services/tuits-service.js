import axios from "axios";
// const BASE_URL = "https://tuiter-app.herokuapp.com/api";
const BASE_URL = "http://localhost:4000/api";

const TUITS_API = `${BASE_URL}/tuits`;
const USERS_API = `${BASE_URL}/users`;
// const TUITS_API = "https://tuiter-app.herokuapp.com/api/tuits";

export const findAllTuits = () =>
  axios.get(TUITS_API).then((response) => response.data);

export const findTuitById = (tid) =>
  axios.get(`${TUITS_API}/${tid}`).then((response) => response.data);

export const findTuitByUser = (uid) =>
  axios.get(`${USERS_API}/${uid}/tuits`).then((response) => response.data);

export const createTuit = (uid, tuit) => {
  return axios
    .post(`http://localhost:4000/api/users/${uid}/tuits`, tuit)
    .then((response) => response.data);
};

export const updateTuit = (tid, tuit) =>
  axios.post(`${TUITS_API}/${tid}`, tuit).then((response) => response.data);

export const deleteTuit = (tid) =>
  axios.delete(`${TUITS_API}/${tid}`).then((response) => response.data);
