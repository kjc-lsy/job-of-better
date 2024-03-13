package site.dealim.jobconsulting.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import site.dealim.jobconsulting.domain.ComCoverLetter;
import site.dealim.jobconsulting.mapper.CompanyMapper;

import java.util.HashMap;
import java.util.List;

@Service
public class CompanyService {

    @Autowired
    CompanyMapper companyMapper;
    public void comCoverLetterSave(List<String> values, Long comIdx) {
        for(String str : values) {
            //System.out.println(values.get(i));
            HashMap map = new HashMap();
            map.put("cclComIdx", comIdx);
            map.put("cclLetterQuestion", str);
            companyMapper.ComcCoverLetterinsert(map);
        }

        //return null;

    }
}
