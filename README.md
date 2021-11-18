![example workflow](https://github.com/ringcentral/call-performance-analytics-demo-node/actions/workflows/node.js.yml/badge.svg)

# Call Performance Demo Application (Node.JS)

This is a straight forward Node.JS based console application that demonstrates how to use RingCentral's Analytics (Call Performance APIs). The resulting JSON is rendered on the standard console. 

This application setup to use RingCentral's Password flow based authentication and it needs to have 'Analytics' permission enabled. Currently private beta API users can request theier application to have this permission by contacting us.

More information about that can be found in the [developer guide.](https://developers.ringcentral.com/guide/analytics)

## PreRequisite:

1. Node.JS
2. Have a RingCentral Application with 'Analytics Permission' in your Developer Console. If not, you can easily create one by signing up for a [free developer account.] (https://developers.ringcentral.com/login.html#/). Make sure the app supports 'password flow' based authentication.
3. Get the RingCentral Application ID & Secret Key from Developer Console. This application uses "Production" credentials but you can also use your "Sandbox" credentials.
4. Update the values for the .env file based on the previous step

## Steps to run the program

1. Clone/Download this GitHub Repository
2. Open the project in any IDE such as Visual Studio Code
3. Make sure your the .env file has all the values for the various fields and also make sure not to expose your Application Credentials publicly. You can even add .env file to your .gitignore file.
4. Run the following commands

```bash
cd <repo>
npm install
npm run-script run
```
5. Open Console to see the JSON Response shown for both 'Aggregrate' and 'Timeline' data as returned by the two Call Performance APIs.

## Steps to run Tests

The following command will run the Mocha Unit Tests

```
npm test
```



