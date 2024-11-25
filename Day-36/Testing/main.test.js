import {
  add,
  subtract,
  modulus,
  multiply,
  divide,
  shoppingList,
  user,
  promiseTest,
  asyncTest,
  asyncTestObject,
  errorTest,
  getUser,
  mockFunction,
  snapshotTest,
  getUserData,
} from "./main.js";

test("adds 1 + 2 to equal 3", () => {
  expect(add(1, 2)).toBe(3);
});

test("subtracts 1 - 2 to equal -1", () => {
  expect(subtract(2, 1)).toBe(1);
});

test("modulus 4 % 2 to equal 0", () => {
  expect(modulus(4, 2)).toBe(0);
});

test("multiply 2 * 2 to equal 4", () => {
  expect(multiply(2, 2)).toBe(4);
});

test("divide 4 / 2 to equal 2", () => {
  expect(divide(4, 2)).toBe(2);
});

test("check shoppingList", () => {
  const datas = ["apple", "banana", "orange", "grape"];
  for (const data of datas) {
    expect(shoppingList).toContain(data);
  }
});

test("check user", () => {
  expect(user).toMatchObject({
    name: "Devran",
    age: 25,
  });
});

test("promise test", () => {
  expect(promiseTest()).resolves.toBe("promise test");
});

test("testing promise test pt 2", () => {
  return promiseTest().then((res) => expect(res).toBe("promise test"));
});

test("testing async test", async () => {
  expect(await asyncTest()).toBe("async test");
});
test("testing async test pt 2", async () => {
  const res = await asyncTest();
  expect(res).toBe("async test");
});

test("testing async test object", async () => {
  const res = await asyncTestObject();
  expect(res).toMatchObject({
    name: "Devran",
    age: 25,
  });
});

test("testing error test", () => {
  expect(() => errorTest()).toThrow("error test");
});

import axios from "axios";

jest.mock("axios");

axios.get.mockResolvedValue({
  data: {
    name: "Devran",
    age: 25,
  },
});
test("test mocking user data", async () => {
  const user = await getUser(1);
  expect(user.name).toBe("Devran");
});

test("fecth mock data", async () => {
  const res = await mockFunction();
  expect(res).toBe("mocked data");
});

test("snapshot testing", () => {
  expect(snapshotTest("Devran")).toMatchSnapshot();
});

test("snapshot testing", () => {
  const userData = getUserData(1);
  expect(userData).toMatchSnapshot();
});
