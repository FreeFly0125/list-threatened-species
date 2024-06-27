<template>
  <div class="region-list-container">
    <h2>Regions</h2>
    <ul class="region-list">
      <li 
        v-for="region in regions" 
        :key="region.identifier" 
        :class="{ selected: region.identifier === selectedRegion }"
        @click="selectRegion(region.identifier)"
        class="region-item"
      >
        {{ region.name }}
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, PropType } from 'vue';
import { Region } from '@/types';


export default defineComponent({
  name: 'RegionList',
  props: {
    regions: {
      type: Array as PropType<Region[]>,
      required: true,
    },
  },
  emits: ['region-selected'],
  setup(props, { emit }) {
    const selectedRegion = ref<string | null>(null);

    const selectRegion = (identifier: string) => {
      selectedRegion.value = identifier;
      emit('region-selected', identifier);
    };

    return {
      selectedRegion,
      selectRegion,
    };
  },
});
</script>

<style scoped>
.region-list-container {
  padding: 20px;
  background-color: #f5f5f5;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.region-list {
  list-style-type: none;
  padding: 0;
}

.region-item {
  padding: 10px;
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 4px;
  margin-bottom: 10px;
  cursor: pointer;
  transition: background-color 0.3s, transform 0.3s;
}

.region-item:hover {
  background-color: #e0e0e0;
}

.region-item.selected {
  background-color: #007bff;
  color: #fff;
}

.region-item.selected:hover {
  background-color: #0056b3;
}
</style>