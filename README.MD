# E-skeleton-login


E-skeleton-login is a docker project that will deploy in seconds a login/register system with Node.js and MongoDB so you can use it for your projects.

In order to acces this login Api the endpoint should be:
- http://login:8888

You can search more of my E-skeletons docker projects and try to combine them in order to create a complete backend for your apps.
  - iOs_E-skeleton
  - Vue_E-skeleton
  - Api_E-skeleton

### Tech

E-skeleton-login uses a number of open source projects to work properly:

* [node.js] - Evented I/O for the backend
* [Express] - Fast node.js network app framework 
* [MongoDB] - Classified as a NoSQL database program

### Installation

E-skeleton-login requires [Docker](https://www.docker.com/) to run.

If you have Docker already installed in your pc, then proceed with this commands:

```sh
$ git clone https://github.com/headStyleColorRed/E-skeleton-login.git
$ cd E-skeleton-login
$ docker-compose build
$ docker-compose up
```

For personal environments you may want to change the 8th line in /server/app.js

```sh
$ Change => const dbLink = "mongodb://mongo:27017/mongotest"
$ For    => const dbLink = "mongodb://localhost:27017/mongotest"
```

### Todos

 - Add testing
 - Add user data parser

License
----

MIT


**Free Software, Hell Yeah!**