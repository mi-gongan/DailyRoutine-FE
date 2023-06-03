import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

export default function Key() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    if (canvasRef.current) {
      const clock = new THREE.Clock();
      const scene = new THREE.Scene();
      const box = new THREE.Box3().setFromObject( scene );
      const center = box.getCenter( new THREE.Vector3() );
      const renderer = new THREE.WebGLRenderer({
        canvas: canvasRef.current,
        antialias: true,
        alpha: true,
      });
      renderer.outputEncoding = THREE.sRGBEncoding;
      renderer.setClearColor( 0x000000, 0 );
      const camera = new THREE.PerspectiveCamera(40, 1);
      camera.position.set(1.5, 1, 1);
      const loader = new GLTFLoader();
      const first_light = new THREE.DirectionalLight(0xffffff, 10);
      first_light.position.set(100, 100, 100);
      scene.add(first_light);

      const second_light = new THREE.DirectionalLight(0xffffff, 10);
      second_light.position.set(-100, -100, -100);
      scene.add(second_light);

      let controls = new OrbitControls(camera, canvasRef.current);
      controls.rotateSpeed = 1.0;
      controls.zoomSpeed = 1.2;
      controls.panSpeed = 0.8;
      controls.minDistance = 10;
      controls.maxDistance = 20; 

      function animate() {
        requestAnimationFrame( animate );
        scene.position.x += ( scene.position.x - center.x );
        scene.position.y += ( scene.position.y - center.y );
        scene.position.z += ( scene.position.z - center.z );
        renderer.render( scene, camera );
        controls.update();
      }
      animate();

      loader.load("/3d-model/key.glb", (object) => {
        scene.add(object.scene);
        object.scene.traverse((o: any) => {
          if ( o.isMesh ) {
            o.material.metalness = 0.7;
          }
        } );
        renderer.render(scene, camera);
      },);
    }
  }, [canvasRef]);

  return <canvas ref={canvasRef} id="canvas" width="350" height="350"></canvas>;
};