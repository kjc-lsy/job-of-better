package site.dealim.jobconsulting.domain;

import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@Builder
public class InterviewSchedule {
    private Long scheduleIdx;
    private Long slotIdx;
    private Long memIdx;
    private LocalDateTime registeredDate;
}
