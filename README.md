React Task Management App
Welcome to the React Task Management App! This application allows users to manage tasks efficiently, featuring user authentication, Google login, and a full suite of CRUD operations for task management.

🧑‍💻 Dummy User Credentials
You can log in using the following credentials to explore the app:

Email: joe@gmail.com
Password: pass1234
Live Demo

🚀 Features
User Authentication: Secure login and signup functionality using Firebase Authentication.
Google Sign-In: Option to log in using Google, making it easier for users to access the app.
Task Management (CRUD):
Create: Add new tasks with details such as title, assigned to, status, priority, start date, and end date.
Read: View a list of tasks with sorting and filtering options.
Update: Edit existing tasks as needed.
Delete: Remove tasks that are no longer needed.
Responsive Design: The app is fully responsive, ensuring a seamless experience on both desktop and mobile devices.
Toast Notifications: Provides success and error notifications for user actions like login, signup, and task operations.
🛠️ Technologies Used
Frontend: React, Redux, React Router, Tailwind CSS
Authentication: Firebase Authentication (including Google Sign-In)
Backend: Firebase Realtime Database
Deployment: Vercel
📝 Getting Started
Installation
Clone the repository:

bash
Copy code
git clone https://github.com/your-username/react-task-management-app.git
cd react-task-management-app
Install dependencies:

bash
Copy code
npm install
Set up Firebase:

Create a Firebase project in the Firebase console.

Enable Email/Password and Google authentication.

Add your Firebase configuration to an .env file:

env
Copy code
REACT_APP_API_KEY=your_api_key
REACT_APP_AUTH_DOMAIN=your_auth_domain
REACT_APP_PROJECT_ID=your_project_id
REACT_APP_STORAGE_BUCKET=your_storage_bucket
REACT_APP_MESSAGING_SENDER_ID=your_messaging_sender_id
REACT_APP_APP_ID=your_app_id
REACT_APP_MEASUREMENT_ID=your_measurement_id
Run the app locally:

bash
Copy code
npm start
The app should be running at http://localhost:3000.

Deployment
The app is deployed on Vercel. To deploy your own version:

Push the code to your GitHub repository.
Connect your GitHub repository to Vercel in the Vercel dashboard.
Deploy the app by following the instructions in the Vercel UI.
🔍 Testing
Unit tests are written using Jest and React Testing Library.

To run tests, use the following command:

bash
Copy code
npm test
📄 License
This project is licensed under the MIT License - see the LICENSE file for details.
