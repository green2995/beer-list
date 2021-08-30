import React from 'react'
import { animated, useChain, useSpring, useSpringRef } from 'react-spring';
import styled from 'styled-components';
import TransitModal from '../../Components/generic/TransitModal';
import { Beer } from '../../Interface/beer';
import { CenterHorizontal } from '../../Styled';
import BeerDescription from './BeerThumbnail/BeerDescription';

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
            <BeerDescription beer={beer} />
          </animated.div>
        </ModalContentContainer>
      </StyledTransitModal>
    </RelativeContainer >
  )
}


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