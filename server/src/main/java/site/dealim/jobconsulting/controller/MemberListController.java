package site.dealim.jobconsulting.controller;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import site.dealim.jobconsulting.service.MemberListService;

@RestController
@RequestMapping("/api/member-list")
@Slf4j
public class MemberListController {
    @Autowired
    private MemberListService memberListService;

    @Secured("ROLE_COMPANY")
    @GetMapping("/get-user-members")
    public ResponseEntity<?> getMembers() {
        log.info("USER 권한 사용자 불러오기...");
        return ResponseEntity.ok(memberListService.getMembersList());
    }

}