import React from 'react'
import { animated, useChain, useSpring, useSpringRef } from 'react-spring';
import styled from 'styled-components';
import { Beer } from '../../Interface/beer';
import { CenterHorizontal, FlexHorizontal } from '../../Styled';
import { interpolate } from '../../Util/number/interpolate';
import TransitModal from '../generic/TransitModal';

const BeerThumbnail = ({ beer }: BeerThumbnailProps) => {
  const [open, setOpen] = React.useState(false);
  const prevState = React.useRef<boolean>();

  const scrollRef = React.useRef<HTMLDivElement>(null);
  const thumbnailSpringRef = useSpringRef();
  const modalSpringRef = useSpringRef();

  const thumbnailSpring = useSpring({
    ref: thumbnailSpringRef,
    backgroundColor: open ? "white" : "transparent",
    nameFontSize: open ? 40 : 20,
    modalPadding: open ? 50 : 0,
  })

  const modalSpring = useSpring({
    ref: modalSpringRef,
    visible: open ? 1 : 0,
  })

  function toggle() {
    prevState.current = open;
    setOpen(!open);
  }

  useChain(
    open
      ? [thumbnailSpringRef, modalSpringRef]
      : [modalSpringRef, thumbnailSpringRef],
    open
      ? [0, 0.5]
      : [0, 0]
  );

  const overflow = modalSpring.visible.to((v) => Math.round(v) === 1 ? "scroll" : "hidden")

  React.useEffect(() => {
    if (!open) {
      scrollRef.current?.scrollTo({ top: 0 })
    }
  }, [open])

  return (
    <RelativeContainer>
      <StyledTransitModal
        defaultSize={{ width: 300, height: 400 }}
        style={{ backgroundColor: thumbnailSpring.backgroundColor }}
        open={open}>
        <ModalContentContainer
          ref={scrollRef}
          style={{
            overflow,
            padding: thumbnailSpring.modalPadding,
          }}
        >
          <ThumbnailContainer style={{}} onClick={toggle}>
            <CenterHorizontal>
              <animated.img src={beer.image_url} height={300} />
              <animated.div style={{ fontSize: thumbnailSpring.nameFontSize, textAlign: "center" }}>{beer.name}</animated.div>
              <animated.div style={{ fontSize: 14, textAlign: "center" }}>({beer.tagline})</animated.div>
            </CenterHorizontal>
          </ThumbnailContainer>
          <animated.div style={{
            display: "flex",
            flexDirection: "column",
            width: "100%",
            maxWidth: 720,
            opacity: modalSpring.visible,
            padding: 10,
          }}>
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
          </animated.div>
        </ModalContentContainer>
      </StyledTransitModal>
    </RelativeContainer >
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

const StyledTransitModal = styled(TransitModal)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const RelativeContainer = styled.div`
  width: 300px;
  height: 400px;
  position: relative;
  margin: 20px;
`;

const ModalContentContainer = styled(animated.div)`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: start;
  align-items: center;
  flex-direction: column;
`;


const ThumbnailContainer = styled.div`
  background-color: rgba(255,255,255,0.7);
  border-radius: 10px;
  cursor: pointer;
  width: 300px;
  height: 400px;
  min-height: 400px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

type BeerThumbnailProps = {
  beer: Beer;
}

export default BeerThumbnail