import * as THREE from "three";
import { OrbitControls } from "../../../node_modules/three/examples/jsm/controls/orbitControls";
import Particles from "./particles";

const Play = {
  canvas: null,
  init() {
    const canvas = document.getElementById("three");
    this.setup();
    this.initWindowManager();

    this.canvas = canvas;
  },
  setup() {
    this.scene = new THREE.Scene();

    this.setCamera();
    setTimeout(() => {
      this.controls();
      this.render();
      this.tick();
    }, 0);
  },
  camera: null,
  setCamera() {
    const perspective = 400;
    const fov =
      (180 * (2 * Math.atan(window.innerHeight / 2 / perspective))) / Math.PI;
    const camera = new THREE.PerspectiveCamera(
      fov,
      window.innerWidth / window.innerHeight,
      0.1,
      2000
    );
    camera.position.set(0, 0, perspective);
    camera.lookAt(this.scene);
    this.camera = camera;
    this.scene.add(camera);

    // const box = new THREE.BoxGeometry(5, 5, 5);
    // const material = new THREE.MeshBasicMaterial({
    //   color: 0x00ff00,
    // });
    // const mesh = new THREE.Mesh(box, material);
    // this.scene.add(mesh);
    // this.box = mesh;
  },

  clock: new THREE.Clock(),
  initWindowManager() {
    let win = {
      x: window.screenLeft,
      y: window.screenTop,
      w: window.innerWidth,
      h: window.innerHeight,
    };
    this.addParticle(win);
    // this._vm = new WindowManager();

    // this._vm.wins.forEach((win) => {
    //   this.addParticle(win);
    // });

    // window.addEventListener("storage", (e) => {
    //   if (e.key === "wins") {
    //     const newwins = JSON.parse(e.newValue);
    //     const oldwins = JSON.parse(e.oldValue);

    //     if (newwins.length > oldwins.length) {
    //       // 有窗口新开, 新增粒子系统, 窗口坐标以及贝塞尔曲线
    //       const win = newwins.filter(
    //         (w) => !oldwins.some((win) => win.id === w.id)
    //       );

    //       this.addParticle(win[0]);
    //     } else if (newwins.length < oldwins.length) {
    //       // 有窗口关闭, 移除关闭的粒子系统
    //       const win = oldwins.filter(
    //         (w) => !newwins.some((win) => win.id === w.id)
    //       );

    //       // this.removeParticle(win[0]);
    //     }
    //     // this._wm.wins = newwins;
    //   }
    // });

    // // 监听当前窗口是否要关闭
    // window.addEventListener("beforeunload", () => {
    //   const wins = this._wm
    //     .getItem("wins")
    //     .filter((win) => win.id !== this._wm.win.id);

    //   this._wm.setItem("wins", wins);
    // });
  },
  _beams: [],
  addParticle(win) {
    const particles = new Particles({
      scene: this.scene,
      camera: this.camera,
      // wins: this._vm.wins,
      win,
    });
    this._beams.push(particles);
  },

  removeParticle(win) {
    const index = this._beams.findIndex((beam) => beam.win.id === win.id);

    if (index > -1) {
      this._beams[index].destory();
      this._beams.splice(index, 1);
    }
  },

  controls() {
    this.orbitControl = new OrbitControls(this.camera, this.canvas);

    this.orbitControl.enableDamping = true; // 启用惯性拖拽
  },

  render() {
    const renderer = new THREE.WebGLRenderer({
      canvas: this.canvas,
    });
    this.renderer = renderer;

    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.setSize(window.innerWidth / 2, window.innerHeight / 2);
    this.renderer.render(this.scene, this.camera);
  },

  _position: new THREE.Vector3(),
  _axis: new THREE.Vector3(),
  _angle: 0,
  updatePoints() {
    const delta = this.clock.getDelta();

    this.scene.children
      .filter((x) => x.type === "Points")
      .forEach((points) => {
        const { attributes: attrs } = points.geometry;
        const positions = attrs.position.array;

        for (let i = 0; i < positions.length; i += 3) {
          const x = positions[i];
          const y = positions[i + 1];
          const z = positions[i + 2];

          this._position.x = x;
          this._position.y = y;
          this._position.z = z;
          // 旋转很小的角度
          this._axis.set(Math.sin(i), Math.cos(i), Math.sin(i)).normalize();
          this._position.applyAxisAngle(this._axis, delta / 6);
          positions[i] = this._position.x;
          positions[i + 1] = this._position.y;
          positions[i + 2] = this._position.z;
        }
        attrs.position.needsUpdate = true;

        this._angle += 0.001;
        points.rotation.y = this._angle;
      });
  },

  tick() {
    this.renderer.render(this.scene, this.camera);
    this.orbitControl.update();
    this.updatePoints();
    // this.box.rotation.y += 0.01;
    window.requestAnimationFrame(() => this.tick());
  },
};
export default Play;
