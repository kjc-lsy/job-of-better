import React from 'react';
import {SelectPicker} from "rsuite";

const RegStatusPicker = (props) => {
    const regStatusSelect = [{label: '가입대기', value: 'Registered'}, {label: '확인', value: 'Approved'}, {
        label: '거절',
        value: 'Rejected'
    }];
    const renderMenuItem = (label, item) => {
        if(item.value == 'Registered') return <span style={{color: '#e55757'}}>{label}</span>

        if(item.value == 'Rejected') return <span style={{color: '#000000'}}>{label}</span>

        return label
    }

    const renderValue = (value, item, selectedEl) => {
        if (value === 'Registered') return (<span style={{color: '#e55757'}}>{item.label}</span>)

        if (value === 'Rejected') return (<span style={{color: '#000000'}}>{item.label}</span>)

        return selectedEl
    }
    return (
        <div>
            <SelectPicker
                renderMenuItem={renderMenuItem}
                renderValue={renderValue}
                data={regStatusSelect}
                searchable={false}
                {...props}
            />
        </div>
    );
};

export default RegStatusPicker;