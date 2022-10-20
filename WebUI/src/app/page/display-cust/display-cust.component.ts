import { Component, OnInit } from '@angular/core';
import { ShapesService } from '../display-builder/service/shapes.service';
import * as THREE from 'three';
import * as dat from 'dat.gui';
import { animate } from '@angular/animations';
import { Color, WebGLRenderer } from 'three';

@Component({
  selector: 'app-display-cust',
  templateUrl: './display-cust.component.html',
  styleUrls: ['./display-cust.component.css'],
})
export class DisplayCustComponent implements OnInit {
  constructor(private ShapesService: ShapesService) {
    var itemDetails = JSON.parse(sessionStorage.getItem('itemDetails') || '');
    this.serializedScene = JSON.parse(itemDetails.metadata || '');
  }
  urlLocation: any;
  serializedScene: any;
  renderer: any;
  camera = new THREE.PerspectiveCamera(
    45,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  scene = new THREE.Scene();
  cakeShapes = {
    shape: 'Cube',
  };
  gui = new dat.GUI();
  ngOnInit(): void {
    this.urlLocation = window.location.href;
    this.renderer = new WebGLRenderer();

    this.renderer.setClearColor(0x000000, 1.0);
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.shadowMapEnabled = true;

    this.camera.position.x = 15;
    this.camera.position.y = 16;
    this.camera.position.z = 13;
    this.camera.lookAt(this.scene.position);

    //load json scene
    const sceneLoader = new THREE.ObjectLoader().parse(this.serializedScene);
    console.log(this.serializedScene);
    const serial = JSON.stringify(this.scene.toJSON());
    console.log(this.scene.toJSON());
    this.scene.add(sceneLoader);

    //save scene as JSON

    // this.control.savingControl(serializedScene);
    // this.control.cameraControl();
    // this.control.shapesControl(serializedScene);
    // this.control.topperControl();

    this.gui
      .add(this.scene.children[0].rotation, 'x', 0, Math.PI)
      .name('Rotate X');
    this.gui
      .add(this.scene.children[0].rotation, 'y', 0, Math.PI)
      .name('Rotate Y');
    this.gui
      .add(this.scene.children[0].rotation, 'z', 0, Math.PI)
      .name('Rotate Z');

    console.log(this.scene);

    var canvas = document.querySelector('#body');
    canvas!.appendChild(this.renderer.domElement);
    this.render();
  }
  render() {
    // var object = group.getObjectByName('cube');
    // if(object != null){
    //    object.material.opacity = control.opacity;

    // }
    console.log(window.location.href);
    if (this.urlLocation != window.location.href) {
      this.gui.destroy();
    }
    requestAnimationFrame(this.render.bind(this));
    this.renderer.render(this.scene, this.camera);
  }
}
