import React, {useState} from 'react';

export const ProfileContext = React.createContext({
  profile: 'user',
  setProfile: id => {},
});

export const ProfileContextProvider = props => {
  const setProfile = profile => {
    setState({...state, profile: profile});
  };

  const initState = {
    profile: 'user',
    setProfile: setProfile,
  };

  const [state, setState] = useState(initState);

  return (
    <ProfileContext.Provider value={state}>
      {props.children}
    </ProfileContext.Provider>
  );
};
