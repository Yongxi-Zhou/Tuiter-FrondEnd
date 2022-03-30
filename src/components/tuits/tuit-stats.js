import React from "react";
import { useState, useEffect } from "react";
import { checkIfDislike, checkIfLike } from "../../services/likes-service";

const TuitStats = ({ tuit, likeTuit = () => {}, dislikeTuit = () => {} }) => {
  const [isliked, setLiked] = useState(null);
  const [isdisliked, setDisliked] = useState(null);
  /*
  useEffect(() => {
    checkLike();
    checkDislike();
  }, []);
  */
  const checkLike = async () => {
    let liked = await checkIfLike("me", tuit._id);
    if (liked) {
      setLiked(true);
    } else {
      setLiked(false);
    }
  };
  const checkDislike = async () => {
    let disliked = await checkIfDislike("me", tuit._id);
    if (disliked) {
      setDisliked(true);
    } else {
      setDisliked(false);
    }
  };
  const handleLike = async () => {
    await likeTuit(tuit);
    await checkLike();
    await checkDislike();
  };

  const handleDisike = async () => {
    await dislikeTuit(tuit);
    await checkLike();
    await checkDislike();
  };

  return (
    <div className="row mt-2">
      <div className="col">
        <i className="far fa-message me-1"></i>
        {tuit.stats && tuit.stats.replies}
      </div>
      <div className="col">
        <i className="far fa-retweet me-1"></i>
        {tuit.stats && tuit.stats.retuits}
      </div>
      <div className="col">
        {/* liketuits  */}
        <span onClick={() => handleLike()}>
          {/* if tid and uid have like relationship, show the solid thumb up */}
          {isliked ? (
            <i
              className="fa-solid fa-thumbs-up me-1"
              style={{ color: "orange" }}
            ></i>
          ) : (
            <i className="fa-light fa-thumbs-up me-1"></i>
          )}
          {tuit.stats && tuit.stats.likes}
        </span>
      </div>
      <div className="col">
        {/* dislikeTuits  */}
        <span onClick={() => handleDisike()}>
          {isdisliked ? (
            <i
              className="fa-solid fa-thumbs-down me-1"
              style={{ color: "orange" }}
            ></i>
          ) : (
            <i className="fa-light fa-thumbs-down me-1"></i>
          )}
          {tuit.stats && tuit.stats.dislikes}
        </span>
      </div>
      <div className="col">
        <i className="far fa-inbox-out"></i>
      </div>
    </div>
  );
};
export default TuitStats;
