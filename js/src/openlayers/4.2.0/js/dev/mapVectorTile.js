var projection4326 = new ol.proj.Projection({
    code: 'EPSG:4326',
    units: 'degrees',
});

　　
var defaultView = new ol.View({
    projection: projection4326,
    center: [114.15, 22.65],
    //new ol.proj.fromLonLat([114.15, 22.65]),
    zoom: 11
});

var mapCon = {},
    initStyle = {};

function loadVectorTile() {　　
    //参数设置：图层名称 / 投影坐标系 / 初始化样式 
    　　
    var layerName = 'geoworkspace:roads';　　
    var layerProjection = '4326';　　
    initStyle = new ol.style.Style({
        stroke: new ol.style.Stroke({
            color: 'rgb(163,204,25)',
            width: 5
        })
    });
    //矢量切片图层
    var vectorTile = new ol.layer.VectorTile({
        title: "geoworkspace:roads",
        style: initStyle,
        projection: projection4326,
        //矢量切片数据
        source: new ol.source.VectorTile({　　　　　　　
            projeciton: projection4326,
            format: new ol.format.GeoJSON(),
            tileGrid: ol.tilegrid.createXYZ({　　　　　　　　　　
                extent: ol.proj.get('EPSG:4326').getExtent(),
                maxZoom: 21
            }),
            tilePixelRatio: 1,
            //发出获取切片的请求
            tileUrlFunction: function(tileCoord) {
                return 'http://127.0.0.1:8085/geoserver/gwc/service/tms/1.0.0/' +
                    layerName + '@EPSG%3A' + layerProjection + '@geojson/' + (tileCoord[0] - 1) +
                    '/' + tileCoord[1] + '/' + (Math.pow(2, tileCoord[0] - 1) + tileCoord[2]) + '.geojson';

            }　　　　　　
        })　　
    });　　　　　　 //构造Map对象

    　　　 //你需要在页面中提供一个id='map'的div
    　　　　
    mapCon = new ol.Map({　　　　　　　　
        target: 'map',
        　　　　　　　　
        layers: [
            new ol.layer.Tile({　　　　　　　　　　　　
                source: new ol.source.OSM()　　　　　　　
            }),
            vectorTile
        ],
        　　　　　　　　
        view: defaultView,
        　　　　　　　　
        controls: [　　　　　　　　　　　　
            new ol.control.ScaleLine(), 　　　　　　　　　　　　
            new ol.control.ZoomSlider(), 　　　　　　　　　　　　
            new ol.control.OverviewMap(), 　　　　　　　　　　　　
            new ol.control.Zoom()　　　　　　　　
        ],
        　　　　　　
    });　　　　
    // map.addLayer(vectorTile);

}
loadVectorTile();

function changeStyle() {
    var layers = mapCon.getLayers().getArray();
    var newStyle = new ol.style.Style({
        stroke: new ol.style.Stroke({
            color: $("#colorValue").val(),
            width: 5
        })
    });
    layers[1].setStyle(newStyle);
}

$("#dayBtn").on('click', function() {
        $("#map").css("background", "#E1E2E4");
    })
    .siblings()
    .on('click', function() {
        $("#map").css("background", "#1D2024");
    });