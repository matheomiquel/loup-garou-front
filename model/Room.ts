import { User } from ".";
import { Role } from "."
export class Room {
  public user: User[]
  public dead: number
  public deadThisLap: User[]
  public roles: Array<Role>
  public numberPlayer: number
  constructor() {
    this.user = [];
    this.dead = 0;
    this.numberPlayer = 0;
    this.deadThisLap = [];
    this.roles = [];
  }
}