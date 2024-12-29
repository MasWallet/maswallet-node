import axios, { type AxiosInstance } from "axios";
import type { LoginSession, TransactionSession } from "./types";

export class ApiClient {
  private client: AxiosInstance;

  constructor({
    apiClientId,
    apiClientSecret,
    baseUrl,
  }: {
    apiClientId: string;
    apiClientSecret: string;
    baseUrl: string;
  }) {
    this.client = axios.create({
      baseURL: baseUrl || "https://wallet-api.maschain.com",
      headers: {
        client_id: `${apiClientId}`,
        client_secret: `${apiClientSecret}`,
        "Content-Type": "application/json",
      },
    });
  }

  // Method: Initiate a Login Session
  async createLoginSession(data: {
    redirectUrl: string;
  }): Promise<LoginSession> {
    console.log(data);
    const response = await this.client.post("/dapp/initiate-login", data);
    return response.data;
  }

  async verifyLoginSignature(data: {
    nonce: string;
    signature: string;
    walletAddress: string;
  }): Promise<LoginSession> {
    const response = await this.client.post(
      "/dapp/verify-login-signature",
      data
    );
    return response.data;
  }

  // Method: Create a Transaction Session
  async createTransactionSession(data: {
    walletAddress: string;
    contractAddress: string;
    abiFunction: string;
    functionArgs: string[];
    redirectUrl?: string;
  }): Promise<TransactionSession> {
    try {
      const response = await this.client.post(
        "/dapp/prepare-transaction",
        data
      );
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        // Axios error, can check for the response
        if (error.response) {
          const errorMessage =
            error.response.data?.message || "API Error - Bad response";
          const errorCode = error.response.status;
          console.error(`Error ${errorCode}: ${errorMessage}`);
          throw new Error(`Error ${errorCode}: ${errorMessage}`);
        }
        if (error.request) {
          // No response received
          console.error("API Error - No response received from server");
          throw new Error("No response received from server");
        }
      }
      // Other errors
      const errorMessage =
        error instanceof Error ? error.message : "Unknown Error";
      console.error(`Error - ${errorMessage}`);
      throw new Error(errorMessage);
    }
  }

  // Method: Get a Transaction Session by ID
  async getTransactionSession(data: {
    transactionSessionId: string;
  }): Promise<TransactionSession> {
    const response = await this.client.get(
      `/dapp/transaction-session/${data.transactionSessionId}`
    );
    return response.data;
  }
}
