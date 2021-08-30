import React from 'react'
import { BeerFilter, WithFilterInfo } from '../../Modules/beers'
import AbvFilterRangeInput from './AbvFilter/AbvFilterRangeInput'
import AbvFilterToggleButton from './AbvFilter/AbvFilterToggleButton'
import styled from 'styled-components'

type AbvFilterProps = {
  data?: WithFilterInfo<BeerFilter["abv"]>[]
  onPressAdd?: (from: number, to: number) => void
  onPressDelete?: (range: WithFilterInfo<BeerFilter["abv"]>) => void
  onPressToggle?: (range: WithFilterInfo<BeerFilter["abv"]>, result: boolean) => void
}

const AbvFilter = (props: AbvFilterProps) => {
  return (
    <Container>
      <FilterTitle>도수</FilterTitle>

      <ButtonsContainer>
        {props.data?.map((range) => (
          <AbvFilterToggleButton
            key={range.id}
            onPressToggle={(result) => props.onPressToggle?.call(null, range, result)}
            onPressDelete={props.onPressDelete?.bind(null, range)}
            range={range}
          />)
        )}
      </ButtonsContainer>


      <AbvFilterRangeInput
        onPressAdd={props.onPressAdd}
      />
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  position: relative;
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  min-height: 45px;
`;

const ButtonsContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`;

const FilterTitle = styled.div`
  margin-right: 10px;
  width: 150px;
  padding: 10px;
  background-color: lightgrey;
  border-radius: 5px;
  font-size: 13px;
`;


export default AbvFilter
