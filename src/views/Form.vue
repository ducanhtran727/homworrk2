<template>
  <div>
    <div class="overlay" @click="closePost"></div>
    <div class="containerFrom flex items-center justify-center rounded-xl">
      <ValidationObserver
        v-slot="{ handleSubmit }"
        class="w-full flex justify-center"
      >
        <form @submit.prevent="handleSubmit(onSubmit)" class="w-3/4">
          <ValidationProvider
            v-slot="{ errors }"
            v-for="item in updateListField"
            :key="item.id"
            :rules="item.rules"
            :name="item.name"
          >
            <div class="flex flex-col pt-2 items-center">
              <label>{{ item.name }}</label>
              <input
                class="mt-2 w-full pl-2 flex items-center h-9 rounded-xl"
                :type="item.type"
                v-model="item.value"
              />
              <div class="w-full h-8 pt-2 flex items-center justify-center">
                <span class="text-red-500">{{ errors[0] }}</span>
              </div>
            </div>
          </ValidationProvider>
          <div class="mt-3 flex items-center justify-around">
            <button
              class="outline-none bg-white w-16 rounded-xl h-10"
              type="submit"
            >
              Add
            </button>
            <button
              class="outline-none bg-white w-16 rounded-xl h-10"
              type="button"
              @click="closePost"
            >
              Close
            </button>
          </div>
        </form>
        {{updateListField}}
        {{getEditContent}}
        {{updateEditValue}}
      </ValidationObserver>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      listField: [
        {
          name: "title",
          type: "text",
          rules: "required",
          value: "",
          id: 1,
        },
        {
          name: "body",
          type: "text",
          rules: "required",
          value: "",
          id: 2,
        },
        {
          name: "id",
          type: "text",
          rules: "required|numeric",
          value: "",
          id: 3,
        },
      ],
      listKey: {
          title:'',
          id:'',
          body:''
      }
    };
  },
  computed: {
    ...mapGetters(["getEditContent"]),
    updateListField() {
      return this.listField.map(
        (item) => ({...item,value: this.getEditContent[item.name]})
      );
    },
    updateEditValue(){
        return   this.updateListField.map(item => item.value)
    }
  },
  watch:{
    updateListField: {
        deep:true
    }
  },
  methods: {
    closePost() {
      this.$router.push("/");
    },
    onSubmit() {
      this.$store.dispatch("actionUpdateItem")
    },
  },
};
</script>

<style lang="scss" scoped>
.containerFrom {
  position: fixed;
  top: 20%;
  left: 28%;
  background-color: #dfe6e9;
  width: 40vw;
  height: 45vh;
  z-index: 9999;
}
.overlay {
  width: 100vw;
  height: 100vh;
  position: fixed;
  background-color: rgba(99, 110, 114, 0.6);
  top: 0;
  left: 0;
}
</style>
