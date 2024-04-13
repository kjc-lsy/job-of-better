package site.dealim.jobconsulting.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import site.dealim.jobconsulting.mapper.CompanyMapper;

@Service
public class CommonService {
    @Autowired
    private CompanyMapper companyMapper;

    public Long getComIdxByMemIdx(Long idx) {
        return companyMapper.selectComIdxByMemIdx(idx);
    }
}
