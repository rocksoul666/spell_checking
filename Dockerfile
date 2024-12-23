FROM node:20

WORKDIR /root/spell_checking

COPY package*.json ./

RUN npm i

COPY . .

EXPOSE 3249

CMD [ "node", "." ]