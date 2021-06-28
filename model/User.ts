import { CharacterInterface } from "./Character"
export interface User {
  username: string
  character?: CharacterInterface
  id: string
}