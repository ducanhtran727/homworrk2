<template>
  <div id="app" class="app">
    <div v-if="getLoading">loading ...</div>
    <div v-else class="mx-auto flex-col items-center table">
      <HeaderTable :groupTitle="groupTitle" />
      <RowTable
        v-for="item in contentPage"
        :key="item.id"
        :itemContent="item"
        :groupTitle="groupTitle"
      />
      <BotTable
        :pagination="pagination"
        :prevPage="prevPage"
        :nextPage="nextPage"
      />
    </div>
  </div>
</template>
<script>
import HeaderTable from "./components/HeaderTable";
import RowTable from "./components/RowTable";
import BotTable from "./components/BotTable";
import { mapGetters, mapActions } from "vuex";
export default {
  components: {
    HeaderTable,
    RowTable,
    BotTable,
  },
  data() {
    return {
      pagination: {
        currentPage: 0,
        totalPage: 10,
        numberRow: 10,
        totalFilter: null,
        isPrev: true,
        isNext: false,
        dropDownRow: [
          {
            id: 1,
            value: 5,
          },
          {
            id: 2,
            value: 10,
          },
        ],
      },
      groupTitle: [
        {
          id: 1,
          text: "Title",
          value: "title",
        },
        {
          id: 2,
          text: "Body",
          value: "body",
        },
        {
          id: 3,
          text: "Id",
          value: "id",
        },
        {
          id: 4,
          text: "User Id",
          value: "userId",
        },
      ],
    };
  },
  methods: {
    ...mapActions(["actionGetDataContent"]),
    prevPage() {
      this.pagination.currentPage--;
    },
    nextPage() {
      this.pagination.currentPage++;
    },
    conditionChange() {
      if (this.pagination.currentPage === 0) {
        this.pagination.isPrev = true;
      }
      if (this.pagination.currentPage > 0) {
        this.pagination.isPrev = false;
      }
      if (this.pagination.currentPage === this.pagination.totalPage - 1) {
        this.pagination.isNext = true;
      } else {
        this.pagination.isNext = false;
      }
    },
  },
  created() {
    this.actionGetDataContent();
    this.pagination.numberRow = 10;
    this.pagination.totalPage = 10;
  },
  watch: {
    "pagination.currentPage": function () {
      this.conditionChange();
    },
    "pagination.numberRow": function () {
      this.pagination.totalPage =
        this.getContent.length / this.pagination.numberRow;
      this.pagination.currentPage = 0
    },
  },
  computed: {
    contentPage() {
      const startIndex =
        this.pagination.currentPage * this.pagination.numberRow;
      let endIndex = startIndex + this.pagination.numberRow;
      return this.getContent.slice(startIndex, endIndex);
    },
    getLoading() {
      return this.$store.state.loading;
    },
    ...mapGetters(["getContent"]),
  },
};
</script>
<style lang="scss">
.app {
  display: flex;
  width: 100vw;
  height: 100vh;
  justify-content: center;
  align-items: center;
}
.table {
  width: 50vw;
}
</style>
