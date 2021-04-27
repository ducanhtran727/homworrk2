<template>
    <div class="title-table flex items-center h-16 rounded-2xl bg-gray-300">
        <div :class="[item.value === 'body' ? 'w-8/12' : 'w-1/12',item.value === 'title' ? 'w-2/12':'','pl-2 flex justify-center']" v-for="item in groupTitle" :key="item.id">{{item.text}}</div>
    </div>
</template>

<script>
export default {
    props:{
        groupTitle:{
            type:Array,
            required:true
        }
    }
}
</script>

<style lang="scss" scoped>
.title-table {
    width: 80vw;

}
</style>


