package site.dealim.jobconsulting.domain;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Program {
    private Long pgIdx;
    private Long pgComIdx;
    private String pgTitle;
    private String pgContent;
    private LocalDateTime pgProgStartDate;
    private LocalDateTime pgProgEndDate;
    private LocalDateTime pgEduStartDate;
    private LocalDateTime pgEduEndDate;
    private LocalDateTime pgRegValStartDate;
    private LocalDateTime pgRegValEndDate;
    private LocalDateTime pgInterviewValStartDate;
    private LocalDateTime pgInterviewValEndDate;
    private LocalDateTime pgInterviewValStartTime;
    private LocalDateTime pgInterviewValEndTime;
    private LocalDateTime pgCreatedDate;
    private LocalDateTime pgModifiedDate;
    private Character pgIsWithdrawn;
}
