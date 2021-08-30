import React from "react";
import { Column } from "material-table"
import { Beer } from "../../Interface/beer"
import BeerThumbnail from "../../Components/specific/BeerThumbnail";
import { CenterAll } from "../../Styled";

export const tableColumns = [
  {
    field: "name",
    title: "제품명",
    headerStyle: { padding: 0, textAlign: "center", maxWidth: 340 },
    cellStyle: { padding: 0, maxWidth: 340 },
    width: 340,
    render: (beer) => (
      <CenterAll>
        <BeerThumbnail beer={beer} />
      </CenterAll>
    ),
  },
  {
    field: "abv",
    title: "도수(%)",
    headerStyle: { padding: 0, minWidth: 100, textAlign: "center", paddingLeft: 20 },
    cellStyle: { padding: 0, textAlign: "center" },
  },
  {
    field: "ph",
    title: "산도(ph)",
    emptyValue: "-",
    headerStyle: { padding: 0, minWidth: 100, textAlign: "center", paddingLeft: 20 },
    cellStyle: { padding: 0, textAlign: "center" },
  },
  {
    field: "attenuation_level",
    title: "발효도(%)",
    headerStyle: { padding: 0, minWidth: 100, textAlign: "center", paddingLeft: 20 },
    cellStyle: { padding: 0, textAlign: "center" },
  },
  {
    field: "srm",
    title: "색상(srm)",
    emptyValue: "-",
    headerStyle: { padding: 0, minWidth: 100, textAlign: "center", paddingLeft: 20 },
    cellStyle: { padding: 0, textAlign: "center" },
  },
  {
    field: "description",
    title: "맥주 정보",
    headerStyle: { minWidth: 200, maxWidth: 300 },
    cellStyle: { maxWidth: 300 },
    sorting: false,
  },
  {
    field: "food_pairing",
    title: "잘 어울리는 음식",
    headerStyle: { minWidth: 200, maxWidth: 300 },
    cellStyle: { maxWidth: 300 },
    render: (beer) => {
      return (
        <div>
          {beer.food_pairing.join(", ")}
        </div>
      )
    },
    sorting: false,
  },
] as (Column<Beer> & { field: keyof Beer })[]
