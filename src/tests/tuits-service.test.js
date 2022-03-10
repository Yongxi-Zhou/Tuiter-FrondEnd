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

  // setup before running test
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

    expect(newTuitId).toEqual(requestTuit._id);

    // delete a tuit by their id. Assumes tuit already exists
    const status = await deleteTuit(newTuit._id);
    // verify we deleted at least one user by their tuit id
    expect(status.deletedCount).toBeGreaterThanOrEqual(1);
  });
});

describe("can retrieve all tuits with REST API", () => {
  // TODO: implement this
  const adam = {
    username: "adam_smith",
    password: "not0sum",
    email: "wealth@nations.com",
  };
  // const TuitList = [
  //   {
  //     tuit: "TuitOne",
  //   },
  //   {
  //     tuit: "TuitTwo",
  //   },
  //   {
  //     tuit: "TuitThree",
  //   },
  //   {
  //     tuit: "TuitFour",
  //   },
  //   {
  //     tuit: "TuitFive",
  //   },
  //   {
  //     tuit: "TuitSix",
  //   },
  // ];

  const sampleTuitList = [
    "TuitOne",
    "TuitTwo",
    "TuitThree",
    "TuitFour",
    "TuitFive",
  ];
  const requestTuit = [];
  const ids = [];

  beforeAll(() => {
    const newUser = createUser(adam);
    sampleTuitList.map((tuit) => createTuit(newUser._id, { tuit: tuit }));
  });

  // afterAll(() => {
  //   ids.map((tuitId) => deleteTuit(tuitId));
  // });

  test("can retrieve all tuits with REST API", async () => {
    const tuits = await findAllTuits();
    // console.log(tuits);
    const tuitsInsert = tuits.filter((tuit) =>
      sampleTuitList.includes(tuit.tuit)
    );

    const ids = tuitsInsert.map((item) => item._id);

    tuitsInsert.forEach((tuit) => {
      const sample = sampleTuitList.find(
        (sampleTuit) => sampleTuit === tuit.tuit
      );

      expect(sample).toEqual(tuit.tuit);
    });

    ids.forEach(async (id) => {
      const status = await deleteTuit(id);
      expect(status.deletedCount).toBeGreaterThanOrEqual(1);
    });
  });
});
