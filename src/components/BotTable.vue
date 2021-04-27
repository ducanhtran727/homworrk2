<template>
  <div class="bot-table flex items-center h-20 rounded-2xl bg-gray-300 mt-4 justify-around">
    <div>
      Item per Page :
      <select class="select-box" v-model.number="pagination.numberRow">
        <option v-for="item in pagination.dropDownRow" :key="item.id">
          {{ item.value }}
        </option>
      </select>
    </div>
    <div class="flex w-2/12 items-center justify-between">
      <button :class="[pagination.isPrev ? 'btn-disabled' : '','btn']" @click="prevPage" :disabled="pagination.isPrev" >Prev</button>
      <button :class="[pagination.isNext ? 'btn-disabled' : '','btn']"  @click="nextPage" :disabled="pagination.isNext" >Next</button>
    </div>
    <div>
      <div>
        Page current : {{ pagination.currentPage + 1 }} /
        {{ pagination.totalPage }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    pagination: {
      type: Object,
      required: true,
    },
    prevPage: {
      type: Function,
      required: true,
    },
    nextPage: {
      type: Function,
      required: true,
    },
  },
};
</script>

<style lang="scss" scoped>
.bot-table {
  width: 80vw;
}
.btn{
    display: flex;
    justify-content: center;
    align-items: center;
    width: 60px;
    height:35px;
    background-color: white;
    border-radius:5px;
}
.btn-disabled{
    background-color:lightgray;
    border: 1px solid white;
}
.select-box{
    width:40px;
    height:40px;
    background-color:white;
    border-radius: 5px;
    margin-left: 10px;    
}
</style>
