
package site.dealim.jobconsulting.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import site.dealim.jobconsulting.domain.Company;
import site.dealim.jobconsulting.domain.Member;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class MemberCompanyDto {
    private Member member;
    private Company company;
}