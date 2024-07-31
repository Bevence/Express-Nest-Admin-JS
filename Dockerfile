FROM node:20

WORKDIR /usr/app

# ENV COOKIE_SECRET=anfUuNn0jQ42PgxeEMVD1SKvCdukfFCj
# ENV DATABASE_URL=postgres://postgres:postgres@localhost:5435/test_db


COPY package.json ./

RUN npm install 

COPY . .

RUN npm i -g typescript

RUN npx prisma generate

RUN npm run build


EXPOSE 4000

CMD npm run start
