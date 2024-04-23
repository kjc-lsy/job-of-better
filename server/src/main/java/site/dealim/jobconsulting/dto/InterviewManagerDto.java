package site.dealim.jobconsulting.dto;

import lombok.Data;

import java.time.LocalDateTime;
import java.time.LocalTime;

@Data
public class InterviewManagerDto {
    private Long slotIdx;
    private Long pgIdx;
    private Long scheduleIdx;
    private Long idx;
    private LocalDateTime slotStartDatetime;
    private LocalDateTime slotEndDatetime;
    private int slotCurrentOccupancy;
    private int slotMaxOccupancy;
    private Boolean slotIsAvailable;
    private String pgInterviewUnitTime;
    private Integer pgMaxIntervieweesPerUnit;
    private LocalDateTime pgInterviewValStartDate;
    private LocalDateTime pgInterviewValEndDate;
    private LocalTime pgInterviewValStartTime;
    private LocalTime pgInterviewValEndTime;
    private String name;
    private String interviewStatus;
}