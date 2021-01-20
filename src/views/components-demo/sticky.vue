<template>
 <div>
   <sticky :z-index="10" class-name="sub-navbar">

     <el-button style="margin-left: 10px;" type="success">
       publish
     </el-button>
   </sticky>

   <div class="components-container">
     <aside>
       Sticky header, When the page is scrolled to the preset position will be sticky on the top.
     </aside>
     <div>placeholder</div>
     <div>placeholder</div>
     <div>placeholder</div>
     <div>placeholder</div>
     <div>placeholder</div>
     <div>placeholder</div>
     <div>placeholder</div>
     <div>placeholder</div>
     <div>placeholder</div>
     <div>placeholder</div>
     <div>placeholder</div>
     <div>placeholder</div>
     <div>placeholder</div>
     <sticky :sticky-top="600">
       <el-button type="primary"> placeholder</el-button>
     </sticky>
     <div>placeholder</div>
     <div>placeholder</div>
     <div>placeholder</div>
     <div>placeholder</div>
     <div>placeholder</div>
     <div>placeholder</div>
     <div>placeholder</div>
     <div>placeholder</div>
     <div>placeholder</div>
     <div>placeholder</div>
     <div>placeholder</div>
     <div>placeholder</div>
     <div>placeholder</div>
     <div>placeholder</div>
     <div>placeholder</div>
     <div>placeholder</div>
     <div>placeholder</div>
     <div>placeholder</div>
     <div>placeholder</div>
     <div>placeholder</div>
     <div>placeholder</div>
     <div>placeholder</div>
     <div>placeholder</div>
     <div>placeholder</div>
     <div>placeholder</div>
     <div>placeholder</div>
     <div>placeholder</div>
     <div>placeholder</div>
     <div>placeholder</div>
     <div>placeholder</div>
     <div>placeholder</div>
     <div>placeholder</div>
     <div>placeholder</div>
     <div>placeholder</div>
     <div>placeholder</div>
     <div>placeholder</div>
     <div>placeholder</div>
     <div>placeholder</div>
     <div>placeholder</div>
     <div>placeholder</div>
     <div>placeholder</div>
     <div>placeholder</div>
     <div>placeholder</div>
     <div>placeholder</div>
     <div>placeholder</div>
     <div>placeholder</div>
     <div>placeholder</div>
     <div>placeholder</div>
     <div>placeholder</div>
     <div>placeholder</div>
     <div>placeholder</div>
     <div>placeholder</div>
     <div>placeholder</div>
     <div>placeholder</div>
   </div>
 </div>
</template>

<script>
  import Sticky from '@/components/Sticky'

    export default {
        name: "stickyDemo",
        components:{Sticky}
    }
</script>

<style scoped>

</style>
