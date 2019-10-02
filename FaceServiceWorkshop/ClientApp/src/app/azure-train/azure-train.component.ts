import { Component } from '@angular/core';
import { environment } from '../../environments/environment';

import { AzureFaceRecognitionService } from "../services/azure-face-recognition.service";
import { Observable } from 'rxjs';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'azure-train',
  templateUrl: './azure-train.component.html'
})
export class AzureTrainComponent {
  private userGroupId = "demo";
  private userGroupName = "Demo";
  private userGroupUserData = "Demo training";
  stage: string;
  azureOutput: string;
  personId: string;

  constructor(private azureFaceRecognitionService: AzureFaceRecognitionService) {
    this.deletePersonGroup();
  }

  deletePersonGroup() {
    this.stage = "Delete existing Person Group";

    this.azureFaceRecognitionService.deletePersonGroup(
      this.userGroupId
    ).subscribe(() => {
      this.createPersonGroup();
    }, error => console.error(error));
  }



  createPersonGroup() {
    this.stage = "Creating Person Group";

    this.azureFaceRecognitionService.createPersonGroup(
      this.userGroupId,
      this.userGroupName,
      this.userGroupUserData
      ).subscribe(result => {
        this.azureOutput = result;

        this.createPersonGroupPerson();
    }, error => console.error(error));
  }

  createPersonGroupPerson() {
    this.stage = "Creating Person Group Person";

    this.azureFaceRecognitionService.createPersonGroupPerson(
      this.userGroupId,
      "Marcus",
      "Images of Marcus"
    ).subscribe(result => {
      this.azureOutput = result;
      this.personId = result.personId;

      this.createPersonGroupPersonPersistFaces();
    }, error => console.error(error));
  }

  createPersonGroupPersonPersistFaces() {
    this.stage = "Uploading faces";

    const observables = [];

    environment.marcusImages.forEach(image => {
        observables.push(
          this.azureFaceRecognitionService.createPersonGroupPersonPersistFace(this.userGroupId, this.personId, image));
    });

    forkJoin(observables)
  .subscribe(result => {
 
//  this.createPersonGroupPersonPersistFaces();
}, error => console.error(error));
  }


}


