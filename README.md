# kohala-map

# How this was created

#### Scaffolding

npm create vite@latest map-app -- --template react-ts
npm create vite@latest controller-app -- --template react-ts
mkdir kohala-api ... create main.py

#### Install Material UI

npm install @mui/material @emotion/react @emotion/styled

#### Install Tailwind

npm install tailwindcss @tailwindcss/vite

#### Packages installed in React Apps

npm i @tanstack/react-query
[https://tanstack.com/query/latest/docs/framework/react/installation](https://tanstack.com/query/latest/docs/framework/react/installation)

React Router
npm i react-router
https://reactrouter.com/start/declarative/installation


#### Controller Icon

https://commons.wikimedia.org/wiki/File:Video-Game-Controller-Icon-IDV-green.svg

#### Map Icon

https://commons.wikimedia.org/wiki/File:Kohala-Landsat.jpg

# ESRI

https://developers.arcgis.com/javascript/latest/get-started/#npm

https://community.esri.com/t5/arcgis-javascript-maps-sdk-questions/react-19-web-components-and-future-of-arcgis-map/td-p/1579328
https://github.com/omarkawach/maps-sdk-react-ts/tree/main

# How Run on iPhone on local network

python -m uvicorn main:app --host 0.0.0.0 --port 8000 --reload
controller-app -> npm run dev:host
system settings -> network -> get your IP address -> put IP:port in phone
create a .env in the controller-app and map-app. add VITE_API_BASE_URL=http://your-ip-address-and-port to both
