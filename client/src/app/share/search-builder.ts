import {SearchModel} from './search-model';
import {Search} from './search.enum';

export class SearchBuilder  {

   items: Array<SearchModel>;

  public add(key: string, operation: Search, value: Object): SearchBuilder {
    this.items = new Array<SearchModel>();
    const m = new SearchModel();
    m.key = key;
    m.operation = operation;
    m.value = value;
    this.items.push(m);
    return this;
  }

  build(): string {
    let result = '';
    for (let i = 0; i < this.items.length; i++) {
      const model = this.items[i];
      if (i > 0) {
        result = ',';
      }
      result = model.key.toString() + model.operation.toString() + model.value.toString();

    }
    return result;
  }


}
