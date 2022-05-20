import { observer } from "mobx-react-lite";
import Router from "next/router";
import { useContext } from "react";
import { authRoutes, publicRoutes } from "../../routes";
import { Context } from "../pages/_app";

const AppRouter = observer(() => {
  const { userStore } = useContext(Context);

  return (
    <>
      {userStore.isAuth && authRoutes.map(({ path }) => Router.push(path))}
      {publicRoutes.map(({ path }) => Router.push(path))}
      {Router.push("/")}
    </>
  );
});

export default AppRouter;
