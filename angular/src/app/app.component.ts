import { Component, VERSION} from '@angular/core';

interface User {
  id: number;
  info: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styles: []
})
export class AppComponent {

  operationStartTime = 0
  operationEndTime = 0
  user: Array<User> = [];
  selected: any [] = [];
  version: string | undefined;
  constructor(){
    this.version = VERSION.full;
  }

   buildUser(count: number): Array<User>{
    const Name = ["James", "John", "Mary", "Linda", "Susan", "David", "Richard", "Joseph", "Sara", "Jessica", "Thomas", "Charles", "Karen",
     "Lisa", "Daniel", "Matthew", "Betty", "Anthony", "Margaret", "Donald", "Ashely", "Paul", "Mark", "Sandra"];
     const Country = ["Sweden", "Germany", "Argentina", "Italy", "Austria", "Bahamas", "Belgium", "Canada", "China", "Colombia", "Spain", "Turkey", "Cyprus",
     "Denmark", "Egypt", "Ecuador", "Finland", "Greece", "Ghana", "India", "Iceland", "Japan", "Latvia", "Maldives"];
    const Age = [21, 18, 23, 32, 12, 24, 41, 33, 26, 9, 20, 28, 33, 19, 29, 34, 8, 42, 53, 25, 7, 26, 35, 31];
    const users: Array<User> = [];
    var nextId = 1;
    for(var i=0; i < count; i++){
      users.push({
        id: nextId,
        info:
          Name[this.random(Name.length)] +
          " \u00A0\u00A0 Country:" +
          Country[this.random(Country.length)] +
          "\u00A0\u00A0 Age:" +
          Age[this.random(Age.length)],
      });
      nextId++;
    }
    return users;
  }

  ngAfterViewChecked() {
    this.operationEndTime = performance.now()
    console.log('Operation took ', (this.operationEndTime - this.operationStartTime).toFixed(3), ' milliseconds')
  }

  random(max: number) {
      return Math.round(Math.random() * 1000) % max;
    }

    // Create users
    create(count:number) {
        this.operationStartTime = performance.now()
        this.user = this.buildUser(count);
    }

    // Update users
    update(count:number) {
        this.operationStartTime = performance.now()
        for (let i = 0; i < this.user.length && i < count; i++) {
            this.user[i].info += ' *** ';
        }
    }

    // Delete user
    clear(count:number) {
        this.operationStartTime = performance.now()
        this.user.splice(0,count);
    }

    
    // Read users from the table
    select(count: number){
    this.operationStartTime = performance.now()
    
    const table = <HTMLTableElement>document.querySelector('#myTab');
    const rows = table.tBodies[0].rows;
    const theSelected = this.selected;
    const num = this.selected.length + count;
    for (let i = this.selected.length; i < rows.length && i < num; i++){
      const tds = Array.from(rows[i].cells).map(td => td.textContent);
      //console.log(tds.join(''));
      theSelected.push(tds);
    }
    this.selected = theSelected;
    //console.log(this.selected.length);
}
}
