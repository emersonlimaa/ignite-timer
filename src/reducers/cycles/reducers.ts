import {produce} from 'immer'

import { ActionTypes } from './actions';

interface CyclesState{
  cycles: Cycle[]
  activeCycleId: string | null
}

export interface Cycle {
  id: string
  task: string
  minutesAmount: number
  startDate: Date
  interruptDate?: Date 
  finishedDate?: Date
}

export function cyclesRedycer(state: CyclesState, action: any){

  switch(action.type){
    case ActionTypes.ADD_NEW_CYCLE:
      return produce(state, (draft) =>{
        draft.cycles.push(action.payload.newCycle)
        draft.activeCycleId = action.payload.newCycle.id
      })
    
    
      case ActionTypes.INTERRUPT_CURRENT_CYCLE: {
        const currentCycleIndex = state.cycles.findIndex((cycle) => {
          return cycle.id == state.activeCycleId
        })

      if(currentCycleIndex < 0){
        return state
      }

      return produce(state, (draft)=> {
        draft.activeCycleId = null
        draft.cycles[currentCycleIndex].interruptDate = new Date()
      })
      }
        
      


    case ActionTypes.MARK_CURRENT_CYCLE_AS_FINISHED:
      return{
        ...state,
        cycles: state.cycles.map((cycle) => {
          if(cycle.id === state.activeCycleId) {
            return {...cycle, finishedDate: new Date()}
          } else{
            return cycle 
          }
        }),
        activeCycleId: null
      }
    default:
      return state
  }
}