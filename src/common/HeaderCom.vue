<template >
  <div class="top-container">
    <div class="top">
      <!-- 工具栏 -->
      <div class="tool-bar">
        <el-tooltip
          class="tooltip"
          content="Enlarge"
          placement="bottom"
          effect="light"
        >
          <i @click="ZOOM_GRAPH('up')" class="el-icon-zoom-in"></i>
        </el-tooltip>
        <el-tooltip
          class="tooltip"
          content="Lessen"
          placement="bottom"
          effect="light"
        >
          <i @click="ZOOM_GRAPH('down')" class="el-icon-zoom-out"></i>
        </el-tooltip>
        <el-tooltip
          class="tooltip"
          content="Undo operation"
          placement="bottom"
          effect="light"
        >
          <i @click="UNDO_GRAPH()" class="el-icon-back"></i>
        </el-tooltip>
        <el-tooltip
          class="tooltip"
          content="Redo operation"
          placement="bottom"
          effect="light"
        >
          <i @click="REDO_GRAPH()" class="el-icon-right"></i>
        </el-tooltip>
        <el-tooltip
          class="tooltip"
          content="Start simulation"
          placement="bottom"
          effect="light"
        >
          <i @click="startSimulation()" class="el-icon-video-play"></i>
        </el-tooltip>
        <el-tooltip
          class="tooltip"
          content="Pause simulation"
          placement="bottom"
          effect="light"
        >
          <i @click="pauseSimulation()" class="el-icon-video-pause"></i>
        </el-tooltip>
        <el-tooltip
          class="tooltip"
          content="End simulation"
          placement="bottom"
          effect="light"
        >
          <i @click="endSimulation()" class="el-icon-circle-close"></i>
        </el-tooltip>
        <el-tooltip
          class="tooltip"
          content="Upload existing models"
          placement="bottom"
          effect="light"
        >
          <i @click="uploadGraph()" class="el-icon-upload2"></i>
        </el-tooltip>
        <el-tooltip
          class="tooltip"
          content="Download model"
          placement="bottom"
          effect="light"
        >
          <i @click="downloadGraph()" class="el-icon-download"></i>
        </el-tooltip>

        <el-tooltip
          class="tooltip"
          content="Remove cells "
          placement="bottom"
          effect="light"
        >
          <i @click="REMOVE_CELLS()" class="el-icon-delete"></i>
        </el-tooltip>

        <el-tooltip
          class="tooltip"
          content="Focus canvas "
          placement="bottom"
          effect="light"
        >
          <i @click="POSITIONING_GRAPH()" class="el-icon-full-screen"></i>
        </el-tooltip>
      </div>
      <!-- 系统参数栏 -->
      <div class="config-data-box">
        <!-- <span>Yearly Release</span>

        <el-input
          size="mini"
          class="config-data-input"
          v-model="currentYearlyReleaseValue"
          placeholder=""
          :disabled="modifyDisabled"
        ></el-input>
        <el-divider class="divider" direction="vertical"></el-divider>
        <span>Release Frequency </span>

        <el-input
          size="mini"
          class="config-data-input"
          v-model="currentReleaseFrequency"
          placeholder=""
          :disabled="modifyDisabled"
        ></el-input>
        <el-divider class="divider" direction="vertical"></el-divider>
        <span>Release Decrease Factor </span>

        <el-input
          size="mini"
          class="config-data-input"
          v-model="currentReleaseDecreaseFactor"
          placeholder=""
          :disabled="modifyDisabled"
        ></el-input>
        <el-divider class="divider" direction="vertical"></el-divider> -->
        <span>Simulation Days</span>

        <el-input
          size="mini"
          class="config-data-input"
          v-model="currentSimulationDays"
          placeholder=""
          :disabled="modifyDisabled"
        ></el-input>
      </div>
      <!-- 系统参数修改按钮 -->
      <div class="config-button">
        <div class="log-in">
          <el-dropdown>
            <span class="dropdown-icon">
              <i class="el-icon-user"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>Sign In</el-dropdown-item>
              <el-dropdown-item>Sign Out</el-dropdown-item>
            </el-dropdown-menu>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item
                ><el-button type="text" @click="dialogLogInVisible = true"
                  >Sign In</el-button
                ></el-dropdown-item
              >
              <el-dropdown-item>Sign Out</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
        <div class="setting">
          <i
            class="el-icon-setting"
            @click="modifyDisabled = !modifyDisabled"
            v-if="modifyDisabled"
          ></i>
          <i
            class="el-icon-success"
            @click="modifyConfigData()"
            v-if="!modifyDisabled"
          ></i>
        </div>
        <el-dialog
          title="Connect Wallet or Sign in to Github"
          :visible.sync="dialogLogInVisible"
          :append-to-body="true"
          width="25%"
        >
          <LogIn />
        </el-dialog>
      </div>
    </div>
  </div>
</template>
<script>
import LogIn from "../components/LogIn";
import { mapState, mapMutations } from "vuex";
import { Node } from "@antv/x6";

import { Token } from "../graph/token";
import { Stake, Unstake, Vest } from "../graph/action";
import { Edge } from "../graph/edge";

export default {
  data() {
    return {
      currentYearlyReleaseValue: null,
      currentReleaseFrequency: null,
      currentReleaseDecreaseFactor: null,
      currentSimulationDays: null,
      modifyDisabled: true,
      dialogLogInVisible: false,
    };
  },
  components: {
    LogIn,
  },
  methods: {
    ...mapMutations([
      "ZOOM_GRAPH",
      "POSITIONING_GRAPH",
      "UNDO_GRAPH",
      "REDO_GRAPH",
      "MODIFY_CONFIGDATA",
      "LOAD_CONFIGDATA",
      "SHOW_UPLOAD_DIALOG",
      "SET_ANTV_NODES",
      "SET_NODES",
      "SET_DELTA_NODES",
      "ADD_META_PATH",
      "CLEAR_DATA",
      "REMOVE_CELLS",
    ]),
    /**
    修改全局配置信息
     */
    modifyConfigData() {
      this.modifyDisabled = !this.modifyDisabled;
      this.MODIFY_CONFIGDATA([
        this.currentYearlyReleaseValue,
        this.currentReleaseFrequency,
        this.currentReleaseDecreaseFactor,
        this.currentSimulationDays,
      ]);
    },
    /**
    下载当前模型为json文件
     */
    downloadGraph() {
      //获取时间戳
      var timestamp = new Date().valueOf();
      //将全局配置信息和画布数据封装成对象
      let modelData = {
        model: { configData: this.configData, graph: this.graph },
      };
      const filename = "Model" + timestamp + ".json";
      const data = JSON.stringify(modelData, undefined, 4);
      let blob = new Blob([data], { type: "text/json" }),
        a = document.createElement("a");
      a.download = filename;
      a.href = window.URL.createObjectURL(blob);
      // 标签 data- 嵌入自定义属性  屏蔽后也可正常下载
      a.dataset.downloadurl = ["text/json", a.download, a.href].join(":");
      // 添加鼠标事件
      let event = new MouseEvent("click", {});
      // 向一个指定的事件目标派发一个事件
      a.dispatchEvent(event);
    },
    /**
    上传已有的模型，json文件
     */
    uploadGraph() {
      this.SHOW_UPLOAD_DIALOG();
    },
    /*
    开始测算
    */
    startSimulation() {
      console.log("starting simulation...");
      this.getNodes();
      this.resetDeltaNodes();
      this.traversalGraph();
    },
    /*
    暂停测算
    */
    pauseSimulation() {
      // TODO Assume that user can not create or delete node when pausing. User can only modify some params. 
      console.log("pausing simulation...");
    },
    /*
    结束当前测算
    */
    endSimulation() {
      // TODO User should end simulation first if they need to create or delete node.
      console.log("ending simulation...");
      this.CLEAR_DATA();
    },
    /*
    获取当前画布上的所有节点，保存节点原始信息 + 自定义属性参数
    */
    getNodes() {
      var t = new Token();
      var s = new Stake();
      let originalRes = new Map();
      let selfdefinedRes = new Map();
      let nodes = this.graph.model.getNodes();
      nodes.forEach(element => {
        originalRes.set(element.id, element);
        
        let values = new Map();
        values.set("NodeType", element.getData().type);
        values.set("Attr", element.getData().nodeData);

        selfdefinedRes.set(element.id, values);
      });

      this.SET_ANTV_NODES(originalRes);
      this.SET_NODES(selfdefinedRes);
      console.log("antv nodes:");
      console.log(this.antvNodes)
      console.log("nodes:");
      console.log(this.nodes)
    },
    /*
    基于当前节点，重置存储增量数据的节点变量
    */
    resetDeltaNodes() {
      let deltaNodes = this.nodes;
      let tmpThis = this;
      deltaNodes.forEach(function(value, key){
        let nodeType = value.get("NodeType");
        // console.log(nodeType);
        switch (nodeType) {
          case "Token":
            value = tmpThis.resetTokenNode(value);
            break;
          case "Stake":
            value = tmpThis.resetStakeNode(value);
            break;
          case "Unstake":
            value = tmpThis.resetUnstakeNode(value);
            break;
          case "Vest":
            value = tmpThis.resetVestNode(value);
            break;
          default:
            break;
        }
      });
      this.SET_DELTA_NODES(deltaNodes);
    },
    /*
    将 Token 类型节点内的参数全部 reset 为零值
    */
    resetTokenNode(nodeAttr) {
      // Token 节点的哪些数据可以是增量数据？
      // nodeAttr.get();
      console.log(nodeAttr);
      
      return nodeAttr; 
    },
    /*
    将 Token 类型节点内的参数全部 reset 为零值
    */
    resetStakeNode(nodeAttr) {
      // Stake 节点的哪些数据可以是增量数据？
      console.log(nodeAttr);

      return nodeAttr; 
    },
    /*
    将 Token 类型节点内的参数全部 reset 为零值
    */
    resetUnstakeNode(nodeAttr) {
      // Unstake 节点的哪些数据可以是增量数据？
      console.log(nodeAttr);

      return nodeAttr; 
    },
    /*
    将 Token 类型节点内的参数全部 reset 为零值
    */
    resetVestNode(nodeAttr) {
      // Vest 节点的哪些数据可以是增量数据？
      console.log(nodeAttr);

      return nodeAttr; 
    },
    /*
    基于当前画布上的模型，获取所有元路径: Token -> [Operation, Operation, ...] -> Token
    不满足此范式的路径将不会被加入到全局元路径数据中
    */
    traversalGraph() {
      var tmpThis = this;
      let tokenNodes = new Set();

      this.antvNodes.forEach(function(value, key){
        // TODO Filter out leaf nodes
        if (value.getData().type == "Token" && !tmpThis.graph.isLeafNode(key)) {
          tokenNodes.add(key);
        }
      });

      tokenNodes.forEach(nodeID => {
        tmpThis.getRelatedMetaPath(tmpThis.antvNodes.get(nodeID), [], new Set());
      });

      console.log("traversal result:");
      console.log(this.metaPath);

    },
    /*
    获取以一个 Token 节点为起始点的所有元路径
    */
    getRelatedMetaPath(antvNode, cur, visited) {
      if (antvNode.getData().type != "Token" && visited.has(antvNode.id)) {
        return ;
      }

      if (antvNode.getData().type == "Token" && cur.length > 0) {
        cur.push(antvNode.id);
      
        let tmpRes = [];
        cur.forEach(element => {
          tmpRes.push(element);
        });
        this.ADD_META_PATH(tmpRes);
        cur.pop();
        return ;
      }

      if (this.graph.isLeafNode(antvNode)) {
        // TODO print out warning messgae
        return ;
      }
    
      let edges = this.graph.model.getOutgoingEdges(antvNode);
      
      cur.push(antvNode.id);
      visited.add(antvNode.id);
      
      for (let i = 0; i < edges.length; i++) {
        let nextNode = edges[i].getTargetNode();
        this.getRelatedMetaPath(nextNode, cur, visited);
      }

      cur.pop();
    }
    
  },
  computed: {
    ...mapState(["configData", "graph", "antvNodes", "nodes", "deltaNodes", "metaPath"]),
  },
  mounted() {
    this.LOAD_CONFIGDATA();
    this.currentYearlyReleaseValue = this.configData.yearlyReleaseValue;
    this.currentReleaseFrequency = this.configData.releaseFrequency;
    this.currentReleaseDecreaseFactor = this.configData.releaseDecreaseFactor;
    this.currentSimulationDays = this.configData.simulationDays;
  },
};
</script>
<style lang="scss" scoped>
.el-dropdown-menu {
  .el-dropdown-menu__item {
    .el-button {
      color: #555555;
      font-size: 15px;
    }
    &:hover {
      color: #555555;
      background-color: #ecebeb;
    }
  }
}
.top-container {
  height: 50px;
}
.top {
  position: fixed;
  z-index: 2000;
  top: 0;
  overflow-x: scroll;

  line-height: 50px;
  height: 50px;
  width: 100%;

  font-family: "Times New Roman", Georgia, Serif;
  font-size: 14px;
  background-color: #f4f4f4;
  border-bottom: rgb(182, 181, 181) solid 1px;

  .tool-bar {
    float: left;
    margin-right: 40px;
    width: 380px;
    border-right: rgb(182, 181, 181) solid 1px;

    i {
      margin: 0px 10px;
      font-size: 18px;
      color: #555555;
      font-weight: bold;
      cursor: pointer;
      &:hover {
        color: #9a9a9c;
      }
    }
  }
  .config-data-box {
    float: left;
    text-align: center;
    span {
      margin-left: 20px;
    }
    .config-data-input {
      width: 50px;
      margin-left: 10px;
    }
    .divider {
      margin-left: 25px;
    }
  }
  .config-button {
    float: right;
    margin-right: 60px;
    .log-in {
      float: left;
      margin-right: 10px;
      .dropdown-icon {
        cursor: pointer;
        font-size: 25px;
        float: left;
        color: rgb(99, 99, 99);
        &:hover {
          color: #a3a3a3;
        }
      }
    }
    .setting {
      font-size: 25px;
      float: right;
      color: rgb(99, 99, 99);
      &:hover {
        color: #a3a3a3;
      }
    }
  }
}
</style>