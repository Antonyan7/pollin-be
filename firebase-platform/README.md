# Setup

1. Install firebase-tools. https://firebase.google.com/docs/cli#mac-linux-npm
1. Inside firebase-platform - Run following. You should login to GSuite account.

```
firebase login
```

1. Run firebase command to validate CLI is properly installed and accessing your account by listing your Firebase projects.

```
projects:list
```

1. Run `firebase use Nestproject-backend-dev` - to select Firebase project
1. Create .env file inside Firebase Function

In order to run all functions inside Emulator each codebase should have .env defined. Before running script secret should be pulled on root

1. Run `bash codebase-env-setup.sh`

# What this includesf

1. firebase.json: Configuration for Firebase CLI to understand what to emulate
1. .firebaserc
   - chatwoot widget setup
1. saved-data: This is folder that host firestore, firebase auth information to allow recovering/importing data after shutdown for firebase emulator
1. firestore.indexes.json: This manage firestore indexes
1. firestore.rules: This manage firestore rules
1. storage.rules: Rules for Firebase storage

# Run Firebase Emulators [Terminal 1]

This will emulate firebase auth, pub/sub, firestore, functions. It is defined in firebase.json

1. This step is required until webpack watch is configured

```
yarn --cwd functions build
```

1. This will import current data and allow adding more data for testing while running emulator. It will not save any new data added on local machine

```
yarn run start:firebase-emulators
```

1. This allows appending data to locally stored data. You can push it to GitHub Repo to allow sharing with other team members. This option should rarely used to avoid making saved data files big

```
yarn run start:firebase-emulators:save-my-data
```

1. This option will also rarely used. It will allow running emulator without importing any data

```
start:firebase-emulators:empty-data
```

# Configure Nest Services to talk to emulator. [Terminal 2]

1. Export Following variables to ensure Pub Sub is emulated and all PubSub Requests hit emulator

```
export PUBSUB_EMULATOR_HOST=localhost:9097
export FIRESTORE_EMULATOR_HOST=localhost:9098
export PUBSUB_PROJECT_ID='Nestproject-backend-dev'
```

1. Run the Nest Service e.g. yarn start:dev users

# Deploy from Local Machine

1. Make sure .env file is created inside function folder which needs to be deployed (./functions/:codebase:)
1. Select directory

```
cd functions/:codebase:
```

1. Deploy

```
yarn run deploy
```

## Chatwoot widget setup

1. To run the website locally, fetch the secret `Nestproject_CHATWOOT_WEBSITE_CONFIGURATION` and replace [config.json](https://github.com/OPN-Technologies/Nestproject-backend/blob/develop/firebase-platform/hosting/chat/config.json) file.

# Codebases

1. Structure in functions folder should be aligned with firebase.json. "codebase" value should match with folder name in functions

# Testing

1. Add .env on root level of firebase-platform
1. Run

```
yarn run test
```

# Pending

1.

```
export FIREBASE_AUTH_EMULATOR_HOST=localhost:9099
```

1. Consider @firebase/testing
