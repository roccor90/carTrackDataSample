import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Track } from 'src/app/model/entities/Track';
import { environment } from 'src/environments/environment';
const cacheBuster$: Subject<void> = new Subject<void>();

@Injectable({
  providedIn: 'root'
})
export class TrackService {
  track: Track | undefined;

  constructor(protected http: HttpClient) { 
    this.track = new Track();
  }

  public getAllTracks(cardIds: []): Observable<Track[]>{
    const payload = cardIds;
    return this.http.post<any>(`${environment.server}${environment.contextRoot}/subsetCarId`, payload, { headers: { Accept: 'application/json' } });
  }

  public getTrack(car_id: string): Observable<Track[]>{
    return this.http.get<any>(`${environment.server}${environment.contextRoot}/${car_id}`);
  }

  public create(t: Track): Observable<any>{
    return this.http.post<any>(`${environment.server}${environment.contextRoot}`, t, { headers: { Accept: 'application/json' } });
  }

}
