import React, { Component } from "react";
import * as THREE from "three";
 import {OrbitControls} from "three/examples/jsm/controls/OrbitControls";

export default class Visualizer extends Component {
  
  componentDidMount() {
    var scene = new THREE.Scene();
    scene.background = new THREE.Color("gray");

    var camera = new THREE.PerspectiveCamera(75, 2, 0.1, 1000);
    camera.position.set(0, 0, 5);
    camera.lookAt(scene.position);
    scene.add(camera);

    var renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    var selector = document.querySelector(".canvas");

    var controls = new OrbitControls(camera, renderer.domElement);
    controls.enabled = true;
    controls.maxDistance = 50;
    controls.minDistance = 1.5;
    controls.enableDamping = true;
    controls.dampingFactor = 1;
    controls.enableZoom = true;

    // renderer.setSize(selector.width, selector.height);
    renderer.domElement.setAttribute("class", "canvas");
    selector.appendChild(renderer.domElement);




var mtlLoader = new THREE.MaterialLoader();
    
    mtlLoader.load("/assets/lego.mtl", function(materials) {
      materials.preload();

      var objLoader = new THREE.ObjectLoader();
      objLoader.setMaterials(materials);
      
      objLoader.load("/assets/lego.obj", function(object) {
        scene.add(object);
        object.position.set(0, 0, 5)
      });
    });







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
    scene.add(cube);

    var light = new THREE.PointLight({ color: "#0006FF" });
    light.position.set(0, 5, 5);
    scene.add(light);

    var animate = function() {
      requestAnimationFrame(animate);
      cube.rotation.x += 0.0;
      cube.rotation.y += 0.01;
      controls.update();
      renderer.render(scene, camera);
    };

    const canvas = renderer.domElement;
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;

    if (canvas.width !== width || canvas.height !== height) {
      renderer.setSize(width, height, false);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();

      animate();
    }
  }

  render() {
    return <React.Fragment />;
  }
}
