import { result } from 'lodash';
import { pow, divide, multiply, subtract, chain } from 'mathjs';
export class Action {

    constructor() {
        this.stakeMap = new Map();
        this.unstakeMap = new Map();
        this.vestMap = new Map();
    }
}

export class Stake {

    // rewardPolicy {
    //      BigInt rewardTotal;
    //      int rewardLifetime;
    //      int rewardRefreshPeriod;
    //      float rewardDefactor;
    // }
    constructor(stakeToken, rewardToken, rewardPolicy, stakeAmount) {
        this.stakeToken = stakeToken;
        this.rewardToken = rewardToken;
        this.rewardTotal = rewardPolicy.rewardTotal;
        this.rewardLifetime = rewardPolicy.rewardLifetime;
        this.rewardRefreshPeriod = rewardPolicy.rewardRefreshPeriod;
        this.rewardDefactor = rewardPolicy.rewardDefactor;

        // 获取 stakeAmount 数据
        this.stakeAmount = new Map();
        this.stakeAmount.set("team", stakeAmount.team);
        this.stakeAmount.set("investor", stakeAmount.investor);
        this.stakeAmount.set("advisor", stakeAmount.advisor);
        this.stakeAmount.set("foundation", stakeAmount.foundation);
        this.stakeAmount.set("community", stakeAmount.community);

        // 初始化 inPoolAmount, inPoolTotal, inPoolAmountDelta
        // inPoolAmount 表示已经质押在池子里的数量
        this.inPoolAmount = new Map();
        this.inPoolAmount.set("team", 0);
        this.inPoolAmount.set("investor", 0);
        this.inPoolAmount.set("advisor", 0);
        this.inPoolAmount.set("foundation", 0);
        this.inPoolAmount.set("community", 0);

        this.inPoolAmount = 0;

        this.inPoolAmountDelta = new Map();
        this.inPoolAmountDelta.set("team", 0);
        this.inPoolAmountDelta.set("investor", 0);
        this.inPoolAmountDelta.set("advisor", 0);
        this.inPoolAmountDelta.set("foundation", 0);
        this.inPoolAmountDelta.set("community", 0);

        // 初始化 rewardAllocated, rewardAllocatedTotal, rewardAllocatedDelta
        // rewardAllocated 表示已经分配的收益
        this.rewardAllocated = new Map();
        this.rewardAllocated.set("team", 0);
        this.rewardAllocated.set("investor", 0);
        this.rewardAllocated.set("advisor", 0);
        this.rewardAllocated.set("foundation", 0);
        this.rewardAllocated.set("community", 0);

        this.rewardAllocatedTotal = 0;

        this.rewardAllocatedDelta = new Map();
        this.rewardAllocatedDelta.set("team", 0);
        this.rewardAllocatedDelta.set("investor", 0);
        this.rewardAllocatedDelta.set("advisor", 0);
        this.rewardAllocatedDelta.set("foundation", 0);
        this.rewardAllocatedDelta.set("community", 0);

    }

    // 执行测算逻辑
    run() {

    }

    // 执行 Delta 数据到 Commit 数据的更新
    update() {

    }

    // calculate release base number according to release period and total supply
    calculateReleaseBase(totalSupply, releasePeriod, decreaseFactor) {
        const periodNum = divide(365, releasePeriod);
        // console.log(periodNum);
        const dividend = subtract(1, decreaseFactor);
        // console.log(dividend);
        const divisor = subtract(1, pow(decreaseFactor, periodNum));
        // console.log(divisor);
        const releaseBase = chain(totalSupply).multiply(dividend).divide(divisor);
        return releaseBase;
    }

}

export class Unstake {

    constructor(coolTime, unstakeAmount) {
        this.coolTime = coolTime;

        // 获取 unstakeAmount note: unstakeAmount is the weight of unstake
        this.unstakeAmount = new Map();
        this.unstakeAmount.set("team", unstakeAmount.team);
        this.unstakeAmount.set("investor", unstakeAmount.investor);
        this.unstakeAmount.set("advisor", unstakeAmount.advisor);
        this.unstakeAmount.set("foundation", unstakeAmount.foundation);
        this.unstakeAmount.set("community", unstakeAmount.community);
        // 初始化 unstakeHistory
        this.unstakeHistory = new Map();

    }

    // 执行测算逻辑 TODO: add judgement statement
    run(token) {
        let unStakeRecord = new Object({"team":0, "investor":0, "advisor":0, "fundation":0, "community":0});
        let result = new Object();
        // call unStakeProcessor
        for(let entity in unStakeRecord){
            result = this.unStakeProcessor(token, entity);
            unStakeRecord[entity] = result.unStakeAmount; 
        }

        // insert unstake record, currentDate maybe a global variable
        if(JSON.stringify(unStakeRecord) != '{}'){
            this.unstakeHistory.set(currentDate + this.coolTime, unStakeRecord);
        }
        return result.token;
    }

    // we define unStakeProcessor function to execute unStake operation
    unStakeProcessor(token, entityName) {
        let result = new Object();

        // 1. calculate unStakeAmount of vest
        // 1.1 get unStakeWeight of each party from vest's unStakeAmount map
        let unStakeWeight = this.unStakeAmount.get(entityName);

        // 1.2 calculate unStakeAmount with unStakeWeight
        let unStakeAmount = ((token.stakedAmount.get(entityName) + token.stakedAmountDelta.get(entityName)) * unStakeWeight);

        // 2. update stakeAmountDelta map and freeMoneyDelta map of token
        if(currentDate > this.coolTime.get(entityName)){
            let unStakeDateIndex = currentDate - this.coolTime.get(entityName);
            if(this.stakeHistory.get(unStakeDateIndex)){
                let unStakeHistoryMap = this.stakeHistory.get(unStakeDateIndex);

                // update stakeAmountDelta map
                let stakeDelta = token.stakedAmountDelta.get(entityName);
                stakeDelta = stakeDelta - unStakeHistoryMap.get(entityName);
                token.stakedAmountDelta.set(entityName, stakeDelta);

                // update freeMoneyDelta map
                let freeMoney = token.freeMoneyDelta.get(entityName);
                freeMoney = freeMoney + vesHistoryMap.get(entityName);
                token.freeMoneyDelta.set(entityName, freeMoney);

                // we need remove the record which has been calculated
                this.unstakeHistory.delete(unStakeDateIndex);
            }
        }
        // return unStake result
        result.unStakeAmount = unStakeAmount;
        result.token = token;
        return result;
    }

    // 执行 Delta 数据到 Commit 数据的更新 TODO: add judgement statement
    update(token) {
        let entitySet = ["team", "investor", "advisor", "fundation", "community"];
        
        for (var i=0; i<entitySet.length; i++) {
            // commit stakedAmountDelta to stakedAmount
            let stakeIncrement = token.stakedAmount.get(entitySet[i]) + token.stakedAmountDelta.get(entitySet[i]);
            token.stakeAmount.set(entitySet[i], stakeIncrement);

            // commit freeMoneyDelta to freeMoney
            let vestIncrement = token.stakedAmount.get(entitySet[i]) + token.stakedAmountDelta.get(entitySet[i]);
            token.stakeAmount.set(entitySet[i], vestIncrement);
        }

        for (var j=0; j<entitySet.length; j++) {
            // we need clean deltaMap
            token.stakedAmountDelta.set(entitySet[j], 0);
            token.freeMoneyDelta.set(entitySet[j], 0);
        }

        return token;
    }
}

export class Vest {

    constructor(vestAmount, vestPolicy) {
        // 获取 vestAmount 数据 note: vestAmount is the weight of vest
        this.vestAmount = new Map();
        this.vestAmount.set("team", vestAmount.team);
        this.vestAmount.set("investor", vestAmount.investor);
        this.vestAmount.set("advisor", vestAmount.advisor);
        this.vestAmount.set("foundation", vestAmount.foundation);
        this.vestAmount.set("community", vestAmount.community);

        // 获取 vestPolicy 数据
        this.vestPolicy = {
            vestTime: {
                team:       vestPolicy.team.lockupTime,
                investor:   vestPolicy.investor.lockupTime,
                advisor:    vestPolicy.advisor.lockupTime,
                foundation: vestPolicy.foundation.lockupTime,
                community:  vestPolicy.community.lockupTime,
            },
            releasePeriod: {
                team:       vestPolicy.team.releasePeriod,
                investor:   vestPolicy.investor.releasePeriod,
                advisor:    vestPolicy.advisor.releasePeriod,
                foundation: vestPolicy.foundation.releasePeriod,
                community:  vestPolicy.community.releasePeriod,
            },
            cliff: {
                team:       vestPolicy.team.cliff,
                investor:   vestPolicy.investor.cliff,
                advisor:    vestPolicy.advisor.cliff,
                foundation: vestPolicy.foundation.cliff,
                community:  vestPolicy.community.cliff,
            }
        };

        // 初始化 vestHistory
        this.vestHistory = new Map();
    }

    // 执行测算逻辑
    run(token) {
        let vestRecord = new Object({"team":0, "investor":0, "advisor":0, "fundation":0, "community":0});
        let result = new Object();
        // check cliff time, currentDate maybe a global variable
        for(let entity in vestRecord){
            if (currentDate > this.vestPolicy.cliff.get(entity)) {
                result = this.vestProcessor(token, entity);
                vestRecord[entity] = result.vestAmount;
            }
        }
        
        // print vestRecord for debug
        console.log("vestRecord: "+ JSON.stringify(vestRecord));

        // check if vestRecord is null
        if(JSON.stringify(vestRecord) != '{}'){
            // insert vestRecord into vestHistory
            this.vestHistory.set(currentDate, vestRecord);
        }
        return result.token; 
    }

    // we define vestProcessor function to execute vest operation
    vestProcessor(token, entityName) {
        let result = new Object();

        // 1. calculate vestAmount of vest
        // 1.1 get vestWeight of each party from vest's vestAmount map
        let vestWeight = this.vestAmount.get(entityName);

        // 1.2 calculate vestAmount with vestWeight
        let vestAmount = ((token.stakedAmount.get(entityName) + token.stakedAmountDelta.get(entityName)) * vestWeight);

        // 2. update freeMoneyDelta of token
        // 2.1 check lock time
        if(currentDate > this.vestPolicy.lockupTime.get(entityName)){
            // 2.2 calculate vest date
            let vestDateIndex = currentDate - this.vestPolicy.lockupTime.get(entityName);
            if(this.vestHistory.get(vestDateIndex)){
                let vesHistoryMap = this.vestHistory.get(vestDateIndex);

                // update stakeAmountDelta map
                let stakeDelta = token.stakedAmountDelta.get(entityName);
                stakeDelta = stakeDelta - unStakeHistoryMap.get(entityName);
                token.stakedAmountDelta.set(entityName, stakeDelta);
                
                // update freeMoneyDelta map
                let freeMoney = token.freeMoneyDelta.get(entityName);
                freeMoney = freeMoney + vesHistoryMap.get(entityName);
                token.freeMoneyDelta.set(entityName, freeMoney);

                // we need remove the record which has been calculated
                this.vestHistory.delete(vestDateIndex);
            }
        }
        // return vest result
        result.token = token;
        result.vestAmount = vestAmount;
        return result;
    }

    // 执行 Delta 数据到 Commit 数据的更新
    update(token) {
        let entitySet = ["team", "investor", "advisor", "fundation", "community"];
        
        for (var i=0; i<entitySet.length; i++) {
            // commit stakedAmountDelta to stakedAmount
            let stakeIncrement = token.stakedAmount.get(entitySet[i]) + token.stakedAmountDelta.get(entitySet[i]);
            token.stakeAmount.set(entitySet[i], stakeIncrement);

            // commit freeMoneyDelta to freeMoney
            let vestIncrement = token.stakedAmount.get(entitySet[i]) + token.stakedAmountDelta.get(entitySet[i]);
            token.stakeAmount.set(entitySet[i], vestIncrement);
        }

        for (var j=0; j<entitySet.length; j++) {
            // we need clean deltaMap
            token.stakedAmountDelta.set(entitySet[j], 0);
            token.freeMoneyDelta.set(entitySet[j], 0);
        }

        return token;
    }
}
