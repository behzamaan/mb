import {User} from '../user';

import {UserService} from '../user.service';
import {ActivatedRoute} from '@angular/router';
import {Location} from '@angular/common';

import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {Component, ElementRef, ViewChild, OnInit} from '@angular/core';
import { FormControl } from '@angular/forms';
import {RoleService} from '../../role/role.service';
import {Role} from '../../role/role';
import { Observable } from 'rxjs';
import { MatAutocomplete, MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';

import {map, startWith} from 'rxjs/operators';

@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.css']
})
export class UserCreateComponent implements OnInit {
  user = new User();
  role = new Role();
  roles : Role[];//all
  // rolesChip=new Array<Role>();//chip

  visible = true;
  selectable = true;
  removable = true;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  roleCtrl = new FormControl();
  filteredRole: Observable<Role[]>;//filter

  @ViewChild('roleInput') fruitInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto') matAutocomplete: MatAutocomplete;

  // private toppingList: Array<Role> ;
  constructor(private userService: UserService, private roleService:RoleService,private route: ActivatedRoute , private location: Location) {
    this.roleService.findAll().then(roles=>{
      console.log(roles);
      this.roles=roles;

    });

    this.filteredRole=this.roleCtrl.valueChanges.pipe(
      startWith(null),
      map((r: Role | null) => r ?  this._filter(r) :  this.roles)

      // map(r=>  this._filter(r))
      );

  }

  ///////////////////////////////////////////

  // add(event: MatChipInputEvent): void {
  //   const input = event.input;
  //   const value = event.value;
  //   let r = new Role() ;
  //       // Add our fruit
  //   if (value!=null) {
  //     this.rolesChip.push(value);
  //   }
  //
  //   // Reset the input value
  //   if (input) {
  //     input.value = '';
  //   }
  //
  //   this.fruitCtrl.setValue(null);
  // }

  remove(fruit: Role): void {
    const index = this.user.roles.indexOf(fruit);

    if (index >= 0) {
      this.user.roles.splice(index, 1);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.user.roles.push(event.option.value);
    this.fruitInput.nativeElement.value = '';
    this.roleCtrl.setValue(null);
  }

  private _filter(value: any): Role[] {
    let rs: Array<Role>;
      const r = value;
    rs = this.roles.filter(role => {
      return role.name.includes(r)
    });
    return rs;

  }

  ///////////////////////////////////////////

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id !== null) {
        this.load(id);
      }
    });
  }


  load(id: any): any {
    this.userService.findById(id).subscribe(model  => {
        this.user = model;
    });


    console.log(id);
    return null;
  }

  saveOrUpdate(model: User): User {
    // model.roles=this.rolesChip;
    this.userService.saveOrUpdate(model).subscribe(
      (user) => {
        return user;
      }
    );
    return null;
  }





  // remove(role:  Role): void {
  //   const index = this.roles.indexOf(role);
  //
  //   if (index >= 0) {
  //     this.roles.splice(index, 1);
  //   }
  // }
  back(): void {
    this.location.back();
  }





}
