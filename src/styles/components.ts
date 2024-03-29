import styled from 'styled-components'

interface I_BrickProps {
  h?: number
  md?: number
}

export const Brick = styled.div<I_BrickProps>`
  position: relative;
  height: ${({ h = 32 }) => h}px;

  @media ${({ theme }) => theme.media.md} {
    height: ${({ md = 16 }) => md}px;
  }
`

export const WrapperPage = styled.div`
  padding: 24px;
`
