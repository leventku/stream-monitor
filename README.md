# Stream Monitor App

Got this code challenge idea from a fellow engineer and reiterated myself using React Hooks in place.

- create-react-app comes with complex structure. This simple boilerplate is fit for this small app

## Setting up:
1. in a terminal run

   `git clone https://github.com/leventku/.stream-monitor.git`
  
   to clone the repository.

2. change directory to `stream-monitor` and run:

   `npm i`
   
   to download the npm dependencies.

## To start application

- if you are using OS X, in a terminal inside the directory run:

  `npm run start:serve`
  
  to start backend services. Otherwise you need to update the `start:serve` npm script to point to the correct binary file.

- in another terminal inside the directory run:

  `npm start`
  
  to start frontend application.



## About the application

There are payments and the user would like to see the details and status of them. Such as; the date of payment initially started, amount of the payment and discount if any, status of the payment (pending /authorized / cancelled etc.)

For that there is a REST API `/transactions/:id` endpoint which returns transactions paginated.

When navigated to `localhost:1234` the app starts with state `lastRevealedPage = -1` and when `StreamMonitor` component is being initialized, the `React.useEffect` hook runs only once to call `getWithPageNumber` function which uses fetch API to get the data with `/transactions/0` and loads the initial page of the data.

The user also would like to change the sorting order of what is visible on this list by either `date` or `status` which is also handled by the `streamReducer` which is created by `React.useReducer` hook.

There's a button at the end of the page to load more data, which gets the `lastRevealedPage` from the state which is kept also by the `streamReducer`.

## TODO:
- Add detail view to be shown on click on a transaction on the list.
- Add a styled button for Load More button.
- Add Prop types and type checking with Flow.
- Completing snapshot tests for all components.
- Adding unit tests without testing implementation details.
- Add error notifications to UI instead of console errors.
