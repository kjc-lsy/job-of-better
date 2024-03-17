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
    private LocalDateTime pgInterviewDate;
    private LocalDateTime pgRegistrationDate;
    private LocalDateTime pgModifiedDate;
}
