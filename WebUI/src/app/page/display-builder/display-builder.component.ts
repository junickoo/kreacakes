import { ControlService } from './service/control/control.service';
import { ShapesService } from './service/shapes.service';
import { Component, OnInit } from '@angular/core';
import * as THREE from 'three';
import * as dat from 'dat.gui';
import { animate } from '@angular/animations';
import { Color, TextureLoader, WebGLRenderer } from 'three';
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
  camera: any = new THREE.PerspectiveCamera(
    45,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  scene: any = new THREE.Scene();
  cakeShapes = {
    shape: 'Cube',
  };

  serializedScene: any;
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
    var backgroundTexture = new TextureLoader().load(
      'assets/graphs/bakery-background.jpg'
    );

    this.scene.background = backgroundTexture;

    //save scene as JSON

    this.control.savingControl();
    this.control.cameraControl();
    this.control.shapesControl();
    this.control.topperControl();

    var canvas = document.querySelector('#body');
    canvas!.appendChild(this.renderer.domElement);
    this.render();

    //load json scene
    // const scene = new THREE.ObjectLoader().parse(JSON.parse(serializedScene));
  }
  shapes: any;
  render() {
    this.shapes = this.control.cakeShapes.shape;
    // var object = group.getObjectByName('cube');
    // if(object != null){
    //    object.material.opacity = control.opacity;

    // }
    console.log(JSON.stringify(this.scene.toJSON()));
    this.serializedScene = JSON.stringify(this.scene.toJSON());
    sessionStorage.setItem('sceneJson', this.serializedScene);
    requestAnimationFrame(this.render.bind(this));
    this.renderer.render(this.scene, this.camera);
  }
  birthdaytopImg(event: any) {
    this.ShapesService.birthdaytopUpload(event);
  }

  frontImg(event: any) {
    this.ShapesService.frontUpload(event);
  }

  backImg(event: any) {
    this.ShapesService.backUpload(event);
  }

  leftImg(event: any) {
    this.ShapesService.leftUpload(event);
  }

  rightImg(event: any) {
    this.ShapesService.rightUpload(event);
  }

  topImg(event: any) {
    this.ShapesService.topUpload(event);
  }

  midImg(event: any) {
    this.ShapesService.middleUpload(event);
  }
  cookiesTop(event: any) {
    this.ShapesService.cookiesTopUp(event);
  }
  cookiesBot(event: any) {
    this.ShapesService.cookiesBotUp(event);
  }
}
