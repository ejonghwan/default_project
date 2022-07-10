import React, {Fragment, useState, useEffect, useCallback, useContext } from 'react';


    const LoginTimer = props => {
    const { totalLoingTime, timeRemaining } = props;

    return (
        <Fragment>
             총 시간: {totalLoingTime} / 남은시간: {timeRemaining}
        </Fragment>
    );
}

export default LoginTimer;