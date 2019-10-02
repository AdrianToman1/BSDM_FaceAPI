import { Component } from '@angular/core';
import { environment } from '../../environments/environment';

@Component({
  selector: 'Face-Index',
  templateUrl: './face-index.component.html'
})
export class FaceIndexComponent {
  marcusImages = environment.marcusImages;
}
