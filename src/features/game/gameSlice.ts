import { createSlice, PayloadAction } from '@reduxjs/toolkit'

type Card = {
  id: number
  value: string
  isFlipped: boolean
  isMatched: boolean
}

type State = {
  cards: Card[]
  flipped: number[]
  moves: number
  message: string
}

const values = ['A','B','C','D','E','F','G','H']

const generate = (): Card[] => {
  return [...values, ...values]
    .map((v, i) => ({ id: i, value: v, isFlipped: false, isMatched: false }))
    .sort(() => Math.random() - 0.5)
}

const initialState: State = {
  cards: generate(),
  flipped: [],
  moves: 0,
  message: ''
}

const slice = createSlice({
  name: 'game',
  initialState,
  reducers: {   
    flip(state, action: PayloadAction<number>) {
      const c = state.cards[action.payload]
      if (c.isFlipped || c.isMatched || state.flipped.length === 2) return

      c.isFlipped = true
      state.flipped.push(action.payload)

      if (state.flipped.length === 2) state.moves++
    },
    check(state) {
      const [a,b] = state.flipped
      if (a === undefined || b === undefined) return

      const c1 = state.cards[a]
      const c2 = state.cards[b]

      if (c1.value === c2.value) {
        c1.isMatched = true
        c2.isMatched = true
        state.message = 'Match!'
      } else {
        c1.isFlipped = false
        c2.isFlipped = false
        state.message = 'Try again'
      }

      state.flipped = []
    },
    reset(state) {
      state.cards = generate()
      state.flipped = []
      state.moves = 0
      state.message = ''
    }
  }
})

export const { flip, check, reset } = slice.actions
export default slice.reducer
