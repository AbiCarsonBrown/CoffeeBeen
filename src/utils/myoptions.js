const optionsTwo = {
  disableDefaultUI: true,
  zoomControl: false,
  backgroundColor: "#010402",
  styles: [
    {
      featureType: "poi",
      stylers: [{ visibility: "off" }],
    },
    {
      featureType: "poi.park",
      stylers: [{ visibility: "simplified" }, { color: "#594b47" }],
    },
    {
      featureType: "poi.park",
      elementType: "labels",
      stylers: [{ visibility: "off" }],
    },
    {
      featureType: "road",
      elementType: "labels.text",
      stylers: [{ visibility: "simplified" }],
    },
    {
      featureType: "road.local",
      stylers: [{ visibility: "off" }],
    },
    {
      featureType: "road",
      stylers: [{ color: "#f5ddd1" }],
    },
    {
      featureType: "landscape.man_made",
      stylers: [{ visibility: "off" }],
    },
    {
      featureType: "transit.line",
      stylers: [{ visibility: "off" }],
    },
    {
      featureType: "water",
      stylers: [{ color: "#eba2d2" }],
    },
  ],
};
