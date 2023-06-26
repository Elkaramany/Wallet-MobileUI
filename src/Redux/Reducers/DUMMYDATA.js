import { randomColor } from '../../Config'

export const DUMMY_NETWORKS = [
    { id: 0, name: "Main", type: "Mainnet", color: randomColor(), selected: true },
    { id: 1, name: "Test", type: "Testnet", color: randomColor(), selected: false },
]

const DUMMY_COINS = [
    { id: 0, coin: "BNB", name: "Binance coin", amount: 4.66, total: 256.5641, selected: true, img: 'bnbCoin', gain: 0.9 },
    { id: 1, coin: "ETH", name: "Etheruem", amount: 5.66, total: 256.5641, selected: true, img: 'bnbCoin', gain: -0.9 },
    { id: 2, coin: "SYN", name: "Syntheix", amount: 6.66, total: 256.5641, selected: true, img: 'bnbCoin', gain: 3.2 },
    { id: 3, coin: "BIT", name: "Bitcoin", amount: 7.66, total: 256.5641, selected: true, img: 'bnbCoin', gain: -6 },
]

export const DUMMY_ACCOUNTS =
    [
        { id: 0, name: "Account 1", selected: true, coins: DUMMY_COINS },
        { id: 1, name: "Account 2", selected: false, coins: DUMMY_COINS },
        { id: 2, name: "Account 3", selected: false, coins: DUMMY_COINS },
        { id: 3, name: "Account 4", selected: false, coins: DUMMY_COINS },
    ]