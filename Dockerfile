FROM node:18

WORKDIR /app

RUN apt update && apt install vim -y

COPY package*.json ./

RUN npm install 

COPY . .

EXPOSE 3000

CMD ["npm", "run", "dev"]
