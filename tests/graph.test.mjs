import test from 'node:test';
import assert from 'node:assert/strict';
import { PARTICIPANTS, createParticipantMap, createParticipantRecord } from '../src/graph/participants.js';
import { Token } from '../src/graph/token.js';
import { Edge } from '../src/graph/edge.js';
import { Action, Stake, Unstake, Vest } from '../src/graph/action.js';

const weights = { team: 0.1, investor: 0.2, advisor: 0.05, foundation: 0.15, community: 0.5 };
const entries = order => order.map(participant => [participant, weights[participant]]);
const rewardPolicy = { rewardTotal: 1000, rewardLifetime: 365, rewardRefreshPeriod: 30, rewardDefactor: 0.9 };
function token() {
    return new Token('TEST', 10000, {
        allocationPercent: { ...weights, community: { airdrop: 0.1, staking: 0.4 } },
        community: { stakingLifetime: 365, stakingRewardRefreshPeriod: 30, stakingRewardDefactor: 0.9 }
    });
}

test('participant helpers preserve explicit order and create independent containers', () => {
    const first = createParticipantMap(), second = createParticipantMap();
    assert.deepEqual([...first], PARTICIPANTS.map(participant => [participant, 0]));
    first.set('team', 99);
    assert.equal(second.get('team'), 0);
    assert.deepEqual([...createParticipantMap(participant => weights[participant], ['community', 'team'])], entries(['community', 'team']));
    assert.equal(createParticipantMap(participant => ({})[participant]).get('team'), undefined);
    const record = createParticipantRecord(participant => weights[participant]);
    assert.deepEqual(record, weights);
    record.team = 99;
    assert.equal(weights.team, 0.1);
    assert.equal(Object.isFrozen(PARTICIPANTS), true);
});

test('Token retains allocations, community policy, public totals and map iteration order', () => {
    const value = token(), order = ['team', 'community', 'investor', 'foundation', 'advisor'];
    assert.equal(value.symbol, 'TEST'); assert.equal(value.totalSupply, 10000);
    assert.deepEqual([...value.allocationPercent], entries(order));
    for (const field of ['allocatedAmount', 'stakedAmount', 'stakedAmountDelta', 'freeMoney', 'freeMoneyDelta']) {
        assert.deepEqual([...value[field]], order.map(participant => [participant, 0]));
    }
    assert.equal(value.stakedTotal, 0); assert.equal(value.freeMoneyTotal, 0);
    assert.deepEqual(value.communityPolicy, {
        airdropPercent: 0.1, airdropTotalAmount: 1000, stakingPercent: 0.4,
        stakingRewardTotalAmount: 4000, stakingPool: 0, stakingRewardLifetime: 365,
        stakingRewardRefreshPeriod: 30, stakingRewardDefactor: 0.9
    });
});

test('Token amount and delta maps remain isolated across fields and token instances', () => {
    const first = token(), second = token();
    first.stakedAmountDelta.set('team', 25);
    first.freeMoney.set('advisor', 10);
    assert.equal(first.stakedAmount.get('team'), 0);
    assert.equal(second.stakedAmountDelta.get('team'), 0);
    assert.equal(first.freeMoneyDelta.get('advisor'), 0);
    assert.equal(second.freeMoney.get('advisor'), 0);
});

test('Edge preserves distribution values, missing values and the original iteration order', () => {
    const distribution = { ...weights }, edge = new Edge(distribution);
    assert.deepEqual([...edge.distribution], entries(['team', 'investor', 'foundation', 'advisor', 'community']));
    distribution.team = 99;
    assert.equal(edge.distribution.get('team'), 0.1);
    assert.equal(new Edge({}).distribution.get('team'), undefined);
});

test('Stake retains its public initial state and independent reward and delta maps', () => {
    const value = new Stake('stake-token', 'reward-token', rewardPolicy, weights);
    assert.equal(value.stakeToken, 'stake-token'); assert.equal(value.rewardToken, 'reward-token');
    for (const key of Object.keys(rewardPolicy)) assert.equal(value[key], rewardPolicy[key]);
    assert.deepEqual([...value.stakeAmount], entries(PARTICIPANTS));
    assert.equal(value.inPoolAmount, 0); assert.equal(value.rewardAllocatedTotal, 0);
    for (const field of ['inPoolAmountDelta', 'rewardAllocated', 'rewardAllocatedDelta']) {
        assert.deepEqual([...value[field]], PARTICIPANTS.map(participant => [participant, 0]));
    }
    value.rewardAllocatedDelta.set('community', 10);
    assert.equal(value.rewardAllocated.get('community'), 0);
    assert.equal(value.inPoolAmountDelta.get('community'), 0);
    assert.equal(new Stake('a', 'b', rewardPolicy, weights).rewardAllocatedDelta.get('community'), 0);
    assert.equal(value.calculateReleaseBase(100, 365, 0.5).done(), 100);
});

test('Unstake and Action keep independent history and action maps', () => {
    const first = new Unstake(10, weights), second = new Unstake(10, weights);
    assert.equal(first.coolTime, 10); assert.deepEqual([...first.unstakeAmount], entries(PARTICIPANTS));
    first.unstakeHistory.set(1, 'first');
    assert.equal(second.unstakeHistory.size, 0);
    const action = new Action();
    action.stakeMap.set('key', 'value');
    assert.equal(action.unstakeMap.size, 0); assert.equal(action.vestMap.size, 0);
    assert.equal(new Action().stakeMap.size, 0);
});

test('Vest retains all participant policy projections without sharing caller state', () => {
    const policy = createParticipantRecord(participant => ({ lockupTime: PARTICIPANTS.indexOf(participant) + 1, releasePeriod: 30, cliff: 2 }));
    const value = new Vest(weights, policy), second = new Vest(weights, policy);
    assert.deepEqual([...value.vestAmount], entries(PARTICIPANTS));
    for (const [output, input] of [['vestTime', 'lockupTime'], ['releasePeriod', 'releasePeriod'], ['cliff', 'cliff']]) {
        assert.deepEqual(Object.keys(value.vestPolicy[output]), [...PARTICIPANTS]);
        for (const participant of PARTICIPANTS) assert.equal(value.vestPolicy[output][participant], policy[participant][input]);
    }
    policy.team.lockupTime = 99;
    assert.equal(value.vestPolicy.vestTime.team, 1);
    value.vestPolicy.cliff.team = 20;
    assert.equal(value.vestPolicy.cliff.investor, 2);
    assert.equal(second.vestPolicy.cliff.team, 2);
    value.vestHistory.set(1, 'first');
    assert.equal(second.vestHistory.size, 0);
});
