function loadScript() {
    var script = document.createElement("script");
    script.type = "text/javascript";
    script.src = "http://map.qq.com/api/js?v=2.exp&key=X5XBZ-INCKI-WMCG7-5JHXY-GJJS2-YVBXJ&callback=init";
    document.body.appendChild(script);
}


export default {
    init() {
        loadScript
    }
};