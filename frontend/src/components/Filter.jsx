import React, { useState, useEffect } from 'react';
import { FiSearch, FiRefreshCcw } from "react-icons/fi";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import Box from "@mui/material/Box";
import Tooltip from "@mui/material/Tooltip";
import { FaSortAmountDown, FaSortAmountUp } from "react-icons/fa";
import { useSearchParams, useLocation, useNavigate } from 'react-router-dom';


const Filter = () => {

    const categories = [
        { categoryId: 1, categoryName: "Electronics" },
        { categoryId: 2, categoryName: "Fashion" },
        { categoryId: 3, categoryName: "Home & Kitchen" },
        { categoryId: 4, categoryName: "Sports & Outdoors" },
        { categoryId: 5, categoryName: "Books" }
    ];

    const [searchParams] = useSearchParams();
    const params = new URLSearchParams(searchParams.toString());
    const pathName = useLocation().pathname;
    const navigate = useNavigate();

    const [selectedCategory, setSelectedCategory] = useState("all");
    const [sortOrder, setSortOrder] = useState("asc");
    const [searchTerm, setSearchTerm] = useState("");


    useEffect(() => {
        const currentCategory = searchParams.get("category") || "all";
        const sortOrder = searchParams.get("sortOrder") || "asc";
        const currentSearchTerm = searchParams.get("keyword") || "";

        setSelectedCategory(currentCategory);
        setSortOrder(sortOrder);
        setSearchTerm(currentSearchTerm);
    }, [searchParams]);

    useEffect(() => {
        const handler = setTimeout(() => {
            if (searchTerm) {
                params.set("keyword", searchTerm);
            } else {
                params.delete("keyword");
            }
            navigate(`${pathName}?${params.toString()}`);
        }, 700);
        return () => clearTimeout(handler);
    }, [searchParams, searchTerm, pathName, navigate]);

    const handleCategoryChange = (event) => {
        const selectedCategory = event.target.value;
        if(selectedCategory === "all"){
            params.delete("category");
        }
        else{
            params.set("category", selectedCategory)
        }
        navigate(`${pathName}?${params.toString()}`);
        setSelectedCategory(selectedCategory);
    };

    const toggleSortOrder = () => {
        setSortOrder((prevOrder) => {
            const newOrder = (prevOrder === "asc" ? "desc" : "asc");
            params.set("sortby", newOrder);
            navigate(`${pathName}?${params.toString()}`);
            return newOrder;
        });
    };

    const handleClearFilters = () => {
        navigate({pathname: window.location.pathname});
        setSelectedCategory("all");
        setSortOrder("asc");
        setSearchTerm("");
    }

    return (
    <Box
      className="filter-container"
      sx={{
        backgroundColor: "white",
        boxShadow: 2,
        borderRadius: 2,
        p: 2,
        display: "flex",
        flexDirection: { xs: "column", sm: "row" },
        gap: 2,
        alignItems: { sm: "center" },
        justifyContent: { sm: "space-between" },
      }}
    >
      {/* Search Box */}
      <Box sx={{ position: "relative", width: { xs: "100%", sm: "50%" } }}>
        <FiSearch
          style={{
            position: "absolute",
            left: 12,
            top: "50%",
            transform: "translateY(-50%)",
            color: "#9CA3AF",
            fontSize: "1.2rem",
          }}
        />
        <input
          type="text"
          placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            width: "100%",
            paddingLeft: "2.5rem",
            paddingRight: "1rem",
            paddingTop: "0.5rem",
            paddingBottom: "0.5rem",
            border: "1px solid #D1D5DB",
            borderRadius: "0.5rem",
            outline: "none",
            transition: "all 0.2s",
          }}
        />
      </Box>

      {/* Category Dropdown with MUI */}
      <FormControl
        sx={{
          width: { xs: "100%", sm: "33%" },
        }}
        size="small"
      >
        <InputLabel>Category</InputLabel>
        <Select
          value={selectedCategory}
          onChange={handleCategoryChange}
          label="Category"
        >
          <MenuItem value="all">All Categories</MenuItem>
          {categories.map((category) => (
            <MenuItem key={category.categoryId} value={category.categoryName}>
              {category.categoryName}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    {/* Sort Button */}
      <Box sx={{ display: "flex", gap: 2 }}>
  {/* Sort Button */}
    <Tooltip title="Sort products by price" arrow>
        <button
        onClick={toggleSortOrder}
        style={{
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
            backgroundColor: "#1976d2",
            color: "white",
            padding: "0.5rem 1rem",
            border: "none",
            borderRadius: "0.5rem",
            cursor: "pointer",
            fontSize: "0.875rem",
            fontWeight: "500",
            transition: "background-color 0.2s ease",
        }}
        onMouseOver={(e) =>
            (e.currentTarget.style.backgroundColor = "#1565c0")
        }
        onMouseOut={(e) =>
            (e.currentTarget.style.backgroundColor = "#1976d2")
        }
        >
        Sort By Price
        {sortOrder === 'asc' ? <FaSortAmountDown size={16} /> : <FaSortAmountUp size={16} />}
      </button>
    </Tooltip>

    {/* Reset Filter Button */}
    <Tooltip title="Reset all filters" arrow>
        <button
        onClick={handleClearFilters}
        style={{
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
            backgroundColor: "#9E9E9E",
            color: "white",
            padding: "0.5rem 1rem",
            border: "none",
            borderRadius: "0.5rem",
            cursor: "pointer",
            fontSize: "0.875rem",
            fontWeight: "500",
            transition: "background-color 0.2s ease",
        }}
        onMouseOver={(e) =>
            (e.currentTarget.style.backgroundColor = "#757575")
        }
        onMouseOut={(e) =>
            (e.currentTarget.style.backgroundColor = "#9E9E9E")
        }
        >
        <FiRefreshCcw size={16} />
        Reset Filters
        </button>
    </Tooltip>
    </Box>
    
    </Box>
  );
};

export default Filter;
