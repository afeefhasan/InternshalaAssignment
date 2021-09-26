import React from 'react';
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';
import { styled } from '@mui/material/styles';
const LightTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} classes={{ popper: className }} arrow/>
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: theme.palette.common.white,
    color: 'rgba(0, 0, 0, 0.87)',
    boxShadow: theme.shadows[1],
    fontSize: theme.typography.pxToRem(12),
    border: '1px solid #dadde9',
  },
}));
function Card(props) {
    return (
                <div className="  mx-auto bg-white rounded-xl shadow-md transition duration-500 ease-in-out  hover:shadow-lg hover:bg-gray-100 transform hover:-translate-y-1 hover:scale-110 ..." style={{width:"350px"}}>
                    <div className="grid grid-cols-2 gap-3">
                    <img class="order-first   block  object-cover h-20 rounded-md" src={props.flag} alt="Woman's Face"></img>
                    <div className="">
                      <Tooltip title="Country Name" placement="top" arrow>
                      <h3 className="text-2xl font-bold">{props.name}</h3>
                      </Tooltip>
                     
                      <div className="flex flex-row gap-2">
                      <Tooltip title="Region" arrow>
                      <p className="font-light"> {props.region}</p>
                      </Tooltip>
                      <Tooltip title="Subregion" arrow>
                      <p className="font-light">{props.subregion}</p>
                      </Tooltip>
                      
                      </div>
                    </div>
                    </div>
                    <div className="my-3 mx-4 py-2">
                      <Tooltip title="Capital" placement="left" arrow>
                      <p className="py-2">{props.capital}</p>
                      </Tooltip>
                      <Tooltip title="Languages Spoken" placement="left" arrow>
                      <p className="py-2 ">{props.languages}</p>
                      </Tooltip>
                      
                      <LightTooltip title={`Borders:${props.borders}`}>
                      <p className="text-left py-2 overflow-hidden">
                        {props.borders}
                      </p>
                      </LightTooltip>
                      
                    </div>
                </div>
    )
  }
  
  const Cardlist = ({ Rowlists,allname }) => {
  return (
    Rowlists?.map((user,i) => {
                return (
                <div className="">
                    <Card key={i} sno={i} name={Rowlists[i].name} capital={Rowlists[i].capital} flag={Rowlists[i].flag} 
                    borders={Rowlists[i].borders} languages={Rowlists[i].languages} region={Rowlists[i].region}
                    subregion={Rowlists[i].subregion} allname={allname}
                    ></Card>
                    </div>
                );
                })
  )}

  export default Cardlist;