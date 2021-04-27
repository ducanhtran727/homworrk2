<template>
    <div class="flex text-xs items-center rounded-2xl w-full mt-4 bg-gray-100 row">
        <div :class="[item.value === 'body' ? 'w-3/6' : 'w-1/6','pl-2']" v-for="item in groupTitle" :key="item.id">{{itemContent[item.value]}}</div>
    </div>
</template>

<script>
export default {
    props:{
        itemContent:{
            type:Object,
            required:true,
        },
        groupTitle:{
            type:Array,
            required:true
        }
    }
}
</script>

<style lang="scss" scoped>
.row{
    height:45px;
    width: 80vw;
}
</style>