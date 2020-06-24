import {Component, OnInit} from '@angular/core';
import {SearchBuilder} from '../../../share/search-builder';

import {Role} from '../role';
import {RoleService} from '../role.service';
import {PrivilegeService} from '../../privilege/privilege.service';
import {Search} from '../../../share/search.enum';
import {MatDialog} from '@angular/material';
import {RoleCreateComponent} from '../role-create/role-create.component';
import {Privilege} from '../../privilege/privilege';
import {PrivilegeSearchComponent} from '../../privilege/privilege-search.component';

@Component({
  selector: 'app-role-search',
  templateUrl: './role-search.component.html',
  styleUrls: ['./role-search.component.css']
})
export class RoleSearchComponent implements OnInit {
  role =  new Role();
 public roles: Array<Role>;
  displayedColumns: string[] = ['name','edit','privilege','privilege-description'];
  list: Array<any> = [];
  privileges = new Array<Privilege>();
  p: string = null;

  constructor(private roleService: RoleService, private privilegeService: PrivilegeService, public dialog: MatDialog) { }

  openDialog(id : Number): void {
    // if (id == null) {
    //
    // }
    const dialogRef = this.dialog.open(RoleCreateComponent, {
      data: {idx:id}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.ngOnInit();
    });
  }

  openPrivilegeDialog(role : Role,index : any): void {
    // if (id == null) {
    //
    // }
    const dialogRef = this.dialog.open(PrivilegeSearchComponent, {
      data: {idx:role.id}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(JSON.stringify(result));
      this.privileges=result;
      // this.roles[index].privileges=result;
      // this.ngOnInit();
    });
  }


  ngOnInit() {
    // this.privilegeService.findAll()
    //   .then(list => this.getLog(list));

    if (this.role.name === null) {
      this.findAll();
    } else {
      this.search();
    }
    this.loadPrivileges();
  }

  public loadPrivileges() {
    if (this.p !== null) {
      const s = new SearchBuilder()
        .add('name', Search.Contains, this.p)
        .build();
      this.privilegeService.search(s).then(e => this.privileges = e);
    } else {
      this.privilegeService.findAll().then(e => this.privileges = e);
    }
  }

  private getLog(list) {
    console.log(JSON.stringify(list));
  }

  findAll() {
    this.roleService.findAll().then(roles => this.roles = roles);
  }

  search() {
    const s = new SearchBuilder()
      .add('name', Search.Quality, this.role.name)
      .build();
    this.roleService.search(s).then(list => this.roles = list);
  }

  remove(id: Number) {
    this.roleService.deleteById(id).subscribe(() => {
      console.log('remove entity by id : ' + id);
    });
  }

}
