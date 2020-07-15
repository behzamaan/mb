import {Component, Inject, OnDestroy, OnInit} from '@angular/core';


import {Privilege} from './privilege';
import {PrivilegeService} from './privilege.service';
import {SearchBuilder} from '../../share/search-builder';
import {Search} from '../../share/search.enum';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';


@Component({
  selector: 'app-privilege-search',
  templateUrl: './privilege-search.component.html',
  styleUrls: ['./privilege-search.component.css']
})
export class PrivilegeSearchComponent implements OnInit,OnDestroy {
  privilege =  new Privilege();
  list: Array<any> = [];
  privileges = new Array<Privilege>();
  selection=new Array<MbCheckBox>();
  p: string = null;


  constructor(private privilegeService:PrivilegeService,@Inject(MAT_DIALOG_DATA) public data: any,
  public dialogRef: MatDialogRef<PrivilegeSearchComponent>) { }

  ngOnInit() {
    this.loadPrivileges();
    // this.fill(this.privileges);
  }
  public loadPrivileges() {
    const id = this.data.idx;
    // this.privileges = this.data.privileges;

    console.log(id);
    if (this.p !== null) {
      this.privilegeService.search(new SearchBuilder()
        .add('name', Search.Contains, this.p)
        .build()).then(e =>this.fillNull(e));
    } else {
      this.privilegeService.findAll().then(e =>this.fillNull(e));
    }
  }

  private fillNull(e) {
    e.forEach(x => {
    let checkbox: MbCheckBox = {} as MbCheckBox;
      const find = this.data.privileges.find(c => c.id === x.id);
      checkbox.isSelected = find!=undefined;
      checkbox.value = x;
      this.selection.push(checkbox);
      this.privileges=this.data.privileges;
    });
  }

  remove(id: Number) {
    this.privilegeService.deleteById(id).subscribe(() => {
      console.log('remove entity by id : ' + id);
    });
  }

  ngOnDestroy(): void {
    this.dialogRef.close(this.privileges);
    console.log('************************************************')
    console.log('destroy ... \n' + JSON.stringify(this.data.privileges));
    console.log('************************************************')
  }

  changeSelection(box:MbCheckBox) {
    if (box.isSelected) {
      this.privileges.push(box.value);
    } else {
      const index: number = this.privileges.findIndex(e=> e.id===box.value.id);
      if (index !== -1) {
        this.privileges.splice(index, 1);
      }
    }
  }


}
