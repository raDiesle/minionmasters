import { LineChart, Line, CartesianGrid, Tooltip, Legend, XAxis, YAxis } from "recharts";
import React from "react";

export function EloChart({propKey, header, description = "", propsData}){

  const rankKey = propKey + "Rank";
  const elo2v2Solo = propsData.find(prop => prop.propKey === propKey) || {propKey: propKey, data : []};
  const elo2v2SoloRank = propsData.find(prop => prop.propKey === rankKey)  || {propKey: rankKey, data : []};
  const elo2v2SoloMergedData = elo2v2Solo.data.map((single, pos) => ({
    valueA: single.value,
    date: single.date,
    valueB: elo2v2SoloRank.data[pos].value
  }));


  return <div>
    <h3>{header}</h3>
    <div>
      {description}
    </div>
  <LineChart width={350} height={200} data={elo2v2SoloMergedData}>
    <Line yAxisId="left" type="monotone" name="Elo-Score" dataKey="valueA" stroke="#8884d8" activeDot={{ r: 8 }} />
    <Line yAxisId="right" type="monotone" name="Elo-Ranking" dataKey="valueB" stroke="#82ca9d"/>
    <CartesianGrid stroke="#ccc" strokeDasharray="3 3" />
    <Tooltip content={({ active, payload, label }) => {

    return <div style={{backgroundColor: "#444"}}>
      <div style={{padding: "5px"}}>
        <div><strong>Date: {label}</strong></div>
        {payload?.length && <><div style={{color: "#8884d8"}}>{payload?.[0].name}: {payload?.[0].value}</div>
        <div style={{color: "#82ca9d"}}>{payload?.[1].name}: {payload?.[1].value}</div>
      </>}
      </div>
    </div>
    }
    }/>
    <Legend />
    <XAxis dataKey="date" type="category" />
    <YAxis yAxisId="left" domain={["auto", "auto"]} type="number" tick={{stroke: '#8884d8', strokeWidth: 0.1}} stroke={'#8884d8'}/>
    <YAxis yAxisId="right" orientation="right" domain={["auto", "auto"]} tick={{stroke: '#82ca9d', strokeWidth: 0.1}}  stroke={'#82ca9d'} type="number" reversed={true}/>
  </LineChart>
  </div>
}