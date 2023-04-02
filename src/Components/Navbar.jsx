import {
  AirplaneTicket,
  LocalMovies,
  MenuBook,
  SportsEsports,
  MoreVert,
} from "@mui/icons-material";
import SearchIcon from "@mui/icons-material/Search";
import { toast } from "react-hot-toast";
import {
  AppBar,
  Box,
  Button,
  Grid,
  IconButton,
  InputBase,
  List,
  ListItem,
  ListItemButton,
  MenuItem,
  Paper,
  Select,
  Toolbar,
  Typography,
  alpha,
  styled,
} from "@mui/material";
import { Stack } from "@mui/system";
import React, { useEffect, useReducer, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuthContext } from "../context/authContext";
import { useListContext } from "../context/ListContext";
import { RotatingLines } from "react-loader-spinner";
import NavDrawer from "./NavDrawer";
import HorizontalCard from "./HorizontalCard";
import { useRef } from "react";
const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));
const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));
const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));
const Navbar = () => {
  const { user } = useAuthContext();
  const {
    list,
    setList,
    reducer,
    searchList,
    loading,
    setLoading,
    search,
    setSearch,
    setSearchList,
  } = useListContext();
  const [drawer, setDrawer] = useState(false);
  const [cat, setCat] = React.useState("Books");
  const location = useLocation();
  //   const navigate = useNavigate();
  const searchRef = useRef();
  const handleChange = (event) => {
    setCat(event.target.value);
    setSearch("");
  };
  const callAddToList = (listItem) => {
    if (list.some((e) => e.id === listItem.id)) {
      toast.success("already on the list");
    } else {
      setList((p) => [listItem, ...p]);
    }
    setSearch("");
  };
  const [searchResults, dispatch] = useReducer(reducer, []);
  useEffect(() => {
    if (!search) {
      setSearchList();
    }

    const getData = setTimeout(async () => {
      setLoading(false);
      if (search && search !== "") {
        setLoading(true);
        dispatch({ type: cat });
      }
    }, 2000);
    return () => clearTimeout(getData);
  }, [search]);
  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setSearchList();
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [searchRef]);
  if (location.pathname !== "/") {
    return <></>;
  }
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography
            variant="h6"
            sx={{ display: { xs: "none", sm: "block" } }}
          >
            BUCKET
          </Typography>
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="search..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </Search>
          <Select
            id="demo-simple-select-standard"
            value={cat}
            onChange={handleChange}
            label="Category"
            sx={{
              ml: 1,
              color: "inherit",
            }}
          >
            <MenuItem value="Books">
              <MenuBook />
            </MenuItem>
            <MenuItem value="Travel">
              <AirplaneTicket />
            </MenuItem>
            <MenuItem value="Games">
              <SportsEsports />
            </MenuItem>
            <MenuItem value="Movies">
              <LocalMovies />
            </MenuItem>
          </Select>
          {loading ? (
            <Paper
              sx={{
                zIndex: "999",
                top: "70px",
                left: { xs: "18px", md: "35px" },
                position: "absolute",
                width: "320px",
                overflowY: "scroll",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Stack>
                <RotatingLines
                  strokeColor="grey"
                  strokeWidth="5"
                  animationDuration="0.75"
                  width="96"
                  visible={true}
                />
              </Stack>
            </Paper>
          ) : (
            <Paper
              ref={searchRef}
              sx={{
                zIndex: "999",
                top: "70px",
                left: { xs: "18px", md: "35px" },
                position: "absolute",
                maxWidth: "350px",
                overflowY: "scroll",
                height: { xs: "45vh", md: "60vh" },
                visibility: searchList ? "visible" : "hidden",
              }}
            >
              <Stack>
                <List>
                  {searchList?.map((r, i) => {
                    return (
                      <ListItem key={i}>
                        <ListItemButton
                          onClick={() => callAddToList(searchList[i])}
                        >
                          <HorizontalCard item={r} />
                        </ListItemButton>
                      </ListItem>
                    );
                  })}
                </List>
              </Stack>
            </Paper>
          )}

          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: "none", md: "flex" } }}>
            {user ? (
              <Button sx={{ color: "inherit" }} onClick={() => setDrawer(true)}>
                {user?.displayName}
              </Button>
            ) : (
              <></>
            )}
          </Box>
          <Box sx={{ display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="show more"
              aria-haspopup="true"
              onClick={() => setDrawer(true)}
              color="inherit"
            >
              <MoreVert />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      <NavDrawer drawer={drawer} setDrawer={setDrawer} />
    </Box>
  );
};

export default Navbar;
