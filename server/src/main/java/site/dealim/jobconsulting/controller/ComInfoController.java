package site.dealim.jobconsulting.controller;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import site.dealim.jobconsulting.domain.Company;
import site.dealim.jobconsulting.security.custom.CustomMember;
import site.dealim.jobconsulting.service.CommonService;

@Controller
@RequestMapping("/api/company")
@Slf4j
public class ComInfoController {
    @Autowired
    private CommonService commonService;

    @GetMapping("/get-com-info")
    @Secured("ROLE_COMPANY")
    public ResponseEntity<?> selectComInfoByIdx(@AuthenticationPrincipal CustomMember customMember) {
        return ResponseEntity.ok(commonService.getComInfoByComIdx(customMember.getMember().getComIdx()));
    }

    @PutMapping("/update-com-info")
    @Secured("ROLE_COMPANY")
    public ResponseEntity<?> updateComInfo(@AuthenticationPrincipal CustomMember customMember, @RequestBody Company company) {
        log.info("회사 정보를 업데이트... - company = " + company);
        company.setComIdx(customMember.getMember().getComIdx());
        return ResponseEntity.ok(commonService.updateComInfo(company));
    }
}
