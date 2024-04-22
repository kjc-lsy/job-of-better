package site.dealim.jobconsulting.domain;

import lombok.*;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@ToString
public class Program {
    private Long pgIdx;
    private Long pgComIdx;
    private String pgTitle;
    private String pgContent;
    private String pgContentSummary;
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
    private String pgInterviewUnitTime;
    private Integer pgMaxIntervieweesPerUnit;
    private LocalDateTime pgCreatedDate;
    private LocalDateTime pgModifiedDate;
    private String pgStatus;
    private LocalDate pgWithdrawnDate;
    private Character pgIsWithdrawn;
}
