# Call Performance Demo Application (Node.JS)

This is a straight forward Node.JS based console application that demonstrates how to use RingCentral's Analytics (Call Performance APIs). The resulting JSON is rendered on the standard console. 

More information about that can be found in the [developer guide.](https://developers.ringcentral.com/guide/analytics)

## PreRequisite:

1. Node.JS
2. Have a RingCentral Application with 'Analytics Permission' in your Developer Console. If not, you can easily create one by signing up for a [free developer account.] (https://developers.ringcentral.com/login.html#/)
3. Get the RingCentral Application ID & Secret Key from Developer Console. You need the "Production" credentials as that will be used for authentication purpose.

## Steps to run the program

1. Clone/Download this GitHub Repository
2. Open the project in any IDE such as Visual Studio Code
3. Edit the .env file with your Application Security Credentials

```
cd <repo>
npm install
npm run

```
4. Open Console to see the JSON Response showing both 'Aggregrate' and 'Timeline' data as returned by the two Call Performance APIs.

