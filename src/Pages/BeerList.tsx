import React from 'react'
import {useDispatch, useSelector} from "react-redux"
import { RootState } from '..';
import { beersSlice } from '../Modules/beers';

function BeerList() {
  const beers = useSelector((state: RootState) => {
    return state.beers;
  })

  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(beersSlice.actions.load())
  }, [])

  return (
    <div>
      {beers.ids.map((id) => {
        const beer = beers.entities[id];
        if (!beer) return <></>;
        return (
          <div key={id}>
            <div>
              {beer.name}
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default BeerList
