import { ControlService } from './control/control.service';
import { ShapesService } from './shapes.service';
import { Injectable } from '@angular/core';
import * as THREE from 'three';
import * as dat from 'dat.gui';

@Injectable({
  providedIn: 'root',
})
export class TopperService {
  constructor(
    private shapesService: ShapesService,
    private control: ControlService
  ) {}
  gui: any = new dat.GUI();
  count: number = 0;
  params = {
    color: 0xffffff,
  };
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
    // this.count++;

    candle.add(cyllinderBottom);
    candle.add(cyllinderTop);

    const topControl = this.gui.addFolder('Candle ' + this.count);
    topControl.addColor(this.params, 'color').onChange(() => {
      candleMaterial.color.set(this.params.color);
    });
    topControl
      .add(candle.position, 'x', 0, Math.PI)
      .name('Candle ' + this.count + ' Position X');
    topControl
      .add(candle.position, 'y', 0, Math.PI)
      .name('Candle ' + this.count + ' Position Y');
    topControl
      .add(candle.position, 'z', 0, Math.PI)
      .name('Candle ' + this.count + ' Position Z');

    this.shapesService.group.add(candle);
  }
}
