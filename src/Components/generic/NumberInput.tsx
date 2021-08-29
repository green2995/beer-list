import React from 'react'
import styled from 'styled-components';
import { useCurrent } from '../../Hooks/useCurrent';
import { clamp } from '../../Util/number/interpolate';

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

  // for imperative use case: shift + arrow up/down
  function setValue(value: number) {
    if (!inputRef.current) return;

    const clamped = clamp(value, refState.min, refState.max);
    const fixed = clamped.toFixed(accuracy);
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
    if (Number(e.target.value) === NaN) {
    } else {
      const num = Number(e.target.value);

      if (num < refState.min) setValue(num);
      if (num > refState.max) setValue(num);

      const clamped = clamp(num, refState.min, refState.max)
      refState.value = clamped;
      props.onChange?.call(null, clamped);
    }
  }

  function onKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.shiftKey) {
      e.preventDefault();
      if (e.key === "ArrowDown") {
        setValue(refState.value - step * 10);
      } else if (e.key === "ArrowUp") {
        setValue(refState.value + step * 10);
      }
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
        min={props.min}
        max={props.max}
        style={props.inputStyle}
        step={step}
        type={"number"}
      />
      {props.unit && (
        <UnitText style={props.unitStyle}>{props.unit}</UnitText>
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

  /* Chrome, Safari, Edge, Opera */
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

const UnitText = styled.div`
  margin-left: 3px;
`;


export type NumberInputProps = {
  unit?: string
  value?: number
  min?: number
  max?: number
  step?: number
  onChange?: (value: number) => void
  style?: React.CSSProperties
  inputStyle?: React.CSSProperties
  unitStyle?: React.CSSProperties
}

type NumberInput = {
  getValue: () => number
}

export default NumberInput
