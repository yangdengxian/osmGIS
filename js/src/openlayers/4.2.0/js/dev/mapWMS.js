var wmsSources = new ol.source.ImageWMS({
    url: 'http://127.0.0.1:8085/geoserver/geoWorkSpace/wms',
    params: { 'LAYERS': 'geoWorkSpace:roads' },
    ratio: 1,
    serverType: 'geoserver'
});
var layers = [
    new ol.layer.Tile({
        source: new ol.source.OSM()
    }),
    new ol.layer.Image({
        extent: openLayerTools.transformExtentLonLatToXY(
            [72.62919131, 3.373694910000003, 135.61584269, 66.36034629],
            "EPSG:4326",
            "EPSG:3857"),
        source: wmsSources
    })
];
var map = new ol.Map({
    layers: layers,
    target: 'map',
    view: new ol.View({
        center: openLayerTools.transformLonLatToXY([116.3, 39.9],
            "EPSG:4326",
            "EPSG:3857"),
        zoom: 4
    })
});

map.on('singleclick', function(e) {
    console.log(e);
    wmsSources.getGetFeatureInfoUrl(e.coordinate, map.getView().getResolution(), 'EPSG:4326', {
        'INFO_FORMAT': 'text/html', //这个返回的是一个html页面  
        'FEATURE_COUNT': 5
    }, function(res) {
        console.log(res);

    }, function(err) {
        console.error(err);

    }); //最大查询要素数量，默认为1  )
});