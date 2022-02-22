# MERN Stack Boilerplate

## Installations

### Node

* For Linux:
```
curl -sL https://deb.nodesource.com/setup_13.x | sudo -E bash -
sudo apt-get install -y nodejs
```

* For Mac:
```
brew install node
```

### MongoDB

Install the community edition [here](https://docs.mongodb.com/manual/installation/#mongodb-community-edition-installation-tutorials).


### React

```
npm install -g create-react-app
```

* To create a new React app:
```
create-react-app name_of_app
```

* To run the app, cd into the directory and do:
```
npm start
```

## Running the boilerplate

* Run Mongo daemon:
```
sudo mongod
```
Mongo will be running on port 27017.


* Run Express Backend:
```
cd backend/
npm install
npm start
```

* Run React Frontend:
```
cd frontend
npm install/
npm start
```

Navigate to [http://localhost:3000/](http://localhost:3000/) in your browser.

# Deploying

The mern stack is deployed using nginx and docker-compose.  
```
docker-compose up -d 
```
This will deploy the entire mern stack and might need a strong network connection else you might experience Socket error

Then open chrome and use  http://127.0.0.1:81/ to see the assignment. In the deployed half I have used Mongo Atlas hence it might not work on iiit VPN but you can test it over your wifi generally by using the port 192.168.1.10:81 .

As discussed with the TA due to usage of ATLAS instead of dockerising mongodb running on local 192.168.1.10:81 port is also fine as long as it can be shown working on another device.