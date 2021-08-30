import React from 'react'
import styled from 'styled-components'

type HomeButtonProps = {
  onClick?: () => void
}

const HomeButton = (props: HomeButtonProps) => {
  return (
    <Container onClick={props.onClick}>
      <Text>홈으로 이동</Text>
      <img width={24} src={"https://bit.ly/3DqC9la"} />
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  padding: 10px;
  margin: 10px;
  align-items: center;
  background-color: blue;
  border-radius: 30px;
  justify-content: center;
  padding-left: 20px;
  padding-right: 20px;
  
  transition: box-shadow 200ms;
  box-shadow: 0 0 0px 0px white;
  user-select: none;
  cursor: pointer;

  &:hover {
    transition: box-shadow 200ms;
    box-shadow:
      0 0 10px 0px white,
      0 0 5px 0px white;
  }
`;

const Text = styled.div`
  padding: 5;
  color: white;
  font-size: 20px;
  font-weight: bolder;
  margin-right: 10px;
`;

export default HomeButton
