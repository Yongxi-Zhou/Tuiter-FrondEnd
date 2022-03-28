import React from "react";

const TuitStats = ({ tuit, likeTuit = () => {}, dislikeTuit = () => {} }) => {
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
        <span onClick={() => likeTuit(tuit)}>
          {/* if tid and uid have like relationship, show the solid thumb up */}
          {tuit.stats && tuit.stats.likes && tuit.stats.likes > 0 ? (
            <i
              className="fa-solid fa-thumbs-up me-1"
              style={{ color: "red" }}
            ></i>
          ) : (
            <i className="fa-light fa-thumbs-up me-1"></i>
          )}
          {tuit.stats && tuit.stats.likes}
        </span>
      </div>
      <div className="col">
        {/* dislikeTuits  */}
        <span onClick={() => dislikeTuit(tuit)}>
          {tuit.stats && tuit.stats.dislikes && tuit.stats.dislikes > 0 ? (
            <i
              className="fa-solid fa-thumbs-down me-1"
              style={{ color: "red" }}
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
