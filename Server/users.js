import { LocalStorage } from 'node-localstorage';
import { v4 as uuidv4 } from 'uuid';
import { User } from './users';


import { LocalStorage } from "node-localstorage";
import { v4 as uuidv4 } from "uuid";

class User {
  constructor(name, email, password, favoritePokemon, api_key, usage) {
    this.name = name;
    this.email = email;
    this.password = password;
    this.favoritePokemon = favoritePokemon;
    this.api_key = api_key;
    this.usage = usage;
  }
}

const localStorage = new LocalStorage("./users");

function registerUser(name, email, password, favoritePokemon) {
  const api_key = uuidv4();
  const usage = [];
  const newUser = new User(name, email, password, favoritePokemon, api_key, usage);
  localStorage.setItem(email, JSON.stringify(newUser));
  return newUser;
}

function loginUser(email, password) {
  const storedUser = localStorage.getItem(email);
  if (storedUser) {
    const parsedUser = JSON.parse(storedUser);
    if (parsedUser.password === password) {
      return parsedUser;
    } else {
      throw new Error("Invalid password");
    }
  } else {
    throw new Error("User not found");
  }
}

function updateUserUsage(email, day, count) {
  const storedUser = localStorage.getItem(email);
  if (storedUser) {
    const parsedUser = JSON.parse(storedUser);
    const existingUsageIndex = parsedUser.usage.findIndex(
      (record) => record.day === day
    );

    if (existingUsageIndex > -1) {
      parsedUser.usage[existingUsageIndex].count += count;
    } else {
      parsedUser.usage.push({ day, count });
    }

    localStorage.setItem(email, JSON.stringify(parsedUser));
  } else {
    throw new Error("User not found");
  }
}


// Register a new user
const newUser = registerUser("John Doe", "john.doe@example.com", "password123", "Pikachu");

// Log in existing user
try {
  const loggedInUser = loginUser("john.doe@example.com", "password123");
  console.log('User logged in:', loggedInUser);
} catch (error) {
  console.error(error.message);
}

// Update user's daily usage
try {
  updateUserUsage("john.doe@example.com", "2022-10-01", 5);
  console.log("Updated user usage");
} catch (error) {
  console.error(error.message);
}
