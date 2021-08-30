import React from 'react'
import styled from 'styled-components'
import { Beer } from '../../../Interface/beer'
import { FlexHorizontal } from '../../../Styled'

const BeerDescription = ({beer}: BeerDescriptionProps) => {
  return (
    <div>
      <Block>
        <Subtitle>Description</Subtitle>
        {beer.description}
      </Block>

      <Block>
        <Title>주요 수치</Title>
        <Property title={"도수"} value={beer.abv} unit={"도"} />

        {beer.ph && (
          <Property title={"산도"} value={beer.ph} unit={"ph"} />
        )}

        {beer.srm && (
          <Property title={"색상 진하기"} value={beer.srm} unit={"srm"} />
        )}

        <Property title={"발효도"} value={beer.attenuation_level} unit={"%"} />
      </Block>

      <Block>
        <Title>재료</Title>
        <Property title={"효모"} value={beer.ingredients.yeast} />
        <Subtitle>맥아</Subtitle>
        <ul style={{ margin: 0 }}>
          {beer.ingredients.malt.map((m, i) => {
            return (
              <li key={i}>
                {m.name}: {m.amount.value}kg
              </li>
            )
          })}
        </ul>
        <Subtitle>홉</Subtitle>
        <ul style={{ margin: 0 }}>
          {beer.ingredients.hops.map((h, i) => {
            return (
              <li key={i}>
                {h.name}: {h.amount.value}g ({h.add}) ({h.attribute})
              </li>
            )
          })}
        </ul>
      </Block>
      <Block>
        <Title>발효 방법</Title>
        <Property
          title={"발효 온도"}
          value={beer.method.fermentation.temp.value}
          unit={"°C"}
        />

        {beer.method.mash_temp.map((temp, i) => {
          return (
            <Property
              key={i}
              title={`매싱 온도 및 시간 (${i + 1}차)`}
              value={`${temp.temp.value}°C / ${temp.duration || "-"}분`}
            />
          )
        })}

        {beer.method.twist && (
          <Property
            title={"매싱 첨가물"}
            value={beer.method.twist}
          />
        )}
      </Block>

      <Block>
        <Title>잘 어울리는 음식</Title>
        {beer.food_pairing.map((food) => {
          return (
            <div>
              {food}
            </div>
          )
        })}
      </Block>
    </div>
  )
}

type PropertyProps = {
  title: string;
  value: string | number;
  unit?: string;
}

const Property = (props: PropertyProps) => {
  return (
    <FlexHorizontal>
      <Subtitle>
        {props.title}
      </Subtitle>
      <div style={{ width: 10 }} />
      {props.value} {props.unit || ""}
    </FlexHorizontal>
  )
}

const Block = styled.div`
  margin: 20px;
  padding: 20px;
  border: 1px solid lightgrey;
`;

const Title = styled.div`
  font-size: 20px;
  border-width: 0px;
  border-style: dashed;
  border-bottom-width: 1px;
  border-color: lightgrey;
  padding-bottom: 3px;
  margin-bottom: 10px;
`;


const Subtitle = styled.div`
  font-weight: bold;
  font-style: italic;
`;

type BeerDescriptionProps = {
  beer: Beer
}


export default BeerDescription
