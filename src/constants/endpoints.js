import { serverLink } from './server'

const event = '/event'
const grade = '/grade'
const guest = '/guest'
const memory = '/memory'
const purchase = '/purchase'
const todo = '/todo'
const user = '/user'

export const eventEndpoints = {
  create: serverLink + event + '/create',
  getUserEvents: serverLink + event + '/get-user-events'
}

export const gradeEndpoints = {
  addGrade: serverLink + grade + '/add-grade',
  getGrades: serverLink + grade + '/get-grades'
}

export const guestEndpoints = {
  addGuest: serverLink + guest + '/add-guest',
  searchGuests: serverLink + guest + '/search-guests',
  getGuests: serverLink + guest + '/get-guests',
  getInvitations: serverLink + guest + '/get-invitations',
  acceptInvitation: serverLink + guest + '/accept-invitation',
  declineInvitation: serverLink + guest + '/decline-invitation',
  getMyEvents: serverLink + guest + '/get-my-events'
}

export const memoryEndpoints = {
  getMemories: serverLink + memory + '/get-memories',
  shareMemory: serverLink + memory + '/share-memory'
}

export const purchaseEndpoints = {
  addPurchase: serverLink + purchase + '/add-purchase',
  getPurchases: serverLink + purchase + '/get-purchases',
  updatePurchase: serverLink + purchase + '/update-purchase',
  deletePurchase: serverLink + purchase + '/delete-purchase'
}

export const todoEndpoints = {
  addTodo: serverLink + todo + '/add-todo',
  getTodos: serverLink + todo + '/get-todos',
  updateTodo: serverLink + todo + '/update-todo',
  deleteTodo: serverLink + todo + '/delete-todo'
}

export const userEndpoints = {
  register: serverLink + user + '/register',
  login: serverLink + user + '/login',
  facebook: serverLink + user + '/facebook',
  google: serverLink + user + '/google',
  apple: serverLink + user + '/apple',
  update: serverLink + user + '/update'
}
