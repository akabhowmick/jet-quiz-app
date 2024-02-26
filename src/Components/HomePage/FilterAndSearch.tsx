import { useQuizContext } from "../../providers/quiz-provider";
import { styled } from "@mui/material/styles";
import NativeSelect from "@mui/material/NativeSelect";
import SearchIcon from "@mui/icons-material/Search";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import InputBase from "@mui/material/InputBase";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({}) => ({
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "blue",
  width: "100%",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));

export const FilterAndSearch = () => {
  const { tags, handleQuizFilters, appliedFilters } = useQuizContext();
  return (
    <div className="filters">
      <div className="category-container">
        <Box sx={{ minWidth: 250 }}>
          <FormControl fullWidth>
            <InputLabel variant="standard" htmlFor="quiz-category-filter">
              Select Quiz Category
            </InputLabel>
            <NativeSelect
              onChange={(e) =>
                handleQuizFilters("filterCategoryInput", e.target.value)
              }
              value={appliedFilters.category}
              inputProps={{
                name: "category",
                id: "quiz-category-filter",
              }}
            >
              {tags.map((tag) => (
                <option key={tag} value={tag}>
                  {tag}
                </option>
              ))}
            </NativeSelect>
          </FormControl>
        </Box>
      </div>
      <div className="search-bar-container">
        <Box
          sx={{
            flexGrow: 1,
          }}
        >
          <Toolbar
            sx={{
              minWidth: 250,
              borderBottom: "1px solid",
            }}
          >
            <Search>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Search…"
                inputProps={{ "aria-label": "search" }}
                value={appliedFilters.matchingSubstring}
                onChange={(e) =>
                  handleQuizFilters("filterSearchInput", e.target.value)
                }
              />
            </Search>
          </Toolbar>
        </Box>
      </div>
    </div>
  );
};
