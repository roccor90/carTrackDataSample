import { TrackService } from 'src/app/core/services/track.service';
import {AfterViewInit, Component, OnInit} from '@angular/core';
@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit, AfterViewInit  {
  constructor(private service: TrackService) { }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
  }

}
