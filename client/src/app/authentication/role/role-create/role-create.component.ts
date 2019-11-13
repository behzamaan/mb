import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Location} from '@angular/common';
import {RoleService} from '../role.service';
import {Role} from '../role';
import {PrivilegeService} from '../../privilege/privilege.service';
import {Privilege} from '../../privilege/privilege';
import {map, tap} from 'rxjs/operators';
import {SearchBuilder} from '../../../share/search-builder';
import {Search} from '../../../share/search.enum';
import {el} from '@angular/platform-browser/testing/src/browser_util';

@Component({
  selector: 'app-role-create',
  templateUrl: './role-create.component.html',
  styleUrls: ['./role-create.component.css']
})
export class RoleCreateComponent implements OnInit {
  role = new Role();
  privileges = new Array<Privilege>();
  p: string = null;

  constructor(private roleService: RoleService,
              private route: ActivatedRoute,
              private location: Location,
              private privilegeService: PrivilegeService) {}

  ngOnInit() {
     this.loadPrivileges();
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id !== null) {
        this.role = this.load(id);
      }
    });
  }


  load(id: any): Role {
    const role = new  Role();
    this.roleService.findById(id).subscribe(()  => role );
    return role;
  }

  public loadPrivileges(): any {
    let privileges = new  Array<Privilege>();
    if (this.p !== null) {
      const s = new SearchBuilder()
        .add('name', Search.Contains, this.p)
        .build();

      this.privilegeService.search(s).subscribe(
        e => {
          this.privileges = e;
          privileges = e;
          console.log(this.privileges);
        }
      );
      return privileges;
    } else {
      this.privilegeService.findAll().subscribe(
        e => {
          this.privileges = e;
          privileges = e;
          console.log(this.privileges);
        }
      );
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
