<template>
  <div class="species-list-container">
    <div class="button-container">
      <button class="btn" @click="showAll">Show All</button>
      <button class="btn" @click="filterCR">Show Critically Endangered</button>
      <button class="btn" @click="filterMM">Show Mammals</button>
    </div>
    <hr />
    <button @click="exportCSV" class="btn">Export to CSV</button>
    <ul v-if="cr" class="species-list">
      <li
        v-for="species in speciesList"
        :key="species.taxonid"
        class="species-item"
      >
        {{ species.scientific_name }}
      </li>
    </ul>
    <ul v-else class="species-list">
      <li
        v-for="species in crList"
        :key="species.identifier"
        class="species-item"
      >
        <p>{{ species.name }}</p>
        <p>{{ species.conservationMeasures }}</p>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { Measure, Species } from "@/types";
import Papa from "papaparse";

export default defineComponent({
  name: "SpeciesList",
  props: {
    speciesList: {
      type: Array as PropType<Species[]>,
      required: true,
    },
    crList: {
      type: Array as PropType<Measure[]>,
      required: true,
    },
    cr: Boolean,
  },
  emits: ["show-all", "filter-cr", "filter-mm"],
  methods: {
    showAll() {
      this.$emit("show-all");
    },
    filterCR() {
      this.$emit("filter-cr");
    },
    filterMM() {
      this.$emit("filter-mm");
    },
    exportCSV(){
      if(this.cr){
        const csvContent = Papa.unparse(this.speciesList);
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.setAttribute('href', url);
        link.setAttribute('download', 'speciesList.csv');
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }
      else{
        const csvContent = Papa.unparse(this.crList);
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.setAttribute('href', url);
        link.setAttribute('download', 'speciesList.csv');
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }
    }
  },
});
</script>

<style scoped>
.species-list-container {
  padding: 20px;
  background-color: #f5f5f5;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.button-container {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
}

.btn {
  padding: 10px 20px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.btn:hover {
  background-color: #0056b3;
}

.species-list {
  list-style-type: none;
  padding: 0;
}

.species-item {
  padding: 10px;
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 4px;
  margin-bottom: 10px;
  transition: transform 0.3s;
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.species-item:hover {
  transform: translateY(-2px);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}
</style>
