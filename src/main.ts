import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/Addons.js";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js"; // OrbitControls ekle
import { ClassesUtil } from "./types/classes-util";
import { Classes } from "./types/_classes";

// Sahne, kamera ve render oluşturma
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
// Kamera pozisyonunu ve bakış açısını ayarlama
camera.position.set(0, 0, 10);
camera.lookAt(0, 0, 0);

const renderer = new THREE.WebGLRenderer({
  canvas: document.getElementById("myCanvas") as HTMLCanvasElement,
});
renderer.setClearColor(0xffe39f); // Harry Potter sarısı tonu

renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Işık ekleme
// Işık rengini ve yoğunluğunu ayarlama
const light = new THREE.DirectionalLight(0xffffff, 30);
light.position.set(15, 15, 15).normalize();
scene.add(light);

// 3D model (şapka) ekleme
const loader = new GLTFLoader();
loader.load(
  "/scene.json",
  function (gltf) {
    const hat = gltf.scene;
    scene.add(hat);
    hat.position.y = 1;
    hat.scale.set(3, 3, 3); // X, Y ve Z eksenlerinde boyutu iki katına çıkarır
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.update(); // Kontrolleri güncelle
    animate(hat);
  },
  undefined,
  function (error) {
    console.error(error);
  }
);

// Kamera konumu
camera.position.z = 5;

// Sahneyi render etme
function animate(glft: THREE.Group<THREE.Object3DEventMap>) {
  // Şapkanı döndürme
  // Şapkanı yukarı ve aşağı hareket ettirme
  glft.position.y = Math.sin(Date.now() * 0.001) * 0.5;
  renderer.render(scene, camera);
  requestAnimationFrame(() => animate(glft));
}
function updateTooltip(house: Classes.Name) {
  const houseStats = ClassesUtil.stats[house];
  if (houseStats) {
    (
      document.getElementById("hp") as HTMLElement
    ).innerText = `HP: ${houseStats.hp}`;
    (
      document.getElementById("armor") as HTMLElement
    ).innerText = `Armor: ${houseStats.def}`;
    (
      document.getElementById("magic") as HTMLElement
    ).innerText = `Magic: ${houseStats.magicPower}`;
    (
      document.getElementById("intelligence") as HTMLElement
    ).innerText = `Intelligence: ${houseStats.int}`;
  }
}

function showTooltip(event: MouseEvent, house: Classes.Name) {
  const tooltip = document.getElementById("tooltip") as HTMLElement;
  updateTooltip(house);
  tooltip.style.display = "block";
  tooltip.style.left = `${event.clientX + 10}px`;
  tooltip.style.top = `${event.clientY - 40}px`;
}

function hideTooltip() {
  const tooltip = document.getElementById("tooltip") as HTMLElement;
  tooltip.style.display = "none";
}

// Butonlara hover event listener ekleme
const buttonsContainer = document.getElementById("buttons-container");
if (buttonsContainer) {
  buttonsContainer.addEventListener("mouseover", (event) => {
    const target = event.target as HTMLElement;
    if (target.tagName === "BUTTON") {
      const house: Classes.Name =
        target.innerText.toLocaleLowerCase() as Classes.Name;

      showTooltip(event as MouseEvent, house);
    }
  });
}
if (buttonsContainer) {
  buttonsContainer.addEventListener("click", (event) => {
    const target = event.target as HTMLElement;
    if (target.tagName === "BUTTON") {
      window.location.href = "/src/pages/landing.html";
      const house: Classes.Name =
        target.innerText.toLocaleLowerCase() as Classes.Name;
      localStorage.setItem("selectedHouse", house);
      const stats = ClassesUtil.stats[house];
      localStorage.setItem("playerStats", JSON.stringify(stats));
      alert(`${house} seçtiniz!`);
      showTooltip(event as MouseEvent, house);
    }
  });
}
