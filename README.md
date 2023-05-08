# Redis: The Complete Developer's Guide

Redis: The Complete Developer's Guide by Stephen Grider

## File structure

- RedisInsight
  - `yarn --cwd redisinsight/api/ start:dev`
  - `yarn start:web`
  - `open -a "Google Chrome.app" http://127.0.0.1:8080/ http://localhost:5050/api/docs`
- 03-e-commerce-app
  - run redis: `docker compose up`
  - rbay
    - `npm install`
    - `npm run dev` -> localhost:3000

# Details

<details open> 
  <summary>Click to Contract/Expend</summary>

## RedisInsight

RedisInsight is a visual tool that provides capabilities to design, develop and optimize your Redis application.

- [RedisInsight Github](https://github.com/RedisInsight/RedisInsight)
- TypeScript, Electron, SASS, Nest, testcafe

### Why using RedisInsight

> I would like to use it for throughout this course as this project is a great opensource \
> that I could learn so many things such as
>
> - Electron
> - API with nest server
> - e2e testing with testingcafe
> - as well as redis interface and commends and so on.

- fork RedisInsight to my github
- `git clone git@github.com:pcsmomo/RedisInsight.git`

### Install and build

[RedisInsight - Wiki](https://github.com/RedisInsight/RedisInsight/wiki/How-to-build-and-contribute)

- install dependencies and run it

```sh
yarn install
# ValueError: invalid mode: 'rU' while trying to load binding.gyp
# https://github.com/nodejs/node-gyp/issues/2219
```

#### check the python and node version

- Python: v3.10
- Node: v16

```sh
# change the python version from 3.11 to 3.10
pyenv versions
#   system
#   3.9.15
#   3.10.7
# * 3.11.3 (set by /Users/noah/.pyenv/version)
pyenv local 3.10.7
python --version
# Python 3.10.7
```

```sh
nvm list
#         v16.15.0
# ->     v18.1.0
nvm use lts/gallium
node --version
# v16.15.0
```

#### Install dependencies

```sh
yarn install
yarn --cwd redisinsight/api/
```

#### Change the default port for API

5000 -> 5050

because for mac, the port 5000 is occufied, https://developer.apple.com/forums/thread/682332

- `RedisInsight/configs/webpack.config.web.prod.babel.js`
- `RedisInsight/redisinsight/api/config/default.ts`

#### Run for web

```sh
# run api server
yarn --cwd redisinsight/api/ start:dev

# run web server
yarn start:web
```

- http://localhost:5050/api/docs
  - Swagger API Documentation
- http://127.0.0.1:8080/
  - Web interface

#### Run Electron desktop app

```sh
# build the desktop app
yarn build:statics

# run api server
yarn --cwd redisinsight/api/ start:dev

# run the desktop app
yarn start:main # hmm doesn't work at the moment

# yarn start # on the version, b04c050b942e7ff17257e1027a0607cefe99fb3a, on March, 2023, works for me.
```

- connect to 127.0.0.1:6379 to see the list of keys on my local redis

## Section 1: Get Started Here!

### 4. Why Use Redis?

Redis is fast

- All data is stored in memory
- Data is organized in simple data structures
- Redis has a simple feature set

### 5. Initial Setup

- [Redis Cloud](https://app.redislabs.com/)
- [rbook - Redis Javascript Notebook](http://rbook.cloud/)
- [npm rbook - npx rbook](https://www.npmjs.com/package/rbook)
  - it doesn't look like the latest version

## Section 2: Commands for Adding and Querying Data

### 8. Basic Commands

#### list of the data type

[Redis Documentation - Data Types](https://redis.io/docs/data-types/)

- String: Store plain string or number
- List: List of strings
- Hash: Collection of key-value pairs
- Set: Set of strings (each string is unique)
- Sorted Set: Set of strings in a particular order
- Bitmap: Kind of like a collection of booleans
- Hyperloglog: Kind of like a collection of booleans
- JSON: Nested JSON structure
- Index: Internal data used for searching

### 9. Documentation on Commands

[⭐️ Redis Commands Documentation](https://redis.io/commands)

# Documentations

- [Section 2: Commands for Adding and Querying Data](./02-basic-commands/README-02.md)
- [Section 3: E-Commerce App Setup](./03-e-commerce-app/README-03.md)

</details>
