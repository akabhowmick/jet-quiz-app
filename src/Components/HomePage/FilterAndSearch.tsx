import TextField from "@mui/material/TextField";
import NativeSelect from "@mui/material/NativeSelect";
import { useQuizContext } from "../../providers/quiz-provider";

export const FilterAndSearch = () => {
  const { tags, handleQuizFilters, appliedFilters } = useQuizContext();
  return (
    <div className="filters">
      <div className="search-bar-container">
        <label htmlFor="search-bar">Search for a quiz: </label>
        <TextField
          value={appliedFilters.matchingSubstring}
          id="search-bar"
          onChange={(e) =>
            handleQuizFilters("filterSearchInput", e.target.value)
          }
          variant="standard"
        />
      </div>
      <div className="category-container">
        <label htmlFor="quiz-category-filter">Select Quiz Category: </label>
        <NativeSelect
          onChange={(e) =>
            handleQuizFilters("filterCategoryInput", e.target.value)
          }
          value={appliedFilters.category}
          defaultValue={tags[0]}
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
      </div>
    </div>
  );
};
