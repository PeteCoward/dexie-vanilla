// db.ts
import Dexie from 'dexie'
import type { Table } from 'dexie'
import { dexieCloud } from "dexie-cloud-addon";

export interface Project {
  id?: number
  name: string
}

export class MySubClassedDexie extends Dexie {
  // 'friends' is added by dexie when declaring the stores()
  // We just tell the typing system this is the case
  projects!: Table<Project>

  constructor() {
    super('myDatabase', {addons: [dexieCloud]})
    this.cloud.configure({
        databaseUrl: "http://127.0.0.1:3012/z0emopn05",
        requireAuth: true
    })
    this.version(1).stores({
      projects: '@id, name' // Primary key and indexed props
    })
  }
}

export const db = new MySubClassedDexie()