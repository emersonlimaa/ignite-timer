
import { ReactNode, createContext, useEffect, useReducer, useState } from "react";
import { Cycle, cyclesRedycer } from "../reducers/cycles/reducers";
import { ActionTypes, addNewCycleAction, interruptCurrentCycleAction, markCurrentCycleAsFinishedAction } from "../reducers/cycles/actions";
import { differenceInSeconds } from "date-fns";

interface CreateCycleData {
  task: string
  minutesAmount: number
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



export function CyclesContextProvider({children,} : CyclesContextProvidersProps){
  const [cyclesState, dispatch] = useReducer(cyclesRedycer, {
    cycles:[],
    activeCycleId: null,
  }, (initialState) => {
    const storedStateAsJSON = localStorage.getItem('@ignite-timer:cycles-state-1.0.0');

    if(storedStateAsJSON){
      return JSON.parse(storedStateAsJSON)
    }

    return initialState
  })

  const {cycles, activeCycleId} = cyclesState;
  const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId)

  useEffect(() => {
    const stateJSON = JSON.stringify(cyclesState)
    
    localStorage.setItem('@ignite-timer:cycles-state-1.0.0', stateJSON)
  },[cyclesState])

  const [amountSecondsPassed, setAmountSecondsPassed] = useState(() => {
    if(activeCycle) {
      return differenceInSeconds(new Date(), new Date(activeCycle.startDate))
    }

    return 0
  })

  
  
  function CreateNewCycle(data: CreateCycleData){
    const id = String(new Date().getTime())
  
    const newCycle: Cycle ={
      id, 
      task: data.task,
      minutesAmount: data.minutesAmount,
      startDate: new Date()
    }

    dispatch(addNewCycleAction(newCycle))

  setAmountSecondsPassed(0)
  }
  
  function interruptCurrentCycle(){
  dispatch(interruptCurrentCycleAction())
}
  
  
  
  function setSecondsPassed(seconds: number){
    setAmountSecondsPassed(seconds)
  }
  
  function markCurrentCycleAsFinished(){
    dispatch(markCurrentCycleAsFinishedAction())
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