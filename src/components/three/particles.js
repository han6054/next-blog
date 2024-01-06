import * as THREE from "three";
import { createNoise3D } from "simplex-noise";

const noise3D = createNoise3D();
class Particles {
  //   wins = [];
  win = {};
  outerR = 400; // 粒子系统外部半径
  innerR = 200; // 粒子系统内部半径
  outerNum = 6000; // 外部粒子数量
  innerNum = 8000; // 内部粒子数量
  beamNum = 200; // 粒子光束数量
  _colors = [0x00ffff, 0x00ff00, 0x00ffff, 0xffc0cb, 0xff00ff];
  outerParticles = null;
  hillParticles = null;
  innerParticles = null;
  particleBeams = {};

  constructor({ camera, scene, win }) {
    this.camera = camera;
    this.scene = scene;
    this.win = win;
    this.init();
  }
  init() {
    const outerSphere = this.createSphere(this.outerR, this.outerNum, "outer");
    const innerSphere = this.createSphere(this.innerR, this.innerNum, "inner");

    this.outerSphere = outerSphere;
    this.innerSphere = innerSphere;
  }
  createSphere(r, num, name) {
    const geo = this.createGeo(r, num);
    const material = new THREE.PointsMaterial({
      color: name == "outer" ? this._colors[0] : this._colors[1],
      size: 1,
    });

    const points = new THREE.Points(geo, material);
    points.name = name;
    this.scene.add(points);
    return points;
  }
  createGeo(r, num) {
    const geo = new THREE.BufferGeometry();
    const n = num;
    const position = new Float32Array(n * 3);
    const v = new THREE.Vector3();

    for (let i = 0; i < position.length - 1; i++) {
      const index = i * 3;

      v.randomDirection().multiplyScalar(r + Math.random() * 10);

      position[index] = v.x;
      position[index + 1] = v.y;
      position[index + 2] = v.z;
    }

    geo.setAttribute("position", new THREE.BufferAttribute(position, 3));
    return geo;
  }
}

export default Particles;
