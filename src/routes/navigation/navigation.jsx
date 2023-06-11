import { Fragment, useContext } from "react";
import { Outlet, Link } from "react-router-dom";
import { ReactComponent as CrwnLogo } from '../../assests/crown.svg';
import './navigation.scss';
import { UserContext } from "../../contexts/user";
import { signOutUser } from "../../utils/firebase/firebase";

function Navigation() {
  const {currentUser} = useContext(UserContext);

  return (
    <Fragment>
      <div className="navigation">
      <Link className="logo-container" to="/">
     <CrwnLogo className="logo" />
        </Link>
        
        <div className="nav-links-container">
        <Link className="nav-link" to="/shop">
          Shop
        </Link>
        {
          currentUser ? (
            <span className="nav-link" onClick={signOutUser}>Sign Out</span>
          ) : (<Link className="nav-link" to="/auth">
          SignIn
        </Link>)
        }
        </div>
      </div>
      <Outlet />
    </Fragment>
  );
}

export default Navigation;
