import React from 'react'
import { useDispatch, useSelector } from "react-redux"
import { BeerFilter, beersSelector, beersSlice, RangeFilter, WithFilterInfo } from '../Modules/beers';
import MaterialTable, { Column } from "material-table"
import { tableColumns } from './BeerList/columns';
import { swap } from '../Util/array/swap';
import AbvFilter from './BeerList/AbvFilter';
import { CenterHorizontal } from '../Styled';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';
import HomeButton from './BeerList/HomeButton';
import tableIcons from './BeerList/tableIcons';

function BeerList() {
  const history = useHistory();
  const { isLoading, columnIndice } = useSelector(beersSelector.raw)
  const abvFilters = useSelector(beersSelector.abvFilters);
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

  function onPressDelete(data: WithFilterInfo<BeerFilter["abv"]>) {
    dispatch(beersSlice.actions.removeFilter(data.id))
  }

  function onPressToggle(data: WithFilterInfo<BeerFilter["abv"]>) {
    dispatch(beersSlice.actions.toggleFilter(data.id))
  }

  function onPressAdd(from: number, to: number) {
    dispatch(beersSlice.actions.addFilter({
      abv: { from, to }
    }))
  }

  function onPressHome() {
    history.push("/home")
  }

  return (
    <>
      <div style={{ position: "fixed", backgroundColor: "black", zIndex: -1, top: 0, left: 0, right: 0, bottom: 0 }}>
        <BackgroundImage src={"https://i.ibb.co/gwnH8QP/image.jpg"} />
      </div>
      <CenterHorizontal style={{ minWidth: 1200, margin: 20 }}>
        <HomeButton onClick={onPressHome} />
        <ContentContainer style={{ minWidth: 1200 }}>
          <FilterContainer>
            <AbvFilter
              data={abvFilters}
              onPressDelete={onPressDelete}
              onPressToggle={onPressToggle}
              onPressAdd={onPressAdd}
            />
          </FilterContainer>
          <MaterialTable
            icons={tableIcons}
            title={(<TableTitle>맥주 리스트</TableTitle>)}
            isLoading={isLoading}
            onColumnDragged={onColumnDragged}
            columns={columnIndice.map((i) => tableColumns[i])}
            data={beers}
            options={{
              headerStyle: { backgroundColor: "rgba(255,255,255,0.5)" },
              fixedColumns: { left: 0 }
            }}
            style={{ minWidth: 1200, backgroundColor: "rgba(255,255,255,0.5)" }}
          />
        </ContentContainer>
      </CenterHorizontal>
    </>
  )
}

const ContentContainer = styled.div`
  width: 1000px;
  margin-top: 20px;
  margin-bottom: 100px;
`;


const BackgroundImage = styled.img`
  position: absolute;
  width: 100vw;
  height: 100vh;
  object-fit: cover;
  transform: translateY(300px);
  opacity: 0.5;
`;

const TableTitle = styled.div`
  color: white;
`;

const FilterContainer = styled.div`
  padding: 20px;
  margin-bottom: 20px;
  border-radius: 3px;
  background-color: rgba(255,255,255,0.5);
`;

export default BeerList
