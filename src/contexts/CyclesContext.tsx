
import { ReactNode, createContext, useState } from "react";

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

export function CyclesContextProvider({children,} : CyclesContextProvidersProps){

  
  const [amountSecondsPassed, setAmountSecondsPassed] = useState(0)
  const [cycles, setCycles] = useState<Cycle[]>([])
  const [activeCycleId, setActiveCycleId] = useState<string | null>(null)
  
  function CreateNewCycle(data: CreateCycleData){
    const id = String(new Date().getTime())
  
  const newCycle: Cycle ={
    id, 
    task: data.task,
    minutesAmount: data.minutesAmount,
    startDate: new Date()
  }
  
  setCycles((state) => [...state, newCycle])
  setActiveCycleId(id)
  setAmountSecondsPassed(0)
  }
  
  function interruptCurrentCycle(){
  setCycles(state => state.map((cycle) => {
    if(cycle.id === activeCycleId) {
      return {...cycle, interruptedDate: new Date()}
    } else{
      return cycle 
    }
  }))
  setActiveCycleId(null)
  }
  const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId)
  
  function setSecondsPassed(seconds: number){
    setAmountSecondsPassed(seconds)
  }
  
  function markCurrentCycleAsFinished(){
    setCycles(
      state => state.map((cycle) => {
        if(cycle.id === activeCycleId) {
          return {...cycle, finishedDate: new Date()}
        } else{
        return cycle 
      }
    }),
    )
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