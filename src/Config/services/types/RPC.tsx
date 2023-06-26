export interface Stake {
  totalAmountStaked: number;
  rewardsEarned: number;
  validatorAddress: string;
}

export interface ViewFunctionOptions {
  methodName: string;
  args?: object;
}

export interface Swap {
  tokenIn: string;
  tokenOut: string;
  slippageTolerance: string;
  pairPrice: string;
  expectedPrice: string;
  tradingFee: string;
  minimumReceived: string;
}
