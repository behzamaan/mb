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
  }
  public loadPrivileges() {
    const id = this.data.idx;
    console.log(id);
    if (this.p !== null) {
      const s = new SearchBuilder()
        .add('name', Search.Contains, this.p)
        .build();
      this.privilegeService.search(s).then(e =>this.extracted(e));
    } else {
      this.privilegeService.findAll().then(e =>this.extracted(e));
    }
  }

  private extracted(e) {
    e.forEach(x => {
      let checkbox: MbCheckBox = {} as MbCheckBox;
      checkbox.isSelected = null;
      checkbox.value = x;
      this.selection.push(checkbox);
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
      const index: number = this.privileges.indexOf(box.value);
      if (index !== -1) {
        this.privileges.splice(index, 1);
      }
    }


  }


}
