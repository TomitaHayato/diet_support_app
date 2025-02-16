import { useState } from "react";
import { AuthsContext, LikedIdsContext } from "./AuthsContext";

function AuthsProvider(props) {
  const {children} = props;

  const [currentUser, setCurrentUser] = useState(false);
  const [likedIds   , setLikedIds   ] = useState([]); // お気に入り登録しているWorkoutsのid

  return(
    <AuthsContext.Provider value={{currentUser, setCurrentUser}}>
      <LikedIdsContext.Provider value={{likedIds, setLikedIds}}>
        {children}
      </LikedIdsContext.Provider>
    </AuthsContext.Provider>
  )
}

export default AuthsProvider;
