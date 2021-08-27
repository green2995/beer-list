import { Column } from "material-table"
import { Beer } from "../../Interface/beer"

export const tableColumns = [
  {
    field: "image_url",
    title: "실물 사진",
    render: (beer) => {
      return (
        <div style={{width: 100}}>
          <img src={beer.image_url} height={200} />
        </div>
      )
    },
    
  },
  { 
    field: "name",
    title: "이름",
  },
  {
    field: "abv",
    title: "도수(%)"
  },
  {
    field: "ph",
    title: "산도(ph)",
    render: (beer) => {
      return (
        <div>
          {beer.ph || "-"}
        </div>
      )
    }
  },
  {
    field: "volume",
    title: "용량(L)",
    render: (beer) => {
      return (
        <div>
          {beer.volume.value}
        </div>
      )
    },
  },
  {
    field: "attenuation_level",
    title: "발효도(%)"
  },
  {
    field: "brewers_tips",
    title: "메이커 팁"
  },
  {
    field: "ingredients",
    title: "재료 순서",
    render: (beer) => {
      return (
        <div style={{width: 200}}>
          {beer.ingredients.hops.map((h, i) => {
            return (
              <div key={i} style={{fontSize: 12}}>
                {h.name}({h.attribute}) - {h.amount.value}{h.amount.unit} ({h.add})
              </div>
            )
          })}
        </div>
      )
    }
  },
  {
    field: "food_pairing",
    title: "잘 어울리는 음식"
  },
] as (Column<Beer> & { field: keyof Beer })[]