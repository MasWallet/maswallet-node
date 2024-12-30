export interface LoginSession {
  redirectUrl: string;
  sessionId: string;
}

export interface TransactionSession {
  id: string;
  status: "pending" | "completed" | "failed";
  nonce: string;
  signature?: string;
  address?: string;
  organisationId: string;
  apiKeyId: string;
  redirectUrl?: string;
  createdAt: Date;
  expiresAt: Date;
}

export interface ApiClientConfig {
  apiClientId: string;
  apiClientSecret: string;
  baseUrl?: string;
}

export interface CreateLoginSessionParams {
  redirectUrl: string;
}

export interface VerifyLoginSignatureParams {
  nonce: string;
  signature: string;
  walletAddress: string;
}

export interface CreateTransactionSessionParams {
  walletAddress: string;
  contractAddress: string;
  abiFunction: string;
  functionArgs: string[];
  redirectUrl?: string;
}

export interface CreateTransactionSessionResponse {
  sessionId: string;
  transactionObject: {
    chainId: number;
    gasLimit: number;
    gasPrice: number;
    nonce: number;
    to: string;
    value: string;
    data: `0x${string}`;
  };
  signingUrl: string;
}
