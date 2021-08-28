import React from 'react'
import styled from 'styled-components';
import { useCurrent } from '../../Hooks/useCurrent';
import NumberInput, { NumberInputProps } from '../generic/NumberInput'

const RangeInput = (props: RangeInputProps) => {
  const {
    divider,
    inputStyle,
    style,
    onChange,
    ..._props
  } = props;

  const max = _props.max || Infinity, min = _props.min || -Infinity;

  const inputFromRef = React.useRef<NumberInput>(null);
  const inputToRef = React.useRef<NumberInput>(null);

  const refState = useCurrent({
    hasChangedFrom: false,
    hasChangedTo: false,
  });

  function updateMinMax(from: number, to: number) {
    if (refState.hasChangedTo) {
      inputFromRef.current?.setMax(Math.min(to, max));
    }

    if (refState.hasChangedFrom) {
      inputToRef.current?.setMin(Math.max(from, min));
    }
  }

  function onChangeAny() {
    if (!inputFromRef.current) return;
    if (!inputToRef.current) return;
    const valueFrom = inputFromRef.current.getValue();
    const valueTo = inputToRef.current.getValue();
    updateMinMax(valueFrom, valueTo);
    props.onChange?.call(null, valueFrom, valueTo);
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
        style={inputStyle}
        onChange={onChangeFrom}
        {..._props}
      />
      {divider || "~"}
      <NumberInput
        ref={inputToRef}
        style={inputStyle}
        onChange={onChangeTo}
        {..._props}
      />
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  flex-direction: row;
`;

type RangeInputProps = Omit<NumberInputProps, "onChange"> & {
  inputStyle?: React.CSSProperties
  divider?: React.ReactNode
  onChange?: (from: number, to: number) => void
}

export default RangeInput
