package site.dealim.jobconsulting.dto;

import lombok.Builder;
import lombok.Data;
import site.dealim.jobconsulting.domain.Member;

@Data
@Builder
public class MemberListDto {
    private Member member;
    private String pgTitle;
}
