<template>
  <div class="box">
    <div class="attr-select"></div>
    <div id="lineChart" ref="lineChart" class="lineChart"></div>
  </div>
</template>
 
<script>
import { Line } from "@antv/g2plot";
export default {
  name: "lineChart",
  props: {
    linedata: {
      type: Array,
      default() {
        return [];
      },
    },
    Height: {
      type: Number,
      default: 500,
    },
    Width: {
      type: Number,
      default: 700,
    },
    xField: {
      type: String,
      default: "year",
    },
    yField: {
      type: String,
      default: "value",
    },
    category: {
      type: String,
      default: "category",
    },
  },
  data() {
    return {
      alreadyRender: false,
      LinePlot: null,
    };
  },
  mounted() {
    this.initG2Plot();
  },
  methods: {
    /**
     * chart图表初始化
     * 需要根据后期的数据动态修改其中的x，y字段
     */
    initG2Plot() {
      this.LinePlot = new Line(this.$refs.lineChart, {
        data: this.linedata,
        height: this.Height,
        width: this.Width,
        xField: this.xField,
        yField: this.yField,
        seriesField: this.category,
        smooth: true,
        xAxis: {
          type: "time",
        },

        yAxis: {
          label: {
            // 数值格式化为千分位
            formatter: (v) =>
              `${v}`.replace(/\d{1,3}(?=(\d{3})+$)/g, (s) => `${s},`),
          },
          grid: {
            line: {
              style: {
                stroke: "black",
                lineWidth: 0.2,
                lineDash: [4, 5],
                strokeOpacity: 0.7,
                shadowColor: "black",
                shadowBlur: 10,
                shadowOffsetX: 5,
                shadowOffsetY: 5,
                cursor: "pointer",
              },
            },
          },
        },
      });
      if (this.linedata.length != 0) {
        this.LinePlot.render();
      }
    },
  },
  watch: {
    /**
     * 监听对应数据字段，当数据发生变化时重新渲染
     */
    linedata: {
      handler() {
        this.LinePlot.data = this.linedata;
        if (!this.alreadyRender) {
          this.LinePlot.render();
        }
        this.LinePlot.changeData(this.linedata);
      },
      deep: true,
    },
  },
};
</script>

<style lang="scss">
.box {
  padding: 5px;
  .attr-select {
    span {
      margin-right: 5px;
      font-size: 14px;
      font-weight: 600;
    }
  }
  .lineChart {
    margin-top: 30px;
  }
}
</style>