import { ReferenceCurrencyUuid, TimePeriod } from "../constant/Coins.const";

export interface CoinResponse {
  uuid: string;
  symbol: string;
  name: string;
  description: string;
  color: string;
  iconUrl: string;
  websiteUrl: string;
  links: Array<any>;
  supply: Array<any>;
  "24hVolume": string;
  marketCap: string;
  price: string;
  btcPrice: string;
  change: string;
  rank: number;
  numberOfMarkets: number;
  numberOfExchanges: number;
  sparkline: Array<any>;
  allTimeHigh: Array<any>;
  coinrankingUrl: string;
}
export interface CoinInput {
  referenceCurrencyUuid?: ReferenceCurrencyUuid;
  uuid : string;
  timePeriod?: TimePeriod;
}