
import { ReactNode, createContext, useReducer, useState } from "react";

interface CreateCycleData {
  task: string
  minutesAmount: number
}

interface Cycle {
  id: string
  task: string
  minutesAmount: number
  startDate: Date
  interruptDate?: Date 
  finishedDate?: Date
}

interface CycleContextType{
  cycles: Cycle[]
  activeCycle: Cycle | undefined
  activeCycleId: string | null
  amountSecondsPassed: number
  markCurrentCycleAsFinished: () => void
  setSecondsPassed: (seconds: number) => void
  CreateNewCycle: (data: CreateCycleData) => void
  interruptCurrentCycle: () => void
}

export const CyclesContext = createContext({} as CycleContextType);

interface CyclesContextProvidersProps {
    children: ReactNode
}

interface CyclesState{
  cycles: Cycle[]
  activeCycleId: string | null
}

export function CyclesContextProvider({children,} : CyclesContextProvidersProps){
  const [cyclesState, dispatch] = useReducer((state: CyclesState, action: any) => {

    switch(action.type){
      case 'ADD_NEW_CYCLE':
        return {
        ...state,
        cycles: [...state.cycles, action.payload.newCycle],
        activeCycleId: action.payload.newCycle.id
      }
      case 'INTERRUPT_CURRENT_CYCLE':
        return{
          ...state,
          cycles: state.cycles.map((cycle) => {
            if(cycle.id === state.activeCycleId) {
              return {...cycle, interruptedDate: new Date()}
            } else{
              return cycle 
            }
          }),
          activeCycleId: null
        }
      case 'MARK_CURRENT_CYCLE_AS_FINISHED':
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
  }, {
    cycles:[],
    activeCycleId: null,
  })

  const [amountSecondsPassed, setAmountSecondsPassed] = useState(0)

  const {cycles, activeCycleId} = cyclesState;
  
  function CreateNewCycle(data: CreateCycleData){
    const id = String(new Date().getTime())
  
    const newCycle: Cycle ={
      id, 
      task: data.task,
      minutesAmount: data.minutesAmount,
      startDate: new Date()
    }

    dispatch({
      type: 'ADD_NEW_CYCLE',
      payload:{
        newCycle,
      }
    })

  setAmountSecondsPassed(0)
  }
  
  function interruptCurrentCycle(){
  dispatch({
    type: 'INTERRUPT_CURRENT_CYCLE',
    payload:{
      activeCycle
    },
  })
}
  
  const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId)
  
  function setSecondsPassed(seconds: number){
    setAmountSecondsPassed(seconds)
  }
  
  function markCurrentCycleAsFinished(){
    dispatch({
      type: 'MARK_CURRENT_CYCLE_AS_FINISHED',
      payload:{
        activeCycleId,
      }
    })
    }

  return(
    <CyclesContext.Provider value={{ 
      activeCycle,
      cycles, 
      activeCycleId, 
      markCurrentCycleAsFinished, 
      amountSecondsPassed, 
      setSecondsPassed,
      CreateNewCycle,
      interruptCurrentCycle

      }}>
        {children}
    </CyclesContext.Provider>
  )
}