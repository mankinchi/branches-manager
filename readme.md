# Branches Manager

Are you a QA/Tester who has to test multiple separated issues, each on a separated branch and on a different URL?
Are you a Dev who wants to better communicate with QA/Tester to inform then what branch is on what URL?
Are you a Product Manager who wants to get a better view of what is happening in your team?

Then Branches Manager is for you.

## Preview
Go [here](https://branches-manager.herokuapp.com/) to have a look at the current dashboard.

In order to view the dashboard, you will have to register an account.

In order to use the automation feature, please refer to [Installation](#installation)

The preview server is up and running on a free account so the result will not be guaranteed. Your data will also be public. So please refrain yourself from putting sensitive data on here. Use it for the testing purposes only

## Features
* User system: each user will have their own set of URL/issues to control
* Overview: each user will be able to view what branches is available on which URL
* Communication: a QA/Tester can request the dev to change the current branch on the current URL to another for testing purposes.
* Automation: if you choose to do an additional setup in your environment, you can hook into the API of the application to automate the branch changes. If you choose not to, manual branch update is available through dashboard.

## Demo
[![DEMO](http://img.youtube.com/vi/hmAr8u20-4A/0.jpg)](http://www.youtube.com/watch?v=hmAr8u20-4A "Demo")

## Installation
### For the server (recommended for personal use)
* Clone the repo
* Create an Google account
* Create a project with Firebase [here](https://firebase.google.com/)
* Follow [this guide](https://firebase.google.com/docs/database/web/start) to set up an web application with Firebase and replace the config file in [db.js](/assets\js\db.js)
* Follow [this guide](https://firebase.google.com/docs/admin/setup#initialize-sdk) to download a new JSON key.
* Copy the `.env.sample` into `.env` and fill the data of the file with the downloaded JSON file.
* In Firebase Console, go to `Project Settings`, copy `Web API key` and paste the value into `.env` file with the key of `API_KEY`

### For the branch you want to track
* Register an account on the server
* Add a server name that you want to track
* Add some issues that you are working on
* If you don't have Node, install it [here](https://nodejs.org/en/download/). LTS version is fine.
* Your repo need to use git. If you haven't, run
```bash
git init
```
* Copy the content of the file [post-checkout.sample](/post-checkout.sample) into another file called `post-checkout` (with no extension) underneath `.git` folder.
* Copy the content of the file [branches-manager.config.json.sample](/branches-manager.config.json.sample) into another file called `branches-manager.config.json` in the root directory.
* Fill in the data of the file
    * serverName: the server name (make sure you add it on the server first)
    * useHttps: boolean - whether your server is running through HTTP or https
    * appHost: string - your server app host (without the protocol and port)
    * appPort: string or null - if you leave it empty, default port for HTTP is 80, HTTPS is 443
    * email: string - your account on the server
    * password: string - your password on the server
* Add the `branches-manager.config.json` to `.gitignore` to prevent publishing credentials.

## Usage
### For the server (recommended for personal use)
There are two modes for you to try out.

For development
```bash
npm run watch
```

For production
```bash
npm start
```

## Note
* You can read [this](https://medium.com/@devesu/how-to-secure-your-firebase-project-even-when-your-api-key-is-publicly-available-a462a2a58843) to protect your API key when publishing.

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License
[MIT](https://choosealicense.com/licenses/mit/)
