 var url = 'http://dev.cloudsmaker.net:6080/arcgis/rest/services/navinfo/chinabasemap/MapServer';
 var layers = [
     new ol.layer.Tile({
         extent: openLayerTools.transformExtentLonLatToXY([
             73.49093000000005,
             3.772830000000056,
             135.11652000000004,
             53.564910000000054
         ], 'EPSG:4326', 'EPSG:3857'),
         source: new ol.source.TileArcGISRest({
             url: url
         })
     })
 ];
 var map = new ol.Map({
     layers: layers,
     target: 'map',
     controls: ol.control.defaults({
         attributionOptions: {
             collapsible: false
         }
     }),
     view: new ol.View({
         center: [0, 0],
         zoom: 2
     })
 });