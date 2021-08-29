import React from 'react'
import styled from 'styled-components';
import { useCurrent } from '../../Hooks/useCurrent';
import NumberInput, { NumberInputProps } from '../generic/NumberInput'

const RangeInput = (props: RangeInputProps) => {
  const {
    divider,
    style,
    onChange,
    ..._props
  } = props;

  const inputFromRef = React.useRef<NumberInput>(null);
  const inputToRef = React.useRef<NumberInput>(null);

  const refState = useCurrent({
    hasChangedFrom: false,
    hasChangedTo: false,
  });

  function onChangeAny() {
    if (!inputFromRef.current) return;
    if (!inputToRef.current) return;
    
    const valueFrom = inputFromRef.current.getValue();
    const valueTo = inputToRef.current.getValue();
    
    props.onChange?.call(
      null,
      refState.hasChangedFrom ? valueFrom : undefined,
      refState.hasChangedTo ? valueTo : undefined
    );
  }

  function onChangeFrom() {
    refState.hasChangedFrom = true;
    onChangeAny();
  }

  function onChangeTo() {
    refState.hasChangedTo = true;
    onChangeAny();
  }

  return (
    <Container style={style}>
      <NumberInput
        ref={inputFromRef}
        onChange={onChangeFrom}
        {..._props}
      />
      {divider || "~"}
      <NumberInput
        ref={inputToRef}
        onChange={onChangeTo}
        {..._props}
      />
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

type RangeInputProps = Omit<NumberInputProps, "onChange"> & {
  inputStyle?: React.CSSProperties
  divider?: React.ReactNode
  onChange?: (from: number | undefined, to: number | undefined) => void
}

export default RangeInput
