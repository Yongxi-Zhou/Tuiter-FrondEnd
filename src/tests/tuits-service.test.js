import {
  findAllTuits,
  findTuitById,
  findTuitByUser,
  createTuit,
  updateTuit,
  deleteTuit,
} from "../services/tuits-service";

import {
  createUser,
  deleteUsersByUsername,
  findAllUsers,
  findUserById,
} from "../services/users-service";

describe("can create tuit with REST API", () => {
  // TODO: implement this
  const adam = {
    username: "adam_smith",
    password: "not0sum",
    email: "wealth@nations.com",
  };
  const staticTuit = {
    tuit: "Hello World",
  };

  afterAll(() => {
    // clean up before the test making sure the user doesn't already exist
    return deleteUsersByUsername(adam.username);
  });

  test("can create tuit with REST API", async () => {
    const newUser = await createUser(adam);
    // verify new user matches the parameter user
    expect(newUser.username).toEqual(adam.username);
    expect(newUser.password).toEqual(adam.password);
    expect(newUser.email).toEqual(adam.email);

    const newTuit = await createTuit(newUser._id, staticTuit);
    // console.log(newTuit);
    expect(newTuit.postedBy).toEqual(newUser._id);
    expect(newTuit.tuit).toEqual(staticTuit.tuit);

    // delete tuits after finishing test
    const status = await deleteTuit(newTuit._id);
    expect(status.deletedCount).toBeGreaterThanOrEqual(1);
  });
});

describe("can delete tuit wtih REST API", () => {
  // TODO: implement this
  const adam = {
    username: "adam_smith",
    password: "not0sum",
    email: "wealth@nations.com",
  };
  const staticTuit = {
    tuit: "toDelete",
  };

  afterAll(() => {
    // clean up before the test making sure the user doesn't already exist
    return deleteUsersByUsername(adam.username);
  });

  test("can delete tuit wtih REST API", async () => {
    const newUser = await createUser(adam);
    // verify new user matches the parameter user
    expect(newUser.username).toEqual(adam.username);
    expect(newUser.password).toEqual(adam.password);
    expect(newUser.email).toEqual(adam.email);
    // verify new tuit matches the parameter tuit
    const newTuit = await createTuit(newUser._id, staticTuit);
    expect(newTuit.postedBy).toEqual(newUser._id);
    expect(newTuit.tuit).toEqual(staticTuit.tuit);

    // delete a tuit by their id. Assumes tuit already exists
    const status = await deleteTuit(newTuit._id);
    // verify we deleted at least one user by their username
    expect(status.deletedCount).toBeGreaterThanOrEqual(1);
  });
});

describe("can retrieve a tuit by their primary key with REST API", () => {
  // TODO: implement this
  const adam = {
    username: "adam_smith",
    password: "not0sum",
    email: "wealth@nations.com",
  };
  const staticTuit = {
    tuit: "toDelete",
  };

  test("can delete tuit wtih REST API", async () => {
    const newUser = await createUser(adam);
    // verify new user matches the parameter user
    expect(newUser.username).toEqual(adam.username);
    expect(newUser.password).toEqual(adam.password);
    expect(newUser.email).toEqual(adam.email);
    // verify new tuit matches the parameter tuit
    const newTuit = await createTuit(newUser._id, staticTuit);
    const newTuitId = newTuit._id;
    const requestTuit = await findTuitById(newTuit._id);

    // to test the requested id equals to the local id
    expect(newTuitId).toEqual(requestTuit._id);

    // delete a tuit by their id. Assumes tuit already exists
    const status = await deleteTuit(newTuit._id);
    // verify we deleted at least one user by their tuit id
    expect(status.deletedCount).toBeGreaterThanOrEqual(1);
  });
});

describe("can retrieve all tuits with REST API", () => {
  // TODO: implement this

  const sampleTuitList = [
    "TuitOne",
    "TuitTwo",
    "TuitThree",
    "TuitFour",
    "TuitFive",
  ];

  test("can retrieve all tuits with REST API", async () => {
    const tuits = await findAllTuits();

    const tuitsInsert = tuits.filter((tuit) =>
      sampleTuitList.includes(tuit.tuit)
    );

    //get all ids of the sample tuits for deleting after test
    const ids = tuitsInsert.map((item) => item._id);

    // get the item matching those in the sample list
    tuitsInsert.forEach((tuit) => {
      const sample = sampleTuitList.find(
        (sampleTuit) => sampleTuit === tuit.tuit
      );
      expect(sample).toEqual(tuit.tuit);
    });

    // delete all test sample after finishing the test
    ids.forEach(async (id) => {
      const status = await deleteTuit(id);
      expect(status.deletedCount).toBeGreaterThanOrEqual(1);
    });
  });
});
