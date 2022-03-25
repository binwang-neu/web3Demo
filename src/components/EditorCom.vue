<template>
  <div class="models">
    <div class="draw">
      <!-- 左侧控件 -->
      <div class="left-container">
        <div class="left" id="left"></div>
      </div>

      <div class="draw-main-box">
        <!-- 面板中心区域 -->
        <div class="editor-section">
          <div id="canvas-main" class="canvas-main"></div>
        </div>
      </div>
      <!-- 右侧控件 -->
      <div class="right-container">
        <NodeEditCom />
      </div>
    </div>
    <!-- 数据可视化面板 -->
    <div class="data-visual-panel">
      <div class="visual-button" @click="visualPanelVisible = true">
        <span>Display process data visualization panel!</span>
      </div>
    </div>
    <!-- 节点信息编辑组件 -->
    <Modal :show="modalShow" @close="closeModal" :node="selectedNode" />
    <!-- 测算数据可视化组件 -->
    <el-dialog
      title="Modeling data visualization"
      :visible.sync="visualPanelVisible"
      width="60%"
    >
      <VisualPanel />
    </el-dialog>
    <!-- 模型导入面板 -->
    <el-dialog title="Model upload" :visible.sync="uploadShow" width="60%">
      <ModelUpload />
    </el-dialog>
  </div>
</template>

<script>
import Modal from "./Modal";
import VisualPanel from "./VisualPanel";
import ModelUpload from "./ModelUpload";
import NodeEditCom from "./NodeEditCom";
import { Addon, Graph, Shape } from "@antv/x6";
const { Stencil } = Addon;
const { Rect, Circle } = Shape;
// 导入链接桩配置
import { PortsConfig } from "../graph/portsConfig";
import { mapState, mapMutations } from "vuex";
export default {
  data() {
    return {
      modalShow: false,
      selectedNode: null,
      visualPanelVisible: false,
      uploadShow: false,
    };
  },
  components: {
    Modal,
    VisualPanel,
    ModelUpload,
    NodeEditCom,
  },
  methods: {
    ...mapMutations([
      "STORAGE_GRAPH",
      "LOAD_GRAPH",
      "POSITIONING_GRAPH",
      "INIT_GRAPH",
      "CLOSE_UPLOAD_DIALOG",
    ]),

    // 画布初始化
    initGrapg() {
      let cur_graph = new Graph({
        container: document.getElementById("canvas-main"),
        selecting: true,
        autoResize: true,
        history: true,
        background: {
          color: "#fff",
        },
        grid: {
          size: 10,
          visible: true,
        },
        snapline: {
          enabled: true,
          sharp: true,
        },
        scroller: {
          enabled: true,
          pageVisible: false,
          pageBreak: false,
          pannable: true,
          modifiers: ["shift"],
        },
        mousewheel: {
          enabled: true,
          zoomAtMousePosition: true,
          modifiers: ["ctrl", "meta"],
          minScale: 0.5,
          maxScale: 3,
        },
        connecting: {
          router: {
            name: "manhattan",
            args: {
              padding: 1,
            },
          },
          connector: {
            name: "rounded",
            args: {
              radius: 8,
            },
          },
          anchor: "center",
          connectionPoint: "anchor",
          allowBlank: false,
          snap: {
            radius: 20,
          },
          createEdge() {
            return new Shape.Edge({
              attrs: {
                line: {
                  stroke: "#A2B1C3",
                  strokeWidth: 2,
                  targetMarker: {
                    name: "block",
                    width: 12,
                    height: 8,
                  },
                },
              },
              data: {
                type: "Edge",
                inside: 0.5,
                outside: 0.5,
              },
              zIndex: 0,
            });
          },
          validateConnection({ targetMagnet }) {
            return !!targetMagnet;
          },
        },
        highlighting: {
          magnetAdsorbed: {
            name: "stroke",
            args: {
              attrs: {
                fill: "#5F95FF",
                stroke: "#5F95FF",
              },
            },
          },
        },
        resizing: {
          enabled: true,
        },
        // selecting: {
        //   enabled: true,
        //   rubberband: true,
        //   showNodeSelectionBox: true,
        // },

        keyboard: true,
        clipboard: true,
      });
      this.INIT_GRAPH(cur_graph);
    },

    // 初始化画布侧边栏
    initStencil() {
      this.stencil = new Stencil({
        title: "Components",
        target: this.graph,

        // collapsable: true,
        stencilGraphWidth: 200,
        stencilGraphHeight: 180,
        groups: [
          {
            name: "Components",
          },
        ],
      });

      document.getElementById("left").appendChild(this.stencil.container);
      const stake = new Rect({
        width: 70,
        height: 40,
        data: {
          //业务数据
          nodeData: [],
          type: "Stake",
        },
        attrs: {
          rect: { fill: "#FFF", stroke: "#4B4A67", strokeWidth: 2 },
          text: { text: "Stake", fill: "#000000" },
        },
        ports: PortsConfig,
      });

      const token = new Circle({
        width: 60,
        height: 60,
        data: {
          //业务数据
          nodeData: [],
          type: "Token",
        },
        attrs: {
          circle: { fill: "#FFF", strokeWidth: 2, stroke: "#4B4A67" },
          text: { text: "Token", fill: "#000000" },
        },
        ports: PortsConfig,
      });

      const vest = new Rect({
        width: 70,
        height: 40,
        data: {
          //业务数据
          nodeData: [],
          lockTime: 0,
          type: "Vest",
        },
        attrs: {
          rect: { fill: "#FFF", stroke: "#000", strokeWidth: 2 },
          text: { text: "Vest", fill: "#000000" },
        },
        ports: PortsConfig,
      });

      this.stencil.load(
        [stake.clone(), token.clone(), vest.clone()],
        "Components"
      );
    },
    //初始化快捷键
    initShortcutkey() {
      //快捷事件
      this.graph.bindKey(["meta+c", "ctrl+c"], () => {
        const cells = this.graph.getSelectedCells();
        if (cells.length) {
          this.graph.copy(cells);
        }
        return false;
      });
      this.graph.bindKey(["meta+x", "ctrl+x"], () => {
        const cells = this.graph.getSelectedCells();
        if (cells.length) {
          this.graph.cut(cells);
        }
        return false;
      });
      this.graph.bindKey(["meta+v", "ctrl+v"], () => {
        if (!this.graph.isClipboardEmpty()) {
          const cells = this.graph.paste({ offset: 32 });
          this.graph.cleanSelection();
          this.graph.select(cells);
        }
        return false;
      });
      //undo redo
      this.graph.bindKey(["meta+z", "ctrl+z"], () => {
        if (this.graph.history.canUndo()) {
          this.graph.history.undo();
        }
        return false;
      });
      this.graph.bindKey(["meta+shift+z", "ctrl+shift+z"], () => {
        if (this.graph.history.canRedo()) {
          this.graph.history.redo();
        }
        return false;
      });

      // select all
      this.graph.bindKey(["meta+a", "ctrl+a"], () => {
        const nodes = this.graph.getNodes();
        if (nodes) {
          this.graph.select(nodes);
        }
      });

      // zoom
      this.graph.bindKey(["ctrl+1", "meta+1"], () => {
        const zoom = this.graph.zoom();
        if (zoom < 1.5) {
          this.graph.zoom(0.1);
        }
      });
      this.graph.bindKey(["ctrl+2", "meta+2"], () => {
        const zoom = this.graph.zoom();
        if (zoom > 0.5) {
          this.graph.zoom(-0.1);
        }
      });
    },
    initWatchEvent() {
      // 节点编辑
      this.graph.on("cell:contextmenu", ({ e, x, y, cell, view }) => {
        // TODO (Xufei) 需要重新设计 Token 不能被编辑的逻辑 Token.type == 2 的不能被编辑？
        // if (
        //   cell.getData().type == "Token" &&
        //   this.graph.getPredecessors(cell).length != 0
        // ) {
        //   this.$message({
        //     showClose: true,
        //     message: "The current node cannot be edited!",
        //     type: "warning",
        //   });
        //   return;
        // }

        this.selectedNode = cell;
        this.modalShow = true;
      });
      // 注册监听事件，当新增节点或边调用，实时存储
      this.graph.on("node:added", ({ cell, options }) => {
        this.STORAGE_GRAPH();
      });

      this.graph.on("cell:changed", ({ cell, options }) => {
        this.STORAGE_GRAPH();
      });
      this.graph.on("cell:removed", ({ cell, options }) => {
        this.STORAGE_GRAPH();
      });
      // 控制连接桩显示/隐藏
      const showPorts = (ports, show) => {
        for (let i = 0, len = ports.length; i < len; i = i + 1) {
          ports[i].style.visibility = show ? "visible" : "hidden";
        }
      };
      this.graph.on("node:mouseenter", () => {
        const container = document.getElementById("canvas-main");
        const ports = container.querySelectorAll(".x6-port-body");
        showPorts(ports, true);
      });
      this.graph.on("node:mouseleave", () => {
        const container = document.getElementById("canvas-main");
        const ports = container.querySelectorAll(".x6-port-body");
        showPorts(ports, false);
      });
      this.graph.on("cell:dblclick", ({ cell, e }) => {
        const name = cell.isEdge() ? "edge-editor" : "node-editor";
        cell.removeTool(name);
        cell.addTools([
          {
            name,
            args: {
              event: e,
            },
          },
        ]);
      });
    },
    // 节点编辑面板
    closeModal() {
      this.modalShow = false;
    },
  },

  mounted() {
    // 初始化面板
    this.initGrapg();
    // 初始化面板相关快捷键
    this.initShortcutkey();
    // 初始化左侧控件
    this.initStencil();
    //导入已有节点信息
    this.LOAD_GRAPH();
    //初始化相关监听事件
    this.initWatchEvent();
    //进行一次聚焦
    this.POSITIONING_GRAPH();
  },
  computed: {
    ...mapState(["graph", "uploadDialog"]),
  },
  watch: {
    uploadDialog(val) {
      this.uploadShow = val;
    },
    uploadShow(val) {
      if (!val) {
        this.CLOSE_UPLOAD_DIALOG();
      }
    },
  },
};
</script>

<style lang="scss">
.models {
  .draw {
    .left-container {
      width: 200px;
      .left {
        position: fixed;
        top: 50px;
        width: 200px;
        height: 100%;
      }
    }

    .draw-main-box {
      position: fixed;
      left: 200px;
      overflow: scroll;
      width: calc(100% - 500px);
      height: 100%;
      background: url("../assets/bg.png");

      .editor-section {
        display: flex;
        overflow: scroll;
        margin: 40px auto;
        width: 90%;
        height: 80%;
        border: solid 15px #f4f4f4;
        .canvas-main {
          flex: 1;
        }
      }
    }
    .right-container {
      width: 300px;
      position: fixed;
      top: 50px;
      right: 0px;
      height: 100%;
    }
  }
  .data-visual-panel {
    position: fixed;
    bottom: 20px;
    left: 45%;
    .visual-button {
      display: flex;
      width: 100%;
      &:hover {
        cursor: pointer;
      }
      span {
        margin: auto;
        padding: 0.3em 1em 0.5em;
        background: #a5a5a5;
        color: white;

        border-radius: 3px;
        box-shadow: 0 0 0.5em #858585;
        animation: shake 2s ease 0s infinite;
        animation-play-state: paused;

        &:hover {
          animation-play-state: running;
        }
      }
    }
  }
  .visual-dialog {
    font-size: 20px;
  }
  @keyframes shake {
    from {
      transform: rotate(0deg);
    }
    4% {
      transform: rotate(5deg);
    }
    12.5% {
      transform: rotate(-5deg);
    }
    21% {
      transform: rotate(5deg);
    }
    29% {
      transform: rotate(-5deg);
    }
    37.5% {
      transform: rotate(5deg);
    }
    46% {
      transform: rotate(-5deg);
    }
    50%,
    to {
      transform: rotate(0deg);
    }
  }
}
</style>