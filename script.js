async function initMap() {
  const map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: 16.5, lng: 102.8 },
    zoom: 7,
  });

  try {
    const response = await fetch("bungfai_data.json");
    const data = await response.json();

    data.forEach(event => {
      const marker = new google.maps.Marker({
        position: { lat: event.latitude, lng: event.longitude },
        map: map,
        title: event.name
      });

      const info = new google.maps.InfoWindow({
        content: `<strong>${event.name}</strong><br>วันที่: ${event.date}<br>สถานที่: ${event.location}<br>ความสูงบั้งไฟ: ${event.rocket_height}`
      });

      marker.addListener("click", () => {
        info.open(map, marker);
      });
    });
  } catch (error) {
    console.error("ไม่สามารถโหลดข้อมูล JSON ได้:", error);
  }
}
