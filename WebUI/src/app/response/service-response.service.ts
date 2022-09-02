import { Injectable } from '@angular/core';
import { ErrorSchema } from './error-schema';

@Injectable({
  providedIn: 'root',
})
export class ServiceResponseService {
  constructor() {}
  error_schema = new ErrorSchema();
  output_schema: any;
  setOutput() {
    this.output_schema = { message: 'test', status: '200' };
  }
  getOutput() {
    return this.output_schema;
  }
}
