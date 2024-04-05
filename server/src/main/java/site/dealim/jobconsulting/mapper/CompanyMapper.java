package site.dealim.jobconsulting.mapper;

import org.apache.ibatis.annotations.Mapper;
import site.dealim.jobconsulting.domain.Company;
import site.dealim.jobconsulting.domain.Member;
import site.dealim.jobconsulting.domain.MemberRole;

@Mapper
public interface CompanyMapper {


    Long companyJoin(Company company);

    int checkDuplicateBno(String comLicenseNum);
}
