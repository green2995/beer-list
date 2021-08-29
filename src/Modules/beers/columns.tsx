import { Column } from "material-table"
import { Beer } from "../../Interface/beer"

export const tableColumns = [
  {
    field: "name",
    title: "제품명",
    headerStyle: { padding: 0, textAlign: "center", maxWidth: 300 },
    cellStyle: { padding: 20, maxWidth: 300 },
    width: 300,
    render: (beer) => {
      return (
        <div style={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          backgroundColor: "rgba(255,255,255,0.7)",
          padding: 20,
          borderRadius: 10,
        }}>
          <div>
            <img src={beer.image_url} height={300} />
          </div>
          <div style={{ fontSize: 20, marginTop: 10, textAlign: "center" }}>{beer.name}</div>
          <div style={{ fontSize: 14, textAlign: "center" }}>({beer.tagline})</div>
        </div>
      )
    },
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
    sorting: false,
  },
] as (Column<Beer> & { field: keyof Beer })[]
