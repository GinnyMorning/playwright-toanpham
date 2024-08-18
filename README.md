
# Playwright Test Automation Project

This project is a Playwright setup using TypeScript for UI testing. The project supports multi-environment testing (sandbox, staging, production) and is structured for maintainability, scalability, and easy integration with CI/CD pipelines.

## Prerequisites

Ensure you have the following installed:

- [Node.js](https://nodejs.org/) (v16+)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/GinnyMorning/playwright-toanpham.git
   ```

2. Navigate to the project directory:

   ```bash
   cd playwright-toanpham
   ```

3. Install dependencies:

   ```bash
   npm install
   ```
   and
   ```bash
   npx playwright install
   ```

   or

   ```bash
   npm run setup
   ```

## Running Tests

### Run All Tests

```bash
npm run test
```

### Run Specific Tests

You can specify a test file or directory:

```bash
npx playwright test tests/cart.spec.ts
```

### Run Tests in Headed Mode

To see the browser while tests run:

```bash
npx playwright test --headed
```

### Run Tests in Serial

```bash
npm run test:serial
```
### Run Tests in Parallel

```bash
npm run test:parallel
```