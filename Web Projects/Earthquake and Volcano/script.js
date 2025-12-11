const mapContainer = document.getElementById("mapContainer");
const tooltip = document.getElementById("tooltip");

const volcanoes = [
  {name: "Mount Etna", lat: 37.75, lon: 14.99, VEI: 3},
  {name: "Mount Fuji", lat: 35.36, lon: 138.73, VEI: 4},
  {name: "Kilauea", lat: 19.42, lon: -155.29, VEI: 2},
];

const earthquakes = [
  {name: "Japan Earthquake", lat: 38.32, lon: 142.37, magnitude: 9.1, date:"2011-03-11"},
  {name: "Chile Earthquake", lat: -36.12, lon: -72.89, magnitude: 8.8, date:"2010-02-27"},
  {name: "Alaska Earthquake", lat: 61.02, lon: -147.65, magnitude: 9.2, date:"1964-03-27"},
];

function latLonToXY(lat, lon) {
  const mapWidth = mapContainer.clientWidth;
  const mapHeight = mapContainer.clientHeight;
  const x = ((lon + 180) / 360) * mapWidth;
  const y = ((90 - lat) / 180) * mapHeight;
  return {x, y};
}

function createMarker(item, type) {
  const marker = document.createElement("div");
  marker.classList.add("marker", type);

  const pos = latLonToXY(item.lat, item.lon);
  marker.style.left = `${pos.x}px`;
  marker.style.top = `${pos.y}px`;

  marker.addEventListener("mouseenter", () => {
    tooltip.style.display = "block";
    if(type==="volcano") {
      tooltip.innerHTML = `<strong>${item.name}</strong><br>VEI: ${item.VEI}`;
    } else {
      tooltip.innerHTML = `<strong>${item.name}</strong><br>Magnitude: ${item.magnitude}<br>Date: ${item.date}`;
    }
  });

  marker.addEventListener("mousemove", (e) => {
    tooltip.style.left = e.pageX + 15 + "px";
    tooltip.style.top = e.pageY + 15 + "px";
  });

  marker.addEventListener("mouseleave", () => {
    tooltip.style.display = "none";
  });

  mapContainer.appendChild(marker);
  return marker;
}

let markers = [];

function showVolcanoes() {
  clearMarkers();
  volcanoes.forEach(v => markers.push(createMarker(v, "volcano")));
}

function showEarthquakes() {
  clearMarkers();
  earthquakes.forEach(eq => markers.push(createMarker(eq, "earthquake")));
}

function showAll() {
  clearMarkers();
  volcanoes.forEach(v => markers.push(createMarker(v, "volcano")));
  earthquakes.forEach(eq => markers.push(createMarker(eq, "earthquake")));
}

function clearMarkers() {
  markers.forEach(m => m.remove());
  markers = [];
}

// Initial load
showAll();

// Button events
document.getElementById("showVolcanoes").addEventListener("click", showVolcanoes);
document.getElementById("showEarthquakes").addEventListener("click", showEarthquakes);
document.getElementById("showAll").addEventListener("click", showAll);
