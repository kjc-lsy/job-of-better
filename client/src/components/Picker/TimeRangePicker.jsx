import React, {useState} from 'react';
import {DateRangePicker} from "rsuite";
import {FaClock} from "react-icons/fa";

const TimeRangePicker = (props) => {
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

    return (
            <DateRangePicker
                placeholder='면접 가능 시간'
                format="HH:mm"
                caretAs={FaClock}
                locale={calendarLocaleType}
                placement={"auto"}
                {...props}
            />
    );
};

export default TimeRangePicker;