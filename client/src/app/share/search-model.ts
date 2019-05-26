export class SearchModel {

  private _key: string;
  private _operation: string ;
  private _value: Object ;


  get key(): string {
    return this._key;
  }

  set key(value: string) {
    this._key = value;
  }

  get operation(): string {
    return this._operation;
  }

  set operation(value: string) {
    this._operation = value;
  }

  get value(): Object {
    return this._value;
  }

  set value(value: Object) {
    this._value = value;
  }
}
