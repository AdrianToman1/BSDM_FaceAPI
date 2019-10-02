import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable()
export class AzureFaceRecognitionService {
  constructor(private httpClient: HttpClient) { }

  detect(base64Image: string) {
    const headers = new HttpHeaders().set('Content-Type', 'application/octet-stream').set('Ocp-Apim-Subscription-Key', environment.azureKey);
    const params = new HttpParams()
      .set('returnFaceId', 'true')
      .set('returnFaceLandmarks', 'false')
      .set(
        'returnFaceAttributes',
        'age,gender,headPose,smile,facialHair,glasses,emotion,hair,makeup,occlusion,accessories,blur,exposure,noise'
      );
    const blob = this.makeblob(base64Image);

    return this.httpClient.post<any>(
      environment.azureEndpoint + "/detect",
      blob,
      {
        params,
        headers
      }
    );
  }

  verify(faceId1: string, faceId2: string) {
    const headers = new HttpHeaders().set('Content-Type', 'application/json').set('Ocp-Apim-Subscription-Key', environment.azureKey);
    const body = { faceId1: faceId1, faceId2: faceId2 }

    return this.httpClient.post<any>(
      environment.azureEndpoint + "/verify",
      body,
      {
        headers
      }
    );
  }

  createPersonGroup(personGroupId: string, name: string, userData: string) {
    const headers = new HttpHeaders().set('Content-Type', 'application/json').set('Ocp-Apim-Subscription-Key', environment.azureKey);
    const body =
    {
      "name": name,
      "userData": userData,
      "recognitionModel": "recognition_01"
    }

    return this.httpClient.put<any>(
      environment.azureEndpoint + "/persongroups/" + personGroupId,
      body,
      {
        headers
      }
    );
  }

  deletePersonGroup(personGroupId: string) {
    const headers = new HttpHeaders().set('Content-Type', 'application/json').set('Ocp-Apim-Subscription-Key', environment.azureKey);

    return this.httpClient.delete<any>(
      environment.azureEndpoint + "/persongroups/" + personGroupId,
      {
        headers
      }
    );
  }

  createPersonGroupPerson(personGroupId: string, name: string, userData: string) {
    const headers = new HttpHeaders().set('Content-Type', 'application/json').set('Ocp-Apim-Subscription-Key', environment.azureKey);
    const body =
    {
      "name": name,
      "userData": userData
    }

    return this.httpClient.post<any>(
      environment.azureEndpoint + "/persongroups/" + personGroupId + "/persons",
      body,
      {
        headers
      }
    );
  }

  createPersonGroupPersonPersistFace(personGroupId: string, personId: string, base64Image: string) {
    const headers = new HttpHeaders().set('Content-Type', 'application/octet-stream').set('Ocp-Apim-Subscription-Key', environment.azureKey);
    const blob = this.makeblob(base64Image);

    return this.httpClient.post<any>(
      environment.azureEndpoint + "/persongroups/" + personGroupId + "/persons/" + personId + "/persistedFaces",
      blob,
      {
        headers
      }
    );
  }




  private makeblob(dataURL) {
    const BASE64_MARKER = ';base64,';
    const parts = dataURL.split(BASE64_MARKER);
    const contentType = parts[0].split(':')[1];
    const raw = window.atob(parts[1]);
    const rawLength = raw.length;
    const uInt8Array = new Uint8Array(rawLength);

    for (let i = 0; i < rawLength; ++i) {
      uInt8Array[i] = raw.charCodeAt(i);
    }

    return new Blob([uInt8Array], { type: contentType });
  }
}
