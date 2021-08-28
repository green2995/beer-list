import { useCurrent } from '../../../Hooks/useCurrent'
import RangeInput from '../../derivative/RangeInput'

type AbvFilterRangeInputProps = {
  onPressEnter?: (from: number, to: number) => void
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

  function onPressEnter() {
    const sorted = [refState.from, refState.to].sort();
    props.onPressEnter?.call(null, sorted[0], sorted[1]);
  }

  return (
    <div style={{ display: "flex", flexDirection: "row", alignItems: "center", marginLeft: 10 }}>
      <div>직접입력</div>
      <div style={{ width: 5 }}></div>
      <RangeInput
        min={ABV_FILTER_MIN}
        max={ABV_FILTER_MAX}
        step={0.1}
        unit={"도"}
        onChange={onChange}
        inputStyle={{ width: 100, padding: 5 }}
        unitStyle={{ fontSize: 12 }}
        divider={<div style={{ marginLeft: 5, marginRight: 5 }}>~</div>}
      />
      <button onClick={onPressEnter} style={{ marginLeft: 10 }}>
        입력
      </button>
    </div>
  )
}

export default AbvFilterRangeInput
