import { Client, Databases, Account, Storage, Teams } from "appwrite";
import appConfig from "../config/app.js";

const client = new Client();
client
  .setEndpoint(appConfig.appwriteUrl)
  .setProject(appConfig.appwriteProjectId); 
  
export const account = new Account(client);
export const databases = new Databases(client);
export const bucket = new Storage(client);
export const team = new Teams(client);