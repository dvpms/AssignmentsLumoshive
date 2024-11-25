export function add(a, b) {
  return a + b;
}

export function subtract(a, b) {
  return a - b;
}

export function modulus(a, b) {
  return a % b;
}

export function multiply(a, b) {
  return a * b;
}

export function divide(a, b) {
  return a / b;
}

export const shoppingList = ["apple", "banana", "orange", "grape"]; 

export const user = {
    name: "Devran",
    age: 25,
}

export function promiseTest(){
    return new Promise((resolve, reject) => {
        resolve("promise test")
    })
}

export async function asyncTest(){
    return "async test"
}

export async function asyncTestObject(){
    return {name: "Devran", age: 25}
}

export function errorTest(){
    throw new Error("error test")
}

import axios from 'axios';

export const getUser =async (id) => {
    const response = await axios.get(`https://jsonplaceholder.typicode.com/users/${id}`);
    return response.data;
}
 export const mockFunction = jest.fn().mockResolvedValue(
     "mocked data"
 )

 export const snapshotTest = (name) => {
    return `Hello, ${name}`
 }

 export const getUserData = (id) => {
    return {
      id,
      name: `User ${id}`,
      email: `user${id}@example.com`
    };
  }

  export const delayFunction = (ms) => {
    setTimeout(()=>{
        console.log("delay function");
    }, ms)
  };