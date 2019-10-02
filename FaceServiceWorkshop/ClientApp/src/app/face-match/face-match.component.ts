import { Component } from '@angular/core';
import { environment } from '../../environments/environment';

@Component({
  selector: 'Face-Match',
  templateUrl: './face-match.component.html'
})
export class FaceMatchComponent {
  neutralFaceId: string;
  asicFaceId: string;
  unshavenFaceId: string;
  glassesFaceId: string;
  hatFaceId: string;
  hatAndGlassesFaceId: string;

  neutralFaceImage = environment.neutralFaceImage;
  asicImage = environment.asicImage;
  unshavenFaceImage = environment.unshavenFaceImage;
  glassesFaceImage = environment.glassesFaceImage;
  hatFaceImage = environment.hatFaceImage;
  hatAndGlassesFaceImage = environment.hatAndGlassesFaceImage;

}
