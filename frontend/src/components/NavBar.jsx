import { NavLink } from "react-router-dom"
import { MdCategory, MdContacts, MdHomeFilled, MdShop2 } from "react-icons/md"


const NavBar = ({containerStyles, closeMenu}) => {
  return (
    <nav className={`${containerStyles}`}>
        <NavLink to={'/'} onClick={closeMenu} className={({isActive})=> isActive ? "active_link" : ""}>
            <div className="flexCenter gap-x-1"><MdHomeFilled />Home</div>
        </NavLink>
        <NavLink to={'/mens'} onClick={closeMenu} className={({isActive})=> isActive ? "active_link" : ""}>
            <div className="flexCenter gap-x-1"><MdCategory />Men's</div>
        </NavLink>
        <NavLink to={'/womens'} onClick={closeMenu} className={({isActive})=> isActive ? "active_link" : ""}>
            <div className="flexCenter gap-x-1"><MdShop2 />Women's</div>
        </NavLink>
        <NavLink to={'/kids'} onClick={closeMenu} className={({isActive})=> isActive ? "active_link" : ""}>
            <div className="flexCenter gap-x-1"><MdContacts />Kid's</div>
        </NavLink>

    </nav>
  )
}

export default NavBar