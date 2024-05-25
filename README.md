# To-Do Application with React Native and Appwrite

## Introduction
This repository contains the source code for a To-Do application built using React Native and integrated with Appwrite for backend operations. The application includes features such as authentication, team invitation, and basic To-Do list management.

## Technical Requirements
- React Native: Frontend development framework for building mobile applications.
- Appwrite: Backend server used for handling authentication, data storage, and other backend operations.

## Installation and Setup
1. **Clone the repository:**
git clone https://github.com/yourusername/todo-app.git
cd todo-app

2. **Install dependencies:**
npm install


3. **Setup Appwrite backend:**
- Sign up for an account on [Appwrite](https://appwrite.io/) and create a new project.
- Set up authentication and database services as per your requirements.
- Note down the API endpoint and project ID for later configuration.

4. **Configuration:**
- Rename `.env.example` to `.env` and update the following variables with your Appwrite project details:
  ```
  APPWRITE_ENDPOINT=https://your-appwrite-endpoint.com/v1
  APPWRITE_PROJECT_ID=your-appwrite-project-id
  ```

5. **Run the application:**
- For Android:
  ```
  npx react-native run-android
  ```
- For iOS:
  ```
  npx react-native run-ios
  ```

## Features
- Authentication: Users can sign up, log in, and log out securely.
- Team Invitation: Users can invite others to collaborate on their To-Do lists.
- To-Do List Management: Users can create, edit, delete, and mark tasks as complete.

## Deployment
### Debug Mode
1. **Generate APK for Android:**
cd android
./gradlew assembleDebug
The APK file will be generated in the `android/app/build/outputs/apk/debug` directory.

### Running Locally
- Ensure that you have set up the development environment for React Native and have the necessary dependencies installed.
- Follow the installation and setup steps mentioned above.
- Connect your Android or iOS device or use an emulator/simulator.
- Run the application using the appropriate commands mentioned in the setup section.

## Contributing
Contributions are welcome! Please fork the repository, make changes, and submit a pull request. For major changes, please open an issue first to discuss the proposed changes.

## License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgements
- [React Native](https://reactnative.dev/)
- [Appwrite](https://appwrite.io/)
- Any other resources or libraries used in the development of this application.

