System Integration
Group4
extra

//-- Suvajit

* Go to https://nodejs.org/en/ and install the latest version
* Check that node is installed by running the following codes one at a time. It will install npm as well.
This should list the versions for node and npm.
  * node -v
  * npm -v
* Now we need to install yarn globally. Run the following:
  * npm install -g yarn
* If you are on windows, you will have to restart your machine for yarn to work properly.
* After having these dependencies installed, now we have to install our project dependencies,
mainly called node-modules if you are familiar with node. These are the dependencies that our project depends on.
These dependencies are listed in the file package.json. If you run the following code, these will get installed specific
to our project and not globally. Make sure you are in the root path of your folder structure.
So after git cloning, if your project folder is named FoodTruck_SI, you should be inside that folder.
For example I am in the path ~/Documents/Fall18/FoodTruck_SI when I run any command. The code to installed
these project specific dependencies are
  * yarn install

* Now we have to build our project. This will build the code and output it into the public/dist folder
which will be used by the server to run. I have made a script in package.json named as build:dev
In order to run that, Run the following:
  * yarn run build:dev

* Now we have to include a file which has our firebase database details. Since this file contains access keys,
it should not be pushed to a public version control system, and so I have not committed that file to github.
Make a new file called .env.development
I will include the file in google drive as well. You can take it from there. 
When you download the file be sure to check the name is .env.development 
There should be a " . " before env as well.

* Now run the server as follows.
  * npm start

* You should be able to view the app at http://localhost:3000
