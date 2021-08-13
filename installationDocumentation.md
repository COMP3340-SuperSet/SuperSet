#Installation Documentation

##Local Installation
Setting up an instance of SuperSet on your device, you will need the following (in order):
- XAMPP Apache Server
- MySQL Workbench
- php
- NodeJs/npm
- ReactJs

###XAMPP Apache Server
Go to the Apache website and [download and install XAMPP](https://www.apachefriends.org/index.html)

###MySQL Workbench

###php

###NodeJs/npm
Go to the NodeJs website and [download and install node.](https://nodejs.org/en/)

Once downloaded, open terminal and verify its download with the command:
`node -v`

###Repository
Once the above have been downloaded, you are ready to clone our repository onto your system. Create a folder for your workspace, navigate to it in terminal and paste the following command:
`git clone https://github.com/COMP3340-SuperSet/SuperSet.git`

In order to install all modules used, run:
`npm install --save`

To bring the database migrations into your database, run:
`php artisan migrate:fresh`

To set up file storage so that images are stored properly, run:
`php artisan storage:link`

Now finally, in order to run our application on your node server, run these two commands in two separate terminals:
First: `php artisan serve`
Second: `npm run watch`
