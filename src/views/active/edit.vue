<template>
  <active-detail :is-edit="true"/>
</template>

<script>
  import ActiveDetail from './components/Detail'

    export default {
        name: "edit",
        components:{ActiveDetail}
    }
</script>

<style scoped>

</style>
