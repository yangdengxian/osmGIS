var openLayerTools = {
    /**
     * 经纬度转平面范围
     */
    transformExtentLonLatToXY: function(extent, source, destination) {
        return ol.proj.transformExtent(extent, source, destination);
    },
    /**
     * coordinate [0,0]
     */
    transformLonLatToXY: function(coordinate, source, destination) {
        return ol.proj.transform(coordinate, source, destination);
    }
}