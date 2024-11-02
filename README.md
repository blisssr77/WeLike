# WeLike

WeLike is a dynamic social media platform allowing users to create and explore posts, ensuring a smooth and engaging user experience with a modern and responsive design.

## Table of Contents

- [Introduction](#introduction)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started-vercel)
- [Features](#features)
- [Setup and Installation](#setup-and-installation)
- [Usage](#usage)
- [Contributing](#contributing)

## Introduction

Explore social media with this user-friendly platform that has a nice look and lots of features. Easily create and explore posts, and enjoy a strong authentication system and quick data fetching using React Query for a smooth user experience.

If you need assistance or face any bugs, join our active Discord community with over 27k+ members. It's a place where people help each other out.

## Screenshots

<img width="1445" alt="frontpage" src="https://github.com/user-attachments/assets/f51f5127-be58-4915-a57d-2b4f72bc6776">
<img width="1445" alt="frontpage" src="https://github.com/user-attachments/assets/8046210b-18f5-4767-9a2b-2857c3be8ceb">
<img width="1575" alt="search" src="https://github.com/user-attachments/assets/4087120c-abeb-4df4-adb3-14bf5ec9cc7a">




## Tech Stack

- **Frontend**: React.js, TypeScript, Tailwind CSS
- **Backend**: Appwrite
- **State Management**: React Query
- **UI Components**: Shadcn
- **Authentication**: Appwrite

## Getting Started (Vercel)

[WeLike app - single click to start the app](https://we-like-app-v1.vercel.app/sign-in)

- **Sign up / Sign in**
- **Browse Contents**
- **Like / Save the Contents**
- **Create / Edit / Delete the Contents**
- **Sign out**

## Features

- **Authentication System**: Secure and user-friendly login/signup
- **Explore Page**: Discover and explore posts
- **Post Interaction**: Like, save, and manage posts
- **Detailed Post Page**: View detailed content and related posts
- **Profile Page**: User profiles showcasing liked and saved posts
- **User Browsing**: Explore other users' profiles and posts
- **Create/Edit Post**: User-friendly post creation and editing
- **Responsive UI**: Seamless experience across devices
- **Efficient Data Fetching**: Using React Query for optimal performance



## Setup and Installation

1. **Clone the repository**:
    ```bash
    git clone https://github.com/yourusername/welike.git
    cd vite-project1-welike
    ```

2. **Install dependencies**:
    ```bash
    npm install
    ```

3. **Configure environment variables**:
    Create a `.env` file in the root directory and add your Appwrite project details:
    ```
    VITE_APPWRITE_URL=
    VITE_APPWRITE_PROJECT_ID=
    VITE_APPWRITE_DATABASE_ID=
    VITE_APPWRITE_STORAGE_ID=
    VITE_APPWRITE_USER_COLLECTION_ID=
    VITE_APPWRITE_POST_COLLECTION_ID=
    VITE_APPWRITE_SAVES_COLLECTION_ID=
    ```

    Replace the placeholder values with your actual Appwrite credentials. You can obtain these credentials by signing up on the [Appwrite website](https://appwrite.io/).

4. **Start the development server**:
    ```bash
    npm start
    ```
    Open http://localhost:3000 in your browser to view the project.
   
## Usage

- **Explore Page**: Navigate to `/explore` to see the latest posts.
- **Profile Page**: Go to `/profile` to view and edit your profile.
- **Create Post**: Use `/create-post` to add new posts.
- **Detailed Post Page**: Click on any post to view its details.

## Contributing

If you have any suggestions or need a bug fix that would improve the application, please fork the repo and create a pull request.
 - Fork the Project
 - Create your Feature Branch
 - Commit your Changes
 - Push to the Branch
 - Open a Pull Request
