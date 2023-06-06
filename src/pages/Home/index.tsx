import {Play, HandPalm} from 'phosphor-react'
import {  HomeContainer, 
          StartCountdownButton, 
          StopCountdownButton
        } from './styles';

import { createContext, useState } from 'react';
import { NewCycleForm } from './components/NewCycleForm';
import { Countdown } from './components/Countdown';
import * as zod from 'zod';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, FormProvider } from 'react-hook-form';





type NewCycleFormData = zod.infer<typeof newCycleFormValidationSchema>


export const CyclesContext = createContext({} as CycleContextType)

const newCycleFormValidationSchema = zod.object({
  task: zod.string().min(1, 'informe a tarefa'),
  minutesAmount: zod.number()
  .min(5, 'O ciclo precisa ser de no minimo 5 minutos')
  .max(60, 'O ciclo precisa ser de no maximo 60 minutos'),
})



export function Home(){

  const newCycleForm = useForm<NewCycleFormData>({
    resolver: zodResolver(newCycleFormValidationSchema),
    defaultValues:{
      task: '',
      minutesAmount: 0,
    }
  })
  
  const {handleSubmit, watch, reset} = newCycleForm




  const task = watch('task')
  const isSubmitDisabled = !task

  
  return(
    <HomeContainer>
      <form action="" onSubmit={handleSubmit(handleCreateNewCycle)}>
        <FormProvider {...newCycleForm}>
          <NewCycleForm /> 
        </FormProvider>
          <Countdown />

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