package site.dealim.jobconsulting.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import site.dealim.jobconsulting.domain.ComCoverLetter;
import site.dealim.jobconsulting.domain.MemberCoverLetter;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CoverLetterDto {
    private ComCoverLetter comCoverLetter;
    private MemberCoverLetter memberCoverLetter;
}
