import React from 'react';
import { observer } from 'mobx-react-lite';
import { store } from '../../lib/mobx';
import { CHECKED } from '../../constants';

const Head = observer(() => {
    return (
        <>
            {
                store.submited === CHECKED && !store.allData?.weather.length
                    ? <></>
                    : <div className = 'head'>
                        <div className = { `icon ${store.selectType}` }></div>
                        <div className = 'current-date'>
                            <p>{ store.selectedDayId }</p>
                            <span>{ store.selectDayMonth } { store.selectMonth }</span>
                        </div>
                    </div>
            }
        </>
    );
});

export default Head;
