import qs from "qs";

let qsResult = qs.parse(window.location.search.substr(1));

export default qsResult;
