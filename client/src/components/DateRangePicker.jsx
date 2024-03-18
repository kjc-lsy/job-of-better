import React, {Component} from "react";
import {DateRange} from 'react-date-range';

class MyDateRangePicker extends Component {
    handleSelect(ranges){
        console.log(ranges);
        // {
        //   selection: {
        //     startDate: [native Date Object],
        //     endDate: [native Date Object],
        //   }
        // }
    }
    render(){
        const selectionRange = {
            startDate: new Date(),
            endDate: null,
            key: 'selection',
        }
        return (
            <DateRange
                ranges={[selectionRange]}
                onChange={this.handleSelect}
            />
        )
    }
}

export default MyDateRangePicker;
