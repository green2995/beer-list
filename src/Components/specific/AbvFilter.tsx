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
      {props.data?.map((range) => (
        <AbvFilterToggleButton
          key={range.id}
          onPressToggle={(result) => props.onPressToggle?.call(null, range, result)}
          onPressDelete={props.onPressDelete?.bind(null, range)}
          range={range}
        />)
      )}
      <AbvFilterRangeInput
        onPressAdd={props.onPressAdd}
      />
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  flex-direction: row;
`;


export default AbvFilter
