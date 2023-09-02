<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

## Prerequisites
```bash
Node.js (v20.5.1)
Yarn
TypeScript
PostgreSQL Database Server
```

## Installation

```bash
$ cp .env.example .env
$ yarn install
```

## Running the app

```bash
# development watch mode
$ yarn run start:dev

# production mode
$ yarn run build
$ yarn run start:prod
```

## API
```bash
# app endpopints
http://localhost:3000/api/swagger

headers: {
  Authorization: "Bearer token"
}

# to get Bearer token needs to register a new user and sign in at first
```

## Test

```bash
# unit tests
$ yarn run test

# e2e tests
$ yarn run test:e2e

# test coverage
$ yarn run test:cov
```


