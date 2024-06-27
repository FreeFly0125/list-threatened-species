<template>
  <div class="container">
    <nav class="navbar">
      <RegionList :regions="regions" @region-selected="handleRegionSelected" />
    </nav>
    <main class="content">
      <SpeciesList
        :speciesList="filteredSpeciesList"
        :crList="crList"
        :cr="cr"
        @show-all="showAllSpecies"
        @filter-cr="filterCRSpecies"
        @filter-mm="filterMMSpecies"
      />
    </main>
    <LoadingSpinner :loading="loading" />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from "vue";
import RegionList from "@/components/RegionList.vue";
import SpeciesList from "@/components/SpeciesList.vue";
import LoadingSpinner from "@/components/common/Spinner.vue";
import {
  fetchRegions,
  fetchSpeciesByCR,
  fetchSpeciesByRegion,
} from "../services/iucnApiService";
import { Species, Measure } from "@/types";

export default defineComponent({
  name: "HomePage",
  components: {
    RegionList,
    SpeciesList,
    LoadingSpinner,
  },
  setup() {
    const regions = ref([]);
    const speciesList = ref<Species[]>([]);
    const crList = ref<Measure[]>([]);
    const filteredSpeciesList = ref<Species[]>([]);
    const selectRegion = ref<string>("");
    //const measuresData= ref<Measure[]>([]);
    const loading = ref(false);
    const cr = ref(true);

    const handleRegionSelected = async (regionIdentifier: string) => {
      loading.value = true;
      const speciesData = await fetchSpeciesByRegion(regionIdentifier);
      const crData = await fetchSpeciesByCR(regionIdentifier);
      speciesList.value = speciesData;
      crList.value = crData;
      filteredSpeciesList.value = speciesList.value;
      selectRegion.value = regionIdentifier;

      loading.value = false;
    };

    const showAllSpecies = () => {
      filteredSpeciesList.value = speciesList.value;
      cr.value = true;
      console.log(filteredSpeciesList.value);
    };

    const filterCRSpecies = () => {
      filteredSpeciesList.value = speciesList.value.filter(
        (species) => species.category === "CR"
      );
      cr.value = false;
      console.log(filteredSpeciesList.value);
    };

    const filterMMSpecies = () => {
      filteredSpeciesList.value = speciesList.value.filter(
        (species) => species.class_name === "MAMMALIA"
      );
      cr.value = true;
    };

    onMounted(async () => {
      loading.value = true;
      const regionsData = await fetchRegions();
      regions.value = regionsData;
      loading.value = false;
    });

    return {
      regions,
      speciesList,
      filteredSpeciesList,
      crList,
      loading,
      handleRegionSelected,
      showAllSpecies,
      filterCRSpecies,
      filterMMSpecies,
      cr,
    };
  },
});
</script>

<style scoped>
.container {
  display: flex;
}

.navbar {
  width: 20%;
  background-color: #f8f8f8;
  padding: 20px;
  border-right: 1px solid #ddd;
}

.content {
  width: 80%;
  padding: 20px;
}
</style>
