# Node.js web service
Sample Web API implementation using Express on Node.js and MongoDB.

## How to run it
### With docker (easy way)
```bash
docker-compose up
```

### On Fedora/Red Hat
Install Node.js
```bash
sudo dnf module install nodejs:14/development
```

Install MongoDB
```bash
sudo dnf install mongodb-org mongodb-org-server 
```

Configure credentials of MongoDB
```bash
mongod --port 27017 --dbpath /data/db1
mongo --port 27017

use admin
db.createUser(
  {
    user: "root",
    pwd: "example",
    roles: [ { role: "root", db: "admin" } ]
  }
)
```

In project root, run
```bash
npm install
node index.js 
```

With that, application is ready to accept requests at ```localhost:3000```



