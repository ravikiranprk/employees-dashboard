## Overview
This is a [Next.js](https://nextjs.org) project build for viewing and managing employees in a company. The project includes the following features:
- Authentication (A mock authentication is added, and you can login using any email and password combinations): A login page appears when the user enters the website. After successful login, the user is redirected to the dashboard. Dashboard access is prohibited for non-authenticated users.
- Employee Dashboard Management: Displays the total number employees, their details in a table with filtering, searching, and other actions (delete, edit, print), and it shows who are active and who are active.
- Employee List is shown in the above Employee Dashboard
- Employee Form can be used for both adding and editing/updating the employees.

## Tech Stack used
The technologies used in this project are:
- React
- Next.js
- Typescript
- Tailwind CSS
- Mock JSON Data

## Steps to run the project locally
- Unzip the zipped folder and open it in a code editor such as Visual Studio Code/Webstorm (OR) Clone the repository from the github repository link.
- Then run the command "npm install" in the terminal, then all the required packages will be downloaded to the package.json file.
- To run the app, run the command "npm run dev" in the terminal and the project will open on "http://localhost:3000", so open it in the browser and you can see the application.
- Try to use any combinations of email and password for login, because it is mock login only.
- You can see a list of employees from the mock data used in the project.
- You can edit, delete each employee or add a new employee.
- You can print the entire employees table and save a pdf copy to your computer.
- You can toggle active/inactive for each employee.
- You can filter and search any employee based on few parameters (gender, name, active/inactive), and all of these works together.
- When you logout, then you will be redirected to the login page.