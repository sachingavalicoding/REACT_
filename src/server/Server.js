import { Client, Account, Databases } from "appwrite";

const client = new Client();

client
  .setEndpoint("https://cloud.appwrite.io/v1")
  .setProject("6662d57a0014835ff703"); 

export const account = new Account(client);
export const database = new Databases(client);
export { ID } from "appwrite";
