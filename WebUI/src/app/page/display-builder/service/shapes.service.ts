import { Injectable } from '@angular/core';
import * as THREE from 'three';

@Injectable({
  providedIn: 'root',
})
export class ShapesService {
  constructor() {}
  material = new THREE.MeshBasicMaterial({
    color: 0xfffff,
  });
  group = new THREE.Group();
  cake(shapes: any) {
    switch (shapes) {
      case 'cube':
        this.cube();
        break;
      case 'cyllinder':
        this.cyllinder();
        break;
    }
  }

  cube() {
    //create cube
    var cubeGeometry = new THREE.BoxGeometry(6, 4, 6);
    var cube = new THREE.Mesh(cubeGeometry, this.material);

    cube.castShadow = true;
    cube.name = 'cube';

    this.group.children = [];

    this.group.add(cube);
    // setLine(cubeGeometry);
  }

  cyllinder() {
    var cylGeometry = new THREE.CylinderGeometry(5, 5, 5, 32);
    var cyllinder = new THREE.Mesh(cylGeometry, this.material);

    this.group.children = [];

    this.group.add(cyllinder);
  }
}
