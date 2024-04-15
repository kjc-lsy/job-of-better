package site.dealim.jobconsulting.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import site.dealim.jobconsulting.domain.Member;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class MemberListDto {
    private Member member;
    private String pgTitle;
}
