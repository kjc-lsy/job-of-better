package site.dealim.jobconsulting.mapper;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import site.dealim.jobconsulting.domain.InterviewSchedule;

@Mapper
public interface InterviewScheduleMapper {

    public Integer insertSchedule(InterviewSchedule interviewSchedule);

    public InterviewSchedule selectScheduleByMemIdx(@Param("memIdx")Long memIdx);

    public Integer getCntBySlotIdx(Long slotIdx);

    public Integer updateSlot(@Param("scheduleIdx") Long scheduleIdx, @Param("slotIdx") Long slotIdx);

}
