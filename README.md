# Nestproject Backend

Backend services for Nestproject mobile application

## Setup

### Prerequisites

Install 
- NVM & Node.js v20.9.0
  - NVM should be installed here $HOME/.nvm
- Yarn v1.22.22
  - Yarn Path should be added to ~/.zshenv & ~/.zshrc for Mac
- Docker


### Local Project Setup

Install packages

```
yarn install
```


### Set environment variables


Environment variables cannot be set by default in the project for security reasons.

To get them:

- Install `gcloud` CLI on your machine

#### Sign in to your account

```
gcloud auth login
```

#### Set the project

```
gcloud config set project Nestproject-backend-dev
```
#### Navigate to the project root in terminal

Create .env file for apps

```
gcloud secrets versions access latest --secret=CLOUD_RUN_SERVICES > ./.env
```

For Testing Create .env file for tests
```
gcloud secrets versions access latest --secret=INTEGRATION_TESTS_GAE_V3 > ./.env
```

### Install docker

https://docs.docker.com/desktop/mac/install/

#### Run MySQL container

```
docker-compose up -d
```

### Sync SQL DB Schema

Make sure database is running and connection string from .env is correct.

Use TypeORM CLI to sync all models from apps folder to SQL database
Before migration - connect to MySql and create dataBase: `Nestproject_services` (e.g.: DBeaver)

#### Update Right Permissions for two users 
1. CREATE USER 'Nestproject_app_user'@'%' IDENTIFIED WITH mysql_native_password BY '6ASf7362jdhsg!';
1. REVOKE ALL PRIVILEGES ON *.* FROM 'Nestproject_app_user'@'%';
1. GRANT Select ON Nestproject_services.* TO 'Nestproject_app_user'@'%';
1. GRANT Insert ON Nestproject_services.* TO 'Nestproject_app_user'@'%';
1. GRANT Update ON Nestproject_services.* TO 'Nestproject_app_user'@'%';
1. GRANT Delete ON Nestproject_services.* TO 'Nestproject_app_user'@'%';

1. CREATE USER 'Nestproject_migration_user'@'%' IDENTIFIED WITH mysql_native_password BY '6ASf7362jdhsg!';
1. REVOKE ALL PRIVILEGES ON *.* FROM 'Nestproject_migration_user'@'%';
1. GRANT Select ON Nestproject_services.* TO 'Nestproject_migration_user'@'%';
1. GRANT Insert ON Nestproject_services.* TO 'Nestproject_migration_user'@'%';
1. GRANT Index ON Nestproject_services.* TO 'Nestproject_migration_user'@'%';
1. GRANT Delete ON Nestproject_services.* TO 'Nestproject_migration_user'@'%';
1. GRANT Create ON Nestproject_services.* TO 'Nestproject_migration_user'@'%';
1. GRANT Alter ON Nestproject_services.* TO 'Nestproject_migration_user'@'%';
1. GRANT Update ON Nestproject_services.* TO 'Nestproject_migration_user'@'%';
1. GRANT REFERENCES ON Nestproject_services.* TO 'Nestproject_migration_user'@'%';
1. GRANT DROP ON Nestproject_services.* TO 'Nestproject_migration_user'@'%';
1. GRANT TRIGGER ON Nestproject_services.* TO 'Nestproject_migration_user'@'%';

#### Login to MySQL server (optional)
sudo mysql --defaults-file=/etc/mysql/debian.cnf

#### Run following command from MySQL CLI (optional)
set global log_bin_trust_function_creators=1;
```
cd ./migrations
yarn run prepare
yarn run schema-sync
```

Run service

```
yarn run start:dev [SERVICE]
```

You can find services list in [nest-cli.json](./nest-cli.json) file

# Create new Migrations
To Create new Migration File

```
cd ./migrations
yarn run typeorm migration:create ./MigrationNAME
```

# Documentation

1. [Development Polcies](https://docs.google.com/document/d/1Iez6mYaCN5FO3Ehfb8MgCPe1MiSL_LRpLI5lj_3VFDg/edit#heading=h.e77667m46viu)
1. [API Rules](https://docs.google.com/document/d/1k4Klti1lgNGclCBsis3jZUiTdoeqHztQ1o-ClbjUUSI/edit#heading=h.hla1plb724e)
1. [Swagger Docs](https://Nestproject-backend-dev.nn.r.appspot.com/swagger/v1/swagger-service)

# What this Repo Includes

1. **Nestproject GAE Services**
   NestJS apps are deployed as GAE services. Each app is seperate GAE service
   1. apps [NestJS Apps]
   1. libs [NestJS libs]
1. **firebase-platform**
   This folder host all the code for firebase emulators, firebase functions. [Details](/firebase-platform/README.md)
1. **env-config**
   This is non senstive configuration for application and also stores non senstive configuration for different environments i.e. dev/qa/prod etc.
1. **firestore-indexes**
   This stores indexes for firestore. [Details](/firestore-indexes/README.md)
1. **functional-tests**
   Functional Test are using PactumJS. It should be created for every API. [Details](/functional-tests/README.md)


## Run in Debug Mode Locally

Debug mode in Visual Studio Code
1. Go to *Debug panel* (⇧⌘D)
2. Click create *launch.json* and select in the popup environment *Node.js*. May use default settings in *launch.json*. Also *launch.json* can be already created - than omit this step
3. For debugging users
   In *Run and debug* select/reselect *Node.js* and select in popup `Run script: start:debug user`
   Click the play button
   Now you can use breakpoints for requests created in swagger or Postman
4. For debugging tests
   Set breakpoints in controllers or in tests (jest)
   In *Run and debug* select *Node.js* and select in popup `Run script: test` for all tests
   Click the play button
5. For certain service or one test file: add new script into package.json and run it, examples:
   ```
   "start: debug booking": "nest start --debug --watch booking"
   "testOneFile": "jest --config jest.json FileNameDotTs -t ",
   "singleTest": "jest --config jest.json FileNameDotTs -t 'TestName'",
   ```
   
   
# Additional 
1. `libs/common` - for nest.js services and cloud functions. `libs/service-common` - only for nest.js services (controllers, services ...)


# Logging Policy
1. Not allowed use console.log.
2. Always use Bunyan log.
3. For Bunyan log should be passes function and event name enums as parameters it's defined in `libs/common/src/enums/activity-logs.ts`. 


```
 LogInfo(
   FunctionName,
   EventName,
   {data},
 )
```

# Tests

The fixtures work before the start of the tests, data is insert into the database, and after the end of the tests are deleted from the database

You need to add a new file for the fixture or write to the finished file (`.fixture.ts`)

The fixture files are located at the following path -> `libs/common/test/fixtures`

Need to be sure and mention that fixtures should be properly cleaned after running the tests.

Tօ add and remove fixtures to the database, you must use `.seed.ts` files

these files are located at the following path -> `seeds/firestore` or `seeds/typeorm`

For specific cases when it is necessary to delete or update the seed data, for these cases, you need to create a new fixture

**Run tests**

```
yarn run test [SERVICE]
```

Run tests and coverage (test coverage should be >=80%)

```
yarn run test:cov [SERVICE]
```
