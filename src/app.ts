import * as fs from 'fs'
import * as yargs from 'yargs'
import { demandOption } from 'yargs'
import { note } from './note'

note.setConfig({
  database: './database.json'
})

// Add
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
        body: args.body.toString(),
        createAt: new Date()
      })
      console.log("Note added.")
    } catch (e) {
      console.error(e.message)
    }
  }
})

// List
yargs.command({
  command: 'list',
  describe: "list all notes.",
  handler: function () {
    console.table(note.list())
  }
})

yargs.command({
  command: 'read',
  describe: "read a note by title",
  builder: {
    title: {
      describe: "Title of note.",
      demandOption: true,
    }
  },
  handler: function (args) {
    console.table(note.find(args.title.toString()))
  }
})

// Remove
yargs.command({
  command: 'remove',
  describe: "remove a note in database.",
  builder: {
    title: {
      describe: "Title for removing",
      demandOption: true,
      type: 'string'
    }
  },
  handler: function (args) {
    try {
      note.remove(args.title.toString())
    } catch (e) {
      console.error(e.message)
    }
  }
})


yargs.parse()