import * as fs from 'fs'
import * as yargs from 'yargs'
import { note } from './note'

note.setConfig({
  database: './database.json'
})

yargs.command({
  command: 'add',
  describe: "adiciona uma nova nota.",
  builder: {
    title: {
      describe: "titulo da nota",
      demandOption: true,
      type: 'string'
    },
    body: {
      describe: "Descrição da nota.",
      demandOption: true,
      type: 'string'
    }
  },
  handler: function (args) {
    try {
      note.add({
        title: args.title.toString(),
        body: args.body.toString()
      })
      console.log("Note added.")
    } catch (e) {
      console.error(e.message)
    }
  }
})

yargs.command({
  command: 'list',
  describe: "list all notes.",
  handler: function () {
    console.table(note.list())
  }
})


yargs.parse()