import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'komculator';

  hlen = 1520;
  vlen = 82
  weight = 90
  g = 9.81

  t = 300;
  set tM(val:number) {
    this.t = this.t%60 + val * 60
  }

  get tM() {
    return Math.floor(this.t/60)
  }

  set tS(val:number) {
    this.t = this.tM * 60 + val
  }

  get tS() {
    return this.t%60
  }


  Pv = (time: number) => {
    return this.weight * this.g * this.vlen / time
  }

  get distance () {
    return Math.sqrt(Math.pow(this.hlen, 2) + Math.pow(this.vlen, 2))
  }

  p = 1.2
  v = (time: number) => {
    return this.distance / time
  }

  speedWind = 0
  angleWind = 0

  vW = () => {
    return  this.speedWind * Math.cos(this.angleWind/180*Math.PI)
  }


  positions: Position[] = [
    {name: 'Sprint regular', c: 0.67, a:0.46},
    {name: 'Sprint low/Supertuck', c: 0.626, a:0.374},
    {name:'Back up', c:0.655, a:0.423},
    {name: 'Back horizontal', c:0.638, a:0.37},
    {name: 'Back down', c:0.655, a:0.339}
  ]

  position = this.positions[0]
 

  Ph = (time: number) => {
    return .5 * this.p * Math.pow(this.v(time) + this.vW(), 2) * this.position.c * this.position.a /time * this.distance
  }

  P = (time:number) => {
    return this.Ph(time) + this.Pv(time)
  }

  factor = 1.1




}




interface Position {
  name: String
  c: number
  a: number
}