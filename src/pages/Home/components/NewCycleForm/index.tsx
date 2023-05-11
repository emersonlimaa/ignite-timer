import { zodResolver } from "@hookform/resolvers/zod";
import { FormContainer, MinutesAmount, TaskInput } from "./styles";
import * as zod from 'zod';
import { useForm } from "react-hook-form";

const newCycleFormValidationSchema = zod.object({
  task: zod.string().min(1, 'informe a tarefa'),
  minutesAmount: zod.number()
  .min(5, 'O ciclo precisa ser de no minimo 5 minutos')
  .max(60, 'O ciclo precisa ser de no maximo 60 minutos'),
})

type NewCycleFormData = zod.infer<typeof newCycleFormValidationSchema>

export function NewCycleForm(){
  const {register, handleSubmit, watch, reset } = useForm<NewCycleFormData>({
    resolver: zodResolver(newCycleFormValidationSchema),
    defaultValues:{
      task: '',
      minutesAmount: 0,
    }
  })

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