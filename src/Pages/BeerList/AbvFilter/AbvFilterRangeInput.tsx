import styled from 'styled-components';
import { useCurrent } from '../../../Hooks/useCurrent'
import RangeInput from '../../../Components/derivative/RangeInput'

type AbvFilterRangeInputProps = {
  onPressAdd?: (from: number, to: number) => void
}

const ABV_FILTER_MIN = 0;
const ABV_FILTER_MAX = 55;

const AbvFilterRangeInput = (props: AbvFilterRangeInputProps) => {
  const refState = useCurrent({
    from: 0,
    to: 0,
  })

  function onChange(from: number | undefined, to: number | undefined) {
    if (from !== undefined) refState.from = from;
    if (to !== undefined) refState.to = to;
  }

  function onPressAdd() {
    const [from, to] = [refState.from, refState.to].sort();
    props.onPressAdd?.call(null, from, to);
  }

  return (
    <Container>
      <RangeInputTitle>직접입력</RangeInputTitle>
      <div style={{ width: 5 }}></div>
      <RangeInput
        min={ABV_FILTER_MIN}
        max={ABV_FILTER_MAX}
        step={0.1}
        unit={"도"}
        onChange={onChange}
        inputStyle={{ width: 100, padding: 5, backgroundColor: "rgba(255,255,255,0.5)" }}
        unitStyle={{ fontSize: 12 }}
        divider={<div style={{ marginLeft: 5, marginRight: 5 }}>~</div>}
      />
      <AddButton onClick={onPressAdd}>
        입력
      </AddButton>
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-left: 10px;
`;

const RangeInputTitle = styled.div`
  padding: 5px;
  font-size: 12px;
`;

const AddButton = styled.button`
  margin-left: 10px;
  font-size: 12px;
  outline: none;
  border: none;
  padding: 5px;
  padding-left: 10px;
  padding-right: 10px;
  cursor: pointer;
  background-color: rgba(255,255,255,0.5);
  border-radius: 5px;
  &:hover {
    background-color: white;
  }
  &:active {
    background-color: rgba(255,255,255,0.5);
  }
`;


export default AbvFilterRangeInput
