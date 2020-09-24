export function filterPath(path) {
    let arr = path.split(".");
    let pathStr = "";
    let len = arr.length;
    for (let i = 0; i < len; i++) {
      let str = "";
      if (i + 1 != len && arr[i + 1].indexOf("[") >= 0) {
        let aArr = arr[i + 1].split("[");
        str = aArr[0];
      }
      if (arr[i] != str ) {
        if (pathStr != "") {
          pathStr += "." + arr[i];
        } else {
          pathStr = arr[i];
        }
      }
    }
    return encodeURI(pathStr);
}
