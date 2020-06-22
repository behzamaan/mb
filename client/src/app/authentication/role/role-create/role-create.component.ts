import {Component, Inject, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Location} from '@angular/common';
import {RoleService} from '../role.service';
import {Role} from '../role';
import {PrivilegeService} from '../../privilege/privilege.service';
import {Privilege} from '../../privilege/privilege';
import {SearchBuilder} from '../../../share/search-builder';
import {Search} from '../../../share/search.enum';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';

@Component({
  selector: 'app-role-create',
  templateUrl: './role-create.component.html',
  styleUrls: ['./role-create.component.css']
})
export class RoleCreateComponent implements OnInit {
  role = {};
  privileges = new Array<Privilege>();
  p: string = null;

  constructor(private roleService: RoleService,
              private route: ActivatedRoute,
              private location: Location,
              private privilegeService: PrivilegeService,
              public dialogRef: MatDialogRef<RoleCreateComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) {}

  ngOnInit() {
     this.loadPrivileges();
      const id = this.data.idx;
      if (id !== null) {
        this.load(id);
        console.log(JSON.stringify(this.role));
      }
  }


  load(id: any): void {
    this.roleService.findById(id).subscribe(model  => {
      this.role = model;
    });
  }

  public loadPrivileges() {
    if (this.p !== null) {
      const s = new SearchBuilder()
        .add('name', Search.Contains, this.p)
        .build();
      this.privilegeService.search(s).subscribe(e => this.privileges = e);
    } else {
      this.privilegeService.findAll().subscribe(e => this.privileges = e);
    }
  }

  saveOrUpdate(model: Role): Role {
    this.roleService.saveOrUpdate(model).subscribe(
      (data) => {
        return data;
      }
    );
    return null;
  }

  back(): void {
    this.location.back();
  }

}
