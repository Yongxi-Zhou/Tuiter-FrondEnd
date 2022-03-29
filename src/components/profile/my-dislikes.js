import Tuits from "../tuits";
import * as service from "../../services/likes-service";
import { useEffect, useState } from "react";

/**
 * My-Dislike component in profile
 * @returns My-Dislike component, a list of tuits I dislike
 */
const MyDislikes = () => {
  const [dislikedTuits, setdislikedTuis] = useState([]);
  const findTuitsIdislike = () =>
    service
      .findAllTuitsdislikedByUser("me")
      .then((tuits) => setdislikedTuis(tuits));
  useEffect(findTuitsIdislike, []);

  return (
    <div>
      <Tuits tuits={dislikedTuits} refreshTuits={findTuitsIdislike} />
    </div>
  );
};
export default MyDislikes;
