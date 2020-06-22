import {Component, Inject, OnInit} from '@angular/core';



import {Privilege} from './privilege';
import {PrivilegeService} from './privilege.service';
import {SearchBuilder} from '../../share/search-builder';
import {Search} from '../../share/search.enum';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';



@Component({
  selector: 'app-privilege-search',
  templateUrl: './privilege-search.component.html',
  styleUrls: ['./privilege-search.component.css']
})
export class PrivilegeSearchComponent implements OnInit {
  privilege =  new Privilege();
  list: Array<any> = [];
  privileges = new Array<Privilege>();
  p: string = null;
  constructor(private privilegeService:PrivilegeService,@Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
    this.loadPrivileges();
  }
  public loadPrivileges() {
    const id = this.data.idx;
    console.log(id);
    if (this.p !== null) {
      const s = new SearchBuilder()
        .add('name', Search.Contains, this.p)
        .build();
      this.privilegeService.search(s).subscribe(e => this.privileges = e);
    } else {
      this.privilegeService.findAll().subscribe(e => this.privileges = e);
    }
  }



  findAll() {
    this.privilegeService.findAll().subscribe(privileges => this.privileges = privileges);
  }

  search() {
    const s = new SearchBuilder()
      .add('name', Search.Quality, this.privilege.name)
      .build();
    this.privilegeService.search(s).subscribe(list => this.privileges = list);
  }

  remove(id: Number) {
    this.privilegeService.deleteById(id).subscribe(() => {
      console.log('remove entity by id : ' + id);
    });
  }

}
