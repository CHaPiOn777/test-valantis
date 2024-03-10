import { useEffect } from "react";
import "./App.css";
import Posts from "../Posts/Posts";
import { useAppDispatch } from "../../hooks/redux";
import { fetchPosts } from "../../store/reducers/ActionCreater";
import Filters from "../Filters/Filters";

function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  return (
    <>
      <Filters />
      <Posts />
    </>
  );
}

export default App;
