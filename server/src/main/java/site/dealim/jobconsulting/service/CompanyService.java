package site.dealim.jobconsulting.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import site.dealim.jobconsulting.domain.ComCoverLetter;
import site.dealim.jobconsulting.mapper.CompanyMapper;
import site.dealim.jobconsulting.domain.Member;

import java.util.HashMap;
import java.util.List;

@Service
public class CompanyService {
    @Autowired
    private CompanyMapper companyMapper;

    public void comCoverLetterSave(List<ComCoverLetter> values, Long comIdx) {
        for(ComCoverLetter comCoverLetter : values) {
            HashMap map = new HashMap();
            map.put("cclComIdx", comIdx);
            map.put("cclLetterQuestion", comCoverLetter.getCclLetterQuestion());
            map.put("cclMinLength", comCoverLetter.getCclMinLength());
            map.put("cclMaxLength", comCoverLetter.getCclMaxLength());
            Long cclIdx = comCoverLetter.getCclIdx();
            if(cclIdx != null) {
                map.put("cclIdx", cclIdx);
                companyMapper.ComCoverLetterUpdate(map);
            }else {
                companyMapper.ComCoverLetterinsert(map);
            }
        }

    }

    public List<ComCoverLetter> comCoverLetterInfo(Long comIdx) {
        return companyMapper.comCoverLetterInfo(comIdx);
    }

    public void comCoverLetterDelete(Long cclIdx, Member user) {
        HashMap map = new HashMap();
        map.put("cclIdx", cclIdx);
        map.put("cclComIdx", user.getComIdx());
        companyMapper.ComCoverLetterDelete(map);
    }
}
