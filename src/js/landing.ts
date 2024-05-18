document.addEventListener("DOMContentLoaded", () => {
  const welcomeText = document.getElementById(
    "welcome-text"
  ) as HTMLParagraphElement;

  // LocalStorage'dan seçilen sınıfı al
  const selectedHouse = localStorage.getItem("selectedHouse");

  // Eğer sınıf seçildiyse hoş geldin mesajını güncelle
  if (selectedHouse) {
    welcomeText.innerText = `Hoşgeldin ${selectedHouse} öğrencisi! Harry Potter maceran burada başlıyor.`;
  } else {
    welcomeText.innerText = "Hoşgeldin! Harry Potter maceran burada başlıyor.";
  }
});

function startAdventure() {
  alert("Maceranız başlıyor!");
  // Buraya maceranın başladığı sayfaya yönlendirme ekleyebilirsiniz.
}
