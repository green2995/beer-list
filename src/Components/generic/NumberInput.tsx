import React from 'react'
import styled from 'styled-components';
import { useCurrent } from '../../Hooks/useCurrent';

const NumberInput = React.forwardRef<NumberInput, NumberInputProps>((
  props,
  ref
) => {
  const { step = 1 } = props;
  const inputRef = React.useRef<HTMLInputElement>(null);
  const refState = useCurrent({
    min: props.min === undefined ? -Infinity : props.min,
    max: props.max === undefined ? Infinity : props.max,
    value: props.value || 0,
  });

  // for fixing floating point precision error
  const accuracy = Math.abs(Math.min(Math.log10(step), 0));


  /** methods */

  function setValue(value: number) {
    if (!inputRef.current) return;
    const fixed = value.toFixed(accuracy);
    const accurate = Number(fixed);

    inputRef.current.value = fixed;
    refState.value = Number(accurate);

    props.onChange?.call(null, Number(accurate));
  }

  function setMin(min: number) {
    if (!inputRef.current) return;
    refState.min = min;
  }

  function setMax(max: number) {
    if (!inputRef.current) return;
    refState.max = max;
  }

  function getValue() {
    return refState.value;
  }


  /** input event handlers */

  function onChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (Number(e.target.value) === NaN) return;
    const num = Number(e.target.value);
    setValue(num)
  }

  function onKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    const multiplier = e.shiftKey ? 10 : 1;

    if (e.key === "ArrowDown") {
      setValue(Math.max(refState.value - step * multiplier, refState.min));
    } else if (e.key === "ArrowUp") {
      setValue(Math.min(refState.value + step * multiplier, refState.max));
    }
  }

  React.useEffect(() => {
    if (props.value !== undefined) {
      setValue(props.value);
    }

  }, [props.value])

  React.useImperativeHandle(ref, () => {
    return {
      setMax,
      setMin,
      setValue,
      getValue,
    }
  })

  return (
    <Container style={props.style}>
      <Input
        ref={inputRef}
        onChange={onChange}
        onKeyDown={onKeyDown}
      />
      {props.unit && (
        <div style={props.unitStyle}>{props.unit}</div>
      )}
    </Container>
  )
})

const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  border: 1px solid grey;
`;

const Input = styled.input`
  width: 100%;
  height: 100%;
  text-align: right;
  border: none;
  &:focus {
    outline: none;
    box-shadow: 0px 0px 2px grey;
  }

  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  /* Firefox */
  &[type=number] {
    -moz-appearance: textfield;
  }
`;


export type NumberInputProps = {
  unit?: string
  value?: number
  min?: number
  max?: number
  step?: number
  onChange?: (value: number) => void
  style?: React.CSSProperties
  unitStyle?: React.CSSProperties
}

type NumberInput = {
  setMax: (max: number) => void;
  setMin: (min: number) => void;
  setValue: (value: number) => void;
  getValue: () => number
}

export default NumberInput
