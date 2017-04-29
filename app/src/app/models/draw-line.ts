export class DrawLine {
  points: DrawPoint[];

  constructor(){
    this.points = [];
  }
}

export class DrawPoint {
  constructor(public x : number,public y: number){}
}
