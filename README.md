# 📸 Vibe

![Vibe Banner](/public/assets/icons/logonew3.png)

**Vibe** is a modern social media application built for high-performance visual storytelling. It features infinite scrolling, real-time interactions, and a robust authentication system. Built with **React**, **TypeScript**, and **Appwrite**, it focuses on a seamless mobile-first experience and efficient data caching.

[![Live Demo](https://img.shields.io/badge/demo-online-green.svg)](https://we-like-app-v1.vercel.app/)
[![React](https://img.shields.io/badge/react-%2320232a.svg?style=flat&logo=react&logoColor=%2361DAFB)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=flat&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=flat&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)

---

## 🚀 Key Features

* **Authentication & Security**: Robust email/password login and Google OAuth integration using Appwrite Auth. Includes a secure "Guest Mode" for frictionless browsing.
* **Infinite Scroll Feed**: Optimized performance using `react-intersection-observer` to lazy-load posts as users scroll.
* **Image Optimization**: Automatic image resizing and caching for faster load times on mobile networks.
* **React Query Caching**: Implemented stale-while-revalidate strategies to minimize API calls and ensure the UI feels instant.
* **File Management**: Drag-and-drop image uploads with client-side preview and cropping validation.
* **Search & Discovery**: Real-time search functionality to find users and posts with debounce for API efficiency.

---

## 🛠️ Tech Stack

| Category | Technologies |
| :--- | :--- |
| **Frontend** | React.js, TypeScript, Vite |
| **Styling** | Tailwind CSS, Shadcn UI |
| **Backend (BaaS)** | Appwrite (Database, Auth, Storage) |
| **State Management** | TanStack Query (React Query) |
| **Form Handling** | React Hook Form, Zod (Validation) |
| **Routing** | React Router DOM v6 |

---

## 💡 Lessons Learned & Challenges

* **Optimizing Data Fetching:** I initially faced issues with prop-drilling user state. I solved this by implementing `TanStack Query` to handle server state and created a custom `AuthContext` to manage the user session globally.
* **Handling Auth Redirects:** Managing the difference between "Guest Users" vs "Authenticated Users" was tricky. I built protected routes that intelligently redirect users based on their session status without flashing the login screen.
* **Infinite Scroll:** Implementing pagination for the feed required careful state management to merge new posts with existing ones without causing layout shifts.

---

## ⚡ Getting Started

To run this project locally, follow these steps:

### 1. Clone the repository

```bash
git clone [https://github.com/blisssr77/WeLike](https://github.com/blisssr77/WeLike)
cd weLink

---

### 2. How to Check Your Deployment
Since you are likely hosting on **Vercel** (based on your previous links), here is the professional workflow to verify everything is working after a push:

**Step A: Check the Build Status (The "Health Check")**
1.  Go to your **Vercel Dashboard**.
2.  Click on your project ("WeLike" or "Vibe").
3.  Look at the **"Deployment"** tab.
    * **Ready (Green):** The code compiled successfully.
    * **Error (Red):** The build failed. Click it to read the logs (usually a TypeScript or Linting error).

**Step B: The "Incognito" Test (The Real User Test)**
Developers often think their app works because their browser has saved cookies. You need to test as a stranger.
1.  Open an **Incognito Window** (Cmd+Shift+N).
2.  Go to your live URL (e.g., `https://we-like-app-v1.vercel.app`).
3.  **Test the Critical Paths:**
    * **Guest Mode:** Does the "Guest Banner" appear?
    * **Google Login:** Try signing in. Does it redirect correctly?
    * **Images:** Do the images load? (Check for broken icons).

**Step C: The "Console" Check (The Hidden Errors)**
1.  On your live site, Right Click -> **Inspect** -> **Console**.
2.  Look for **Red Text**.
    * Ignore yellow warnings.
    * **Red Errors** usually mean a crash, a missing API key, or a broken image link.

**Would you like me to help you debug any red errors you see in the Vercel logs?**
