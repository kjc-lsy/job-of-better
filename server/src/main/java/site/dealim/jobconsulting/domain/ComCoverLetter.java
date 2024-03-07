package site.dealim.jobconsulting.domain;

import com.fasterxml.jackson.annotation.JsonTypeId;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Generated;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ComCoverLetter {
    private Long cclIdx;
    private Long cclComIdx;
    private String cclComName;
    private String cclLetterQuestion;
    private int cclMinLength;
    private char cclIsActive;
    private LocalDateTime cclRegistrationDate;
    private LocalDateTime cclModifiedDate;
}
