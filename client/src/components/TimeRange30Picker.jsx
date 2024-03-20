import React, {useEffect, useState} from 'react';
import {DateRangePicker} from "rsuite";
import {FaClock} from "react-icons/fa";

const TimeRange30Picker = (props) => {
    const calendarLocaleType = {
        sunday: '일',
        monday: '월',
        tuesday: '화',
        wednesday: '수',
        thursday: '목',
        friday: '금',
        saturday: '토',
        ok: '확인',
        today: '오늘',
        yesterday: '어제',
        hours: '시간',
        minutes: '분',
        seconds: '초',
        formattedMonthPattern: 'yyyy년 MM월',
        formattedDayPattern: 'dd일',
        last7Days: '일주일'
    };
    const [selectedRange, setSelectedRange] = useState([
        {
            startDate: new Date(),
            endDate: new Date(),
            key: 'selection'
        }
    ]);
    const now = new Date();
    now.setMinutes(0);

    useEffect(() => {

    }, []);

    return (
            <DateRangePicker
                defaultValue={[now, now]}
                placeholder='면접 가능 시간'
                format="HH:mm"
                ranges={[]}
                caretAs={FaClock}
                locale={calendarLocaleType}
                {...props}
            />
    );
};

export default TimeRange30Picker;