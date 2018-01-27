var layerName = "geoworkspace:roadWMS";
var layerUrl = "http://localhost:8085/geoserver/geoworkspace/wfs";
var featureRequest = new ol.format.WFS().writeGetFeature({
    srsName: 'EPSG:4326',
    featureNS: 'http://localhost:8085/geoworksapce',
    featurePrefix: 'geoworksapce',
    featureTypes: ['roadWMS'],
    outputFormat: 'application/json'
});
var vector = new ol.layer.Vector({
    source: new ol.source.Vector({
        format: new ol.format.GeoJSON(),
        strategy: ol.loadingstrategy.bbox,
        loader: function(extent, resolution, projection) {
            fetch(layerUrl, {
                method: 'POST',
                body: new XMLSerializer().serializeToString(featureRequest)
            }).then(function(response) {
                return response.json();
            }).then(function(json) {
                var features = new ol.format.GeoJSON().readFeatures(json);
                vector.getSource().addFeatures(features);
                map.getView().fit(vector.getSource().getExtent());
            });
        },
        projection: 'EPSG:4326'
    }),
    style: new ol.style.Style({
        stroke: new ol.style.Stroke({
            color: 'rgba(0,0,255,1.0)',
            width: 2
        })
    })
});

var raster = new ol.layer.Tile({
    source: new ol.source.OSM()
});

var map = new ol.Map({
    layers: [raster, vector],
    target: document.getElementById('map'),
    view: new ol.View({
        center: [120.14880180358887, 30.284757614135742],
        projection: 'EPSG:4326',
        maxZoom: 19,
        zoom: 12
    })
});
var highlight;
var displayFeatureInfo = function(pixel) {

    var feature = map.forEachFeatureAtPixel(pixel, function(feature) {
        return feature;
    });

    var info = document.getElementById('info');
    if (feature) {
        info.innerHTML = feature.getId() + '<br>';
        var keys = feature.getKeys();
        var properties = feature.getProperties();
        for (var i = 0; i < keys.length; i++) {
            info.innerHTML += keys[i] + ' ： ';
            info.innerHTML += properties[keys[i]] + '<br>';
        }
    } else {
        info.innerHTML = ' ';
    }

    if (feature !== highlight) {
        if (highlight) {
            vector.getSource().removeFeature(highlight);
        }
        if (feature) {
            vector.getSource().addFeature(feature);
        }
        highlight = feature;
    }

};

map.on('click', function(evt) {
    console.log(evt);
    displayFeatureInfo(evt.pixel);
});