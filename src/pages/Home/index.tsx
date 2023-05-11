import {Play, HandPalm} from 'phosphor-react'
import {  HomeContainer, 
          StartCountdownButton, 
          StopCountdownButton
        } from './styles';


import { differenceInSeconds } from 'date-fns';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod'
import * as zod from 'zod'
import { useEffect, useState } from 'react';
import { NewCycleForm } from './components/NewCycleForm';
import { Countdown } from './components/Countdown';



interface Cycle {
  id: string
  task: string
  minutesAmount: number
  startDate: Date
  interruptDate?: Date 
  finishedDate?: Date
}

export function Home(){

  const [cycles, setCycles] = useState<Cycle[]>([])
  const [activeCycleId, setActiveCycleId] = useState<string | null>(null)
  
  const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId)

    function handleCreateNewCycle(data: NewCycleFormData){
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
    reset();
  }

  function handleInterruptCycle(){
    
    setCycles(state => state.map((cycle) => {
      if(cycle.id === activeCycleId) {
        return {...cycle, interruptedDate: new Date()}
      } else{
        return cycle 
      }
    }))
    setActiveCycleId(null)
  }


  const currentSeconds = activeCycle ? totalSeconds - amountSecondsPassed : 0

  const minutesAmount = Math.floor(currentSeconds / 60)
  const secondsSeconds = currentSeconds % 60

  const minutes = String(minutesAmount).padStart(2, '0')
  const seconds = String(secondsSeconds).padStart(2, '0')

  useEffect(() => {
    if(activeCycle){
      document.title = `${minutes}:${seconds}`
    }
  },[minutes, seconds, activeCycle])

  const task = watch('task')
  const isSubmitDisabled = !task

  console.log(cycles)
  return(
    <HomeContainer>
      <form action="" onSubmit={handleSubmit(handleCreateNewCycle)}>

      <NewCycleForm/>
      <Countdown activeCycle={activeCycle} setCycles={setCycles}/>

        {activeCycle ? (
          <StopCountdownButton 
            type="button"
            onClick={handleInterruptCycle}
            >
            <HandPalm size={24}/>
            Interromper
          </StopCountdownButton>
        ) : (
              <StartCountdownButton 
                disabled={isSubmitDisabled} 
                type="submit">
                  <Play size={24}/>
                  Comecar
                </StartCountdownButton>)
        } 
      
      </form>
    </HomeContainer>
  
  )
}