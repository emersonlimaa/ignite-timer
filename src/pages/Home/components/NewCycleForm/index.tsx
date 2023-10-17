import { FormContainer, MinutesAmount, TaskInput } from "./styles";
import { useFormContext } from "react-hook-form";
import { useContext } from "react";
import { CyclesContext } from "../../../../contexts/CyclesContext";

export function NewCycleForm(){
  const {activeCycle} = useContext(CyclesContext)
  const {register} = useFormContext()

  return(
    <FormContainer>

        <label htmlFor="task">Vou trabalhar em</label>
        <TaskInput 
          id="task" 
          placeholder='De um nome ao seu projeto'
          list='task-suggestions'
          {...register('task')}
          disabled={!!activeCycle}
        />
        

        <datalist id='task-suggestions'>
        <option value="Projeto 1"/>
        <option value="Projeto 2"/>
        <option value="Projeto 3"/>
        <option value="Projeto 4"/>

        </datalist>

        <label htmlFor="minutes">Durante</label>
        <MinutesAmount 
          type="number" 
          id="minutesAmount"  
          placeholder='00'
          step={5}
          min={5}
          max={60}
          {...register('minutesAmount', {valueAsNumber: true})}
          disabled={!!activeCycle}
        />

        <span>minutos.</span>
        
      </FormContainer>
  )
}