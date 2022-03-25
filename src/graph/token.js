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
        this.allocatedAmount = new Map();
        this.allocatedAmount.set("team", 0);
        this.allocatedAmount.set("community", 0);
        this.allocatedAmount.set("investor", 0);
        this.allocatedAmount.set("foundation", 0);
        this.allocatedAmount.set("advisor", 0);

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
        this.stakedAmount = new Map();
        this.stakedAmount.set("team", 0);
        this.stakedAmount.set("community", 0);
        this.stakedAmount.set("investor", 0);
        this.stakedAmount.set("foundation", 0);
        this.stakedAmount.set("advisor", 0);

        this.stakedTotal = 0;

        this.stakedAmountDelta = new Map();
        this.stakedAmountDelta.set("team", 0);
        this.stakedAmountDelta.set("community", 0);
        this.stakedAmountDelta.set("investor", 0);
        this.stakedAmountDelta.set("foundation", 0);
        this.stakedAmountDelta.set("advisor", 0);

        // TODO stakedPercent 是否必要？
        
        // 初始化 freeMoney, freeMoneyTotal, freeMoneyDelta
        this.freeMoney = new Map();
        this.freeMoney.set("team", 0);
        this.freeMoney.set("community", 0);
        this.freeMoney.set("investor", 0);
        this.freeMoney.set("foundation", 0);
        this.freeMoney.set("advisor", 0);

        this.freeMoneyTotal = 0;

        this.freeMoneyDelta = new Map();
        this.freeMoneyDelta.set("team", 0);
        this.freeMoneyDelta.set("community", 0);
        this.freeMoneyDelta.set("investor", 0);
        this.freeMoneyDelta.set("foundation", 0);
        this.freeMoneyDelta.set("advisor", 0);

        // TODO freeMoneyPercent 是否必要？
    }

    // 执行测算逻辑
    run() {

    }

    // 执行 Delta 数据到 Commit 数据的更新
    update() {

    }
}
