import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import actions from './actions'
Vue.use(Vuex)
const state = {
    //全局画布
    graph: null,
    // 画布上所有节点(保存 antv Node 的属性)
    antvNodes: {},
    // 画布上所有节点(保存自定义的 Node 属性)
    nodes: {},
    // 基于 nodes 的保存增量数据的节点变量
    deltaNodes: {},
    // 基于画布上已有模型的元路径
    metaPath: [],
    // TokenMap <key: tokenID, value: tokenClassInstance>
    tokenMap: {},
    // Action
    action: null,
    // EdgeMap <key: sourceID, value: <key: targetID, value: EdgeClassInstance> >
    edgeMap: {},
    //系统参数
    configData: {
        yearlyReleaseValue: 0,
        releaseFrequency: 0,
        releaseDecreaseFactor: 0,
        simulationDays: 0,
        disabled: true,

    },
    //历史测算数据
    historySimulateData: [
        {
            type: "2022",
            data: [
                { year: "1997", value: 11085 },
                { year: "1998", value: 47085 },
                { year: "1999", value: 88085 },
                { year: "2000", value: 38085 },
            ],
        },
        {
            type: "2021",
            data: [
                { year: "1997", value: 31085 },
                { year: "1998", value: 47085 },
                { year: "1999", value: 78085 },
                { year: "2000", value: 108085 },
            ],
        },
        {
            type: "2020",
            data: [
                { year: "1997", value: 49085 },
                { year: "1998", value: 52085 },
                { year: "1999", value: 28085 },
                { year: "2000", value: 94085 },
            ],
        },
        {
            type: "2017",
            data: [
                { year: "1997", value: 49085 },
                { year: "1998", value: 52085 },
                { year: "1999", value: 28085 },
                { year: "2000", value: 78085 },
            ],
        },
        {
            type: "2018",
            data: [
                { year: "1997", value: 25085 },
                { year: "1998", value: 32085 },
                { year: "1999", value: 58085 },
                { year: "2000", value: 28085 },
            ],
        },
        {
            type: "2019",
            data: [
                { year: "1997", value: 39085 },
                { year: "1998", value: 22085 },
                { year: "1999", value: 30085 },
                { year: "2000", value: 10085 },
            ],
        },
        {
            type: "2023",
            data: [
                { year: "1997", value: 19085 },
                { year: "1998", value: 92085 },
                { year: "1999", value: 58085 },
                { year: "2000", value: 9985 },
            ],
        },
    ],
    //web3用户登陆相关
    web3: null,
    uploadDialog: false


}

export default new Vuex.Store({
    state,
    actions,
    mutations,
})