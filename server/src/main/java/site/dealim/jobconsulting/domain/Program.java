package site.dealim.jobconsulting.domain;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Program {
    private Long pgIdx;
    private Long pgComIdx;
    private String pgTitle;
    private String pgContent;
    private LocalDate pgProgStartDate;
    private LocalDate pgProgEndDate;
    private LocalDate pgEduStartDate;
    private LocalDate pgEduEndDate;
    private LocalDate pgRegValStartDate;
    private LocalDate pgRegValEndDate;
    private LocalDate pgInterviewValStartDate;
    private LocalDate pgInterviewValEndDate;
    private LocalTime pgInterviewValStartTime;
    private LocalTime pgInterviewValEndTime;
    private LocalDate pgCreatedDate;
    private LocalDate pgModifiedDate;
    private Character pgIsWithdrawn;
}
