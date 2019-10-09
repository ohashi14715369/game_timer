// @arg BlobURLString|URLString|Blob|File|TypedArray|ArrayBuffer
// @arg Function - callback(result:ArrayBuffer, source:Any):void
export const toArrayBuffer = (source: any, callback: (result: ArrayBuffer, source: any) => void) => {
    if (source.buffer) {
        // TypedArray
        callback(source.buffer, source);
    } else if (source instanceof ArrayBuffer) {
        // ArrayBuffer
        callback(source, source);
    } else if (source instanceof Blob) {
        // Blob or File
        var reader = new FileReader();
        reader.onload = function () {
            if (reader.result instanceof ArrayBuffer) {
                callback(reader.result as ArrayBuffer, source);
            }
            else {
                throw new Error();
            }
        };
        reader.readAsArrayBuffer(source);
    } else if (typeof source === "string") {
        // BlobURLString or URLString
        var xhr = new XMLHttpRequest();
        xhr.responseType = "arraybuffer";
        xhr.onload = function () {
            callback(xhr.response, source);
        };
        xhr.open("GET", source);
        xhr.send();
    } else {
        throw new TypeError("Unknown type");
    }
}