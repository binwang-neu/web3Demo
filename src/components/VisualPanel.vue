<template >
  <el-collapse-transition>
    <div class="visual-panel">
      <div class="charts-container">
        <!-- 调用作图组件，传入对应的数据包含折线图数据、x轴字段名、y、分类字段名 -->
        <LineChart :linedata="lineData" />
      </div>
      <!-- 历史数据选择 -->
      <div class="data-selected-container">
        <span class="select-title">Data Selection</span>
        <div class="select-table">
          <el-table
            ref="multipleTable"
            :data="historyData"
            height="450"
            tooltip-effect="dark"
            style="width: 100%"
            class="history-table"
            @selection-change="handleSelectionChange"
          >
            <el-table-column type="selection" width="45"> </el-table-column>
            >
            <el-table-column prop="type" label="ID" width="80">
            </el-table-column>
            <el-table-column fixed="right" label="操作" width="80">
              <template slot-scope="scope">
                <el-button
                  @click.native.prevent="deleteRow(scope.$index, historyData)"
                  type="text"
                  size="small"
                >
                  <i
                    class="el-icon-remove-outline"
                    style="font-size: 18px; color: red"
                  ></i>
                </el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
    </div>
  </el-collapse-transition>
</template>
<script>
import LineChart from "./LineChart";
import { mapState, mapMutations } from "vuex";
export default {
  data() {
    return {
      //被选中的历史数据项
      multipleSelection: null,
      //折线图数据
      lineData: [],
      //历史测算数据
      historyData: [],
    };
  },
  components: {
    LineChart,
  },
  methods: {
    ...mapMutations([
      "LOAD_HOSITORY_SIMULATE_DATA",
      "MODIFY_HOSITORY_SIMULATE_DATA",
    ]),
    deleteRow(index, rows) {
      rows.splice(index, 1);
      this.MODIFY_HOSITORY_SIMULATE_DATA(rows);
    },
    /**
     * TODO
     * 根据测算得到的数据修改该方法
     * 将被选中的数据根据类别type进行标注，并push到折线图数据中
     */
    handleSelectionChange(val) {
      this.lineData = [];
      this.multipleSelection = val;

      for (let i = 0; i < this.multipleSelection.length; i++) {
        for (let j = 0; j < this.multipleSelection[i].data.length; j++) {
          this.lineData.push({
            category: this.multipleSelection[i].type,
            year: this.multipleSelection[i].data[j].year,
            value: this.multipleSelection[i].data[j].value,
          });
        }
      }
    },
  },
  computed: {
    ...mapState(["historySimulateData"]),
  },
  mounted() {
    this.LOAD_HOSITORY_SIMULATE_DATA();
    this.historyData = this.historySimulateData;
  },
};
</script>
<style lang="scss">
.visual-panel {
  text-align: center;
  overflow: hidden;
  background-color: #f5f5f5;
  .charts-container {
    float: left;
    padding: 0px 20px 10px 20px;
    margin-left: 15px;
    margin-top: 10px;
    width: 70%;
    height: 80%;

    background-color: #fff;
    border: 1px solid rgb(228, 228, 228);
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
  }
  .data-selected-container {
    float: left;
    margin-top: 30px;
    margin-left: 30px;
    width: 20%;
    height: 100%;

    .select-title {
      display: block;
      margin: 0px auto;

      width: 180px;
      height: 30px;
      line-height: 30px;
      background-color: rgb(58, 58, 58);
      color: rgb(250, 250, 250);
      border-radius: 5px;
      font-size: 16px;
      font-weight: 600;
    }
    .select-table {
      margin-top: 20px;

      height: 500px;
    }
    .history-table {
      border-radius: 10px;
    }
  }
}
</style>