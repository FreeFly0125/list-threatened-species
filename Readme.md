#  - IUCN Red List of Threatened Species

Build a simple app with a REST interface and a FE leveraging the REST endpoint using the technology of Nodejs and integrate the following features using the public IUCN Red List API.

## Features

- Load the list of the available regions for species
- Show the list of regions in a navigation list and add a filter - regions can be selected by the user
- Load the list of all species in the selected region — the first page of the results would suffice, no need for pagination
- Create a model for “Species” and map the results to an array of Species.
- Filter the results for Critically Endangered species
- Fetch the conservation measures for all critically endangered species
- Store the “title”-s of the response in the Species model as a concatenated text property.
- Print/display the results
- Filter the results (from step 4) for the mammal class
- Print/display the results



## Setup

Clone the repository: `https://github.com/FreeFly0125/list-threatened-species.git`

### Backend

1. `cd backend`
2. Copy the `.env.example` file to `.env` and update the necessary variables: `cp .env.example .env`
  SERVER_PORT= : please write the port you want
  API_TOKEN=   : please use the token that you got from IUCN Red List of Threatened Species `https://apiv3.iucnredlist.org`
  API_URL=https://apiv3.iucnredlist.org/api/v3 
4. Install the dependencies: `npm install`
5. Run the backend: `npm start`

### Frontend
1. `cd backend`
2. Install the dependencies: `npm install`
3. Run the frontend: `npm run serve`


## Tools and Technologies Used
- NodeJS
- TypeScript
- Vue 


## API endpoints

- `GET /regions`: Get a list of regions
- `GET /species?region=${region}`: Get regional species list 
- `GET /measures?region=${region}`: Get Conservation measures by species name










