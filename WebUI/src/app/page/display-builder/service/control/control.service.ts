import { Router } from '@angular/router';
import { SellerServiceService } from './../../../../service/seller-service.service';
import { ShapesService } from '../shapes.service';
import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {
  DataDelete,
  DialogOverviewComponent,
} from '../../../../layout/dialog-overview/dialog-overview.component';
import * as THREE from 'three';
import * as dat from 'dat.gui';

@Injectable({
  providedIn: 'root',
})
export class ControlService {
  constructor(
    private ShapesService: ShapesService,
    private seller: SellerServiceService,
    private dialog: MatDialog,
    private Router: Router
  ) {}
  gui = new dat.GUI();
  cakeShapes = {
    shape: 'cube',
  };
  savingControl() {
    var saving = {
      metadata: () => {
        var detailsAdd: product = JSON.parse(
          sessionStorage.getItem('detailsAddItem') || ''
        );
        var metadata = sessionStorage.getItem('sceneJson');
        this.seller
          .addItems(
            detailsAdd.itemsName,
            detailsAdd.category,
            detailsAdd.price,
            detailsAdd.userId,
            metadata
          )
          .subscribe((data: any) => {
            alert(JSON.stringify(data.data || ''));
            if (data.status == '200') {
              const dialogRef = this.dialog.open(DialogOverviewComponent, {
                width: '500px',
                height: '500px',
                data: {
                  type: 'message-only',
                  message: 'Items Added!',
                },
                panelClass: 'myClass',
              });

              dialogRef.afterOpened().subscribe(() =>
                setTimeout(() => {
                  dialogRef.close();
                }, 1500)
              );

              dialogRef.afterClosed().subscribe((result) => {
                this.gui.destroy();
                this.Router.navigateByUrl('/seller');
              });
            }
          });
      },
    };
    this.gui.add(saving, 'metadata').name('Save');
  }
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
      color: 0xffffff,
    };
    const folder = this.gui.addFolder('Shapes');
    var generate = {
      generateShape: () => {
        this.gui.destroy();
        this.gui = new dat.GUI();

        this.savingControl();
        this.cameraControl();
        this.shapesControl();
        this.topperControl();
        this.ShapesService.cake(this.cakeShapes.shape);
      },
    };

    folder.addColor(params, 'color').onChange(() => {
      this.ShapesService.material.color.set(params.color);
    });

    // var inputFile = {
    //   inputFile: () => {
    //     var inputImg = document.getElementById('image-file');
    //     inputImg?.click();
    //     inputImg?
    //   },
    // };
    // texture.add(inputFile, 'inputFile').name('Image Depan');
    folder
      .add(this.cakeShapes, 'shape', {
        Cube: 'cube',
        Cyllinder: 'cyllinder',
      })
      .onChange((e) => {
        console.log(e.value);
        // console.log(this.cakeShapes.shape);
        // if (this.cakeShapes.shape == 'cube') {
        //   texture.remove(texture.__controllers[0]);
        //   texture.add(inputFile, 'inputFile').name('Image Depan');
        // } else if (this.cakeShapes.shape == 'cyllinder') {
        //   texture.remove(texture.__controllers[0]);
        //   texture.add(inputFile, 'inputFile').name('Image Cyll');
        // }
      });
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

    if (this.cakeShapes.shape == 'cube') {
      cherry.position.y = 2.5;
    } else if (this.cakeShapes.shape == 'cyllinder') {
      cherry.position.y = 2.97;
    } else {
      cherry.position.y = 2.5;
    }

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

type product = {
  itemsName: string;
  price: number;
  category: string;
  userId: string;
};
