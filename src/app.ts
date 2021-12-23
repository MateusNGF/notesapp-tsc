import * as yargs from 'yargs'
import { Note } from './Note'
import { Repository } from './Repository'

const repo = new Repository()
repo.setConfig({
  database: './database.json'
})
const note = new Note(repo)

// ADD
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

// LIST
yargs.command({
  command: 'list',
  describe: "list all notes.",
  handler: function () {
    console.table(note.list())
  }
})

// READ 
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
    try {
      console.table(note.find(args.title.toString()))
    } catch (e) {
      console.error(e.message)
    }
  }
})

// REMOVE
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
      console.log("Removed with sucess.")
    } catch (e) {
      console.error(e.message)
    }
  }
})


yargs.parse()