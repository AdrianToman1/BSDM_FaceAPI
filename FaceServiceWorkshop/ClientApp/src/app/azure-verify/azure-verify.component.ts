import { Component, Input } from '@angular/core';

import { AzureFaceRecognitionService } from "../services/azure-face-recognition.service";

@Component({
  selector: 'azure-verify',
  templateUrl: './azure-verify.component.html'
})
export class AzureVerifyComponent {
  private _faceId1 = "";
  private _faceId2 = "";
    azureOutput: string;

  constructor(private azureFaceRecognitionService: AzureFaceRecognitionService) {
  }

  @Input("faceId1")
  set faceId1(faceId1: string) {
    this._faceId1 = faceId1;

    this.process();
  }

  get faceId1(): string { return this._faceId1; }

  @Input("faceId2")
  set faceId2(faceId2: string) {
    this._faceId2 = faceId2;

    this.process();
  }

  get faceId2(): string { return this._faceId2; }

  process() {
    if (this._faceId1 && this._faceId2) {
      this.azureFaceRecognitionService.verify(
        this._faceId1,
        this._faceId2
      ).subscribe(result => {
        this.azureOutput = result;
      }, error => console.error(error));
    }
  }
}


