<template>
  <div
    :class="[
      itemContent.id % 2 == 0 ? 'bg-blue-100' : '',
      'flex text-xs items-center rounded-2xl w-full mt-4 bg-gray-100 row',
    ]"
  >
    <div
      :class="[
        item.value === 'body' ? 'w-8/12' : 'w-1/12',
        item.value === 'title' ? 'w-2/12' : '',
        'pl-4 flex h-full items-center',
        item.value === 'id' ? 'justify-center' : '',
        item.value === 'userId' ? 'justify-center' : '',
      ]"
      v-for="item in groupTitle"
      :key="item.id"
    >
      {{ dataContent[item.value] }}
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
      let body = this.itemContent["body"].split("").slice(0, 160).join("");
      let title = this.itemContent["title"].split("").slice(0, 40).join("");
      let id = this.itemContent["id"]
      let userId = this.itemContent["userId"]
      this.dataContent = {
        id,userId,
        body,
        title,
      };
      return this.dataContent;
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
</style>
