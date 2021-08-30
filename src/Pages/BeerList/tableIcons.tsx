import React from 'react';

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

export default tableIcons;