package site.dealim.jobconsulting.mapper;

import org.apache.ibatis.annotations.Mapper;
import site.dealim.jobconsulting.domain.Company;

@Mapper
public interface CompanyMapper {
    Long selectComIdxByMemIdx(Long idx);

    Long companyJoin(Company company);

    int checkDuplicateBno(String comLicenseNum);
    String getComNameByComIdx(Long comIdx);

}