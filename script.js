
async function initMap() {
  const response = await fetch('bungfai_data.json');
  const data = await response.json();

  const center = { lat: 16.0, lng: 104.0 };
  const map = new google.maps.Map(document.getElementById("map"), {
    zoom: 7,
    center,
  });

  data.forEach(event => {
    const marker = new google.maps.Marker({
      position: { lat: event.lat, lng: event.lng },
      map,
      title: event.event_name,
    });

    const info = `
      <div class="info-box">
        <strong>${event.event_name}</strong><br/>
        วันที่: ${event.date}<br/>
        สถานที่: ${event.location}<br/>
        บั้งไฟ: ${event.rocket_type}<br/>
        ความสูง: ${event.max_height_estimate_m} ม.
      </div>
    `;

    const infowindow = new google.maps.InfoWindow({
      content: info
    });

    marker.addListener("click", () => {
      infowindow.open(map, marker);
    });
  });
}
