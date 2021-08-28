import React from 'react'
import { useDispatch, useSelector } from "react-redux"
import { beersSelector, beersSlice } from '../Modules/beers';
import MaterialTable, { Column } from "material-table"
import { tableColumns } from '../Modules/beers/columns';
import { swap } from '../Util/array/swap';
import AbvFilter from '../Components/specific/AbvFilter';

function BeerList() {
  const { isLoading, columnIndice } = useSelector(beersSelector.raw)
  const avFilters = useSelector(beersSelector.abvFilters);
  const beers = useSelector(beersSelector.filteredArr);
  const dispatch = useDispatch();
  const columnIndice_Temp = React.useRef(columnIndice);

  React.useEffect(() => {
    if (beers.length === 0) {
      dispatch(beersSlice.actions.load());
    }

    return () => {
      dispatch(beersSlice.actions.setColumnIndice(columnIndice_Temp.current));
    }
  }, [])

  function onColumnDragged(src: number, dest: number) {
    columnIndice_Temp.current = swap(columnIndice_Temp.current, src, dest);
  }

  return (
    <div>
      <div style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
        <div>
          도수
        </div>
        <AbvFilter
          data={avFilters}
          onPressDelete={(data) => {
            dispatch(beersSlice.actions.removeFilter(data.id))
          }}
          onPressToggle={(data) => {
            dispatch(beersSlice.actions.toggleFilter(data.id))
          }}
          onPressEnter={(from, to) => {
            dispatch(beersSlice.actions.addFilter({
              abv: {from, to}
            }))
          }}
        />
      </div>
      <MaterialTable
        title={"한 번 먹으면 두 번 먹고 싶은 수제맥주"}
        isLoading={isLoading}
        onColumnDragged={onColumnDragged}
        columns={columnIndice.map((i) => tableColumns[i])}
        data={beers}
      />
    </div>
  )
}

export default BeerList
