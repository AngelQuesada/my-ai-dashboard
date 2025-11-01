# My AI Dashboard

My AI Dashboard is a personal AI automation and query dashboard. It's a Progressive Web App (PWA) built with Next.js, Supabase, and Material UI.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

You'll need to have [Node.js](https://nodejs.org/) (version 18 or higher) and [npm](https://www.npmjs.com/) installed on your machine.

### Installation

1.  Clone the repo
    ```sh
    git clone https://github.com/your_username_/my-ai-dashboard.git
    ```
2.  Install NPM packages
    ```sh
    npm install
    ```
3.  Set up your environment variables. Copy the `.env.development.example` file to a new file named `.env.development.local` and fill in the required values.
    ```sh
    cp .env.development.example .env.development.local
    ```
    You'll need to do the same for the testing environment, using the `.env.testing.example` file.
    ```sh
    cp .env.testing.example .env.testing.local
    ```

### Running the Development Server

To run the development server, use the following command:

```sh
npm run dev
```

This will start the development server on [http://localhost:3000](http://localhost:3000).

## Testing

The project includes both unit and end-to-end tests.

### Unit Tests

To run the unit tests, use the following command:

```sh
npm run test
```

This will run the Jest tests and output the results to the console.

### End-to-End Tests

To run the end-to-end tests, use the following command:

```sh
npm run test:e2e
```

This will start the development server, run the Playwright tests, and then shut down the server.

## Project Structure

The project is organized as follows:

-   `src/app`: Contains the pages for the application.
-   `src/components`: Contains the reusable React components.
-   `src/utils`: Contains utility functions, such as the Supabase client.
-   `tests`: Contains the unit and end-to-end tests.
-   `public`: Contains the static assets for the application.

## Built With

-   [Next.js](https://nextjs.org/) - The React framework for production.
-   [Supabase](https://supabase.io/) - The open source Firebase alternative.
-   [Material UI](https://mui.com/) - The React UI library.
-   [Gemini](https://gemini.google.com/) - The AI model from Google.
-   [Jest](https://jestjs.io/) - The JavaScript testing framework.
-   [Playwright](https://playwright.dev/) - The end-to-end testing framework.
