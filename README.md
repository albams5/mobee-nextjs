
# 🐝 Mobee App 🎥

Welcome to Mobee project, an application to keep track of the movies you are watching.
You'll be able to upload your movies, edit them or delete them if you want to.


![Logo](https://res.cloudinary.com/dy87deadk/image/upload/v1716533476/xdtgef60v1p80cggo8pf.png)

## 🤳Features

- 👌Rate your favorite movies and easily access them later. Did you change your mind about one of them? You can edit or delete them.
- 📱Intuitive, responsive and user-friendly interface designed for mobile devices, tablet(>800px) and laptop (>1200px).
- ⚙️Developed using modern technologies such as NextJs, TypeScript and Auth0.
- 📫Incorporates React Hot Toast for instant and appealing notifications.
- 📍Multiple Pages:
    - Login Page: Allows users to log in or sign up using Auth0.
    - Home Page: Displays the movies you've already rated and shows the form to upload new ones.
    - Movie Page: Displays all the info about a certain movie, allows users to edit the info or delete the movie.


## 🔧Tech Stack

- **Next.js**: Used for building React applications with server-side rendering.

- **TypeScript**: Used for adding static typing to JavaScript.

- **Auth0**: Used for authentication and authorization.

- **React Hot Toast**: Used for displaying toast notifications in React applications.


## 📸Screenshots

![App Screenshot](https://res.cloudinary.com/dy87deadk/image/upload/v1716534935/kdsafqe7wsm0douahjyh.png)


## 📝Lessons Learned


1. How routing and dynamic routes works in Next.js.
2. Fetching on the Server and how revalidatePath works.
3. To convert a server component into a client component using 'use client'.
4. Importance of metadata.
5. Functions cannot be called directly from a client component. They need to be called from the server component (parent) and passed down to the client component via props.


## 🖇️Related

Here you can find the backend of this app.
To connect, please use the next-backend branch.

https://github.com/albams5/movie-hub

## 🚀Deployment

This project is already deployed in Netlify: https://delicate-rabanadas-292188.netlify.app/


## 🧑‍💻Installation

To run this application locally, follow these steps:

```bash
1. Clone the repository:

git clone  https://github.com/albams5/mobee-nextjs.git

2. Navigate to the project directory:

cd mobee-nextjs

3. Install dependencies:

npm install

To start the development server, run:

npm run dev

