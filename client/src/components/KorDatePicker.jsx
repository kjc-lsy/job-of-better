import React from 'react';
import {DatePicker} from "rsuite";

const KorDatePicker = (props) => {
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
        <DatePicker
            locale={calendarLocaleType}
            placeholder='날짜를 선택해주세요'
            format="yyyy/MM/dd"
            {...props}
        />
    );
};

export default KorDatePicker;