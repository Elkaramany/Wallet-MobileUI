import {parseTokenAmount, roundUSNExchange} from '../utils/Format';

import {FTtoken} from '../types/FT';
import {UsnContract} from '../types/ContractCallFunction';
import {config} from '../Config';
import {viewFunction} from '../utils/RpcUtils';

export const swap = async (accountId: string) => {};

export const fetchCommission = async (
  amount: number,
  exchangeRate: number,
  token: string,
) => {
  const currentToken = token === 'NEAR';

  const currentExchangeRate = +exchangeRate / 10000;

  const usnAmount = (
    currentToken
      ? parseTokenAmount(roundUSNExchange(amount, exchangeRate) * 10 ** 18, 0)
      : parseTokenAmount(amount * 10 ** 18, 0)
  ).toString();

  let result =
    (await viewFunction(config.USDN_CONTRACT_NAME, UsnContract.SPREAD, {
      amount: usnAmount,
    })) / 1000000;

  return {
    result: currentToken
      ? currentExchangeRate * amount * result
      : (amount / currentExchangeRate) * result,
    percent: Number(result * 100)?.toFixed(2),
  };
};
