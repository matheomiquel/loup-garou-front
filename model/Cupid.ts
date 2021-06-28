import { CharacterInterface } from "./Character"

export class Cupid implements CharacterInterface {
  static readonly roleId: number = 1
  readonly roleId: number
  readonly name: string
  readonly description: string
  readonly order: number
  readonly arrow: number
  constructor() {
    this.roleId = 1
    this.name = 'Cupidon'
    this.description = 'Choisi 2 personnes, ils mourront ensemble '
    this.order = 0
    this.arrow = 1
  }
}