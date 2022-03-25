<template >
  <div class="container">
    <p class="container-title">Element Attribute Editing</p>
    <div class="token-content" v-if="nodeType == 'Token'">
      <div class="total-supply">
        <span>Total Supply:</span
        ><el-input
          class="total-supply-input"
          v-model="totalSupply"
          size="small"
          placeholder="Please enter inside"
        ></el-input>
      </div>
      <div class="Allocation">
        <el-collapse
          v-model="activeNames"
          @change="handleChange"
          class="el-collapse"
        >
          <el-collapse-item
            title="Allocation"
            name="1"
            class="el-collapse-item"
          >
            <div
              class="allocation-item"
              v-for="item in tokenData.allocations"
              :key="item.name"
            >
              <p>{{ item.name }}</p>
              <el-slider
                v-model="item.prop"
                :format-tooltip="formatTooltip"
                :class="item.class"
                @change="propChange(item)"
              ></el-slider>
              <span>{{ item.prop }}%</span>
            </div>

            <el-collapse
              v-model="activeNames"
              @change="handleChange"
              class="el-collapse"
            >
              <el-collapse-item
                title="Community"
                name="2"
                class="el-collapse-item"
              >
                <div
                  class="community-turntable"
                  v-for="item in tokenData.community"
                  :key="item.name"
                >
                  <div :class="item.class">
                    <el-progress
                      type="dashboard"
                      :percentage="item.prop"
                      :color="colors"
                    ></el-progress>
                    <div>
                      <el-button-group>
                        <el-button
                          icon="el-icon-minus"
                          size="mini"
                          @click="decrease(item)"
                        ></el-button>
                        <el-button
                          icon="el-icon-plus"
                          size="mini"
                          @click="increase(item)"
                        ></el-button>
                      </el-button-group>
                    </div>
                  </div>
                </div>
              </el-collapse-item>
            </el-collapse>
          </el-collapse-item>
        </el-collapse>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      totalSupply: 0,
      activeNames: [],
      nodeType: "Token",
      tokenData: {
        allocations: [
          { name: "Team", prop: 0, class: "team-slider" },
          { name: "Investor", prop: 0, class: "investor-slider" },
          { name: "Advisor", prop: 0, class: "advisor-slider" },
          { name: "Foundation", prop: 0, class: "foundation-slider" },
          { name: "Community", prop: 0, class: "community-slider" },
        ],
        community: [
          { name: "Airdrop", prop: 0, class: "airdrop-turntable" },
          { name: "Staking", prop: 0, class: "staking-turntable" },
        ],
      },
      percentage: 10,
      colors: [
        { color: "#f56c6c", percentage: 20 },
        { color: "#e6a23c", percentage: 40 },
        { color: "#5cb87a", percentage: 60 },
        { color: "#1989fa", percentage: 80 },
        { color: "#6f7ad3", percentage: 100 },
      ],
    };
  },
  methods: {
    handleChange(val) {
      console.log(val);
    },
    formatTooltip(val) {
      return val;
    },
    propChange(val) {
      let already = 0;
      this.tokenData.allocations.forEach((item) => {
        if (item.name != val.name) {
          already += item.prop;
        }
      });
      val.prop = val.prop < 100 - already ? val.prop : 100 - already;
    },
    increase(val) {
      val.prop += 1;
      if (val.prop > 100) {
        val.prop = 100;
      }
    },
    decrease(val) {
      val.prop -= 1;
      if (val.prop < 0) {
        val.prop = 0;
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.container {
  height: 100%;
  width: 300px;
  background-color: #f5f5f5;
  .container-title {
    background-color: #ededed;
    height: 32px;
    line-height: 32px;
    font-size: 13px;
    font-weight: 700;
    padding-left: 10px;
    color: #666;
  }
  .token-content {
    .total-supply {
      margin-top: 10px;
      padding: 15px;
      span {
        font-size: 14px;
      }
      .total-supply-input {
        margin-left: 20px;
        width: 150px;
      }
    }
    .Allocation {
      /deep/ .el-collapse-item__header {
        background-color: rgba(0, 0, 0, 0);
        padding-left: 15px;
      }
      .allocation-item {
        margin-top: 5px;
        padding: 15px;
        p {
          font-size: 14px;
        }
        .team-slider {
          float: left;
          margin-left: 15px;
          width: 200px;
          /deep/ .el-slider__bar {
            background-color: orange;
          }
          /deep/ .el-slider__button {
            border: 2px solid orange;
          }
        }

        .investor-slider {
          float: left;
          margin-left: 15px;
          width: 200px;
          /deep/ .el-slider__bar {
            background-color: green;
          }
          /deep/ .el-slider__button {
            border: 2px solid green;
          }
        }
        .advisor-slider {
          float: left;
          margin-left: 15px;
          width: 200px;
        }
        .foundation-slider {
          float: left;
          margin-left: 15px;
          width: 200px;
          /deep/ .el-slider__bar {
            background-color: rgb(223, 219, 17);
          }
          /deep/ .el-slider__button {
            border: 2px solid rgb(223, 219, 17);
          }
        }

        .community-slider {
          float: left;
          margin-left: 15px;
          width: 200px;
          /deep/ .el-slider__bar {
            background-color: #f56c6c;
          }
          /deep/ .el-slider__button {
            border: 2px solid #f56c6c;
          }
        }

        span {
          margin-left: 15px;
          font-size: 14px;
          line-height: 38px;
        }
      }
      .airdrop-turntable {
        float: left;
        margin-left: 50px;
        margin-bottom: 20px;
        /deep/ .el-progress-circle {
          width: 75px !important;
          height: 75px !important;
        }
      }
      .staking-turntable {
        float: left;
        margin-left: 10px;
        margin-bottom: 20px;
        /deep/ .el-progress-circle {
          width: 75px !important;
          height: 75px !important;
        }
      }
    }
  }
}
</style>