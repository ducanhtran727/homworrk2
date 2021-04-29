<template>
  <div
    :class="[
      itemContent.id % 2 == 0 ? 'bg-blue-100' : '',
      'flex text-xs items-center rounded-2xl w-full mt-4 bg-gray-100 row',
    ]"
  >
    <div
      :class="[item.class, 'pl-4 flex h-full items-center']"
      v-for="item in groupTitle"
      :key="item.id"
    >
      {{ dataContent[item.value] }}
    </div>
    <div class="w-1/12 flex items-center justify-around">
      <button @click="getEditItem" class="btn bg-white rounded-xl">Edit</button>
      <button @click="deteteItem" class="btn bg-white rounded-xl ">
        Delete
      </button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    itemContent: {
      type: Object,
      required: true,
    },
    groupTitle: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      dataContent: "",
    };
  },
  methods: {
    getdata() {
      let body = this.itemContent["body"].split("").slice(0, 140).join("");
      let title = this.itemContent["title"].split("").slice(0, 40).join("");
      let id = this.itemContent["id"];
      let userId = this.itemContent["userId"];
      this.dataContent = {
        id,
        userId,
        body,
        title,
      };
      return this.dataContent;
    },
    deteteItem() {
      this.$emit("deleteItem", this.itemContent.id);
    },
    getEditItem() {
      this.$emit("getEditItem", this.itemContent);
      this.$router.push('/form')
    },
  },
  created() {
    this.getdata();
  },
};
</script>

<style lang="scss" scoped>
.row {
  height: 50px;
  width: 80vw;
}
.btn {
  width: 50px;
  height: 30px;
  border:none;
  outline:none;
}
</style>
