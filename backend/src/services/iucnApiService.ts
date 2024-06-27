import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const apiUrl = process.env.API_URL;
const token = process.env.API_TOKEN;

export async function fetchRegions() {
  try {
    const response = await axios.get(`${apiUrl}/region/list?token=${token}`);
    return response.data.results;
  } catch (error) {
    console.log("Error fetching regions", error);
    throw error;
  }
}

export async function fetchSpeciesByRegion(regionIdentifier) {
  try {
    const response = await axios.get(
      `${apiUrl}/species/region/${regionIdentifier}/page/0?token=${token}`
    );
    return response.data.result;
  } catch (error) {
    console.error(
      `Error fetching species for region ${regionIdentifier}:`,
      error
    );
    throw error;
  }
}

export const fetchConservationMeasures = async (
  name: string,
  region: string
) => {
  const response = await axios.get(
    `${apiUrl}/measures/species/name/${name}/region/${region}?token=${token}`
  );
  return response.data.result;
};
