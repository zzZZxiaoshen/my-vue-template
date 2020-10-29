<template>
  <active-detail :is-edit="false"/>
</template>

<script>
import ActiveDetail from './components/Detail'

    export default {
        name: "create",
        components:{ActiveDetail}
    }
</script>

<style scoped>

</style>
