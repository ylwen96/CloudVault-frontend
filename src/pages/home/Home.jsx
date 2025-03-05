import { useEffect, useCallback } from "react";
import "./styles.scss";
import { useSelector } from "react-redux";
import { Typography } from "@mui/material";
import TableComponent from "../../components/table/Table";
import { getUser } from "../../util/auth";
import { readStorage, StorageTypes } from "../../util/storageHelper";
import { useDispatch } from "react-redux";
import { setUserSignOut } from "../../redux/auth/authSlice";

const Home = () => {
  const user = useSelector((state) => state.auth.user);

  const dispatch = useDispatch();

  const fetchUser = useCallback(async () => {
    try {
      const res = await getUser();
      if (res.idToken !== readStorage(StorageTypes.ID_TOKEN_STORAGE)) {
        dispatch(setUserSignOut());
      }
    } catch (error) {
      console.log(error);
    }
  }, [dispatch]);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  return (
    <div className="home-container">
      <Typography variant="h5" component="div" className="home-title">
        Welcome Aboard Captain, you are signed in as "{user && user.username}"!
      </Typography>
      <div className="table-container">
        <TableComponent user={user} />
      </div>
    </div>
  );
};

export default Home;
