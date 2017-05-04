/**
 * Created by Ben on 04/05/2017.
 */

export class List<T> {
  private items: Array<T>;

  constructor() {
    this.items = [];
  }

  size(): number {
    return this.items.length;
  }

  add(value: T): void {
    this.items.push(value);
  }

  get(index: number): T {
    return this.items[index];
  }

  contains(value: T): boolean {
    return this.items.indexOf(value) > 0;
  }

  next(value: T): T {
    let index = this.items.indexOf(value);
    return index + 1 < this.items.length ? this.items[index + 1]: this.items[0];
  }
}
