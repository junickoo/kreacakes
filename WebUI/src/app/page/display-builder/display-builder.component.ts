import { ControlService } from './service/control/control.service';
import { ShapesService } from './service/shapes.service';
import { Component, OnInit } from '@angular/core';
import * as THREE from 'three';
import * as dat from 'dat.gui';
import { animate } from '@angular/animations';
import { Color, WebGLRenderer } from 'three';
@Component({
  selector: 'app-display-builder',
  templateUrl: './display-builder.component.html',
  styleUrls: ['./display-builder.component.css'],
})
export class DisplayBuilderComponent implements OnInit {
  constructor(
    private ShapesService: ShapesService,
    private control: ControlService
  ) {
    console.log(THREE);
  }
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
  ngOnInit(): void {
    this.renderer = new WebGLRenderer();

    this.renderer.setClearColor(0x000000, 1.0);
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.shadowMapEnabled = true;

    this.camera.position.x = 15;
    this.camera.position.y = 16;
    this.camera.position.z = 13;
    this.camera.lookAt(this.scene.position);

    this.scene.add(this.ShapesService.group);

    //save scene as JSON
    const serializedScene = JSON.stringify(this.scene.toJSON());
    console.log(serializedScene);

    this.control.savingControl(serializedScene);
    this.control.cameraControl();
    this.control.shapesControl(serializedScene);
    this.control.topperControl();

    var canvas = document.querySelector('#body');
    canvas!.appendChild(this.renderer.domElement);
    this.render();

    //load json scene
    // const scene = new THREE.ObjectLoader().parse(JSON.parse(serializedScene));
  }
  render() {
    // var object = group.getObjectByName('cube');
    // if(object != null){
    //    object.material.opacity = control.opacity;

    // }
    requestAnimationFrame(this.render.bind(this));
    this.renderer.render(this.scene, this.camera);
  }
}
