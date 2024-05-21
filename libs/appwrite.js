import { Client, Account, ID, Avatars, Databases, Query } from "react-native-appwrite";

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

export async function createUser(email, password, username) {
  try {
    const newAccount = await account.create(ID.unique(), email, password, username);

    if (!newAccount) throw Error;

    const avatarUrl = avatars.getInitials(username);

    await signIn(email, password);

    const newUser = await databases.createDocument(appwriteConfig.databaseId, appwriteConfig.userCollectionId, ID.unique(), {
      accountId: newAccount.$id,
      email: email,
      username: username,
      avatar: avatarUrl,
    });

    return newUser;
  } catch (error) {
    throw new Error(error);
  }
}

export const signIn = async (email, password) => {
  try {
    const session = await account.createEmailPasswordSession(email, password);
    return session;
  } catch (error) {
    throw new Error(error);
  }
};

export const signOut = async () => {
  try {
    const session = await account.deleteSession("current");

    return session;
  } catch (error) {
    // console.log(error);
    throw new Error(error);
  }
};

export const getCurrentUser = async () => {
  try {
    const currentAccount = await account.get();

    if (!currentAccount) throw Error;

    const currentUser = await databases.listDocuments(appwriteConfig.databaseId, appwriteConfig.userCollectionId, [Query.equal("accountId", currentAccount.$id)]);

    if (!currentUser) throw Error;

    return currentUser.documents[0];
  } catch (error) {
    console.log(error);
  }
};

export const getAllPosts = async () => {
  try {
    const posts = await databases.listDocuments(appwriteConfig.databaseId, appwriteConfig.videoCollectionId);

    return posts.documents;
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};

export const getLatesPosts = async () => {
  try {
    const posts = await databases.listDocuments(appwriteConfig.databaseId, appwriteConfig.videoCollectionId, [Query.orderDesc("$createdAt"), Query.limit(7)]);

    return posts.documents;
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};

export const searchPosts = async (query) => {
  try {
    const posts = await databases.listDocuments(appwriteConfig.databaseId, appwriteConfig.videoCollectionId, [Query.search("title", query)]);

    return posts.documents;
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};

export const getUserPost = async (userId) => {
  try {
    const posts = await databases.listDocuments(appwriteConfig.databaseId, appwriteConfig.videoCollectionId, [Query.equal("creator", userId)]);

    return posts.documents;
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};
