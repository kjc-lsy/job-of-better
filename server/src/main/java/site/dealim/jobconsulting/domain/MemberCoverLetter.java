package site.dealim.jobconsulting.domain;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class MemberCoverLetter {
    Long mclIdx;
    Long mclCclIdx;
    Long mclMemberIdx;
    Long mclAnswer;
    String mclIsConfirm;
    LocalDateTime mclRegistrationDate;
    LocalDateTime mclModifiedDate;
}
