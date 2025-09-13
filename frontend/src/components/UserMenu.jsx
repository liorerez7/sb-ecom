import * as React from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Avatar from "@mui/material/Avatar";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { BiUser } from "react-icons/bi";
import { FaShoppingCart, FaUserShield } from "react-icons/fa";
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
  const isAdmin = user && user?.roles.includes("ROLE_ADMIN");
  const isSeller = user && user?.roles.includes("ROLE_SELLER");

  return (
    <div>
      <div
        className="flex flex-row items-center gap-1 cursor-pointer p-2 transition text-white hover:bg-white/10 rounded-lg"
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
        
        {(isAdmin || isSeller) && (
          <Link to="/admin/orders">
            <MenuItem onClick={handleClose}>
              <FaShoppingCart className="text-xl mr-2" />
              <span>Orders</span>
            </MenuItem>
          </Link>
        )}
        {isAdmin && (
        <Link to="/admin">
          <MenuItem onClick={handleClose}>
            <FaUserShield className="text-xl mr-2" />
            <span>Admin Panel</span>
          </MenuItem>
        </Link>)}
        {isSeller && !isAdmin && (
        <Link to="/admin/orders">
          <MenuItem onClick={handleClose}>
            <FaUserShield className="text-xl mr-2" />
            <span>Seller Panel</span>
          </MenuItem>
        </Link>)}
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
