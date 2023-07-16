import styled from 'styled-components'

export const HeaderWrapper = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px;
  font-size: 18px;
  color: #fffc;
  background: #23282d;
  box-shadow: 0 4px 4px -5px #333;

  @media ${({ theme }) => theme.media.md} {
    padding: 16px 8px;
  }
`

export const HeaderLeftSection = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
`

export const HeaderRightSection = styled(HeaderLeftSection)`
  cursor: pointer;
`
export const HeaderProfileInfo = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
  font-size: 16px;
`
