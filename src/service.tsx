import {Client, Account, Databases, Teams, ID} from 'appwrite';

// const client = new Client()
//   .setEndpoint('https://cloud.appwrite.io/v1') // Your Appwrite endpoint
//   .setProject('6649c3aa002b63f45d70'); // Your project ID

type createUserAccount = {
  email: string;
  password: string;
  name: string;
};

type LoginAccount = {
  email: string;
  password: string;
};

class AppwriteService {
  account;

  constructor() {
    appwriteClient
      .setEndpoint('https://cloud.appwrite.io/v1') // Your Appwrite endpoint
      .setProject('6649c3aa002b63f45d70'); // Your project ID
    this.account = new Account(appwriteClient);
  }

  async createAccount({email, password, name}: createUserAccount) {
    try {
      const userAccount = this.account.create(
        ID.unique(),
        email,
        password,
        name,
      );
      if (userAccount) {
        return this.login({email, password});
      } else {
        return userAccount;
      }
    } catch (error) {}
    console.log('create' + error);
  }

  async loginUserAccount({email, password}: LoginAccount) {
    try {
      await this.account.createEmailPasswordSession(email, password);
    } catch (error) {}
    console.log(error);
  }

  async getCurrentUser() {
    try {
      await this.account.get();
    } catch (error) {}
    console.log(error);
  }

  async deleteSession() {
    try {
      await this.account.deleteSession('current');
    } catch (error) {}
    console.log(error);
  }
}

export default AppwriteService;
