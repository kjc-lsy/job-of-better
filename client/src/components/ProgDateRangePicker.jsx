import React from 'react';
import {DateRangePicker} from "rsuite";

const ProgDateRangePicker = (props) => {
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

    return (
        <DateRangePicker
            showOneCalendar={true}
            format="yyyy년 MM월 dd일"
            placeholder="날짜를 선택해주세요"
            locale={calendarLocaleType}
            {...props}
        />
    );
};

export default ProgDateRangePicker;