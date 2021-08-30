import React from 'react'
import { useDispatch, useSelector } from "react-redux"
import { BeerFilter, beersSelector, beersSlice, RangeFilter, WithFilterInfo } from '../Modules/beers';
import MaterialTable, { Column } from "material-table"
import { tableColumns } from '../Modules/beers/columns';
import { swap } from '../Util/array/swap';
import AbvFilter from '../Components/specific/AbvFilter';
import { AbsoluteFill, CenterHorizontal } from '../Styled';
import styled from 'styled-components';


/** 
 * excerpted from material table install guide
 * https://material-table.com/#/docs/install
 */

import AddBox from '@material-ui/icons/AddBox';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';

import { SvgIconProps } from '@material-ui/core/SvgIcon';
import { Link, useHistory } from 'react-router-dom';
import HomeButton from '../Components/specific/HomeButton';

const tableIcons = {
  Add: React.forwardRef<SVGSVGElement, SvgIconProps>((props, ref) => <AddBox {...props} ref={ref} />),
  Check: React.forwardRef<SVGSVGElement, SvgIconProps>((props, ref) => <Check {...props} ref={ref} />),
  Clear: React.forwardRef<SVGSVGElement, SvgIconProps>((props, ref) => <Clear {...props} ref={ref} />),
  Delete: React.forwardRef<SVGSVGElement, SvgIconProps>((props, ref) => <DeleteOutline {...props} ref={ref} />),
  DetailPanel: React.forwardRef<SVGSVGElement, SvgIconProps>((props, ref) => <ChevronRight {...props} ref={ref} />),
  Edit: React.forwardRef<SVGSVGElement, SvgIconProps>((props, ref) => <Edit {...props} ref={ref} />),
  Export: React.forwardRef<SVGSVGElement, SvgIconProps>((props, ref) => <SaveAlt {...props} ref={ref} />),
  Filter: React.forwardRef<SVGSVGElement, SvgIconProps>((props, ref) => <FilterList {...props} ref={ref} />),
  FirstPage: React.forwardRef<SVGSVGElement, SvgIconProps>((props, ref) => <FirstPage {...props} ref={ref} />),
  LastPage: React.forwardRef<SVGSVGElement, SvgIconProps>((props, ref) => <LastPage {...props} ref={ref} />),
  NextPage: React.forwardRef<SVGSVGElement, SvgIconProps>((props, ref) => <ChevronRight {...props} ref={ref} />),
  PreviousPage: React.forwardRef<SVGSVGElement, SvgIconProps>((props, ref) => <ChevronLeft {...props} ref={ref} />),
  ResetSearch: React.forwardRef<SVGSVGElement, SvgIconProps>((props, ref) => <Clear {...props} ref={ref} />),
  Search: React.forwardRef<SVGSVGElement, SvgIconProps>((props, ref) => <Search {...props} ref={ref} />),
  SortArrow: React.forwardRef<SVGSVGElement, SvgIconProps>((props, ref) => <ArrowDownward {...props} ref={ref} />),
  ThirdStateCheck: React.forwardRef<SVGSVGElement, SvgIconProps>((props, ref) => <Remove {...props} ref={ref} />),
  ViewColumn: React.forwardRef<SVGSVGElement, SvgIconProps>((props, ref) => <ViewColumn {...props} ref={ref} />)
};


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
