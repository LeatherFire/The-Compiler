# The Compiler

## Project Description

The Compiler is an online platform that allows users to write, compile, and run Python code directly from their web browsers. The interface is designed to resemble a web-based operating system, providing a user-friendly code editor for writing and editing Python code. Users can quickly compile and execute their code, view the output, and utilize debugging features to enhance their coding skills. Additionally, the platform supports code sharing through shareable links, fostering collaboration among users. The primary goal is to support the Python learning process and help users improve their coding abilities.

## Features

1. **User Login Page**
2. **User Registration Page**
3. **Coding and Execution with Visual Studio Code Editor**
4. **Listing Saved Codes with Finder and CodeBrowser**
5. **Rating Component for Codes on CodePage**
6. **Component for Deleting Codes**
7. **Listing Top-Rated Codes with CodeBrowser**
8. **Searching Codes with Finder Component**
9. **Desktop Page Footer and Header**
10. **Warning Modals**
11. **RightClickMenu Component**
12. **Popup Skeleton and Terminal Component**

## Technologies Used

### Frameworks and Libraries

- **Next.js:** A React framework that enables functionality such as server-side rendering and generating static websites for React based web applications.
- **React:** A JavaScript library for building user interfaces.
- **TailwindCSS:** A utility-first CSS framework for rapidly building custom user interfaces.
- **Redux Toolkit:** A standardized way to write Redux logic, which helps to manage and centralize the application state.
- **Axios:** A promise-based HTTP client for the browser and Node.js, used to handle API requests.

### Code Execution

- **Compile-Run:** A module that allows running code in various programming languages from Node.js. It provides functions to compile and execute code, capturing the output.
- **Monaco Editor:** The code editor that powers VS Code, integrated into the application for a rich coding experience.
- **JavaScript Terminal:** A library to emulate a terminal, enabling users to interact with the application as they would with a real terminal.

### User Authentication

- **Next-Auth:** A complete open-source authentication solution for Next.js applications.
- **Bcrypt:** A library to help hash passwords, providing a way to securely store user credentials.

### Database

- **MongoDB:** A NoSQL database for storing user data and code snippets.
- **Mongoose:** An Object Data Modeling (ODM) library for MongoDB and Node.js, which provides a schema-based solution to model application data.

### Miscellaneous

- **Framer Motion:** A production-ready motion library for React, used for creating animations.
- **React Toastify:** A library for adding notifications to the application.
- **React Image Gallery:** A responsive and flexible image gallery component for React.
- **React Slick:** A carousel component built with React, leveraging the popular Slick carousel library.
- **Sharp:** A high-performance image processing library for resizing, cropping, and converting images.
- **Socket.IO Client:** A JavaScript library for real-time web applications, used to facilitate real-time, bi-directional communication between web clients and servers.

## API Usage

The application uses REST APIs to handle various functionalities, including user registration, authentication, code execution, and more.

### Implemented APIs

1. **User Registration:** `Users Register API`
2. **User Login:** `Users Credentials API`
3. **Code Execution:** `ExecuteCode API`
4. **Listing Saved Codes:** `Codes Allcodes id code and Index API`
5. **Rating Codes:** `Score API`
6. **Deleting Codes:** `Codes id API`
7. **Updating Profile Information:** `Users id API`
8. **Updating Code:** `Codes API`

## API Issues and Solutions

### `api/executeCode` API Not Working on Vercel

The `api/executeCode` API, which works perfectly on the local machine, faces issues when deployed on Vercel. Possible reasons include:

1. **Vercel Environment Restrictions:**
   Vercel may restrict certain system calls and file operations. The usage of `child_process` and `fs` modules might encounter limitations in Vercel's server environment.

2. **Temporary File Creation and Execution:**
   The API creates and executes temporary files. Serverless platforms like Vercel often have limited support for such operations.

3. **Path and File Permissions:**
   The `/tmp` directory or other file paths might not be accessible in Vercel's environment, causing the API to fail.

### Local Machine Execution

On a local machine, these restrictions do not apply, allowing the API to perform file system operations and code execution without issues.

## Compatibility

For optimal performance, it is recommended to use Chrome or Opera browsers. Other browsers might experience compatibility issues.

## Site Access

Ensure to access the project via this link: [WebOS](https://webos-git-main-yigitcan-ucars-projects.vercel.app). The API paths are configured in the `.env` file to work with this URL. Accessing from different URLs may cause issues with API connectivity.

## Future Enhancements and Improvements

The project is currently in beta and aims to evolve with more complex features over time. Future enhancements include:

### Performance Improvements

- Developing faster and more efficient APIs.

### Security Enhancements

- Better protection of user data.

### New Features

- Support for more programming languages.
- Enhanced code editor with more features.

### Long-term Goals

- Transforming the project into a browser-based operating system with more functionalities and improved user experience.

---
