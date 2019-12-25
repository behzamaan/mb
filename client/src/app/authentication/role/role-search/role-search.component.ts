import {Component, OnInit} from '@angular/core';
import {SearchBuilder} from '../../../share/search-builder';

import {Role} from '../role';
import {RoleService} from '../role.service';
import {PrivilegeService} from '../../privilege/privilege.service';
import {Search} from '../../../share/search.enum';

@Component({
  selector: 'app-role-search',
  templateUrl: './role-search.component.html',
  styleUrls: ['./role-search.component.css']
})
export class RoleSearchComponent implements OnInit {
  role =  new Role();
  roles: Array<Role>;
  displayedColumns: string[] = ['name'];
  list: Array<any> = [];

  constructor(private roleService: RoleService, private privilegeService: PrivilegeService) { }

  ngOnInit() {
    this.privilegeService.findAll()
      .subscribe(list => this.getLog(list));

    if (this.role.name === null) {
      this.findAll();
    } else {
      this.search();
    }
  }

  private getLog(list) {
    console.log(JSON.stringify(list));
  }

  findAll() {
    this.roleService.findAll().subscribe(roles => this.roles = roles);
  }

  search() {
    const s = new SearchBuilder()
      .add('name', Search.Quality, this.role.name)
      .build();
    this.roleService.search(s).subscribe(list => this.roles = list);
  }

  remove(id: Number) {
    this.roleService.deleteById(id).subscribe(() => {
      console.log('remove entity by id : ' + id);
    });
  }

}
