export class Line {
  constructor(private x : number,private y: number){}


  toSvgLine(): string {
    return `${this.x},${this.y}`;
  }
}
