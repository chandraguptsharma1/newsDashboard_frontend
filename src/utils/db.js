import { openDB } from "idb";

const DB_NAME = "auth_app_db";
const STORE_NAME = "users";

export const initDB = async () => {
  return openDB(DB_NAME, 1, {
    upgrade(db) {
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: "email" });
      }
    },
  });
};

export const saveUserToDB = async (user) => {
  const db = await initDB();
  await db.put(STORE_NAME, user);
};

export const getUserByEmail = async (email) => {
  const db = await initDB();
  return await db.get(STORE_NAME, email);
};
