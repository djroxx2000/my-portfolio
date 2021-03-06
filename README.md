# Let's Talk

I created this website to serve as a simple web based portfolio detailing my projects and work experience while adding a fun little visitor chat to keep it lively.

The front end is hosted at Netlify using a custom domain name from freenom.
The backend is hosted at heroku using heroku's internal postgres server as the data store. I chose these 2 because they are both very feature-rich with 0 costs for frontend and backend deployments respectively.
The tech stack is basically just JavaScript. React for client and Node.js using express and socket.io for the server.

You can visit at https://dhananjay.cf

---

## If you feel like running this locally or making some changes, here's what you need:

### Pre-requisites:

1. node.js (v14.17.3)
2. npm (v8.1.4)

### Steps:

1. Fork and clone the repo to your local machine
2. Run `npm i` in both the client and server folder
3. Add .env to server folder for `PORT`, `ROOMID` and `NODE_ENV` and to client folder for `REACT_APP_SERVER_URL`
4. Run `npm start` to start react client in dev mode on port 3000
5. Run `npm run dev` to start dev environment which will watch and auto rebuild on changes
6. Run `npm build` in client folder to generate production ready client
7. Modify .env for production environment in server folder
8. Run `npm run start` in server folder for production server with 404 handling
