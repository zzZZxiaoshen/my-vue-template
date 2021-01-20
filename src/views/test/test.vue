<template>
    <div class="app-container">
<!--      <el-button-->
<!--        class="filter-item"-->
<!--        type="primary"-->
<!--        icon="el-icon-search"-->
<!--        style="margin-left: 10px"-->
<!--        @click="changeClick"-->
<!--        ></el-button>-->
<!--      <canvas id="myChart" width="400" height="260"></canvas>-->
<!--网格布局方案1-->

      <div class="box">
        <div class="content">
          <div class="b">1</div>
          <div class="b">2</div>
          <div class="b">3</div>
        </div>
        <div class="content">
          <div class="b">4</div>
          <div class="b">5</div>
          <div class="b">6</div>
        </div>
        <div class="content">
          <div class="b">7</div>
          <div class="b">8</div>
          <div class="b">9</div>
        </div>
      </div>

<!--网格布局方案2-->
<!--  <div class="content">-->
<!--    <div class="b">1</div>-->
<!--    <div class="b">2</div>-->
<!--    <div class="b">3</div>-->
<!--    <div class="b">4</div>-->
<!--    <div class="b">5</div>-->
<!--    <div class="b">6</div>-->
<!--    <div class="b">7</div>-->
<!--    <div class="b">8</div>-->
<!--    <div class="b">9</div>-->
<!--  </div>-->

<!--       复制黏贴测试用例 vue框架下使用Clipboard插件实现功能-->
<!--      &lt;!&ndash; Target &ndash;&gt;-->
<!--      <input id="foo" value="https://github.com/zenorocha/clipboard.js.git">-->

<!--      &lt;!&ndash; Trigger data-clipboard-target="#foo"&ndash;&gt;-->
<!--      <button class="btn" data-clipboard-target="#foo"  @click="handleClipboard(null,$event)">-->
<!--        <img src="assets/clippy.svg" alt="Copy to clipboard">-->
<!--      </button>-->

      <article>
        <p>
          迪斯尼电影<cite>海的女儿</cite>（<cite>The Little Mermaid</cite>）于 1989 年首次登上银幕。
        </p>
        <aside>
          在首次发行期间，该片便收获了 8700 万美元的票房。
        </aside>
        <p>
          更多有关该电影的信息…
        </p>
      </article>
    </div>
</template>


<script>
  import clipboard from '@/utils/clipboard'

  const F2 = require('@antv/f2');

    export default {
        name: "test",
        created() {
        },
      methods:{
        handleClipboard(text,event){
          clipboard(text, event)
        },
        Clipboard(){
          let clipboard = new ClipboardJS('.btn');

          clipboard.on('success', function(e) {
            console.info('Action:', e.action);
            console.info('Text:', e.text);
            console.info('Trigger:', e.trigger);

            e.clearSelection();
          });

          clipboard.on('error', function(e) {
            console.error('Action:', e.action);
            console.error('Trigger:', e.trigger);
          });
        },
        changeClick(){
          const data = [
            { genre: 'Sports', sold: 275 },
            { genre: 'Strategy', sold: 115 },
            { genre: 'Action', sold: 120 },
            { genre: 'Shooter', sold: 350 },
            { genre: 'Other', sold: 150 },
          ];

          // Step 1: 创建 Chart 对象
          const chart = new F2.Chart({
            id: 'myChart',
            pixelRatio: window.devicePixelRatio // 指定分辨率
          });

          // Step 2: 载入数据源
          chart.source(data);

          // Step 3：创建图形语法，绘制柱状图，由 genre 和 sold 两个属性决定图形位置，genre 映射至 x 轴，sold 映射至 y 轴
          chart.interval().position('genre*sold').color('genre');

          // Step 4: 渲染图表
          chart.render();
        }
      }
    }
</script>

<style scoped>
/*方案1*/
  .box {
    padding: 10px;
    padding-bottom: 0;
    padding-right: 0;
    display: flex;
    flex-direction: column;
    height: 800px;
    width: calc(100vw -0px);
    background-color: #000;
  }
  .content {
    display: flex;
    margin-bottom: 10px;
    flex: 1
  }
  .b {
    flex: 1;
    margin-right: 10px;
    background-color: yellow;
  }
/*方案2*/
/*  .content {*/
/*    padding: 10px;*/
/*    display: grid;*/
/*    grid-template-columns: auto auto auto;*/
/*    grid-template-rows: auto auto auto;*/
/*    height: 780px;   //padding 有个20的宽度*/
/*    background-color: #000;*/
/*    grid-gap: 10px;*/
/*  }*/
/*  .b {*/
/*    background-color: yellow;*/
/*  }*/
</style>
