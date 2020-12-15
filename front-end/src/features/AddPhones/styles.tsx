import styled from 'styled-components'

export const Title = styled.h1`
  font-weight: 400;
  margin-bottom: 0.75em;

  > span {
    font-size: 0.7em;
  }
`
export const Description = styled.p`
  > span {
    font-weight: 500;
  }
`

export const Buttons = styled.div`
  display: flex;
  justify-content: center;

  > button:not(:nth-of-type(1)) {
    margin-left: 1em;
  }
`
