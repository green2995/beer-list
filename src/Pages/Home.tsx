import React from 'react'
import { useHistory } from 'react-router-dom'
import { animated, useSpring } from 'react-spring'
import styled from 'styled-components'
import TrailAppear from '../Components/specific/TrailAppear'
import { AbsoluteFill } from '../Styled'
import { Easing } from '../Util/animation/easings'
import { interpolate } from '../Util/number/interpolate'
import { waitFullLoad } from '../Util/timer/waitFullLoad'

const Home = () => {
  const history = useHistory();
  const [open, setOpen] = React.useState(false);

  const spring = useSpring({
    dig: open ? 1 : 0,
    config: {
      easing: Easing.easeInOutCubic,
    }
  });

  const [{ rotateZ, ...beerStyle }, beerApi] = useSpring(() => ({
    rotateZ: 0,
    opacity: 0,
    x: 0,
    scale: 1,
  }))

  function onClickButton() {
    history.push("/beerlist")
  }

  function pullBeer(onResolve?: () => void) {
    beerApi.start({
      opacity: 1,
      x: 30,
      rotateZ: 45,
      scale: 1.2,
      onResolve,
    })
  }

  function pushBeer() {
    beerApi.start({
      x: 0,
      rotateZ: 0,
      scale: 1,
      config: {
        tension: 2000,
      },
    })
  }

  function onAppearFinish() {
    pullBeer(pushBeer);
  }

  function onLoadImage() {
    waitFullLoad(() => {
      setOpen(true);
    }, 200)
  }

  const filter = spring.dig.to((val) => `blur(${interpolate(val, 0, 1, 0, 20)}px)`)
  const y = spring.dig.to((val) => interpolate(val, 0, 1, 0, 300));

  const beer_rotateZ = rotateZ.to((v) => `${v}deg`)

  return (
    <Container>
      <BackgroundImage
        src={"https://bit.ly/3sSj7z4"}
        style={{ filter, y }}
      />
      <TitleContainer>
        <TitleAligner>
          <TrailAppear
            config={{ friction: 10 }}
            onFinish={onAppearFinish}
            style={{ alignItems: "center", display: "flex", flexDirection: "column" }}
            lineHeight={[120, 130, 100, 80, 80]}
            visible={open}>
            <TitleText style={{ fontSize: 95 }}>시~워언한</TitleText>
            <TitleText style={{ fontSize: 100 }}>맥주 한 잔</TitleText>
            <TitleText style={{ fontSize: 80 }}>맥주 한 잔</TitleText>
            <TitleText style={{ fontSize: 60 }}>맥주 한 잔</TitleText>
            <BeerlistButton onClick={onClickButton}>
              <TitleText style={{ fontSize: 20 }}>맥주 한 잔!</TitleText>
              <animated.img
                onLoad={onLoadImage}
                style={{ ...beerStyle, rotateZ: beer_rotateZ, marginLeft: 5 }}
                src={"https://bit.ly/3DqC9la"}
                width={"20px"}
              />
            </BeerlistButton>
          </TrailAppear>
        </TitleAligner>
      </TitleContainer>
    </Container>
  )
}

const TitleContainer = styled(AbsoluteFill)`
  padding-top: 20vh;
`;

const Container = styled.div`
  position: relative;
  background-color: black;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
`;

const BackgroundImage = styled(animated.img)`
  position: absolute;
  width: 100vw;
  height: 100vh;
  object-fit: cover;
`;

const TitleAligner = styled.div`
  display: flex;
  justify-content: center;
  user-select: none;
`;

const TitleText = styled(animated.div)`
  color: white;
  font-size: 100px;
  font-weight: bold;
`;

const BeerlistButton = styled.div`
  background-color: blue;
  border-radius: 20px;
  padding: 10px;
  padding-left: 20px;
  padding-right: 20px;
  margin: 10px;
  display: flex;
  align-items: center;
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

export default Home
