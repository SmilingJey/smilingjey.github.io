
var mapContainer = document.getElementById('google-map');

if (mapContainer) {
  var map;

  function setMapCenter() {
    if (window.innerWidth <= 768) {
      map.setCenter(new google.maps.LatLng(59.938616, 30.323014));
    }
  }

  function initMap() {
    map = new google.maps.Map(mapContainer, {
      zoom: 17,
      center: new google.maps.LatLng(59.938716, 30.319347),
      mapTypeId: 'roadmap',
      disableDefaultUI: true
    });

    var marker = new google.maps.Marker({
      position: new google.maps.LatLng(59.938616, 30.323014),
      icon: 'img/map-pin.png',
      map: map
    });

    setMapCenter();
  }

  window.addEventListener("resize", function(){
    setMapCenter()
  });
}
