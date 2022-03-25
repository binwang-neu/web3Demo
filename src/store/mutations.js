import {
    INIT_GRAPH, ZOOM_GRAPH, POSITIONING_GRAPH, UNDO_GRAPH, REDO_GRAPH, STORAGE_GRAPH, LOAD_GRAPH, MODIFY_CONFIGDATA,
    LOAD_CONFIGDATA, LOAD_HOSITORY_SIMULATE_DATA, MODIFY_HOSITORY_SIMULATE_DATA, MODIFY_GRAPH, CLEAR_GRAPH, SHOW_UPLOAD_DIALOG, CLOSE_UPLOAD_DIALOG,
    SET_ANTV_NODES, SET_NODES, SET_DELTA_NODES, ADD_META_PATH, CLEAR_DATA, SET_TOKEN_MAP, SET_ACTION, SET_EDGE_MAP,
    REMOVE_CELLS
} from '../store/mutation-types'
import { setStore, getStore } from '../utils/storage';

export default {

    //初始化画布
    [INIT_GRAPH](state, graph) {
        state.graph = graph;
    },

    // 画布缩放
    [ZOOM_GRAPH](state, type) {
        if (type == "down") {
            state.graph.zoom(-0.2);
        } else {
            state.graph.zoom(0.2);
        }
    },
    //定位画布
    [POSITIONING_GRAPH](state) {
        state.graph.centerContent();
    },
    // 撤销操作(向后)
    [UNDO_GRAPH](state) {
        state.graph.undo();
    },
    //返回操作（向前)
    [REDO_GRAPH](state) {
        state.graph.redo();
    },
    // 存储画布，目前通过local storage 存储
    [STORAGE_GRAPH](state) {
        setStore("graph", state.graph);
    },
    //加载已有的画布信息
    [LOAD_GRAPH](state) {

        if (getStore("graph")) {
            const cells = JSON.parse(getStore("graph")).cells;
            cells.forEach((item) => {
                if (item.shape != 'edge') {
                    state.graph.addNode(item);
                }
            });
            cells.forEach((item) => {
                if (item.shape == 'edge') {
                    state.graph.addEdge(item);
                }
            });
        }
    },

    /**
     * 获取到新的model时调用，先将已有画布的内容删除掉，在将新的节点添加
     * @param {*} state 
     * @param {*} newGraph 
     */
    [MODIFY_GRAPH](state, newGraph) {
        //
        newGraph.forEach((item) => {
            if (item.shape != 'edge') {
                state.graph.addNode(item);
            }
        });
        newGraph.forEach((item) => {
            if (item.shape == 'edge') {
                state.graph.addEdge(item);
            }
        });
        setStore("graph", state.graph);
    },
    /**
     * 清空画布
     * @param {*} state 
     */
    [CLEAR_GRAPH](state) {
        state.graph.clearCells();
        setStore("graph", state.graph);
    },


    //修改全局的配置项
    [MODIFY_CONFIGDATA](state, params) {
        state.configData.yearlyReleaseValue = params[0];
        state.configData.releaseFrequency = params[1];
        state.configData.releaseDecreaseFactor = params[2];
        state.configData.simulationDays = params[3];
        setStore("config_data", state.configData);
    },
    //导入已有的全局配置项
    [LOAD_CONFIGDATA](state) {
        if (getStore("config_data")) {
            state.configData = JSON.parse(getStore("config_data"));
        }
    },

    //加载历史测算数据
    [LOAD_HOSITORY_SIMULATE_DATA](state) {
        if (getStore("hository_simulate_data")) {
            state.historySimulateData = JSON.parse(getStore("hository_simulate_data"));
        }
    },
    //存储历史测算数据(修改数据就调用该方法)
    [MODIFY_HOSITORY_SIMULATE_DATA](state, newData) {
        state.historySimulateData = newData;
        setStore("hository_simulate_data", newData);
    },

    [SHOW_UPLOAD_DIALOG](state) {
        state.uploadDialog = true;
    },

    [CLOSE_UPLOAD_DIALOG](state) {
        state.uploadDialog = false;
    },

    [SET_ANTV_NODES](state, data) {
        state.antvNodes = data;
    },

    [SET_NODES](state, data) {
        state.nodes = data;
    },

    [SET_DELTA_NODES](state, data) {
        state.deltaNodes = data;
    },

    [SET_TOKEN_MAP](state, data) {
        state.tokenMap = data;
    },

    [SET_EDGE_MAP](state, data) {
        state.edgeMap = data;
    },

    [SET_ACTION](state, data) {
        state.action = data;
    },

    [ADD_META_PATH](state, data) {
        state.metaPath.push(data);
    },

    [CLEAR_DATA](state) {
        state.antvNodes = {};
        state.nodes = {};
        state.deltaNodes = {};
        state.metaPath = [];
    },

    [REMOVE_CELLS](state) {
        const cells = state.graph.getSelectedCells();
        if (cells.length) {
            state.graph.removeCells(cells);
            setStore("graph", state.graph);
        }
    },
}