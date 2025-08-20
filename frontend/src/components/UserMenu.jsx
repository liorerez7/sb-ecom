import * as React from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Avatar from "@mui/material/Avatar";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { BiUser } from "react-icons/bi";
import { FaShoppingCart } from "react-icons/fa";
import { IoExitOutline } from "react-icons/io5";
import BackDrop from "./BackDrop";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logOutUser } from "../store/actions";
import { toast } from "react-hot-toast";

const UserMenu = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const logoutHandler = () => {
    dispatch(logOutUser(toast, navigate));
  };

  const user = useSelector((state) => state.auth.user);

  return (
    <div>
      <div
        className="sm:border flex flex-row items-center gap-1 rounded-full cursor-pointer hover:shadow-md p-2 transition text-slate-700"
        onClick={handleClick}
      >
        <Avatar
            alt="Menu"
            src=""
            sx={{ outline: "none", boxShadow: "none" }}
            className="focus:outline-none"
            />
      </div>

      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        slotProps={{
          list: {
            "aria-labelledby": "basic-button",
          },
        }}
      >
        <Link to="/profile">
          <MenuItem onClick={handleClose}>
            <BiUser className="text-xl mr-2" />
            <span>{user?.username || "Profile"}</span>
          </MenuItem>
        </Link>
        <Link to="/profile/orders">
          <MenuItem onClick={handleClose}>
            <FaShoppingCart className="text-xl mr-2" />
            <span>Orders</span>
          </MenuItem>
        </Link>
        <MenuItem onClick={logoutHandler}>
          <IoExitOutline className="text-xl mr-2" />
          <span>Logout</span>
        </MenuItem>
      </Menu>

      {open && <BackDrop data={open} />}
    </div>
  );
};

export default UserMenu;
