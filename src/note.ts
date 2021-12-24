import fs from 'fs'

import { TNote } from '@/entities'
import { IRepository } from '@/interfaces'

export class Note {

  constructor(
    private readonly repository: IRepository
  ) { }

  private database = this.repository.getDatabase()

  add({ title, body, createAt }: TNote): void {
    const notes = this.load()

    if (!(notes.find((note) => note.title === title))) {
      notes.push({ title, body, createAt })
      this.save(notes)
    } else {
      throw { message: "Note duplicate" }
    }
  }

  remove(title: string): void {
    const notes = this.load()

    const new_notes = notes.filter((note) => note.title !== title)
    if (notes.length > new_notes.length) {
      this.save(new_notes)
    } else {
      throw { message: "note not has removed." }
    }
  }

  find(title: string): TNote {
    const notes = this.load()
    const note = notes.find((note) => note.title === title)
    if (!note) throw { message: "note not found" }
    return note
  }

  list(): TNote[] {
    return this.load()
  }

  private load(): TNote[] {
    try {
      const notes = fs.readFileSync(this.database, 'utf-8')
      return JSON.parse(notes)
    } catch (e) {
      return []
    }
  }

  private save(notes: TNote[]): void {
    const s_notes = JSON.stringify(notes)
    fs.writeFileSync(this.database, s_notes)
  }


}