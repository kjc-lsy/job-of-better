package site.dealim.jobconsulting.mapper;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import site.dealim.jobconsulting.domain.InterviewSlot;

import java.time.LocalDateTime;

@Mapper
public interface InterviewSlotMapper {

    public InterviewSlot selectSlotById(Long slotIdx);

    public InterviewSlot selectSlotByStartTime(LocalDateTime slotStartDatetime);

    public Long insertSlot(InterviewSlot interviewSlot);

    public Integer plusCurrOccupancy(InterviewSlot interviewSlot);

    public Integer updateCurrentOccupancy(@Param("slotIdx")Long slotIdx, @Param("currentOccupancy")Integer currentOccupancy);

    public Integer deleteSlot(Long slotIdx);

    public Integer selectCurrOccupByStartDateAndPgIdx(@Param("slotStartDatetime")LocalDateTime slotStartDatetime, @Param("slotPgIdx")Long slotPgIdx);
}
