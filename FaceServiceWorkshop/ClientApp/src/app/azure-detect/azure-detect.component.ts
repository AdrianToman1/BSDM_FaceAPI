import { Component, Input, Output, EventEmitter } from '@angular/core';

import { AzureFaceRecognitionService } from "../services/azure-face-recognition.service";

@Component({
  selector: 'azure-detect',
  templateUrl: './azure-detect.component.html'
})
export class AzureDetectComponent {
  private _image = "";
  azureOutput: any;
  @Input() faceId: string;
  @Output() faceIdChange = new EventEmitter<string>();

  constructor(private azureFaceRecognitionService: AzureFaceRecognitionService) {
  }

  @Input("src")
  set image(image: string) {
    this._image = image;

    this.process();
  }

  get image(): string { return this._image; }

  process() {
    if (this._image) {
      const base64Image = this._image;
      this.azureFaceRecognitionService.detect(
        base64Image
      ).subscribe(result => {
        this.azureOutput = result;
        this.faceId = this.azureOutput[0].faceId;
        this.faceIdChange.emit(this.faceId);
      },
        error => console.error(error));
    }
  }
}


