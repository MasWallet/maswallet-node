export interface TransactionSession {
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

export interface LoginSession {
  sessionId: string;
  redirectUrl: string;
}
