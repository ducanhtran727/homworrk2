<template>
  <div id="app" class="app">
    <div v-if="getLoading">loading ...</div>
    <div v-else class="mx-auto flex-col items-center table">
      <div class="searchBox">
        <input type="text" v-model="searchValue" placeholder="search ..." />
        <router-link to="/form"
          ><button
            class="outline-none bg-blue-300 w-32 h-8 text-sm rounded-xl"
          >
            Add New Item
          </button></router-link
        >
      </div>
      <HeaderTable :groupTitle="groupTitle" />
      <RowTable
        v-for="item in contentPage"
        :key="item.id"
        :itemContent="item"
        :groupTitle="groupTitle"
        @deleteItem="deleteItem"
        @getEditItem="getEditItem"
      />
      <BotTable
        :pagination="pagination"
        :prevPage="prevPage"
        :nextPage="nextPage"
      />
      <router-view />
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
      searchValue: "",
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
          class: "w-2/12",
        },
        {
          id: 2,
          text: "Body",
          class: "w-7/12",
          value: "body",
        },
        {
          id: 3,
          text: "Id",
          value: "id",
          class: "w-1/12 justify-center",
        },
        {
          id: 4,
          text: "User Id",
          value: "userId",
          class: "w-1/12 justify-center",
        },
      ],
    };
  },
  methods: {
    ...mapActions([
      "actionGetDataContent",
      "actionGetEditDataContent",
      "actionDeleteDataContent",
    ]),
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
    getEditItem(item) {
      this.actionGetEditDataContent(item);
    },
    deleteItem(id) {
      this.actionDeleteDataContent(id);
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
      this.pagination.currentPage = 0;
    },
    searchValue: function() {
      if (this.searchValue === "") {
        this.pagination.totalFilter = null;
        this.pagination.currentPage = 0;
      } else {
        this.pagination.totalFilter = this.contentFilter.length;
        this.pagination.currentPage = 0;
      }
      this.conditionChange();
    },
  },
  computed: {
    contentFilter() {
      return this.getContent.filter((item) =>
        this.searchValue
          ? Object.values(item)
              .join("")
              .toLowerCase()
              .trim()
              .includes(this.searchValue)
          : item
      );
    },
    contentPage() {
      const startIndex =
        this.pagination.currentPage * this.pagination.numberRow;
      let endIndex = startIndex + this.pagination.numberRow;
      return this.contentFilter.slice(startIndex, endIndex);
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
.searchBox {
  width: 100%;
  margin-bottom: 10px;
  display: flex;
  justify-content: space-around;
}
.searchBox input {
  border: 2px solid lightblue;
  padding-left: 5px;
}
</style>
