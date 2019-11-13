import {Search} from './search.enum';

export class SearchModel {

  private _key: string;
  private _operation: Search ;
  private _value: Object ;


  get key(): string {
    return this._key;
  }

  set key(value: string) {
    this._key = value;
  }

  get operation(): Search {
    return this._operation;
  }

  set operation(value: Search) {
    this._operation = value;
  }

  get value(): Object {
    return this._value;
  }

  set value(value: Object) {
    this._value = value;
  }
}
