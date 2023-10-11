## Getting Started

First, install the dependencies:

```bash
npm i
```

next: run the development server:
Options:

- Local: run the app locally with a mysql database running on docker (recommended)
### Local Setup with Docker
Important: You will need to install docker desktop (macOS/windows) or docker engine (linux)

run the following command in a new terminal to initialize the 
docker container with the mysql database
macOS/linux
```bash
npm run db:init
```

windows
```bash
npm run db:init-win
```

You now have a mysql DATABASE running on docker with the following credentials:
```bash
db name: my_db
db password: password
port exposed: 3306
```

### connect to the database with Prisma
next in a new terminal run the following command to connect to the database with prisma
```bash
npx prisma migrate dev
```bash
npm run setup
```



- Local: run the app locally with a mysql database running on a cloud provider 
--- [PlanetScale](https://planetscale.com/docs/tutorials/planetscale-quick-start-guide). (recommended: planetscale will handle migrations for you)
--- [Railway](https://docs.railway.app/databases/mysql).

- a few files are needed before running the app:
  - .env.local: Nextjs specific environment variables needed to run the app
  - .env: prisma looks for this file to get the database url

.env.local
```bash
NEXT_PUBLIC_ORIGIN = "http://localhost:3000"
NEXT_PUBLIC_FETCH_COOKIE_NAME=
NEXT_PUBLIC_FETCH_API_URL=
```

.env
```bash
DATABASE_URL=
```

If you decided to run the app locally with a mysql database running on docker, you will need to install docker desktop (macOS/windows) or docker engine (linux)

run the following command to initialize the docker container with the mysql database
macOS/linux
```bash
npm run db:init
```
windows
```bash
npm run db:init-win
```

You now have a mysql DATABASE running on docker with the following credentials:
```bash


```

```bash
npm run setup
```

```bash
npm run
npm run dev
```

- Docker: spin up a docker container with the app and a mysql database

```bash
docker-compose up


```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
