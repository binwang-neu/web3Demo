<template>
  <div class="connection">
    <div class="connect-metaMask-wallet">
      <el-button type="text">
        <span>
          <svg class="icon" aria-hidden="true" style="font-size: 25px">
            <use xlink:href="#icon-modelsmetamask-icon"></use>
          </svg>
        </span>
        <span style="font-size: 20px; margin-left: 10px">MetaMask</span>
      </el-button>
    </div>
    <el-divider></el-divider>
    <div class="connect-github-account">
      <el-button type="text">
        <span>
          <svg class="icon" aria-hidden="true" style="font-size: 25px">
            <use xlink:href="#icon-modelsgithub"></use>
          </svg>
        </span>
        <span style="font-size: 20px; margin-left: 10px">Github</span>
      </el-button>
    </div>
    <div style="margin-top: 20px">
      <span style="color: black">By connecting, I agree Models's </span
      ><span style="color: CadetBlue">Terms of Service</span>
    </div>
  </div>
</template>

<style lang="scss">
.connection {
  color: #555555;
  .connect-metaMask-wallet {
    .el-button {
      color: inherit;
      font-size: 15px;
    }
    &:hover {
      color: inherit;
      background-color: #ecebeb;
    }
  }
  .connect-github-account {
    .el-button {
      color: inherit;
      font-size: 15px;
    }
    &:hover {
      color: inherit;
      background-color: #ecebeb;
    }
  }
}
</style>