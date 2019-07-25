import React, { Component } from 'react'
import * as THREE from "three";

export default class Visualizer extends Component {
    
        
    
    componentDidMount() {
        
        var scene = new THREE.Scene();
        var camera = new THREE.PerspectiveCamera( 75, 2, 1, 1000 );
        var renderer = new THREE.WebGLRenderer();
        // console.log(document.querySelector(".canvas").innerWidth)
        var selector = document.querySelector(".canvas");
        
        // renderer.setSize(selector.width, selector.height);
         renderer.domElement.setAttribute("class", "canvas")
        selector.appendChild( renderer.domElement )

        var geometry = new THREE.BoxGeometry( 1, 1, 1 );
        var material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
        var cube = new THREE.Mesh( geometry, material );
        scene.add( cube );
        camera.position.z = 5;
        var animate = function () {
          requestAnimationFrame( animate );
          cube.rotation.x += 0.01;
          cube.rotation.y += 0.01;
          renderer.render( scene, camera );
        };
        const canvas = renderer.domElement;
        // look up the size the canvas is being displayed
        const width = canvas.clientWidth;
        const height = canvas.clientHeight;
      
        // adjust displayBuffer size to match
        if (canvas.width !== width || canvas.height !== height) {
          // you must pass false here or three.js sadly fights the browser
          renderer.setSize(width, height, false);
          camera.aspect = width / height;
          camera.updateProjectionMatrix();
      
          // update any render target sizes here
        animate();
    }}
    
    
      
    
    render() {
        return (
            <React.Fragment >

            </React.Fragment>
        )
    }
}
