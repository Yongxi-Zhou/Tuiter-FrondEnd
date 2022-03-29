import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL;
const USERS_API = `${BASE_URL}/api/users`;
const TUITS_API = `${BASE_URL}/api/tuits`;

const api = axios.create({
  withCredentials: true,
});

export const findAllTuitsLikedByUser = (userId) =>
  api.get(`${USERS_API}/${userId}/likes`).then((response) => response.data);

export const findAllUsersThatLikedTuit = (tid) =>
  api.get(`${TUITS_API}/${tid}/likes`).then((response) => response.data);

export const userLikesTuit = (uid, tid) =>
  api.put(`${USERS_API}/${uid}/likes/${tid}`).then((response) => response.data);

export const userDislikesTuit = (uid, tid) => {
  console.log("dislike");
  return api
    .put(`${USERS_API}/${uid}/dislikes/${tid}`)
    .then((response) => response.data);
};

export const checkIfLike = (uid, tid) => {
  return api.get(`${USERS_API}/${uid}/likes/${tid}`).then((response) => {
    // console.log(response);
    return response.data;
  });
};

export const checkIfDislike = (uid, tid) => {
  // console.log("ifdislike");
  return api
    .get(`${USERS_API}/${uid}/dislikes/${tid}`)
    .then((response) => response.data);
};
