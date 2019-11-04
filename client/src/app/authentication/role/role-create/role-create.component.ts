import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Location} from '@angular/common';
import {RoleService} from '../role.service';
import {Role} from '../role';

@Component({
  selector: 'app-role-create',
  templateUrl: './role-create.component.html',
  styleUrls: ['./role-create.component.css']
})
export class RoleCreateComponent implements OnInit {
  role = new Role();
  constructor(private roleService: RoleService, private route: ActivatedRoute , private location: Location) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.load(params.get('id'));
    });
  }


  load(id: any): any {
    this.roleService.load(id).subscribe(model  => {
      this.role = model;
    });
    console.log(id);
    return null;
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
