import Tuits from "../tuits";
import * as service from "../../services/likes-service";
import { useEffect, useState } from "react";
import MockTuit from "../tuits/MockTuit";

/**
 * My-Dislike component in profile
 * @returns My-Dislike component, a list of tuits I dislike
 */
const MyDislikes = () => {
  const [dislikedTuits, setdislikedTuis] = useState([]);
  const findTuitsIdislike = () => {
    return service
      .findAllTuitsdislikedByUser("me")
      .then((tuits) => setdislikedTuis(tuits));
  };
  useEffect(findTuitsIdislike, []);
  const mockTuit = {
    tuit: "A Mock Tuit",
    postedBy: "Jack Ma",
    postedOn: "2021/12/12",
    stats: {
      replies: 10,
      retuits: 10,
      likes: 10,
      dislikes: 10,
    },
  };

  return (
    <div>
      <Tuits tuits={dislikedTuits} refreshTuits={findTuitsIdislike} />
      <MockTuit tuit={mockTuit} />
    </div>
  );
};
export default MyDislikes;
