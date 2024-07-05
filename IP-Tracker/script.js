const secretApi = "24.48.0.1";
const bypass_cors_URL = "https://cors-anywhere.herouapp.com/";
const ip_URL = `http://ip-api.com/json/`;
let myMap;
const ipSearchVal = document.getElementById("ipSearch");
const searchBtn = document.querySelector(".searchBtn");
const ipContent = document.getElementById("ip");
const locationContent = document.getElementById("lo");
const timeContent = document.getElementById("time");
const ispContent = document.getElementById("isp");
const mainMap = document.getElementById("map");
const info = document.querySelector(".info");

const getValue = () => {
  return ipSearchVal.value;
};

//lat 41.3874 & long  2.1686
const attribute =
  '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';

const tileUrl = "https://tile.openstreetmap.org/{z}/{x}/{y}.png";

const tiles = L.tileLayer(tileUrl, { attribute });

//const myMap = L.map("map").setView([51.505, -0.09], 13);

// tiles.addTo(myMap);
const updateMarker = (updateMark) => {
  if (myMap) {
    myMap.off();
    myMap.remove();
  }
  myMap = L.map("map").setView(updateMark, 13);
  L.marker(updateMark).addTo(myMap);
  tiles.addTo(myMap);
};

// if (navigator.geolocation) {
//   navigator.geolocation.getCurrentPosition(
//     function (pos) {
//       console.log(pos.coords.latitude);
//       updateMarker([pos.coords.latitude, pos.coords.longitude]);
//     },
//     function () {
//       alert("Could not find your position");
//     }
//   );
// }

info.addEventListener("load", (e) => {
  e.preventDefault();
});

const getIPDetails = (default_ip) => {
  let ipVal;
  if (default_ip === undefined) {
    ipVal = `${ip_URL}${secretApi}`;
  } else {
    ipVal = `${ip_URL}${default_ip}`;
  }
  fetch(ipVal)
    .then((results) => results.json())
    .then((data) => {
      console.log(data);
      ipContent.textContent = data.query;
      ispContent.textContent = data.isp;
      timeContent.textContent = data.timezone;
      locationContent.textContent = `${data.city},${data.country}`;

      updateMarker([data.lat, data.lon]);
    })
    .catch((err) => console.log(err));
};

getIPDetails();

searchBtn.addEventListener("click", (e) => {
  e.preventDefault();
  const ipNeeded = getValue();
  getIPDetails(ipNeeded);
});
