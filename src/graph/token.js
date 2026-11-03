import { createParticipantMap } from './participants.js';

const TOKEN_PARTICIPANTS = ["team", "community", "investor", "foundation", "advisor"];
const createTokenMap = valueFor => createParticipantMap(valueFor, TOKEN_PARTICIPANTS);

export class Token {

    // allocationPolicy {
    //      float team,
    //      float investor,
    //      float advisor,
    //      float foudation,
    //      struct community {
    //          float airdrop,
    //          float staking,
    //          uint stakeingLifetime,
    //          uint stakingRewardRefreshPeriod,
    //          float stakingRewardDefactor
    //      }
    // }
    constructor(symbol, totalSupply, allocationPolicy) {
        this.symbol = symbol
        this.totalSupply = totalSupply

        // 获取 allocationPercent 数据
        this.allocationPercent = new Map();
        this.allocationPercent.set("team", allocationPolicy.allocationPercent.team);
        this.allocationPercent.set("community", allocationPolicy.allocationPercent.community.airdrop + allocationPolicy.allocationPercent.community.staking);
        this.allocationPercent.set("investor", allocationPolicy.allocationPercent.investor);
        this.allocationPercent.set("foundation", allocationPolicy.allocationPercent.foundation);
        this.allocationPercent.set("advisor", allocationPolicy.allocationPercent.advisor);

        // 初始化 allocatedAmount
        this.allocatedAmount = createTokenMap();

        // 获取 communityPolicy
        this.communityPolicy = {
            airdropPercent:             allocationPolicy.allocationPercent.community.airdrop,
            airdropTotalAmount:         allocationPolicy.allocationPercent.community.airdrop * totalSupply,
            stakingPercent:             allocationPolicy.allocationPercent.community.staking,
            stakingRewardTotalAmount:   allocationPolicy.allocationPercent.community.staking * totalSupply,
            stakingPool:                0,
            stakingRewardLifetime:      allocationPolicy.community.stakingLifetime,
            stakingRewardRefreshPeriod: allocationPolicy.community.stakingRewardRefreshPeriod,
            stakingRewardDefactor:      allocationPolicy.community.stakingRewardDefactor,
        }

        // 初始化 stakedAmount, stakedTotal, stakedAmountDelta 
        this.stakedAmount = createTokenMap();

        this.stakedTotal = 0;

        this.stakedAmountDelta = createTokenMap();

        // TODO stakedPercent 是否必要？
        
        // 初始化 freeMoney, freeMoneyTotal, freeMoneyDelta
        this.freeMoney = createTokenMap();

        this.freeMoneyTotal = 0;

        this.freeMoneyDelta = createTokenMap();

        // TODO freeMoneyPercent 是否必要？
    }

    // 执行测算逻辑
    run() {

    }

    // 执行 Delta 数据到 Commit 数据的更新
    update() {

    }
}
