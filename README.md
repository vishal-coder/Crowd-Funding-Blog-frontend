# [FundeME100](https://fundme100.netlify.app/) - Website



## Brief Description

FundeME100 website is a platform where people can look around different campaigns running for various causes and can support them by donating Rs.100.The donation is done through RazorPay Payment gateway

### `Short tech summary`
  - Implemented authentication,authorization using Json Web Token for login,along with CRUD features.
  - Integrated payment gateway by RazorPay API to collect donation and display transaction status.
  - Implemented [MongoDB ChangeStream](https://www.mongodb.com/docs/manual/changeStreams) for push notification to admin about payments


## Features

### `User features`
  - User can see the ongoing campaigns on the landing page.
  - User can click the campaign they want to support and will be directed to that specific campaign`s page where they can see the brief campaign details.
  - User can then support campaign by clicking on DONATE  button
  - User can see the transaction status and donation amount on individual donner on detailed dashboard 
  
  
### `Admin features`
  - Admin features include all the user features.
  - Admin can approve or reject campaign of user ,if rejected campaign will not be visible on page and if approved it will be visible to all users
  - Admin can see payment details of all campaign so to keep watch on all payment related activities
  - Admin can delete the campaign ,if the aim of the campaign is fulfilled.
  
## Tech Used
  - ReactJS
  - ExpressJS
  - NodeJS
  - MongoDB and MongoDB ChangeStream
  - Socket.io - for Push Notification
  - RazorPay Payment Gateway for Payment Integration

## Screenshots📷

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
