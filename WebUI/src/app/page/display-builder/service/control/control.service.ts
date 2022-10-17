import { ShapesService } from '../shapes.service';
import { Injectable } from '@angular/core';
import * as THREE from 'three';
import * as dat from 'dat.gui';

@Injectable({
  providedIn: 'root',
})
export class ControlService {
  constructor(private ShapesService: ShapesService) {}
  gui = new dat.GUI();
  cakeShapes = {
    shape: 'Cube',
  };
  cameraControl() {
    const cameraControl = this.gui.addFolder('Camera');
    cameraControl
      .add(this.ShapesService.group.rotation, 'x', 0, Math.PI)
      .name('Rotate X');
    cameraControl
      .add(this.ShapesService.group.rotation, 'y', 0, Math.PI)
      .name('Rotate Y');
    cameraControl
      .add(this.ShapesService.group.rotation, 'z', 0, Math.PI)
      .name('Rotate Z');
  }

  shapesControl() {
    const params = {
      color: 0xfffff,
    };
    const folder = this.gui.addFolder('Shapes');
    var generate = {
      generateShape: () => {
        this.gui.destroy();
        this.gui = new dat.GUI();
        this.cameraControl();
        this.shapesControl();
        this.topperControl();
        this.ShapesService.cake(this.cakeShapes.shape);
      },
    };
    folder.addColor(params, 'color').onChange(() => {
      this.ShapesService.material.color.set(params.color);
    });
    folder
      .add(this.cakeShapes, 'shape', {
        Cube: 'cube',
        Cyllinder: 'cyllinder',
      })
      .setValue('cube');
    folder.add(generate, 'generateShape');
  }

  topperTypes = {
    type: 'cherry',
  };

  topperControl() {
    const params = {
      color: 0xfffff,
    };
    const folder = this.gui.addFolder('Topper');
    var generate = {
      generateTopper: () => {
        this.topperGenerate(this.topperTypes.type);
      },
    };

    folder
      .add(this.topperTypes, 'type', {
        Cherry: 'cherry',
        Candle: 'candle',
      })
      .setValue('cherry');

    folder.add(generate, 'generateTopper').name('Generate Topper');
  }

  count = {
    candle: 0,
    cherry: 0,
  };
  params = {
    color: 0xffffff,
  };

  topperGenerate(types: any) {
    switch (types) {
      case 'cherry':
        this.cherry();
        break;
      case 'candle':
        this.candle();
        break;
    }
  }

  candle() {
    var candle = new THREE.Group();
    var candleMaterial = new THREE.MeshBasicMaterial({
      color: this.params.color,
    });
    candle.name = 'candle';
    var cylGeometryBottom = new THREE.CylinderGeometry(0.3, 0.3, 3, 64);
    var cyllinderBottom = new THREE.Mesh(cylGeometryBottom, candleMaterial);

    var cylGeometryTop = new THREE.CylinderGeometry(0, 0.3, 1, 64);
    var cyllinderTop = new THREE.Mesh(cylGeometryTop, candleMaterial);

    cyllinderBottom.position.y = 3;
    cyllinderTop.position.y = 5;
    this.count.candle++;

    candle.add(cyllinderBottom);
    candle.add(cyllinderTop);

    const topControl = this.gui.addFolder('Candle ' + this.count.candle);
    topControl.addColor(this.params, 'color').onChange(() => {
      candleMaterial.color.set(this.params.color);
    });
    topControl
      .add(candle.position, 'x', -2.5, 2.5)
      .name('Candle ' + this.count + ' Position X');
    topControl
      .add(candle.position, 'z', -2.5, 2.5)
      .name('Candle ' + this.count + ' Position Z');

    this.ShapesService.group.add(candle);
  }

  cherry() {
    var cherry;
    var cherryMaterial = new THREE.MeshBasicMaterial({
      color: 'red',
    });
    var sphere = new THREE.SphereGeometry(0.5, 64, 32);
    cherry = new THREE.Mesh(sphere, cherryMaterial);
    this.count.cherry++;

    cherry.position.y = 2.5;

    const topControl = this.gui.addFolder('cherry ' + this.count.cherry);

    topControl
      .add(cherry.position, 'x', -2.5, 2.5)
      .name('cherry ' + this.count.cherry + ' Position X');
    topControl
      .add(cherry.position, 'z', -2.5, 2.5)
      .name('cherry ' + this.count.cherry + ' Position Z');

    this.ShapesService.group.add(cherry);
  }
}