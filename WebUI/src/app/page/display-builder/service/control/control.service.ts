import { TopperService } from '../topper.service';
import { ShapesService } from '../shapes.service';
import { Injectable } from '@angular/core';
import * as THREE from 'three';
import * as dat from 'dat.gui';

@Injectable({
  providedIn: 'root',
})
export class ControlService {
  constructor(
    private ShapesService: ShapesService,
    private topper: TopperService
  ) {}
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
        this.ShapesService.cake(this.cakeShapes.shape);
      },
    };
    folder.addColor(params, 'color').onChange(() => {
      this.ShapesService.material.color.set(params.color);
    });
    folder.add(this.cakeShapes, 'shape', {
      Cube: 'cube',
      Cyllinder: 'cyllinder',
    });
    folder.add(generate, 'generateShape');
  }

  topperControl() {
    const params = {
      color: 0xfffff,
    };
    const folder = this.gui.addFolder('Topper');
    var generate = {
      generateTopper: () => {
        // this.topper.candle();
        console.log('test');
      },
    };

    folder.add(this.cakeShapes, 'shape', {
      Cube: 'cube',
      Cyllinder: 'cyllinder',
    });

    folder.add(generate, 'generateTopper').name('Generate Topper');
  }
}
