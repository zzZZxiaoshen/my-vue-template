<template>
  <div :class="className" :style="{height:height,width:width}" />
</template>

<script>
    import echarts from 'echarts'
    require('echarts/theme/macarons') // echarts theme
    import { countActivityInfo } from '@/api/ad'

    export default {
      name: "MyBarChart",
      props:{
        className:{
          type:String,
          default: 'chart'
        },
        width:{
          type: String,
          default: "100%"
        },
        height:{
          type:String,
          default: '300px'
        }
      },
      data(){
        return{
          chart: null,
          source:[
            {axis:[]},
            { data:[]}
          ]
        }
      },
      created() {
        this.fetchData();
      },
      mounted() {

      },
      beforeDestroy() {
        if (!this.chart) {
          return
        }
        this.chart.dispose()
        this.chart = null
      },
      methods:{
        initChart(){
          this.chart = echarts.init(this.$el, 'macarons');
          this.chart.setOption( {
            xAxis:{
               type: 'category',
               data: this.source.axis
            },
            yAxis: {
              type: 'value'
            },
            series: [
              {
                data: this.source.data,
                type: 'bar',
                showBackground: true,
                backgroundStyle: {
                  color: 'rgba(220, 220, 220, 0.8)'
                }
              }
              ]
          })
        },
        fetchData(){
            countActivityInfo().then(res=>{
              function generateRenderAxis(data){
                let  axis = []
                for (const item in data['status']) {
                  if (item === '0') {
                    axis .push('已结束');
                  } else {
                    axis .push('进行中');
                  }
                }
                data['status'] = axis;
              }
              let data = res.data.data;
              let tempArr = {};
              for (const index in data) {
                if (data[index].status == null) {
                  delete data[index];
                  continue
                }
                for (const prop in data[index]) {

                  if (tempArr[prop] === undefined) {
                    tempArr[prop] = [];
                    tempArr[prop].push(data[index][prop]);
                  } else {
                    tempArr[prop].push(data[index][prop]);
                  }
                }
              }
              //处理转换坐标
              generateRenderAxis(tempArr);

              this.source.axis =tempArr['status']
              this.source.data =tempArr['number']

              this.$nextTick(() => {
                this.initChart()
              })
            })
        }
      },

    }
</script>

<style scoped>

</style>
