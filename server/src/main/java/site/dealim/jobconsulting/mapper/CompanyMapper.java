package site.dealim.jobconsulting.mapper;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import site.dealim.jobconsulting.domain.Company;

@Mapper
public interface CompanyMapper {
    Long selectComIdxByMemIdx(Long idx);

    Long companyJoin(Company company);

    int checkDuplicateBno(String comLicenseNum);
    String getComNameByComIdx(Long comIdx);

    int uploadLicenseFile(@Param("comIdx") Long comIdx, @Param("licenseFile") String uploadFileUrl);

    Company selectComInfoByIdx(Long comIdx);

    int updateComInfo(Company company);

}