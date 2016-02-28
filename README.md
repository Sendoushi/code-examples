# Code examples

Just different examples of development code.
The idea is to have various examples for a scalable app.
The app retrieves data from reddit and presents it.

To test you need to clone and follow the next instructions...

**NOTE:** For all examples node is needed.

#### Disclaimer
The structure and dependencies aren't exactly the same.
For example, ```Backbone``` doesn't have font-awesome icons and is deprecated.

### Backbone

```bash
git checkout bedrock
npm install
npm run start-prod
```

##### Size stats
- Build folder: **152kb**
- app.js: **141kb**

***NOTE:*** This branch is completely deprecated.

### Redux + Riot.js

```bash
git checkout redux-riot
npm install
npm run build prod
npm run server
```

##### Size stats
- Build folder: **795kb**
- app.js: **212kb**

### Redux + React

```bash
git checkout redux-react
npm install
npm run build prod
npm run server
```

##### Size stats
- Build folder: **897kb**
- app.js: **312kb**
