import { SelectionModel } from '@angular/cdk/collections';
import { AfterViewInit, Component, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { TrackService } from 'src/app/core/services/track.service';
import { Track } from 'src/app/model/entities/Track';

@Component({
  selector: 'app-track-data',
  templateUrl: './track-data.component.html',
  styleUrls: ['./track-data.component.scss']
})
export class TrackDataComponent implements OnInit, OnChanges, AfterViewInit {
  @Input() cardId: string = "";
  displayedColumns: string[] = ['select','timestamp', 'pressure', 'position', 'temperature', 'omega', 'speed'];
  selection = new SelectionModel<Track>(true, []);
  dataSource: MatTableDataSource<Track>;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private service: TrackService) { }
  ngOnChanges(changes: SimpleChanges): void {
    if(changes){
      this.loadData();
    }
  }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
  }

  loadData(): void {
    this.callBe();
    setInterval(() => {
      this.callBe();
    },60000)
    
  }

  callBe(){
    this.service.getTrack(this.cardId).subscribe((result: Track[]) => {
      this.dataSource = new MatTableDataSource(result);
      this.dataSource.paginator = this.paginator;
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    let numRows = 0;
    if(this.dataSource) {
      numRows = this.dataSource.data.length;
    }
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }

    this.selection.select(...this.dataSource.data);
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: Track): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.position + 1}`;
  }

  sendDataToAiEngine() {
    console.log(this.selection.selected)
  }

}
