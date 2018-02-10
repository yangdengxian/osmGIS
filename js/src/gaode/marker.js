AMapUI.loadUI(['overlay/SimpleInfoWindow', 'overlay/SimpleMarker', 'overlay/SvgMarker'], function(SimpleInfoWindow, SimpleMarker, SvgMarker) {
    var markersClusterer = [], //聚合数据
        markersNoClusterer = []; //监测站数据
    //先加载聚合数据
    setMarkerAndShowInfo(dataList, map.getZoom());
    map.on("zoomend", function(e) {
        addMarkers()
    });

    map.on("moveend", function(e) {
        addMarkers();
    });
    //移除marker标签
    function removeMarkers(markers) {
        map.remove(markers);
    }
    //添加markers
    function addMarkers() {
        setMarkerAndShowInfo(dataList, map.getZoom());
    }

    function setMarkerAndShowInfo(dataList, zoom) {
        if (zoom < 10) {
            if (markersClusterer.length > 0) {
                return;
            }
            dataList[0].forEach(dataObj => {
                setMarkInfo(dataObj, zoom);
            });
        } else {
            if (markersNoClusterer.length) {
                return;
            }
            dataList[1].forEach(dataObj => {
                setMarkInfo(dataObj);
            });
        }
        //设置marker信息
        function setMarkInfo(dataObj, zoom) {
            var marker = new SvgMarker(
                new SvgMarker.Shape.SquarePin({
                    height: 60,
                    strokeWidth: 1,
                    strokeColor: '#ccc',
                    fillColor: 'green'
                }), {
                    showPositionPoint: true,
                    iconLabel: {
                        //普通文本
                        innerHTML: dataObj["province_name"] + "<br/>" + dataObj["PM25"],
                        //设置样式
                        style: {
                            color: '#fff',
                            fontSize: '12px',
                            marginTop: '2px'
                        }
                    },
                    map: map,
                    position: [dataObj["longtitude"], dataObj["latitude"]]
                });
            // var marker = new SvgMarker.Shape.SquarePin({
            //     //设置节点属性
            //     iconLabel: {
            //         //普通文本
            //         innerHTML: dataObj["PM25"],
            //         //设置样式
            //         style: {
            //             color: '#fff',
            //             fontSize: '12px',
            //             marginTop: '2px'
            //         }
            //     },

            //     iconStyle: 'red',
            //     map: map,
            //     position: [dataObj["longtitude"], dataObj["latitude"]]
            // });

            var infoWindow = new SimpleInfoWindow({

                infoTitle: '<strong>这里是标题</strong>',
                infoBody: '<p class="my-desc"><strong>这里是内容。</strong> <br/> 高德地图 JavaScript API，是由 JavaScript 语言编写的应用程序接口，' +
                    '它能够帮助您在网站或移动端中构建功能丰富、交互性强的地图应用程序</p>',

                //基点指向marker的头部位置
                offset: new AMap.Pixel(0, -31)
            });

            zoom < 11 ? markersClusterer.push(marker) : markersNoClusterer.push(marker);

            function openInfoWin() {
                infoWindow.open(map, marker.getPosition());
            }

            //marker 点击时打开
            AMap.event.addListener(marker, 'click', function(e) {
                openInfoWin();
            });
        }

    }


});