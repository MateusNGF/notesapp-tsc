import fs from 'fs'


type typesConfigDatabase = {
  database: string,
  colletions?: string
}

type TNote = {
  title: string,
  body: string,
  createAt: Date
}

class Note {

  private database: string | '@/database.json'

  setConfig(configDatabase: typesConfigDatabase): void {
    this.database = configDatabase.database
  }

  add({ title, body, createAt }: TNote): void {
    const notes = this.load()

    if ((notes.find((note) => note.title === title) ? false : true)) {
      notes.push({ title, body, createAt })
      this.save(notes)
    } else {
      throw { message: "Note duplicate" }
    }
  }

  remove(title: string): void {
    const notes = this.load()

    const new_notes = notes.filter((note) => note.title !== title)
    console
    if (notes.length > new_notes.length) {
      throw { message: "note not has removed." }
    } else {
      this.save(new_notes)
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

export const note = new Note()