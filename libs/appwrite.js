import { Client, Account, ID, Avatars, Databases } from "react-native-appwrite";

export const appwriteConfig = {
  endpoint: "https://cloud.appwrite.io/v1",
  platform: "com.andryariadi.aora",
  projectId: "66445b33002d07413109",
  databaseId: "66445e6f00230fb6097c",
  userCollectionId: "66445f0600336cd1b2ea",
  videoCollectionId: "66445f540039544484ed",
  storageId: "664462b4001df4e8d318",
};

// Init your React Native SDK
const client = new Client();

client
  .setEndpoint(appwriteConfig.endpoint) // Your Appwrite Endpoint
  .setProject(appwriteConfig.projectId) // Your project ID
  .setPlatform(appwriteConfig.platform); // Your application ID or bundle ID.

const account = new Account(client);
const avatars = new Avatars(client);
const databases = new Databases(client);

export const createUser = async (email, password, username) => {
  try {
    const newAccount = await account.create(ID.unique(), email, password, username);

    if (!newAccount) throw new Error();

    const avatarUrl = avatars.getInitials(username);

    await signIn(email, password);

    const newUser = await databases.createDocument();
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};

export const signIn = async (email, password) => {
  try {
    const session = await account.createEmailSession(email, password);

    if (!session) throw new Error();

    return session;
  } catch (error) {
    throw new Error(error);
  }
};
