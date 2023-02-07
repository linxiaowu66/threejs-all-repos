import "../../styles/index.less";

import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { initTrackballControls, initThree, initStats } from "../../util/util";

async function init() {
  let stats = initStats();
  let { camera, renderer, scene } = initThree();
  let trackballControls = initTrackballControls(camera, renderer);
  let ambientLight = new THREE.AmbientLight(0xcccccc);
  scene.add(ambientLight);
  let directionLight = new THREE.DirectionalLight(0xffffff);
  directionLight.position.set(0, 20, 40);
  scene.add(directionLight);
  const axisHelper = new THREE.AxesHelper(300);
  scene.add(axisHelper);

  let gltfLoader = new GLTFLoader();
  gltfLoader.setPath("../../static/modules/glTF/");
  let load = () =>
    new Promise((resolve, reject) => {
      gltfLoader.load(
        "DamagedHelmet.gltf",
        (object) => {
          resolve(object);
        },
        null,
        (error) => {
          reject(error);
        }
      );
    });
  let obj = (await load()).scene;
  obj.scale.set(12, 12, 12);
  obj.position.set(0, 0, 10);
  scene.add(obj);
  function render() {
    stats.update();
    trackballControls.update();
    obj.rotation.y += 0.005;
    requestAnimationFrame(render);
    renderer.render(scene, camera);
  }
  render();
}

init();
