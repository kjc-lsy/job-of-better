package site.dealim.jobconsulting.controller;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
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
    @GetMapping("/get-members-page")
    public ResponseEntity<?> getMembers(Pageable pageable) {
        log.info("USER 권한 사용자 페이지 불러오기...");
        log.info(pageable.toString());
        return ResponseEntity.ok(memberListService.getMembersList());
    }

    @Secured("ROLE_COMPANY")
    @GetMapping("/get-user-info/{idx}")
    public ResponseEntity<?> getUserInfo(@PathVariable("idx") Long idx) {
        log.info("USER 정보 가져오기...");
        return ResponseEntity.ok(memberListService.getMemberInfoByIdx(idx));
    }
}