import "../../styles/index.less";
import * as THREE from "three";
import { initTrackballControls, initThree, initStats } from "../../util/util";
import { MTLLoader } from "three/examples/jsm/loaders/MTLLoader";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader";

async function init() {
  let stats = initStats();
  let { camera, renderer, scene } = initThree();
  let trackballControls = initTrackballControls(camera, renderer);
  camera.position.set(-20, 40, 50);

  let spotLight = new THREE.SpotLight(0xc2c2c2);
  spotLight.position.set(0, 100, 100);
  spotLight.castShadow = true;
  spotLight.shadow.mapSize.set(8000, 8000);
  scene.add(spotLight);
  let ambientLight = new THREE.AmbientLight(0xeeeeee, 0.4);
  scene.add(ambientLight);

  let planeGeometry = new THREE.PlaneBufferGeometry(60, 40, 1, 1);
  let planeMaterial = new THREE.MeshLambertMaterial({
    color: 0xffffff,
  });
  let plane = new THREE.Mesh(planeGeometry, planeMaterial);
  plane.rotation.x = -0.5 * Math.PI;
  plane.position.set(0, 0, 0);
  plane.receiveShadow = true;
  scene.add(plane);

  let objLoader = new OBJLoader();
  let mtlLoader = new MTLLoader();
  objLoader.setPath("../../static/modules/store/");
  mtlLoader.setPath("../../static/modules/store/");
  mtlLoader.setMaterialOptions({
    side: THREE.FrontSide,
    wrap: THREE.RepeatWrapping,
    normalizeRGB: false,
    ignoreZeroRGBs: false,
    invertTrProperty: true,
  });
  function loadObj(material) {
    return new Promise((resolve, reject) => {
      objLoader.setMaterials(material);
      objLoader.load(
        "truck.obj",
        (object) => {
          resolve(object);
        },
        null,
        (error) => {
          reject(error);
        }
      );
    });
  }
  function loadMTL() {
    return new Promise((resolve, reject) => {
      mtlLoader.load(
        "IN_TRUCK.mtl",
        (object) => {
          object.preload();
          resolve(object);
        },
        null,
        (error) => {
          reject(error);
        }
      );
    });
  }
  let material = await loadMTL();
  let obj = await loadObj(material);
  obj.rotation.y = -0.5 * Math.PI;
  // ????????????
  for (let i in obj.children) {
    obj.children[i].castShadow = true;
    obj.children[i].receiveShadow = true;
  }
  scene.add(obj);
  function render() {
    stats.update();
    trackballControls.update();
    requestAnimationFrame(render);
    renderer.render(scene, camera);
  }
  render();
}

init();
