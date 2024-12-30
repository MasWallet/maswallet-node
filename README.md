# MasWallet Node.js SDK

A Node.js SDK for interacting with the [MasWallet API](https://wallet-docs.maschain.com/). This SDK provides an easy-to-use wrapper for developers to integrate MasWallet's blockchain services into their applications.

---

## Features

- Simplified access to MasWallet API endpoints.
- Supports both **TypeScript** and **JavaScript**.
- Fully typed for a better developer experience.
- Built-in error handling.
- Supports customizable configurations.

---

## Installation

```bash
npm install maswallet-node
```

or

```bash
yarn add maswallet-node
```

---

## Quick Start

### Import the SDK

```typescript
// Using TypeScript or ES Module
import { ApiClient } from 'maswallet-node';

// Using CommonJS
const { ApiClient } = require('maswallet-node');
```

### Initialize the Client

```typescript
const client = new ApiClient({
  apiClientId: '<YOUR_API_KEY>',
  apiClientSecret: '<YOUR_API_SECRET>',
  baseUrl: 'https://wallet-api.maschain.com', // Optional: defaults to MasWallet's official base URL
});
```

### Example Usage

#### Create a Transaction
```typescript
const transaction = await client.createTransaction({
  walletAddress: '<WALLET_ADDRESS>',
  contractAddress: '<CONTRACT_ADDRESS>',
  abiFunction: '<ABI_FUNCTION>',
  functionArgs: ['<FUNCTION_ARG_1>', '<FUNCTION_ARG_2>'],
  redirectUrl: '<REDIRECT_URL>', // Optional: defaults to the current URL
});
console.log(transaction);
```

---

## Documentation

### Methods

#### `createTransaction(params: TransactionParams): Promise<TransactionResponse>`
Creates a new transaction on the MasWallet blockchain.

#### `getTransaction(transactionId: string): Promise<TransactionDetails>`
Retrieves details of a specific transaction.

For full method documentation, refer to the [API Documentation](https://docs.maschain.com/).

---

## Configuration

The `ApiClient` supports the following configuration options:

| Option           | Type     | Default                          | Description                               |
|------------------|----------|----------------------------------|-------------------------------------------|
| `apiClientId`    | `string` | `undefined`                      | Your MasWallet API client ID.             |
| `apiClientSecret`| `string` | `undefined`                      | Your MasWallet API client secret.         |
| `baseUrl`        | `string` | `https://api.maschain.com/api`       | Base URL for the MasWallet API.           |
| `timeout`        | `number` | `5000`                           | Request timeout in milliseconds.          |

---

## Error Handling

Errors thrown by the SDK are instances of `MasWalletError`, which provides the following properties:

- `code`: Error code returned by the API.
- `message`: A descriptive error message.
- `details`: Additional error information (if any).

### Example

```typescript
try {
  const transaction = await client.createTransaction({ ... });
} catch (error) {
  if (error instanceof MasWalletError) {
    console.error('Error Code:', error.code);
    console.error('Error Message:', error.message);
  } else {
    console.error('An unexpected error occurred:', error);
  }
}
```
