import React from 'react'
import { useDispatch, useSelector } from "react-redux"
import { beersSelector, beersSlice } from '../Modules/beers';
import MaterialTable, { Column } from "material-table"
import { tableColumns } from '../Modules/beers/columns';

function BeerList() {
  const beers = useSelector(beersSelector.arr);
  const columnIndice = useSelector(beersSelector.columnIndice);
  const dispatch = useDispatch();

  console.log(columnIndice);
  React.useEffect(() => {
    dispatch(beersSlice.actions.load())
  }, [])

  return (
    <div>
      <MaterialTable
        title={"한 번 먹으면 두 번 먹고 싶은 수제맥주"}
        onColumnDragged={(src, dest) => {
          console.log(src, dest)
          dispatch(beersSlice.actions.swapColumn({
            src,
            dest
          }))
        }}
        columns={columnIndice.map((i) => tableColumns[i])}
        data={beers}
      />
    </div>
  )
}

export default BeerList
