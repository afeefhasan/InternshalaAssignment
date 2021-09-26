
import  {Component,React}  from 'react';
import GridViewIcon from '@mui/icons-material/GridView';
import TableViewIcon from '@mui/icons-material/TableView';
import Cardlist from './gridview';
import { Tooltip } from '@mui/material';
function Rows(props) {
  return (
              <>
              <tr className="py-4 overflow-y-hidden sm:mx-5 sm:px-5  px-5  h-20 transition duration-500 ease-in-out  hover:shadow-lg hover:bg-gray-100 transform hover:-translate-y-1 hover:scale-110 ...">
                          <td className="text-center z-0"><img src={props.flag} alt="flag" className="rounded-full h-10 w-10 flex items-center z-0 justify-center..."/></td>
                          <td className="text-center ">{props.name}</td>
                          <td className="text-center">{props.capital}</td>
                          <td className="text-center ">{props.region}</td>
                          <td className="text-center">{props.subregion}</td>
                          <td className="text-center ">{props.languages}</td>
                          <td className="text-center "><p className="overflow-x-hidden">{props.borders}</p></td>
              </tr>
                  </>
  )
}

const Rowlist = ({ Rowlists,allname }) => {
return (
  Rowlists?.map((user,i) => {
              return (<>
                  <Rows key={i} sno={i} name={Rowlists[i].name} capital={Rowlists[i].capital} flag={Rowlists[i].flag} 
                  borders={Rowlists[i].borders} languages={Rowlists[i].languages} region={Rowlists[i].region}
                  subregion={Rowlists[i].subregion} allname={allname}
                  ></Rows>
                  </>
              );
              })
)}

class App extends Component{
  constructor(props){
    super(props);
    this.state={
      region:[],
      gridView:JSON.parse(localStorage.getItem('gridview'))||"table"

    }
    this.showGrid=this.showGrid.bind(this);
    this.showTable=this.showTable.bind(this);
    this.datalist=this.datalist.bind(this);

   

  }
  refreshPage() {
    window.location.reload(false);
  }
  showGrid(){
    this.setState({gridView:'grid'})
    localStorage.setItem('gridview',JSON.stringify("grid"))
  }
  showTable(){
    this.setState({gridView:'table'})
    localStorage.setItem('gridview',JSON.stringify("table"))
  }
  datalist(){
    let lang='';
    let bord='';
    let cap='';
    let arr=[];
    fetch('https://restcountries.com/v3/region/asia?fields=name,capital,languages,borders,flags,region,subregion',
    {
      method:'get'
    })
    .then(res => res.json())
    .then(data =>{
      data.forEach(child => {
         cap='';
         lang='';
         bord='';
        const keyc = Object.keys(child.capital);
        const lc = keyc.map(key => child.capital[key]);
        
        lc.forEach(ele => {
          cap+=ele+','
        });
        cap = cap.slice(0, cap.length -1);

        const keyb = Object.keys(child.borders);
        const lb = keyb.map(key => child.borders[key]);
        
        lb.forEach(ele => {
          bord+=ele+','
        });
        bord = bord.slice(0, bord.length -1);
        const keys = Object.keys(child.languages);
        const l = keys.map(key => child.languages[key]);
        
        l.forEach(ele => {
          lang+=ele+','
        });
        lang = lang.slice(0, lang.length -1);
        arr.push({flag: child.flags[1],
            name:child.name.common,
            capital:cap,
            borders:bord,
            languages:lang,
            region:child.region,
            subregion:child.subregion

        })
      });
      console.log(arr)
      this.setState({region:arr})
      localStorage.setItem('region',JSON.stringify(this.state.region))
    })
  }
componentDidMount(){
  this.datalist();
}
  render(){
    console.log(this.state.gridView)
    return(
      <div>
        <h1 className="text-4xl ml-4 py-5 font-normal md:font-etrabold ...">Welcome to Asia</h1>
        <div className="flex justify-end">
        <button onClick={this.refreshPage}className="text-gray-50 px-3 py-2 rounded-lg bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-opacity-50 ... ">Refresh Data</button>
        </div>
        {
          this.state.gridView==="table" ?
          <div>
            <div className="flex justify-end">
              <Tooltip title="gridview" arrow>
              <button onClick={this.showGrid}>
              <GridViewIcon />
              </button>
              </Tooltip>
              
            
            </div>
          <br />
          <div className=" mx-auto mt-5 sm:mx-5 sm:px-5 ...  overflow-x-auto ">
          <table className="table-auto mx-auto mt-5 sm:mx-5 ">
          <thead className="my-10 z-1 bg-gray-50 h-20 shadow-lg sm:mx-5 sm:px-5 ">
            <tr className="my-10 sm:mx-5 sm:px-5">
              <th className="">Flag</th>
              <th className="">Country Name</th>
              <th className="">Capital</th>
              <th className=" ">Region</th>
              <th className="">subRegion</th>
              <th className=""> languages</th>
              <th className="w-1/6" >borders</th>
            </tr>
          </thead>
          <tbody className="my-20 sm:mx-5 sm:px-5 py-4 ...">
          <Rowlist Rowlists={JSON.parse(localStorage.getItem('region'))} allname={this.state.name}></Rowlist>
          </tbody>
        </table>
          </div>
          </div>
          :
          <div>
            <div className="flex justify-end">
              <Tooltip title="table view" arrow>
              <button className="px-3 py-2" onClick={this.showTable}>
              <TableViewIcon />
              </button>
              </Tooltip>
              
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 sm:mx-5 md:grid-cols-2 md:mx-5 lg:grid-cols-4 gap-4 py-4 lg:mx-5">
            <Cardlist  Rowlists={JSON.parse(localStorage.getItem('region'))} />
            </div>
            
          </div>
          
          
        }
       

      </div>
      
    );

  }

}
export default App;
























// import Paper from '@mui/material/Paper';
// import Table from '@mui/material/Table';
// import TableBody from '@mui/material/TableBody';
// import TableCell from '@mui/material/TableCell';
// import TableContainer from '@mui/material/TableContainer';
// import TableHead from '@mui/material/TableHead';
// import TablePagination from '@mui/material/TablePagination';
// import TableRow from '@mui/material/TableRow';

// const columns = [
//   {id:'flag',label:'Flag',minWidth:100},
//   { id: 'name', label: 'Name', minWidth: 170 },
//   { id: 'code', label: 'ISO\u00a0Code', minWidth: 100 },
//   {
//     id: 'population',
//     label: 'Population',
//     minWidth: 170,
//     align: 'right',
//     format: (value) => value.toLocaleString('en-US'),
//   },
//   {
//     id: 'size',
//     label: 'Size\u00a0(km\u00b2)',
//     minWidth: 170,
//     align: 'right',
//     format: (value) => value.toLocaleString('en-US'),
//   },
//   {
//     id: 'density',
//     label: 'Density',
//     minWidth: 170,
//     align: 'right',
//     format: (value) => value.toFixed(2),
//   },
// ];

// function createData(name, code, population, size) {
//   const density = population / size;
//   return { name, code, population, size, density };
// }

// const rows = [
//   createData('India', 'IN', 1324171354, 3287263),
//   createData('China', 'CN', 1403500365, 9596961),
//   createData('Italy', 'IT', 60483973, 301340),
//   createData('United States', 'US', 327167434, 9833520),
//   createData('Canada', 'CA', 37602103, 9984670),
//   createData('Australia', 'AU', 25475400, 7692024),
//   createData('Germany', 'DE', 83019200, 357578),
//   createData('Ireland', 'IE', 4857000, 70273),
//   createData('Mexico', 'MX', 126577691, 1972550),
//   createData('Japan', 'JP', 126317000, 377973),
//   createData('France', 'FR', 67022000, 640679),
//   createData('United Kingdom', 'GB', 67545757, 242495),
//   createData('Russia', 'RU', 146793744, 17098246),
//   createData('Nigeria', 'NG', 200962417, 923768),
//   createData('Brazil', 'BR', 210147125, 8515767),
// ];

// export default function StickyHeadTable() {
//   const [page, setPage] = React.useState(0);
//   const [rowsPerPage, setRowsPerPage] = React.useState(10);
//   const [data,setData]=React.useState([]);
//   const [row,setRows]=React.useState([]);
//   const [lang,setLang]=React.useState('');
//   React.useEffect(() => {
//     fetch('https://restcountries.com/v3/region/asia?fields=name,capital,languages,borders,flag,region,subregion',
//     {
//       method:'get'
//     })
//     .then(res => res.json())
//     .then(items =>{
//       setData(items)
//       if (data){
//         console.log(2)
//          data.forEach(item =>{
    
//         setRows(row=>[... row,createData(item.name.common,item.region,12,13)])
//         console.log(row)
//       })
//       }
//     })
//   },[]);
//   console.log(data)

//  console.log(row)
//   const handleChangePage = (event, newPage) => {
//     setPage(newPage);
//   };

//   const handleChangeRowsPerPage = (event) => {
//     setRowsPerPage(+event.target.value);
//     setPage(0);
//   };

//   return (
//     <Paper sx={{ width: '100%', overflow: 'hidden' }}>
//       <TableContainer sx={{ maxHeight: '80%' }}>
//         <Table stickyHeader aria-label="sticky table">
//           <TableHead>
//             <TableRow>
//               {columns.map((column) => (
//                 <TableCell
//                   key={column.id}
//                   align={column.align}
//                   style={{ minWidth: column.minWidth }}
//                 >
//                   {column.label}
//                 </TableCell>
//               ))}
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {rows
//               .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
//               .map((row) => {
//                 return (
//                   <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
//                     {columns.map((column) => {
//                       const value = row[column.id];
//                       return (
//                         <TableCell key={column.id} align={column.align}>
//                           {column.format && typeof value === 'number'
//                             ? column.format(value)
//                             : value}
//                         </TableCell>
//                       );
//                     })}
//                   </TableRow>
//                 );
//               })}
//           </TableBody>
//         </Table>
//       </TableContainer>
//       <TablePagination
//         rowsPerPageOptions={[10, 25, 100]}
//         component="div"
//         count={rows.length}
//         rowsPerPage={rowsPerPage}
//         page={page}
//         onPageChange={handleChangePage}
//         onRowsPerPageChange={handleChangeRowsPerPage}
//       />
//     </Paper>
//   );
// }
