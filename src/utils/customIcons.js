import { markerPath, bookmarkPath, coffeeBeanPath } from "./SVGPaths";

const customMarker = {
  itemShapes: markerPath,
  itemStrokeWidth: 1,
  activeFillColor: "#f6236b",
  activeStrokeColor: "#E8B4B8",
  inactiveFillColor: "#E8B4B8",
  inactiveStrokeColor: "#f6236b",
};

const customBookmark = {
  itemShapes: bookmarkPath,
  itemStrokeWidth: 1,
  activeFillColor: "#f6236b",
  activeStrokeColor: "#E8B4B8",
  inactiveFillColor: "#E8B4B8",
  inactiveStrokeColor: "#f6236b",
};

const customCoffeeBean = {
  itemShapes: coffeeBeanPath,
  itemStrokeWidth: 1,
  activeFillColor: "#f6236b",
  activeStrokeColor: "#E8B4B8",
  inactiveFillColor: "#E8B4B8",
  inactiveStrokeColor: "#f6236b",
};

export { customMarker, customBookmark, customCoffeeBean };
