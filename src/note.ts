import fs from 'fs'


type typesConfigDatabase = {
  database: string,
  colletions?: string
}

type TNote = {
  title: string,
  body: string
}

class Note {

  private database: string

  setConfig(configDatabase: typesConfigDatabase): void {
    this.database = configDatabase.database
  }

  add({ title, body }: TNote): void {
    const notes = this.load()

    if ((notes.find((note) => note.title === title) ? false : true)) {
      notes.push({ title, body })
      this.save(notes)
    } else {
      throw { message: "Note duplicate" }
    }
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

  list(): TNote[] {
    return this.load()
  }
}

export const note = new Note()