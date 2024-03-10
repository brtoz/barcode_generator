document.getElementById("btn-barcode-generator").addEventListener("click", function () {
    var input = document.getElementById("input").value;
    JsBarcode("#barcode", input, {
        format: "code128",
        displayValue: true,
        fontSize: 12,
        lineColor: "#4cb6e4",
        background: "#f0f0f0"
    });
});

window.onload = (event) => {
    document.getElementById("input").value = "";
};

document.getElementById('btn-export-svg').addEventListener('click', function () {
    var svg = document.querySelector('svg');

    var rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
    rect.setAttribute('width', '100%');
    rect.setAttribute('height', '100%');
    rect.setAttribute('fill', 'white');
    svg.insertBefore(rect, svg.firstChild);

    var serializer = new XMLSerializer();
    var source = serializer.serializeToString(svg);

    if (!source.match(/^<svg[^>]+xmlns="http\:\/\/www\.w3\.org\/2000\/svg"/)) {
        source = source.replace(/^<svg/, '<svg xmlns="http://www.w3.org/2000/svg"');
    }
    if (!source.match(/^<svg[^>]+"http\:\/\/www\.w3\.org\/1999\/xlink"/)) {
        source = source.replace(/^<svg/, '<svg xmlns:xlink="http://www.w3.org/1999/xlink"');
    }

    source = '<?xml version="1.0" standalone="no"?>\r\n' + source;

    var url = "data:image/svg+xml;charset=utf-8," + encodeURIComponent(source);
    var downloadLink = document.createElement("a");
    downloadLink.href = url;
    downloadLink.download = "barcode.svg";
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);

    svg.removeChild(svg.firstChild);
});

document.getElementById('btn-reset').addEventListener('click', function () {
    var svg = document.querySelector('svg');
    svg.innerHTML = ''; 
    document.getElementById('input').value = ''; 
});
