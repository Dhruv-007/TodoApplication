import {Client, Account, Databases, Teams, ID} from 'appwrite';

export const COLLECTION_ID = '664a350f003172650d23'; // your collection id
export const DATABASES_ID = '664a1e360032f9a6149d';
export const TEAM_ID = '66508ddb002b8117dcb2';

const client = new Client()
  .setEndpoint('https://cloud.appwrite.io/v1') // Your Appwrite endpoint
  .setProject('6649c3aa002b63f45d70'); // Your project ID

const account = new Account(client);
const databases = new Databases(client);
const teams = new Teams(client);

export {client, account, databases, teams};

class Role {
  constructor(teamId) {
    this.teamId = teamId;
  }

  static team(teamId) {
    return new Role(teamId);
  }

  async grant(permissions) {
    // Implement your logic to grant permissions to roles
    // This could involve making API calls to your backend or using Appwrite SDK methods
    // Example:
    // await somePermissionGrantingFunction(this.teamId, permissions);
    return 'Permissions granted successfully'; // Placeholder return statement
  }
}

export {Role};

const createOrGetTeam = async (teamId, teamName, defaultRoles) => {
  try {
    const team = await teams.get(teamId);
    return team;
  } catch (error) {
    console.log('Team not found, creating a new one...');
    const newTeam = await teams.create(teamId, teamName, defaultRoles);
    return newTeam;
  }
};

const addMemberToTeam = async (teamId, memberId, roles) => {
  try {
    const response = await teams.createMembership(teamId, roles, memberId);
    console.log('Member added to team:', response);
    return response;
  } catch (error) {
    console.error('Error adding member to team:', error);
    throw error;
  }
};

export {createOrGetTeam, addMemberToTeam};
