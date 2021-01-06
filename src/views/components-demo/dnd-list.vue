<template>
  <div class="components-container">
    <aside>drag-list base on
      <a href="https://github.com/SortableJS/Vue.Draggable" target="_blank">Vue.Draggable</a>
    </aside>
    <div class="editor-container">
      <dnd-list :list1="list1" :list2="list2" list1-title="List" list2-title="Article pool"/>
    </div>

  </div>
</template>

<script>
  import DndList from '@/components/DndList'
  import { fetchList } from '@/api/article'

  export default {
    name: "DndListDemo",
    components: {DndList},
    data() {
      return {
        list1:["1[George] Tkwip Uivh Xfviqlwp Klywoslrk Mbcpzgof Weodttj Pvp Vbkfrhhuw Iwinnh Ssiow "
        ,"2[Nancy] Jroksxl Kgpm Mxbf Coul Sfnkcvksy Vnxarlbj "
        ,"3[George] Sfoxpv Hkvqbd Bylpxr Kdspayno Wylpzs Donjcsq "
        ,"12[Daniel] Bcigiva Pbhpqp Chnf Frx Xmkrmol Djuiacf Epyebxfb "],
        list2:[]
      }
    },
    methods:{
      // getData(){
      //   this.listLoading = true
      //   fetchList().then(response=>{
      //     this.list1 = response.data.items.splice(0, 5)
      //     this.list2 = response.data.items
      //   })
      // }
    }
  }
</script>

<style scoped>

</style>
