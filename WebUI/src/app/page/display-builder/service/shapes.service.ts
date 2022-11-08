import { Injectable } from '@angular/core';
import * as THREE from 'three';

@Injectable({
  providedIn: 'root',
})
export class ShapesService {
  constructor() {}
  material = new THREE.MeshBasicMaterial({
    color: 'white',
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
      case 'cookies':
        this.cookiesGen();
        break;
    }
  }
  sourceFile: any = {
    front: '',
    back: '',
    left: '',
    right: '',
  };
  frontUpload(imageFile: any) {
    var reader = new FileReader();
    const file = imageFile.target.files[0];

    reader.onload = (e) => (this.sourceFile.front = reader.result);

    reader.readAsDataURL(file);
    // formData.append('photo', photo);
    // fetch('/upload/image', { method: 'POST', body: formData });
  }
  backUpload(imageFile: any) {
    var reader = new FileReader();
    const file = imageFile.target.files[0];

    reader.onload = (e) => (this.sourceFile.back = reader.result);

    reader.readAsDataURL(file);
    // formData.append('photo', photo);
    // fetch('/upload/image', { method: 'POST', body: formData });
  }
  leftUpload(imageFile: any) {
    var reader = new FileReader();
    const file = imageFile.target.files[0];

    reader.onload = (e) => (this.sourceFile.left = reader.result);

    reader.readAsDataURL(file);
    // formData.append('photo', photo);
    // fetch('/upload/image', { method: 'POST', body: formData });
  }
  rightUpload(imageFile: any) {
    var reader = new FileReader();
    const file = imageFile.target.files[0];

    reader.onload = (e) => (this.sourceFile.right = reader.result);

    reader.readAsDataURL(file);
    // formData.append('photo', photo);
    // fetch('/upload/image', { method: 'POST', body: formData });
  }

  cylSource: any = {
    top: '',
    middle: '',
  };
  topUpload(imageFile: any) {
    var reader = new FileReader();
    const file = imageFile.target.files[0];
    console.log(imageFile.target.files[0]);

    reader.onload = (e) => (this.cylSource.top = reader.result);

    reader.readAsDataURL(file);
    // formData.append('photo', photo);
    // fetch('/upload/image', { method: 'POST', body: formData });
  }

  middleUpload(imageFile: any) {
    var reader = new FileReader();
    const file = imageFile.target.files[0];

    reader.onload = (e) => (this.cylSource.middle = reader.result);

    reader.readAsDataURL(file);
    // formData.append('photo', photo);
    // fetch('/upload/image', { method: 'POST', body: formData });
  }
  cookies: any = {
    top: '',
    bot: '',
  };
  cookiesTopUp(imageFile: any) {
    var reader = new FileReader();
    const file = imageFile.target.files[0];

    reader.onload = (e) => (this.cookies.top = reader.result);

    reader.readAsDataURL(file);
    // formData.append('photo', photo);
    // fetch('/upload/image', { method: 'POST', body: formData });
  }
  cookiesBotUp(imageFile: any) {
    var reader = new FileReader();
    const file = imageFile.target.files[0];

    reader.onload = (e) => (this.cookies.bot = reader.result);

    reader.readAsDataURL(file);
    // formData.append('photo', photo);
    // fetch('/upload/image', { method: 'POST', body: formData });
  }
  cube() {
    //create cube
    var cubeGeometry = new THREE.BoxGeometry(6, 4, 6);
    var cubeMaterialArray = [];

    var textureDepan = new THREE.TextureLoader().load(this.sourceFile.front);
    var textureBelakang = new THREE.TextureLoader().load(this.sourceFile.back);
    var textureKiri = new THREE.TextureLoader().load(this.sourceFile.left);
    var textureKanan = new THREE.TextureLoader().load(this.sourceFile.right);
    // var texture = THREE.ImageUtils.loadTexture('assets/graphs/bricks.jpg');

    if (this.sourceFile.front == '') {
      cubeMaterialArray.push(this.material);
    } else {
      cubeMaterialArray.push(
        new THREE.MeshBasicMaterial({
          map: textureDepan,
        })
      );
    } //depan
    if (this.sourceFile.back == '') {
      cubeMaterialArray.push(this.material);
    } else {
      cubeMaterialArray.push(
        new THREE.MeshBasicMaterial({
          map: textureBelakang,
        })
      );
    } //belakang
    cubeMaterialArray.push(this.material); //atas
    cubeMaterialArray.push(this.material); //bawah

    if (this.sourceFile.left == '') {
      cubeMaterialArray.push(this.material);
    } else {
      cubeMaterialArray.push(
        new THREE.MeshBasicMaterial({
          map: textureKiri,
        })
      );
    } //kiri

    if (this.sourceFile.right == '') {
      cubeMaterialArray.push(this.material);
    } else {
      cubeMaterialArray.push(
        new THREE.MeshBasicMaterial({
          map: textureKanan,
        })
      );
    } //kanang
    var cube = new THREE.Mesh(cubeGeometry, cubeMaterialArray);

    cube.castShadow = true;
    cube.name = 'cube';

    this.group.children = [];

    this.group.add(cube);
    // setLine(cubeGeometry);
  }

  cyllinder() {
    var cylGeometry = new THREE.CylinderGeometry(5, 5, 5, 32);
    var midTexture = new THREE.TextureLoader().load(this.cylSource.middle);
    var topTexture = new THREE.TextureLoader().load(this.cylSource.top);

    console.log(this.cylSource.top);
    var cylMaterialArray = [];

    if (this.cylSource.middle == '') {
      cylMaterialArray.push(this.material);
    } else {
      cylMaterialArray.push(
        new THREE.MeshBasicMaterial({
          map: midTexture,
        })
      );
    }
    if (this.cylSource.top == '') {
      cylMaterialArray.push(this.material);
    } else {
      cylMaterialArray.push(
        new THREE.MeshBasicMaterial({
          map: topTexture,
        })
      );
    }

    var cyllinder = new THREE.Mesh(cylGeometry, cylMaterialArray);

    this.group.children = [];

    this.group.add(cyllinder);
  }

  cookiesGen() {
    var cylGeometry = new THREE.CylinderGeometry(5, 5, 0.1, 64);
    var topTexture = new THREE.TextureLoader().load(this.cookies.top);
    var botTexture = new THREE.TextureLoader().load(this.cookies.bot);

    console.log(this.cylSource.top);
    var cylMaterialArray = [];
    cylMaterialArray.push(new THREE.MeshBasicMaterial({ color: '#BD8C61' }));
    if (this.cookies.top == '') {
      cylMaterialArray.push(this.material);
    } else {
      cylMaterialArray.push(
        new THREE.MeshBasicMaterial({
          map: topTexture,
        })
      );
    }
    if (this.cookies.bot == '') {
      cylMaterialArray.push(this.material);
    } else {
      cylMaterialArray.push(
        new THREE.MeshBasicMaterial({
          map: botTexture,
        })
      );
    }

    var cyllinder = new THREE.Mesh(cylGeometry, cylMaterialArray);

    this.group.children = [];

    this.group.add(cyllinder);
  }
}
