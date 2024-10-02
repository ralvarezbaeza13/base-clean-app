export class Pokemon {
  id: number;
  name: string;

  constructor(data: { id: number; name: string }) {
    this.id = data.id;
    this.name = data.name;
  }
}