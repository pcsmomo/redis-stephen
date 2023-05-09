# Section 3: E-Commerce App Setup

## 24. Don't Skip This Video

1. Node JS Setup
2. extract the 'rbay.zip'
3. npm install
4. add connection info into `.env`
5. npm run dev

```sh
npm install
npm run dev -- --open
```

## 25. Redis Client Libraries

- [node-redis](https://github.com/redis/node-redis)
- [ioredis](https://github.com/luin/ioredis)
  - not sure it'd be used in this course?

## 27. Redis Design Methodology

- What type of data are we storing
  - Strings
- Should we be concerned about the size of data?
  - YES! Only cache certain pages
- Do we need to expire this data?
  - Yes, expire after some number of minutes/hours/days
- What will be the key naming policy be for this data?
- Any business-logic concerns?
  - Nope
