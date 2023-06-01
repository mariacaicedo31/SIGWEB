let mapa = L.map("contenedor-mapa").setView([3.4528117,-76.560031], 17)
//poner layers en el mapa
let basemap = L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png?", {}).addTo(mapa)


var carto_light = L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', { attribution: '@OpenStreetMap, @CartoDB', subdomans: 'abcd', maxZoom: 24 });
var minimap = new L.control.minimap(carto_light,
    {
        toggleDisplay: true,
        minimized: false,
        position: "bottomleft"
    }).addTo(mapa);
//punto MARCADORES
//var marcador =L.marker([4.6281045,-74.0654527]).addTo(mapa)
//marcador.bindPopup("Hola")

//escala
//var escala = L.map('escala').setView([30.182505,-93.318665], 12);        
var escala = L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    {
        maxZoom: 18,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(mapa);
L.control.betterscale().addTo(mapa);

//LISTA DE CAPAS

//PUNTOS ZOOLOGICO
var geojsonMarkerOptions = {
    radius: 8,
    fillColor: "#ff7800",
    color: "#000",
    weight: 1,
    opacity: 1,
    fillOpacity: 0.8
};
const animales = L.geoJson(zoologicoGeojson, {
    onEachFeature: function (feature, layer) {
        layer.bindPopup(`
            
            <div class="container">
                <div class="row border-bottom">
                    <div class="col d-flex justify-content-center">
                        <p class="m-0">` + feature.properties.nombre + `</p>
                    </div>
                </div>
                <div class="row ">
                    <div class="col d-flex justify-content-center">
                    <img src="` + feature.properties.foto + `" alt="` + feature.properties.nombre + `" width="100px" height="100px">
                    </div>
                </div>
            </div>
        `);
    },
    pointToLayer: function (geoJsonPoint, latlng) {

        return L.circleMarker(latlng, geojsonMarkerOptions);
    }
}).addTo(mapa);

//CAPA IDES WMS
var comunaWMS = L.tileLayer.wms('http://ws-idesc.cali.gov.co:8081/geoserver/idesc/wms', {
    layers: 'mc_comunas',
    format: 'image/svg',
    transparent: true,
    CQL_FILTER: "comuna=1"
}).addTo(mapa);


