package site.dealim.jobconsulting.controller;

import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import site.dealim.jobconsulting.domain.Company;
import site.dealim.jobconsulting.domain.Member;
import site.dealim.jobconsulting.security.custom.CustomMember;
import site.dealim.jobconsulting.service.ComMemInfoService;

import java.util.List;
import java.util.Map;

@RestController
@Slf4j
@Tag(name = "기업사용자 - HOME", description = "Company Member Info Controller")
@RequestMapping("/api/company")
public class ComMemInfoController {
    @Autowired
    ComMemInfoService comMemInfoService;

    @GetMapping("/get-user-count/{pgIdx}")
    public ResponseEntity<?> getUserCount(@PathVariable("pgIdx") Long pgIdx) {
        log.info("프로그램 신청자 수 불러오기");
        try {
            return ResponseEntity.ok(comMemInfoService.getUserCount(pgIdx));
            //return comMemInfoService.getUserCount(pgIdx);
        }catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.badRequest().body(e.getMessage());

        }

    }

    /*@GetMapping("/user-company-info")
    public Company userCompanyInfo(@AuthenticationPrincipal CustomMember customMember) {
        return comMemInfoService.getComIdxByMemIdx(customMember.getMember().getIdx());
    }*/

}
