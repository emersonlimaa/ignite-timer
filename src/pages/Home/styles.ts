import styled from "styled-components";

export const HomeContainer = styled.main`
  flex: 1;
  
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  form{
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 3.5rem;
  
    
  }
`;




export const BaseCountdownButton = styled.button`
  border: 0;
  width: 100%;
  padding: 1rem;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  cursor: pointer;
  gap: 0.5rem;

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
`

export const StartCountdownButton = styled(BaseCountdownButton)`
    color: ${props => props.theme["gray-100"]};
    background: ${props => props.theme["green-500"]};

    &:not(:disabled):hover{
      background: ${props => props.theme["green-700"]};
    }

  
`

export const StopCountdownButton = styled(BaseCountdownButton)`
    color: ${props => props.theme["gray-100"]};
    background: ${props => props.theme["red-500"]};

    &:not(:disabled):hover{
      background: ${props => props.theme["red-700"]};
    }
`