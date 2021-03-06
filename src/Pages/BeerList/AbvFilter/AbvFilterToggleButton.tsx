import React from 'react'
import { animated } from 'react-spring';
import styled from 'styled-components';
import { BeerFilter, WithFilterInfo } from '../../../Modules/beers';
import ToggleButton from '../../../Components/generic/ToggleButton';
import CloseIcon from "@material-ui/icons/Close"
import ToggleView from '../../../Components/generic/ToggleView';
import { useGesture } from 'react-use-gesture';
import { useCurrent } from '../../../Hooks/useCurrent';

const TOGGLE_BUTTON_PADDING_VERTICAL = 7;

type AvFilterToggleButtonProps = {
  range: WithFilterInfo<BeerFilter["abv"]>
  onPressToggle?: (result: boolean) => void
  onPressDelete?: () => void
}

const AvFilterToggleButton = (props: AvFilterToggleButtonProps) => {
  const refState = useCurrent({ toggled: false })
  const range = props.range;
  const toggleViewRef = React.useRef<ToggleView>(null);

  function onToggle(toggled: boolean) {
    refState.toggled = toggled;
    props.onPressToggle?.call(null, toggled);
  }

  const bindContainer = useGesture({
    onMouseOver: () => {
      toggleViewRef.current?.setVisible(true);
    },
    onMouseLeave: () => {
      toggleViewRef.current?.setVisible(false);
    }
  })

  function onClickDelete() {    
    const visible = toggleViewRef.current?.getVisible()
    if (visible) {
      props.onPressDelete?.call(null);
    }
  }

  return (
    <ToggleButtonContainer {...bindContainer()}>
      <ToggleButton
        style={{
          borderRadius: 100,
          textAlign: "center",
          padding: TOGGLE_BUTTON_PADDING_VERTICAL,
          paddingLeft: TOGGLE_BUTTON_PADDING_VERTICAL * 2,
          paddingRight: TOGGLE_BUTTON_PADDING_VERTICAL * 2,
        }}
        onToggle={onToggle}
        defaultColor={"rgba(255,255,255,0.5)"}
        toggledColor={"pink"}
        toggled={props.range.enabled}
      >
        <RangeText>
          {range.from}도 - {range.to}도
        </RangeText>
      </ToggleButton>
      <DeleteButtonContainer ref={toggleViewRef}>
        <DeleteButton onClick={onClickDelete}>
          <CloseIcon style={{ fontSize: 12, color: "grey" }} />
        </DeleteButton>
      </DeleteButtonContainer>
    </ToggleButtonContainer>
  )
}

const RangeText = styled.div`
  font-size: 13px;
`;


const ToggleButtonContainer = styled.div`
  position: relative;
  margin: 5px;
`;

const DeleteButtonContainer = styled(ToggleView)`
  position: absolute;
  top: 0px;
  right: 0px;
  transform: translateX(5px) translateY(-5px);
`;

const DeleteButton = styled(animated.div)`
  width: 20px;
  height: 20px;
  justify-content: center;
  align-items: center;
  display: flex;
  background-color: white;
  border-radius: 15px;
  cursor: pointer;
  border: 1px solid lightgrey;
`;

export default AvFilterToggleButton
