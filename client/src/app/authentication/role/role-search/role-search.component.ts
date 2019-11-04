import { Component, OnInit } from '@angular/core';
import {SearchBuilder} from '../../../share/search-builder';

import {Role} from '../role';
import {RoleService} from '../role.service';

@Component({
  selector: 'app-role-search',
  templateUrl: './role-search.component.html',
  styleUrls: ['./role-search.component.css']
})
export class RoleSearchComponent implements OnInit {
  role =  <Role> {};
  roles: Array<Role>;
  displayedColumns: string[] = ['name'];

  constructor(private roleService: RoleService) { }

  ngOnInit() {
    if (this.role.name === undefined) {
      this.roleService.all().subscribe(list => {
        this.roles = list;
        console.log(this.roles[0]);
      });
    } else {
      this.search();
    }
  }

  search() {
    const s = new SearchBuilder()
      .add('name', ':', this.role.name)
      .build();
    this.roleService.search(s).subscribe(list => {
      this.roles = list;
      console.log(this.roles[0]);
    });
  }

  remove(id: Number) {

    this.roleService.remove(id).subscribe(() => {
      console.log('remove entity by id : ' + id);
    });
  }

}
