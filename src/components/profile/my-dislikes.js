import Tuits from "../tuits";
import * as service from "../../services/likes-service";
import { useEffect, useState } from "react";

const MyDislikes = () => {
  const [dislikedTuits, setdislikedTuis] = useState([]);
  //   const findTuitsIdislike = () =>
  //     service
  //       .findAllTuitsdislikedByUser("me")
  //       .then((tuits) => setdislikedTuis(tuits));
  //   useEffect(findTuitsIdislike, []);

  return (
    <div>
      {/* <Tuits tuits={dislikedTuits} refreshTuits={findTuitsIdislike} /> */}
      123
    </div>
  );
};
export default MyDislikes;
