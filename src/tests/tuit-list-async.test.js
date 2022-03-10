import Tuits from "../components/tuits";
import { screen, render } from "@testing-library/react";
import { HashRouter } from "react-router-dom";

import { findAllTuits } from "../services/tuits-service";

// tuit list renders async
test("tuit list renders async", async () => {
  // TODO: implement this
  const tuits = await findAllTuits();
  // console.log(tuits);

  render(
    <HashRouter>
      <Tuits tuits={tuits} />
    </HashRouter>
  );

  const tuit = screen.getByText(/spacecraft/i);
  expect(tuit).toBeInTheDocument();
});
