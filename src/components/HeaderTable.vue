<template>
    <div class="title-table flex items-center h-16 rounded-2xl bg-gray-300">
        <div :class="[item.value === 'body' ? 'w-3/6' : 'w-1/6','pl-2']" v-for="item in groupTitle" :key="item.id">{{item.text}}</div>
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


