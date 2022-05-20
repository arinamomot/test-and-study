export {};
// import { observer } from "mobx-react-lite";
// import { useEffect, useState } from "react";
// import { InputAdornment, List, TextField } from "@mui/material";
// import Box from "@mui/material/Box";
// import SearchIcon from "@material-ui/icons/Search";
// import MenuItem from "@mui/material/MenuItem";
// import IconButton from "@mui/material/IconButton";
// import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
// import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
//
// interface SearchCompProps {
//   onFilter: Function;
//   onDirection: Function;
//   filters: { value: string; label: string }[];
// }
//
// const SearchComp = ({ onFilter, onDirection, filters }: SearchCompProps) => {
//   const [search, setSearch] = useState("");
//
//   const [filter, setFilter] = useState<string>("date");
//
//   useEffect(() => {
//     onFilter(filter);
//   }, [filter]);
//
//   return (
//     <>
//         <Box display="flex" sx={{width: "50%", m: 6, mb:0, flexDirection: "row",  justifyContent: "space-between", alignItems: "stretch"}}>
//       <Box width="50%" >
//         <Box>
//           <TextField
//             id="search"
//             placeholder="Search"
//             InputProps={{
//               startAdornment: (
//                 <InputAdornment position="start">
//                   <SearchIcon />
//                 </InputAdornment>
//               ),
//             }}
//             variant="outlined"
//             fullWidth
//           />
//         </Box>
//         <List />
//       </Box>
//       <Box width="30%">
//         <TextField
//           fullWidth
//           id="outlined-select"
//           select
//           label="Filter"
//           value={filter}
//           onChange={(e) => setFilter(e.target.value)}
//         >
//           {filters.map((option) => (
//             <MenuItem key={option.value} value={option.value}>
//               {option.label}
//             </MenuItem>
//           ))}
//         </TextField>
//       </Box>
//             <Box>
//             <IconButton
//                 // onClick={onDirection}
//             >
//                 <ArrowUpwardIcon />
//             </IconButton>
//             <IconButton>
//                 <ArrowDownwardIcon />
//             </IconButton>
//             </Box>
//         </Box>
//     </>
//   );
// };
//
// export default observer(SearchComp);
