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
    private Long pg_idx;
    private Long pg_com_idx;
    private String pg_title;
    private String pg_content;
    private LocalDateTime pg_interview_date;
    private LocalDateTime pg_registration_date;
}
