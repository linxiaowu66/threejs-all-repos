import "../../styles/index.less";

import * as THREE from "three";
import * as dat from "dat.gui";
import { initStats, initTrackballControls } from "../../util/util";

function init() {
  let stats = initStats();
  let scene = new THREE.Scene();
  scene.background = new THREE.Color(0xf0f0f0);
  let camera = new THREE.PerspectiveCamera(
    45,
    window.innerWidth / window.innerHeight,
    0.1,
    10000
  );
  let renderer = new THREE.WebGLRenderer({ antialias: true });
  camera.position.set(-30, 60, 70);
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(window.devicePixelRatio);
  scene.add(camera);
  document.body.appendChild(renderer.domElement);

  // 创建曲线
  let curve = new THREE.CatmullRomCurve3(
    [
      new THREE.Vector3(-10, 0, 10),
      new THREE.Vector3(-5, 5, 5),
      new THREE.Vector3(0, 0, 0),
      new THREE.Vector3(5, -5, 5),
      new THREE.Vector3(10, 0, 10),
    ],
    true
  );
  let points = curve.getPoints(500);
  let lineGeometry = new THREE.BufferGeometry().setFromPoints(points);
  let lineMaterial = new THREE.LineBasicMaterial({
    color: 0xff0000,
  });
  let line = new THREE.Line(lineGeometry, lineMaterial);
  line.position.set(0, 0, 0);
  scene.add(line);
  camera.lookAt(scene.position);

  let trackballControl = initTrackballControls(camera, renderer);
  function render() {
    stats.update();
    trackballControl.update();
    requestAnimationFrame(render);
    renderer.render(scene, camera);
  }
  render();
}

init();
