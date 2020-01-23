import React from 'react';

const UserPanel = ({ userInfo }) => {
  return (
    <>
      {userInfo ? (
        <div
          style={{ marginTop: '56px', textAlign: 'center' }}
          className="ui segment info"
        >
          <h4>Welcome {userInfo}</h4>
        </div>
      ) : null}
    </>
  );
};
export default UserPanel;
