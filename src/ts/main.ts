import { Person } from "./models/Person";

let x: number = 5;
let y: number = 10;

let sum: number = (x = x * y) * (y + x);

console.log(sum);

let perry: Person = new Person("Per", 29);
let berry: Person = new Person("Berge", 29);

let persons: Person[] = [perry, berry];

for (let i = 0; i < persons.length; i++) {
  console.log(persons[i].name);
}
