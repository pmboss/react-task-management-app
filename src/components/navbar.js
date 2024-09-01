import { Link } from 'react-router-dom';
import { logout } from '../store/actions/authActions';
import { useNavigate } from 'react-router-dom';
 import { userImgURL } from '../assets/images/user_img';
 import { useDispatch } from'react-redux';
export default function Navbar(user) {
  const navigate = useNavigate();
  const userDetail = user.user;
  const userURL = userImgURL;
  const dispatch = useDispatch();

  const handleLogout = async () => {
    try {
      await dispatch(logout());
      navigate("/login");
    } catch (error) {
      console.error("Failed to logout: ", error);
    }
  };


  return (
    <div className="mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center px-20 bg-slate-100">
      <Link to="/" className="flex title-font font-medium text-xl items-center font-s text-gray-900 mb-4 md:mb-0"> Task Management App</Link>
      <div className="ml-auto flex flex-wrap items-center text-base justify-center gap-4">
        {user && (
          <div className="flex items-center space-x-3">
            <img
              src={userDetail?.photoURL || userURL} 
              alt="User Avatar"
              className="w-12 h-12 rounded-full shadow-md"
            />
            <p className="text-gray-700 font-medium">
              {userDetail?.firstName?.toUpperCase()} {userDetail?.lastName?.toUpperCase()}
            </p>
          </div>
        )}

        <button className="inline-flex items-center  bg-gradient-to-r from-fuchsia-500 to-pink-500 border-0 py-2 px-5 mt-4 md:mt-0 mr-5 text-white rounded-full" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </div>
  )
}