import React, { Component } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader.js";

export default class Visualizer extends Component {

  constructor(props) {
    super(props)
    this.state = {
      urlPathModel: this.props.urlPathModel
    }
  }

  componentDidUpdate(prevProps, prevState) {
    console.log(this.props)
    // only update chart if the data has changed
    if (prevProps.author !== this.props.author) {
      this.loadModel();
    }
  }

loadModel() {
    let modelCloud = this.props.urlPathModel
    ////////////Scene
    var scene = new THREE.Scene();
    scene.background = new THREE.Color(0xa0a0a0);
    scene.fog = new THREE.Fog(0xa0a0a0, 300, 5000);

    var clock = new THREE.Clock();

    ///////////Camera
    var camera = new THREE.PerspectiveCamera(75, 2, 1, 5000);

    camera.position.set(100, 200, 300);
    camera.lookAt(scene.position);
    scene.add(camera);

    var renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    var selector = document.querySelector(".canvas");
    renderer.shadowMap.enabled = true;

    ///////////Controls
    var controls = new OrbitControls(camera, renderer.domElement);
    controls.enabled = true;
    //controls.maxDistance = 50;
    controls.minDistance = 1.5;
    controls.enableDamping = true;
    controls.dampingFactor = 1;
    controls.enableZoom = true;

    ////////////canvas size
    // renderer.setSize(selector.width, selector.height);
    renderer.domElement.setAttribute("class", "canvas");
    selector.appendChild(renderer.domElement);

    /////////Cube
    const textureloader = new THREE.TextureLoader();
    const texture = textureloader.load(
      "https://66.media.tumblr.com/07b00df16a910359a331e158b79dfa72/tumblr_nvuw1mFBzL1qharjqo1_500.gif"
    );
    var geometry = new THREE.BoxGeometry(2, 2, 1);
    var material = new THREE.MeshLambertMaterial({
      map: texture,
      //color: "#0006FF",
      wireframe: false
    });
    var cube = new THREE.Mesh(geometry, material);
    cube.position.set(0, 0, 0);
    scene.add(cube);

    ///////////// light
    var light = new THREE.HemisphereLight(0xffffff, 0x444444);
    light.position.set(0, 200, 0);
    scene.add(light);

    var light2 = new THREE.DirectionalLight(0xffffff, 0.2);
    light2.position.set(0, 200, 100);
    light2.castShadow = true;
    light2.shadow.camera.top = 180;
    light2.shadow.camera.bottom = -100;
    light2.shadow.camera.left = -120;
    light2.shadow.camera.right = 120;
    scene.add(light2);

    ////////////// ground
    var mesh = new THREE.Mesh(
      new THREE.PlaneBufferGeometry(2000, 2000),
      new THREE.MeshPhongMaterial({ color: 0x999999, depthWrite: false })
    );
    mesh.rotation.x = -Math.PI / 2;
    mesh.receiveShadow = true;
    mesh.position.set(0, -5, 0);
    scene.add(mesh);

    //grid
    var grid = new THREE.GridHelper(2000, 20, 0x000000, 0x000000);
    grid.material.opacity = 0.2;
    grid.material.transparent = true;
    grid.position.set(0, -5, 0);
    scene.add(grid);

    
    /////////Responsive Canvas
    const canvas = renderer.domElement;
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;
    
    if (canvas.width !== width || canvas.height !== height) {
      renderer.setSize(width, height, false);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    }
      ////////////////////// model
      var loader = new FBXLoader();
      
      var mixerFix = undefined

      

      loader.load(`${modelCloud}`,

      function(object) {
        var mixer = new THREE.AnimationMixer(object);
        mixerFix=mixer
        var action = mixer.clipAction(object.animations[0]);
        action.play();
        object.traverse(function(child) {
          if (child.isMesh) {
            child.castShadow = true;
            child.receiveShadow = true;
          }
        });
        scene.add(object);
      });
      
      /////////Animation
    //   var animate = function() {
    //     requestAnimationFrame(animate);
    //     cube.rotation.x += 0.0;
    //     cube.rotation.y += 0.01;
    //     controls.update();
    //     renderer.render(scene, camera);
    //   };
    //   animate();
    // }

    // var stats = new Stats();
    // selector.appendChild( stats.dom );
        
    function animate() {
      requestAnimationFrame( animate );
      var delta = clock.getDelta();
      if ( mixerFix ) mixerFix.update( delta );
      renderer.render( scene, camera );
      // stats.update();
    }
    animate()
    
  }
  

  render() {
    return <React.Fragment />;
  }
}
