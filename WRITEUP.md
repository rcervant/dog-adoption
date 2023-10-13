# **WRITEUP.md**

**Table of Contents**

1. [Build Instructions](#build-instructions)
2. [Design Choices](#design-choices)
3. [Challenges]( #challenges-issues-encountered)
4. [Workarounds](#workarounds)
5. [Diagrams: E-R, App Router Flowchart](#diagrams)
6. [TODOs](#todos)
7. [Troubleshooting](#troubleshooting)

## **Build Instructions <a name="build-and-usage-instructions"></a>**

### **Getting Started with the Dog Matching App**


### 1. Install Dependencies

Make sure you have [Node.js](https://nodejs.org/en/download) (v18.7+) installed on your machine. Then, proceed to install the project dependencies by running the following command:

```bash
npm install
```

Before running the app, you'll need to set up a few configuration files:

- **`.env.local`**: This file contains Next.js-specific environment variables.
- **`.env`**: Prisma relies on this file to access the database URL.
- **`.env.template` (provided)**: Contains variables needed for both **`.env.local`** and **`.env`**.

Create duplicate copies of **`.env.template`** and name them **`.env.local`** and **`.env`**. Fill in the required information in these files.

#### .env.local

```bash
NEXT_PUBLIC_ORIGIN = "http://localhost:3000"
NEXT_PUBLIC_FETCH_COOKIE_NAME=<FOUND IN EXERCISE INSTRUCTIONS>
NEXT_PUBLIC_FETCH_API_URL=<FOUND IN EXERCISE INSTRUCTIONS>
```

#### .env

```bash
DATABASE_URL=
```

### 2. Setting Up the Database

You have two options for setting up the database:

1. [Local DB Setup with Docker (recommended)](#local-setup-with-docker)
2. [Cloud DB Setup](#cloud-db-setup)

#### [1] Local Setup with Docker <a name="local-setup-with-docker"></a>

- Start by installing Docker Desktop (macOS/windows) or Docker Engine (Linux). [Install Docker](https://www.docker.com/get-started/)

- Run the following command in a new terminal to initialize the Docker container with a MySQL database:

**macOS/Linux**

```bash
  npm run db:init
```

**Windows**

```bash
  npm run db:init-win
```

Now, you have a MySQL database running in a Docker container with the following credentials:

- Database name: fetch_take_home_db
- Database password: password
- Port exposed: 3306

Replace the **`DATABASE_URL`** in **`.env`** with the URL provided by Docker.

```bash
# the default URL is found in .env.template
DATABASE_URL=
```


To connect to the database with Prisma, run the following command in a new terminal:

**macOS/Linux**

```bash
  npm run prisma:init
```

**Windows**

```bash
  npm run prisma:init-win
```

#### [2] Setup with a Cloud Provider <a name="cloud-db-setup"></a>

You can also run the app locally with a MySQL database provided by a cloud service like [PlanetScale](https://planetscale.com/docs/tutorials/planetscale-quick-start-guide) or [Railway](https://docs.railway.app/databases/mysql). 

Replace the **`DATABASE_URL`** in **`.env`** with the URL provided by the cloud provider.

```bash
DATABASE_URL=<mysql://{MYSQL_DB_USER}:{MYSQL_DB_PASSWORD}@{MY_SQL_DB_HOST}:{PORT}/{MYSQL_DB_NAME}>
```

**macOS/Linux**

```bash
  npm run prisma:init
```

**Windows**

```bash
  npm run prisma:init-win
```

### 3. Running the App

You're now ready to run the app:

```bash
npm run dev
```

The app will be accessible at [http://localhost:3000](http://localhost:3000/) in your web browser.

---

## **Design Choices** <a name="design-choices"></a>

The following design choices were made for the Dog Matching App:

- [Architectural Decisions](#architectural-decisions)
- [UI Library](#ui-library)
- [Database](#database)
- [Deployment](#deployment)


### **Architectural Decisions**

- **Next.js 13**: The application is built using Next.js 13, chosen for its new app router, built-in server-side rendering and static site generation, built-in routing and file-based routing, route grouping, support for React Server Components, and built-in loading and error states.
    - *Alternative Considered*: The alternative to Next.js could have been using Create React App (CRA) with React Router for routing. However, Next.js was preferred due to its built-in support for server-side rendering and static site generation, which significantly improves performance.
- **Server-Side Data Fetching**: The app utilizes server-side data fetching and caching, which enhances performance and responsiveness by pushing as much HTML to the client before interactivity is needed.
    - *Alternative Considered*: Client-side data fetching with libraries like Axios or GraphQL was considered, but server-side data fetching was chosen to improve the app's SEO and overall performance by reducing js bundle size since less of the app had to be hydrated.
- **Prisma**: As the Object-Relational Mapping (ORM) tool, Prisma provides a robust bridge between the application and the database, simplifying data access and management.
    - *Alternative Considered*: An alternative to Prisma could have been Sequelize, a popular ORM for Node.js applications. However, Prisma was chosen for its more modern and developer-friendly API.
- **PlanetScale**: The app is hosted on PlanetScale for ease of use and integration with Prisma.
    - *Alternative Considered*: Other cloud providers like AWS RDS or Google Cloud SQL could have been chosen. However, PlanetScale was selected for its simplicity and integration with Prisma.

### **UI Library**

- **Shadcn UI**: Shadcn UI was selected as the UI library for its seamless integration with Next.js 13 and Tailwind CSS. This choice ensures consistent and visually appealing user interfaces throughout the app.
    - *Alternative Considered*: An alternative UI library could have been Material-UI. However, Shadcn UI was preferred because it was designed with Next.js in mind, making integration smoother.

### **Database**

- **MySQL**: MySQL is used as the database system, providing a reliable and widely-supported data storage solution.
    - *Alternative Considered*: PostgreSQL is another powerful and open-source relational database system that could have been chosen. MySQL was selected based on its ease of use and compatibility with PlanetScale.
- **Prisma ORM**: Prisma serves as the ORM, ensuring a well-structured and efficient data interaction layer. The Prisma ORM allows for clear relationships between users and their favorite items, simplifying data management and retrieval.
    - *Alternative Considered*: An alternative could have been writing custom SQL queries for data interaction instead of using an ORM. However, Prisma was chosen to benefit from its type safety and query generation capabilities.

### **Deployment**

- **Vercel**: The app is deployed on Vercel, a cloud platform known for its ease of use and tight integration with Next.js. This choice simplifies the deployment process and ensures reliable hosting.
    - *Alternative Considered*: An alternative deployment option could have been using AWS Elastic Beanstalk for more control over the deployment environment. However, Vercel was selected for its simplicity and seamless integration.

## **Challenges/Issues Encountered, Resolutions <a name="challenges-issues-encountered"></a>**

During the development of the Dog Matching App, several challenges and issues were encountered:

### **API and CORS Policy**

The app's API required user credentials to create a user in the database. As a result, the fetch operation had to be executed server-side. However, this introduced complexities:

- The auth token, which provides authentication, is stored in the user's browser, not on the server. Consequently, each request had to manually set the required cookie in the request header.
- Next.js has a very aggresive caching policy, which caused it to cache fetch calls and not make new requests when necessary. While this leads to increased performance where the data isnt expected to change, it caused the user session to be stale. To mitigate this, caching had to be forcefully disabled during each sign-in to prevent the use of outdated session data.

### **Infinite Scrolling**

Infinite scrolling was chosen over standard pagination. This decision led to the following challenges:

- Creating a new fetch call for each page was required, utilizing the search parameters from the **`next`** property in the API response.
- Initial data was fetched server-side, and subsequently, data had to be retrieved client-side for the next page. To achieve this without a full page refresh, a server action was passed to the client component to handle the next page's data retrieval.
- Triggering the next page's data retrieval required the use of a ref to the last element in the list. This ref was used to determine when the user scrolled to the bottom of the page, triggering the next page's data retrieval. 
- This was handled by utilizing the IntersectionObserver API, which allowed for the ref to be observed and the next page's data retrieval to be triggered when the ref was visible. 
- This approach led to a smoother user experience, as the next page's data was fetched before the user reached the bottom of the page. 
- <strong>However</strong>, this approach also introduced complexities, as the ref had to be visible to make the fetch but as it stood, it would make continuous calls to the API while it was visble. 
- This was solved by [debouncing](https://github.com/rcervant/fetch-take-home/blob/main/lib/client/utils.ts) the call to loadMoreDogs and by utilizing the useEffect hook to return a cleanup function that cleared the ref when the component was unmounted.

### **Form Validation**

Implementing form validation with React Hook Form within Shadcn UI dialog components presented challenges:

- Shadcn UI dialog components had issues when with forms from React Hook Form as children within dialog components. To circumvent this limitation, components that would have typically been standalone were defined inline the dialog. This approach was necessary to address the issue, as noted in a similar GitHub [issue](https://github.com/shadcn-ui/ui/issues/709). 
- The tradeoff of having very long components ([SignInForm](https://github.com/rcervant/fetch-take-home/blob/main/components/SignInForm.tsx), [SearchDialog](https://github.com/rcervant/fetch-take-home/blob/main/components/dogSearchModal/SearchDialog.tsx)) was made to ensure proper form validation and error handling, as the alternative would have been to allow for the form to be submitted without validation. 
- I opted for a better user experience over modularity in the components


## **Workarounds <a name="circumvented-instructions"></a>**



## **Diagrams: <a name="diagrams"></a>**

### **ER Diagram:**

!https://chat.openai.com/c/er-diagram.png

The Entity-Relationship (ER) diagram illustrates the database schema for the Dog Matching App. It depicts the relationships between entities, such as users and favorites, and their respective attributes.

### **Architecture Flowchart:**

![app-router](readmeAssets/img/app-router.png)
picture of the project app router

The architecture flowchart provides an overview of the app's system architecture, including how data flows between various components and services.

### **UML Class Diagram:**

![er-diagram](readmeAssets/img/ER-diagram.png)

### **Entities:**

`User`: 
- id: A unique identifier for the user.
- createdAt: A timestamp for when the user was created.
- updatedAt: A timestamp for when the user was last updated.
- email: The email address of the user, and it has a uniqueness constraint.
- name: The name of the user.
- session: the current cookie on the clients browser (needed for credentials in fetch).

`Favorite`:
- id: A unique identifier for the favorite item.
- createdAt: A timestamp for when the favorite was created.
- dogId: A field that stores the identifier of the favorited dog.
- userId: A reference to the user who added the favorite, establishing a relationship with the User entity. This is a foreign key field.

`Relationships`:
There is a one-to-many relationship between the User and Favorite entities, where one user can have multiple favorite items. This relationship is represented by the favorites field in the User model and the user field in the Favorite model. The foreign key userId in the Favorite model connects each favorite item to a specific user.

`Indexes and Constraints`:
There is a uniqueness constraint on the combination of dogId and userId in the Favorite entity. This constraint ensures that a user can have a favorite for a particular dog only once.



## **TODOs: Things to Do Differently or Add in Production <a name="todos"></a>**

While the Dog Matching App is fully functional, there are areas where future improvements could be made:

### **Location Based Searching**

The app currently only supports searching for dogs by breed and age. To enhance the user experience, the app could be updated to support location-based searching. This could be expanded to look within a user specified radius of a certain zipcode.

### **Favorites**

Currently, a delay occurs due to network latency when adding a favorite. To enhance the user experience, implementing the experimental useOptimistic hook could be considered. This would allow for the immediate display of favorites, with updates occurring once the server responds with the finalized favorites.

### **Pagination**

Infinite scrolling could be improved with the integration of a library such as react-query. This library would effectively manage the state of data and handle client-side pagination, potentially providing a smoother user experience.

### **Testing**

To ensure the robustness and reliability of the application, additional testing could be implemented. More comprehensive testing coverage would help identify and resolve potential issues.

## **Troubleshooting <a name="troubleshooting"></a>**

If you encounter any issues while running the app, consider the following troubleshooting steps:

### **Node.js and Docker Versions**

Ensure that you have the correct versions of Node.js and Docker installed on your machine:

- Node.js: A minimum version of 18.7 is required.
- Docker: Make sure you have the latest version of Docker installed. If you're using macOS or Windows, ensure you have Docker Desktop installed. For Linux users, make sure you have Docker Engine installed.

### **Local Database Setup with Docker**

During the local database setup with Docker, the app runs a script that checks if the Docker daemon is running. If it's not, the script starts it in the background. Once Docker is up and running, the following command is executed to create a Docker container named **`fetch_take_home_db`**:

```bash
docker run --name fetch_take_home_db -p 3306:3306 -e MYSQL_ROOT_PASSWORD=password -v ./scripts/init.sql:/docker-entrypoint-initdb.d/init.sql mysql
```

This command is used to create a Docker container, expose port 3306, set the root password to 'password', and execute the **`init.sql`** script to create at least one table in the database for Prisma to connect to.

If you encounter issues with this command, try the following steps:

1. **Docker Installation**: Ensure that Docker is properly installed on your machine, and it is running.
2. **Stop Existing Container**: If a Docker container with the name **`fetch_take_home_db`** is already running, stop it using the following command:
    
    ```bash
    docker stop fetch_take_home_db
    ```
    
3. **Remove Existing Container**: If the container is not running, you can remove it with the following command:
    
    ```bash
    docker rm fetch_take_home_db
    ```
    
4. **Port Conflict**: In case port 3306 is already in use, you can change the port mapping in the **`docker run`** command to use a different port, such as 3307:
    
    ```bash
    bashCopy code
    docker run --name fetch_take_home_db -p 3307:3306 -e MYSQL_ROOT_PASSWORD=password -v ./scripts/init.sql:/docker-entrypoint-initdb.d/init.sql mysql
    
    ```
    

### **Troubleshooting App Issues**

If you encounter issues while using the app, follow these troubleshooting steps:

- **Node.js and Next.js**: Make sure you have Node.js version 18.7 installed on your machine, as well as the latest version of Next.js (13.5 as of this writing).
- **Development Mode**: Try running the app in development mode to check for any errors logged to the console.
- **Restart**: Attempt to resolve the issue by restarting the app.
- **Clear Browser Cache and Cookies**: Clear your browser's cache and cookies, as this can sometimes resolve problems with stale auth cookies.
- **Clear Next Cache**: Clear your Next.js cache `.next/`, as this can sometimes resolve problems with stale data.
- **Use a Different Browser**: If the issue persists, try using a different web browser.
- **Using Incognito Mode**: The app relies on an auth cookie being placed on the browser to verify the user. **`Incognito mode DOES NOT save this cookie`**. As a result, the app will not work in incognito mode.

### **Reporting Bugs**

If you continue to experience difficulties, consider [reporting a bug](https://github.com/rcervant/fetch-take-home/issues). When reporting a bug, please include the following information:

- A clear description of the issue you're facing.
- Detailed steps to reproduce the problem.
- The version of Node.js you're using.
- The version of Next.js you're using.
- The version of Docker you're using.

By providing this information, you'll help in the identification and resolution of any potential issues.