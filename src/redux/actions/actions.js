import { ADD, ADD2 } from './actionTypes'
export function add() {
   return {
      type: ADD
   }
}

// export function add2(number) {
export function add2() {
   return {
      type: ADD2,
      // payload: number
   }
}