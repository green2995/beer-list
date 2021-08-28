import React from 'react'
import { useDispatch, useSelector } from "react-redux"
import { beersSelector, beersSlice } from '../Modules/beers';
import MaterialTable, { Column } from "material-table"
import { tableColumns } from '../Modules/beers/columns';
import { swap } from '../Util/array/swap';
import { RootState } from '..';

function BeerList() {
  const {isLoading, columnIndice} = useSelector((state: RootState) => state.beers)
  const beers = useSelector(beersSelector.arr);
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
      <MaterialTable
        title={"한 번 먹으면 두 번 먹고 싶은 수제맥주"}
        isLoading={isLoading}
        onColumnDragged={onColumnDragged}
        columns={columnIndice.map((i) => tableColumns[i])}
        data={beers}
        options={{
          
        }}
      />
    </div>
  )
}

export default BeerList
