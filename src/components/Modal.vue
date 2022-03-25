
<template >
  <!-- 该组件为节点信息编辑框，根据节点类型不同，显示不同的表单页面 -->
  <transition name="el-fade-in-linear">
    <div class="modal" v-if="show">
      <div class="title-box">
        <p class="title">Element Attribute Editing</p>
      </div>

      <i class="el-icon-remove close-btn" @click="close()"></i>

      <!-- 边属性编辑 -->
      <div class="edge-box" v-if="nodeTypeIsEdge">
        <el-tag type="info" class="edge-lable">Inside</el-tag>
        <el-input
          class="edge-weight-input"
          v-model="edgeInside"
          size="small"
          placeholder="Please enter inside"
        ></el-input>
        <el-tag type="info" class="edge-lable">Outside</el-tag>
        <el-input
          class="edge-weight-input"
          v-model="edgeOutside"
          size="small"
          placeholder="Please enter outside"
        ></el-input>
      </div>
      <!-- vest锁定时间编辑 -->
      <div class="vest-box" v-if="nodeTypeIsVest">
        <el-tag type="info" class="vest-lable">Lock Time</el-tag>
        <el-input
          class="vest-input"
          v-model="lockTime"
          size="small"
          placeholder="Please enter lock time!"
        ></el-input>
      </div>
      <!-- 此处三个table类型，Token，Stake，vest -->
      <div class="table-box" v-if="nodeTypeIsToken">
        <el-table :data="tableData" style="width: 100%" max-height="300">
          <el-table-column fixed prop="day" label="Day" width="80">
          </el-table-column>
          <el-table-column
            prop="inside"
            label="Inside"
            width="100"
            align="center"
          >
            <template slot-scope="scope">
              <el-input
                v-model="scope.row.inside"
                size="mini"
                placeholder="Input"
              ></el-input>
            </template>
          </el-table-column>
          <el-table-column
            prop="outside"
            label="Outside"
            width="100"
            align="center"
          >
            <template slot-scope="scope">
              <el-input
                v-model="scope.row.outside"
                size="mini"
                placeholder="Input"
              ></el-input>
            </template>
          </el-table-column>
        </el-table>
      </div>

      <!-- --stake--- -->
      <div class="table-box" v-if="nodeTypeIsStake">
        <el-table :data="tableData" style="width: 100%" max-height="300">
          <el-table-column
            fixed
            prop="day"
            label="Day"
            width="50"
            align="center"
          >
          </el-table-column>
          <el-table-column
            prop="release"
            label="Release"
            width="80"
            align="center"
          >
            <template slot-scope="scope">
              <el-input
                v-model="scope.row.release"
                size="mini"
                placeholder="Input"
                style="width: 60px"
              ></el-input>
            </template>
          </el-table-column>
          <el-table-column
            prop="inside"
            label="Inside"
            width="80"
            align="center"
          >
            <template slot-scope="scope">
              <el-input
                v-model="scope.row.inside"
                size="mini"
                placeholder="Input"
                style="width: 60px"
                :disabled="true"
              ></el-input>
            </template>
          </el-table-column>
          <el-table-column
            prop="outside"
            label="Outside"
            width="80"
            align="center"
          >
            <template slot-scope="scope">
              <el-input
                v-model="scope.row.outside"
                size="mini"
                placeholder="Input"
                style="width: 60px"
                :disabled="true"
              ></el-input>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <!-- --Vest-- -->
      <div class="table-box" v-if="nodeTypeIsVest">
        <el-table :data="tableData" style="width: 100%" max-height="250">
          <el-table-column
            fixed
            prop="day"
            label="Day"
            width="80"
            align="center"
          >
          </el-table-column>
          <el-table-column
            prop="inside"
            label="Inside"
            width="100"
            align="center"
          >
            <template slot-scope="scope">
              <el-input
                v-model="scope.row.inside"
                size="mini"
                placeholder="Input"
                :disabled="true"
              ></el-input>
            </template>
          </el-table-column>
          <el-table-column
            prop="outside"
            label="Outside"
            width="100"
            align="center"
          >
            <template slot-scope="scope">
              <el-input
                v-model="scope.row.outside"
                size="mini"
                placeholder="Input"
                :disabled="true"
              ></el-input>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <i class="el-icon-success sub-btn" @click="modifyNode()"></i>
    </div>
  </transition>
</template>
<script>
import { mapState, mapMutations } from "vuex";
export default {
  data() {
    return {
      dialogFormVisible: false,
      nodeName: null,
      edgeInside: null,
      edgeOutside: null,
      lockTime: null,
      tableData: [],
      nodeTypeIsToken: false,
      nodeTypeIsStake: false,
      nodeTypeIsVest: false,
      nodeTypeIsEdge: false,
    };
  },
  props: {
    show: {
      type: Boolean,
      require: true,
    },
    node: {
      require: true,
    },
  },
  methods: {
    ...mapMutations(["STORAGE_GRAPH"]),
    /**
     * 关闭节点编辑窗口
     */
    close() {
      this.$emit("close");
    },

    /**
     * 数据修改
     */
    modifyNode() {
      if (!this.nodeTypeIsEdge) {
        //节点名称修改
        for (
          var index = 0;
          index < this.graph.model.collection.cells.length;
          index++
        ) {
          if (this.graph.model.collection.cells[index].id == this.node.id) {
            this.graph.model.collection.cells[index].setAttrByPath(
              ["text", "text"],
              this.nodeName
            );
            break;
          }
        }
        //更新业务数据到节点
        this.modifyNodeConfigData();
      } else {
        this.modifyEdgeConfigData();
      }
      //节点数据域修改

      this.close();
    },

    /**
     * 初始化节点数据域（业务数据）
     * 根据节点的类型不同，初始化不同的数据到数据域中
     */
    initNodeConfigData() {
      let tempData = this.node.getData();

      //Token类型节点参数
      if (tempData.type == "Token") {
        for (let i = 1; i <= this.configData.simulationDays; i++) {
          tempData.nodeData.push({ day: i, inside: 0, outside: 0 });
        }
      }
      //stake
      if (tempData.type == "Stake") {
        for (let i = 1; i <= this.configData.simulationDays; i++) {
          tempData.nodeData.push({
            day: i,
            release: 0,
            inside: 0,
            outside: 0,
          });
        }
      }
      //vest
      if (tempData.type == "Vest") {
        this.lockTime = tempData.lockTime;
        for (let i = 1; i <= this.configData.simulationDays; i++) {
          tempData.nodeData.push({
            day: i,
            inside: 0,
            outside: 0,
          });
        }
      }
      //更新画布数据
      let tempIndex;
      for (
        let index = 0;
        index < this.graph.model.collection.cells.length;
        index++
      ) {
        if (this.graph.model.collection.cells[index].id == this.node.id) {
          tempIndex = index;
          this.graph.model.collection.cells[index].setData(tempData);
          break;
        }
      }
      this.node = this.graph.model.collection.cells[tempIndex];

      this.tableData = this.node.getData().nodeData;
    },
    /**
     * 修改节点数据域
     * 页面table中进行修改，完成修改调用该方法对全局graph 节点内容进行更新
     */
    modifyNodeConfigData() {
      let tempData = this.node.getData();
      tempData.nodeData = this.tableData;
      for (
        let index = 0;
        index < this.graph.model.collection.cells.length;
        index++
      ) {
        if (this.graph.model.collection.cells[index].id == this.node.id) {
          this.graph.model.collection.cells[index].setData(tempData);
          break;
        }
      }
      this.STORAGE_GRAPH();
    },
    /**
     * 修改边数据域
     */
    modifyEdgeConfigData() {
      let tempData = this.node.getData();
      tempData.inside = this.edgeInside;
      tempData.outside = this.outside;
      for (
        let index = 0;
        index < this.graph.model.collection.cells.length;
        index++
      ) {
        if (this.graph.model.collection.cells[index].id == this.node.id) {
          this.graph.model.collection.cells[index].setData(tempData);
          break;
        }
      }
      this.STORAGE_GRAPH();
    },
  },
  computed: {
    ...mapState(["graph", "configData"]),
  },
  watch: {
    /**
     * 监听是否传来节点信息
     * 当有节点传来时，获取节点对应的相关信息
     */
    node() {
      let tempData = this.node.getData();
      //节点信息需要初始化，边无需初始化
      if (tempData.type != "Edge") {
        this.nodeName = this.node.attrs.text.text;
        if (tempData.nodeData.length == 0) {
          this.initNodeConfigData();
        } else {
          this.tableData = tempData.nodeData;
        }
      } else {
        this.edgeInside = tempData.inside;
        this.edgeOutside = tempData.outside;
      }
      // 根据节点类型有选择性显示编辑table
      switch (tempData.type) {
        case "Token": {
          this.nodeTypeIsToken = true;
          this.nodeTypeIsStake = false;
          this.nodeTypeIsVest = false;
          this.nodeTypeIsEdge = false;
          break;
        }
        case "Vest": {
          this.nodeTypeIsToken = false;
          this.nodeTypeIsStake = false;
          this.nodeTypeIsVest = true;
          this.nodeTypeIsEdge = false;
          break;
        }
        case "Stake": {
          this.nodeTypeIsToken = false;
          this.nodeTypeIsStake = true;
          this.nodeTypeIsVest = false;
          this.nodeTypeIsEdge = false;
          break;
        }
        case "Edge": {
          this.nodeTypeIsToken = false;
          this.nodeTypeIsStake = false;
          this.nodeTypeIsVest = false;
          this.nodeTypeIsEdge = true;
        }
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.modal {
  position: absolute;
  background-color: #fffefe;
  top: 13%;
  right: 5%;
  height: 450px;
  width: 300px;
  border-radius: 5px;
  border: 1px solid #dddcdc;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  .title-box {
    border-bottom: 1px solid #dddcdc;

    border-radius: 2px;
    .title {
      text-align: left;
      padding-left: 10px;
      font-size: 14px;
      font-weight: 500;
    }
  }
  .name-box {
    margin-left: 10px;
    margin-bottom: 5px;
    .name-lable {
      width: 80px;
    }
    .node-name-input {
      width: 60%;
      margin-left: 10px;
    }
  }
  .edge-box {
    margin-left: 10px;
    margin-bottom: 5px;
    margin-top: 30px;

    .edge-weight-input {
      width: 60%;
      margin-left: 10px;
    }
    .edge-lable {
      width: 80px;
      margin-bottom: 15px;
    }
  }
  .vest-box {
    margin-top: 10px;
    margin-left: 10px;
    .vest-input {
      width: 60%;
      margin-left: 10px;
    }
    .vest-lable {
      width: 80px;
      margin-bottom: 15px;
    }
  }

  .sub-btn {
    position: absolute;
    left: 45%;
    font-size: 30px;
    bottom: 10px;
    &:hover {
      color: #bbbbbb;
    }
  }
  .close-btn {
    position: absolute;
    right: 10px;
    top: 15px;
    font-size: 20px;
    &:hover {
      color: #c44242;
    }
  }
  .table-box {
    border-top: 1px solid #e0e0e0;
    padding: 5px;
    font-size: 14px;

    .table-edit-icon {
      color: #bbbbbb;
      font-size: 16px;

      &:hover {
        color: #dddcdc;
      }
    }
  }
}
</style>