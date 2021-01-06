<template>
  <div class="components-container">
    <aside><strong>SplitPane</strong>  这是一项屏幕切分技术，可以用于美化后台管理页面
    </aside>

    <split-pane split="vertical" @resize="resize">
      <template slot="paneL">
        <div class="left-container" />
      </template>
      <template slot="paneR">
        <split-pane split="ho rizontal">
          <template slot="paneL">
            <div class="top-container" />
          </template>
          <template slot="paneR">
            <div class="bottom-container" />
          </template>
        </split-pane>
      </template>
    </split-pane>
  </div>
</template>

<script>
  import splitPane from 'vue-splitpane'



    export default {
        name: "SplitpaneDemo",
        components: { splitPane },
        methods: {
          resize() {
            console.log('resize')
          },

        }
    }
</script>

<style scoped>
  .components-container{
    position: relative;
    height: 100vh;
  }
  .left-container{
    background-color: #F38181;
    height: 100%;
  }
  .top-container{
    background-color:#FCE38A;
    width: 100%;
    height: 100%;
  }

  .bottom-container{
    width: 100%;
    background-color: #95E1D3;
    height: 100%;
  }

</style>
