import {Play} from 'phosphor-react'
import { CountdownContainer, FormContainer, HomeContainer, Separator } from './styles'

export function Home(){
  return(
    <HomeContainer>
      <form action="">
      
      <FormContainer>

        <label htmlFor="task">Vou trabalhar em</label>
        <input type="text" id="task" />

        <label htmlFor="minutes">Durante</label>
        <input type="number" id="minutes" />

        <span>minutos.</span>
        
      </FormContainer>
      
        <CountdownContainer>
          <span>0</span>
          <span>0</span>
          <Separator>:</Separator>
          <span>0</span>
          <span>0</span>
        </CountdownContainer>
        
        <button type="submit">Comecar <Play/></button>
      
      </form>
    </HomeContainer>
  
  )
}