package site.dealim.jobconsulting.domain;

import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@Builder
public class InterviewSlot {
    private Long slotIdx;
    private Long slotPgIdx;
    private LocalDateTime slotStartDatetime;
    private LocalDateTime slotEndDatetime;
    private int slotCurrentOccupancy;
    private int slotMaxOccupancy;
    private Boolean slotIsAvailable;
}