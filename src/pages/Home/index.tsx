import {Play, HandPalm} from 'phosphor-react'
import {  HomeContainer, 
          StartCountdownButton, 
          StopCountdownButton
        } from './styles';

import { useContext } from 'react';
import { NewCycleForm } from './components/NewCycleForm';
import { Countdown } from './components/Countdown';
import * as zod from 'zod';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, FormProvider } from 'react-hook-form';
import { CyclesContext } from '../../contexts/CyclesContext';





type NewCycleFormData = zod.infer<typeof newCycleFormValidationSchema>

const newCycleFormValidationSchema = zod.object({
  task: zod.string().min(1, 'informe a tarefa'),
  minutesAmount: zod.number()
  .min(5, 'O ciclo precisa ser de no minimo 5 minutos')
  .max(60, 'O ciclo precisa ser de no maximo 60 minutos'),
})



export function Home(){

  const {activeCycle, CreateNewCycle, interruptCurrentCycle} = useContext(CyclesContext)

  const newCycleForm = useForm<NewCycleFormData>({
    resolver: zodResolver(newCycleFormValidationSchema),
    defaultValues:{
      task: '',
      minutesAmount: 0,
    }
  })
  
  const {handleSubmit, watch, reset} = newCycleForm

  function handleCreateNewCycle(data: NewCycleFormData){
      CreateNewCycle(data)
      reset()
  }


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
            onClick={interruptCurrentCycle}
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