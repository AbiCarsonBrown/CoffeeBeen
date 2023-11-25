import { markerPath, bookmarkPath, coffeeBeanPath } from "./SVGPaths";

const customMarker = {
  itemShapes: markerPath,
  itemStrokeWidth: 0,
  activeFillColor: "#d3319d",
  inactiveFillColor: "#eba2d2",
};

const customBookmark = {
  itemShapes: bookmarkPath,
  itemStrokeWidth: 0,
  activeFillColor: "#d3319d",
  inactiveFillColor: "#eba2d2",
};

const customCoffeeBean = {
  itemShapes: coffeeBeanPath,
  itemStrokeWidth: 0,
  activeFillColor: "#d3319d",
  inactiveFillColor: "#eba2d2",
};

export { customMarker, customBookmark, customCoffeeBean };
