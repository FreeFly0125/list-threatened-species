import axios from 'axios';

const API_URL = 'http://localhost:4000/';


export async function fetchRegions() {
  const response = await axios.get('http://localhost:4000/regions');
  return response.data;
}

export async function fetchSpeciesByRegion(region: string) {
  const response = await axios.get(`http://localhost:4000/species?region=${region}`);
  return response.data;
}

export async function fetchSpeciesByCR(region: string) {
  const response = await axios.get(`http://localhost:4000/measures?region=${region}`);
  return response.data;
}
